import { describe, it, expect } from 'vitest';
import { findChat, type ChatEntry } from './chat-resolver';
import { makeFakeSend } from '../../test/helpers/fakeSend';
import type { TdChat } from './types';

const supergroup = (id: number, title: string): TdChat => ({
  id,
  title,
  type: { '@type': 'chatTypeSupergroup', supergroup_id: id },
});

describe('findChat', () => {
  it('resolves directly by id using the -100 channel prefix', async () => {
    const target = supergroup(100, 'Direct');
    const fake = makeFakeSend({
      handlers: {
        getChat: (p) => (p.chat_id === '-100100' ? target : new Error('not prefixed')),
      },
    });

    const chat = await findChat({ chat_id: 100 }, fake.send);

    expect(chat).toEqual(target);
    expect(fake.lastOf('getChat')!.params.chat_id).toBe('-100100');
    expect(fake.countOf('getChat')).toBe(1);
  });

  it('falls back to the raw id when the prefixed lookup fails', async () => {
    const target = supergroup(100, 'Raw');
    const fake = makeFakeSend({
      handlers: {
        getChat: (p) => (p.chat_id === 100 ? target : new Error('no channel')),
      },
    });

    const chat = await findChat({ chat_id: 100 }, fake.send);

    expect(chat).toEqual(target);
    expect(fake.callsOf('getChat').map((c) => c.params.chat_id)).toEqual(['-100100', 100]);
  });

  it('resolves via linked_chat_id: prefetch the linked supergroup, then retry the target', async () => {
    const target = supergroup(100, 'Target');
    const linked = supergroup(200, 'Linked');
    let prefetched = false;

    const fake = makeFakeSend({
      handlers: {
        getChat: (p) => {
          if (p.chat_id === '-100200' || p.chat_id === 200) return linked;
          if (p.chat_id === '-100100' || p.chat_id === 100) {
            return prefetched ? target : new Error('not yet resolvable');
          }
          return new Error('unknown chat');
        },
        getSupergroupFullInfo: () => {
          prefetched = true;
          return {};
        },
      },
    });

    const entry: ChatEntry = { chat_id: 100, linked_chat_id: 200 };
    const chat = await findChat(entry, fake.send);

    expect(chat).toEqual(target);
    expect(fake.countOf('getSupergroupFullInfo')).toBe(1);
    expect(fake.lastOf('getSupergroupFullInfo')!.params.supergroup_id).toBe(200);
  });

  it('resolves a public chat by username when id lookups fail', async () => {
    const target = supergroup(1, 'Public');
    const fake = makeFakeSend({
      handlers: {
        getChat: () => new Error('private / not joined'),
        searchPublicChat: (p) => (p.username === 'pubchat' ? target : new Error('not found')),
      },
    });

    const chat = await findChat({ chat_id: 100, chat_username: 'pubchat' }, fake.send);

    expect(chat).toEqual(target);
    expect(fake.lastOf('searchPublicChat')!.params.username).toBe('pubchat');
  });

  it('resolves via linked_chat_username: find linked public chat, prefetch, retry target', async () => {
    const target = supergroup(100, 'Target');
    const linked = supergroup(200, 'LinkedPublic');
    let prefetched = false;

    const fake = makeFakeSend({
      handlers: {
        getChat: (p) => {
          if ((p.chat_id === '-100100' || p.chat_id === 100) && prefetched) return target;
          return new Error('unresolved');
        },
        searchPublicChat: (p) => (p.username === 'linkedpub' ? linked : new Error('not found')),
        getSupergroupFullInfo: () => {
          prefetched = true;
          return {};
        },
      },
    });

    const entry: ChatEntry = { chat_id: 100, linked_chat_username: 'linkedpub' };
    const chat = await findChat(entry, fake.send);

    expect(chat).toEqual(target);
    expect(fake.countOf('searchPublicChat')).toBe(1);
    expect(fake.countOf('getSupergroupFullInfo')).toBe(1);
  });

  it('returns null when every strategy fails', async () => {
    const fake = makeFakeSend({
      handlers: {
        getChat: () => new Error('fail'),
        searchPublicChat: () => new Error('fail'),
      },
    });

    const entry: ChatEntry = {
      chat_id: 100,
      linked_chat_id: 200,
      chat_username: 'a',
      linked_chat_username: 'b',
    };
    expect(await findChat(entry, fake.send)).toBeNull();
  });
});
