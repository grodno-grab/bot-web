import { describe, it, expect } from 'vitest';
import { runAdminFlow } from './admin-flow';
import { makeFakeController } from '../../test/helpers/fakeController';
import { buildAdminSend, ID_MULTIPLIER as MUL, type WorldDef } from '../../test/helpers/adminWorld';
import type { AdminChatGroup, DateRange, TdChat } from './types';

const ME = 1000;
const START_TS = 1000;
const END_TS = 2000;
const RANGE: DateRange = {
  startTs: START_TS,
  endTs: END_TS,
  startDateStr: '01.01.2020',
  endDateStr: '01.06.2020',
};

const chatRef = (id: number, title: string): TdChat => ({
  id,
  title,
  type: { '@type': 'chatTypeSupergroup', supergroup_id: id },
});

const groupsArg = (ctrl: ReturnType<typeof makeFakeController>): AdminChatGroup[] =>
  ctrl.calls.find((c) => c.method === 'waitForAdminChatSelect')!.args[0] as AdminChatGroup[];

// ─── chat discovery & filtering ────────────────────────────────────────────────

describe('runAdminFlow — discovery', () => {
  it('shows an error and returns "error" when no admin chats are found', async () => {
    const world: WorldDef = { meId: ME, chatIds: [], chats: [] };
    const { send } = buildAdminSend(world);
    const fc = makeFakeController();

    const result = await runAdminFlow(send, fc.ctrl);

    expect(result).toBe('error');
    expect(fc.errors).toContain('Нет доступных чатов для администрирования.');
  });

  it('keeps only supergroups where the user can delete (creator or admin w/ rights)', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5001, 5002, 5003, 5004, 5005, 5006],
      chats: [
        { id: 5001, title: 'Creator', supergroupId: 5001, myStatus: 'creator' },
        { id: 5002, title: 'AdminCanDelete', supergroupId: 5002, myStatus: 'admin', canDelete: true },
        { id: 5003, title: 'AdminNoDelete', supergroupId: 5003, myStatus: 'admin', canDelete: false },
        { id: 5004, title: 'Channel', supergroupId: 5004, myStatus: 'creator', isChannel: true },
        { id: 5005, title: 'BasicGroup', supergroupId: 5005, typeName: 'chatTypeBasicGroup', myStatus: 'creator' },
        { id: 5006, title: 'JustMember', supergroupId: 5006, myStatus: 'member' },
      ],
    };
    const { send } = buildAdminSend(world);
    const fc = makeFakeController({ adminChatSelect: [null] });

    const result = await runAdminFlow(send, fc.ctrl);

    expect(result).toBe('back');
    const titles = groupsArg(fc).flatMap((g) => g.chats.map((c) => c.title));
    expect(titles.sort()).toEqual(['AdminCanDelete', 'Creator']);
  });

  it('groups chats into public/private and sorts each group by title', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [1, 2, 3, 4],
      chats: [
        { id: 1, title: 'Zebra', supergroupId: 1, myStatus: 'creator', username: 'zebra_pub' },
        { id: 2, title: 'Apple', supergroupId: 2, myStatus: 'creator', username: 'apple_pub' },
        { id: 3, title: 'Mango', supergroupId: 3, myStatus: 'creator' },
        { id: 4, title: 'Banana', supergroupId: 4, myStatus: 'creator' },
      ],
    };
    const { send } = buildAdminSend(world);
    const fc = makeFakeController({ adminChatSelect: [null] });

    await runAdminFlow(send, fc.ctrl);

    const groups = groupsArg(fc);
    expect(groups.map((g) => g.label)).toEqual(['Публичные чаты', 'Приватные чаты']);
    expect(groups[0].chats.map((c) => c.title)).toEqual(['Apple', 'Zebra']);
    expect(groups[1].chats.map((c) => c.title)).toEqual(['Banana', 'Mango']);
  });

  it('classifies a username-less supergroup as public when its linked chat is public', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [1],
      chats: [
        // No own username, but it is the discussion group of a public channel.
        { id: 1, title: 'Discussion', supergroupId: 1, myStatus: 'creator', hasLinkedChat: true, linkedChatId: 99 },
        // The linked public channel — resolved during classification, not itself an admin chat.
        { id: 99, title: 'LinkedChannel', supergroupId: 99, username: 'public_channel' },
      ],
    };
    const { send } = buildAdminSend(world);
    const fc = makeFakeController({ adminChatSelect: [null] });

    await runAdminFlow(send, fc.ctrl);

    const groups = groupsArg(fc);
    expect(groups.map((g) => g.label)).toEqual(['Публичные чаты']);
    expect(groups[0].chats.map((c) => c.title)).toEqual(['Discussion']);
  });

  it('classifies as private when the linked chat lookup yields no public username', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [1],
      chats: [
        { id: 1, title: 'Discussion', supergroupId: 1, myStatus: 'creator', hasLinkedChat: true, linkedChatId: 99 },
        { id: 99, title: 'LinkedPrivate', supergroupId: 99 }, // linked, but also private
      ],
    };
    const { send } = buildAdminSend(world);
    const fc = makeFakeController({ adminChatSelect: [null] });

    await runAdminFlow(send, fc.ctrl);

    const groups = groupsArg(fc);
    expect(groups.map((g) => g.label)).toEqual(['Приватные чаты']);
  });
});

// ─── deletion engine ────────────────────────────────────────────────────────────

describe('runAdminFlow — deletion', () => {
  const happyWorld = (): WorldDef => ({
    meId: ME,
    chatIds: [5000],
    chats: [
      {
        id: 5000,
        title: 'MyChat',
        supergroupId: 5000,
        myStatus: 'creator',
        admins: [13],
        startTs: START_TS,
        endTs: END_TS,
        startMsgId: 1 * MUL,
        endMsgId: 5 * MUL,
        history: [
          { id: 5 * MUL, date: 1500, sender: 11 }, // regular user → delete
          { id: 4 * MUL, date: 1500, sender: 12 }, // bot → skip
          { id: 3 * MUL, date: 1500, sender: 13 }, // admin → skip
          { id: 2 * MUL, date: 1500, sender: 'chat' }, // channel regular post → skip
          { id: 1 * MUL, date: 1500, sender: 11, service: true }, // service → delete by id
        ],
      },
    ],
    users: [
      { id: 11 },
      { id: 12, bot: true },
      { id: 13 },
    ],
  });

  it('deletes by sender only non-admin, non-bot users in range', async () => {
    const { send, callsOf } = buildAdminSend(happyWorld());
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    const result = await runAdminFlow(send, fc.ctrl);

    expect(result).toBe('completed');
    const bySender = callsOf('deleteChatMessagesBySender');
    const deletedUsers = bySender.map((c) => (c.params.sender_id as { user_id: number }).user_id);
    expect(deletedUsers).toEqual([11]); // not 12 (bot), not 13 (admin)

    const doneCall = fc.calls.find((c) => c.method === 'waitForAdminDone')!;
    expect(doneCall.args[3]).toBe(1); // processed users count
    expect(callsOf('logOut').length).toBeGreaterThanOrEqual(1);
  });

  it('FIX (bug #1): a user whose getUser lookup fails is still treated as a user and deleted', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          startTs: START_TS,
          endTs: END_TS,
          endMsgId: 5 * MUL,
          startMsgId: 1 * MUL,
          history: [{ id: 5 * MUL, date: 1500, sender: 11 }],
        },
      ],
      users: [{ id: 11, getUserThrows: true }],
    };
    const { send, callsOf } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const deletedUsers = callsOf('deleteChatMessagesBySender').map(
      (c) => (c.params.sender_id as { user_id: number }).user_id,
    );
    expect(deletedUsers).toEqual([11]);
    expect(fc.calls.find((c) => c.method === 'waitForAdminDone')!.args[3]).toBe(1);
  });

  it('ignores users whose only messages fall outside the date range', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          startTs: START_TS,
          endTs: END_TS,
          endMsgId: 5 * MUL,
          startMsgId: 1 * MUL,
          history: [
            { id: 5 * MUL, date: 1500, sender: 11 }, // in range
            { id: 2 * MUL, date: 500, sender: 14 }, // older than startTs → ignored
          ],
        },
      ],
      users: [{ id: 11 }, { id: 14 }],
    };
    const { send, callsOf } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const deletedUsers = callsOf('deleteChatMessagesBySender').map(
      (c) => (c.params.sender_id as { user_id: number }).user_id,
    );
    expect(deletedUsers).toEqual([11]);
  });

  it('returns count 0 and deletes nothing when the end-date anchor is missing', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          startTs: START_TS,
          endTs: END_TS,
          throwEndDate: true,
          history: [{ id: 5 * MUL, date: 1500, sender: 11 }],
        },
      ],
      users: [{ id: 11 }],
    };
    const { send, callsOf } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    expect(callsOf('deleteChatMessagesBySender')).toHaveLength(0);
    expect(fc.calls.find((c) => c.method === 'waitForAdminDone')!.args[3]).toBe(0);
  });

  it('stops the verify-pass loop once the chat is actually clean (no spinning)', async () => {
    // removeOnDelete makes deletions real, so a second scan pass finds nothing and
    // the loop breaks instead of running all MAX_VERIFY_PASSES times.
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      removeOnDelete: true,
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          startTs: START_TS,
          endTs: END_TS,
          startMsgId: 1 * MUL,
          endMsgId: 5 * MUL,
          history: [{ id: 5 * MUL, date: 1500, sender: 11 }],
        },
      ],
      users: [{ id: 11 }],
    };
    const { send, callsOf } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const deletedUsers = callsOf('deleteChatMessagesBySender').map(
      (c) => (c.params.sender_id as { user_id: number }).user_id,
    );
    expect(deletedUsers).toEqual([11]);
    // One productive pass + one confirming-empty pass. A broken loop that ignored
    // the "nothing deleted" signal would re-scan all 5 passes (≥6 history reads).
    expect(callsOf('getChatHistory').length).toBeLessThanOrEqual(4);
    const done = fc.calls.find((c) => c.method === 'waitForAdminDone')!;
    expect(done.args[3]).toBe(1);
    expect(done.args[4]).toBe(0); // no failures
  });

  it('surfaces a partial failure when a sender sweep throws', async () => {
    const { send, callsOf } = buildAdminSend(happyWorld(), {
      deleteChatMessagesBySender: new Error('CHAT_ADMIN_REQUIRED'),
    });
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    expect(callsOf('deleteChatMessagesBySender').length).toBeGreaterThan(0);
    const done = fc.calls.find((c) => c.method === 'waitForAdminDone')!;
    expect(done.args[3]).toBe(1); // the user was still attempted
    expect(done.args[4] as number).toBeGreaterThan(0); // ...but the failure is reported
  });

  it('surfaces a partial failure when messages cannot be confirmed deleted', async () => {
    // getMessages always still finds the by-id messages → ensureMessagesDeleted
    // exhausts its retries and reports them as failed.
    const { send } = buildAdminSend(happyWorld(), {
      getMessages: (p) => ({ messages: (p.message_ids as number[]).map((id) => ({ id })) }),
    });
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const done = fc.calls.find((c) => c.method === 'waitForAdminDone')!;
    expect(done.args[4] as number).toBeGreaterThan(0);
  });

  it('reports a failure when deletion cannot be verified at all (getMessages throws)', async () => {
    // The verify call itself fails → ensureMessagesDeleted must report the batch
    // as unresolved rather than optimistically assuming it was deleted.
    const { send } = buildAdminSend(happyWorld(), {
      getMessages: new Error('NETWORK_ERROR'),
    });
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const done = fc.calls.find((c) => c.method === 'waitForAdminDone')!;
    expect(done.args[4] as number).toBeGreaterThan(0);
  });

  it('skips messages dated after endTs (out of range on the new side)', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          startTs: START_TS,
          endTs: END_TS,
          startMsgId: 1 * MUL,
          endMsgId: 5 * MUL,
          history: [
            { id: 5 * MUL, date: 1500, sender: 11 }, // in range → delete
            { id: 4 * MUL, date: END_TS + 1000, sender: 99 }, // newer than endTs → skip
          ],
        },
      ],
      users: [{ id: 11 }, { id: 99 }],
    };
    const { send, callsOf } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const deletedUsers = callsOf('deleteChatMessagesBySender').map(
      (c) => (c.params.sender_id as { user_id: number }).user_id,
    );
    expect(deletedUsers).toEqual([11]); // 99 is skipped, not deleted
  });

  it('protects only non-anonymous admins; an anonymous admin posting as a user is deletable', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          admins: [13, 20],
          anonymousAdmins: [20],
          startTs: START_TS,
          endTs: END_TS,
          startMsgId: 1 * MUL,
          endMsgId: 5 * MUL,
          history: [
            { id: 5 * MUL, date: 1500, sender: 13 }, // non-anonymous admin → protected
            { id: 4 * MUL, date: 1500, sender: 20 }, // anonymous admin (as user) → deletable
          ],
        },
      ],
      users: [{ id: 13 }, { id: 20 }],
    };
    const { send, callsOf } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const deletedUsers = callsOf('deleteChatMessagesBySender').map(
      (c) => (c.params.sender_id as { user_id: number }).user_id,
    );
    expect(deletedUsers).toEqual([20]);
  });
});

describe('runAdminFlow — message classification (bug #3 characterization)', () => {
  it('deletes service messages by id but never deletes regular channel posts', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          startTs: START_TS,
          endTs: END_TS,
          startMsgId: 1 * MUL,
          endMsgId: 5 * MUL,
          history: [
            { id: 5 * MUL, date: 1500, sender: 11 }, // regular user → by-id + by-sender
            { id: 4 * MUL, date: 1500, sender: 'chat' }, // channel regular post → kept
            { id: 3 * MUL, date: 1500, sender: 12, service: true }, // user service → by-id only
            { id: 2 * MUL, date: 1500, sender: 'chat', service: true }, // channel service → by-id
          ],
        },
      ],
      users: [{ id: 11 }, { id: 12 }],
    };
    const { send, callsOf } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    // Only the regular user is deleted by sender (service-only user 12 is not).
    const bySender = callsOf('deleteChatMessagesBySender').map(
      (c) => (c.params.sender_id as { user_id: number }).user_id,
    );
    expect(bySender).toEqual([11]);

    // By-id deletion includes the regular user msg + both service msgs, never the
    // regular channel post (4 * MUL).
    const firstBatch = callsOf('deleteMessages')[0].params.message_ids as number[];
    expect([...firstBatch].sort((a, b) => a - b)).toEqual([2 * MUL, 3 * MUL, 5 * MUL]);
    expect(firstBatch).not.toContain(4 * MUL);
  });

  it('retries deletion per-message when a batch leaves messages behind', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          startTs: START_TS,
          endTs: END_TS,
          startMsgId: 1 * MUL,
          endMsgId: 5 * MUL,
          history: [
            { id: 5 * MUL, date: 1500, sender: 11 },
            { id: 4 * MUL, date: 1500, sender: 11 },
          ],
        },
      ],
      users: [{ id: 11 }],
    };
    // First verification still reports both messages present → triggers per-id retry.
    const { send, callsOf } = buildAdminSend(world, {
      getMessages: [{ messages: [{ id: 5 * MUL }, { id: 4 * MUL }] }, { messages: [] }],
    });
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const deletions = callsOf('deleteMessages').map((c) => c.params.message_ids as number[]);
    expect(deletions).toContainEqual([5 * MUL]); // single-id retry
    expect(deletions).toContainEqual([4 * MUL]);
  });
});

// ─── navigation ────────────────────────────────────────────────────────────────

describe('runAdminFlow — navigation', () => {
  const oneChat = (): WorldDef => ({
    meId: ME,
    chatIds: [5000],
    chats: [{ id: 5000, title: 'MyChat', supergroupId: 5000, myStatus: 'creator' }],
  });

  it('returns "back" when the user leaves the chat list', async () => {
    const { send, callsOf } = buildAdminSend(oneChat());
    const fc = makeFakeController({ adminChatSelect: [null] });

    expect(await runAdminFlow(send, fc.ctrl)).toBe('back');
    expect(callsOf('deleteChatMessagesBySender')).toHaveLength(0);
  });

  it('goes back to the chat list when the date range is cancelled', async () => {
    const { send } = buildAdminSend(oneChat());
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat'), null],
      dateRange: [null],
    });

    expect(await runAdminFlow(send, fc.ctrl)).toBe('back');
    expect(fc.calls.filter((c) => c.method === 'waitForAdminChatSelect')).toHaveLength(2);
  });

  it('re-shows the date range when the confirmation is declined', async () => {
    const { send, callsOf } = buildAdminSend(oneChat());
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat'), null],
      dateRange: [RANGE, null],
      adminConfirm: [false],
    });

    await runAdminFlow(send, fc.ctrl);

    expect(fc.calls.filter((c) => c.method === 'waitForDateRange')).toHaveLength(2);
    expect(callsOf('deleteChatMessagesBySender')).toHaveLength(0);
  });

  it('offers the hide-members action when the chat can hide but has not hidden members', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          canHideMembers: true,
          hasHiddenMembers: false,
        },
      ],
    };
    const { send } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat'), null],
      dateRange: [null],
    });

    await runAdminFlow(send, fc.ctrl);

    const dateRangeCall = fc.calls.find((c) => c.method === 'waitForDateRange')!;
    expect(dateRangeCall.args[1]).toBe(5000); // supergroupIdToHide
  });
});
