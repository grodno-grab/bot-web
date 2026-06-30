import { describe, it, expect, vi } from 'vitest';

// Force getChatHistory to return tiny pages so the pagination loop runs across
// several batches (the single-batch happy-path tests never exercise this).
vi.mock('./config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./config')>();
  return { ...actual, MESSAGE_HISTORY_LIMIT: 2 };
});

import { runAdminFlow } from './admin-flow';
import { makeFakeController } from '../../test/helpers/fakeController';
import { buildAdminSend, ID_MULTIPLIER as MUL, type WorldDef } from '../../test/helpers/adminWorld';
import type { DateRange, TdChat } from './types';

const ME = 1000;
const RANGE: DateRange = {
  startTs: 1000,
  endTs: 2000,
  startDateStr: '01.01.2020',
  endDateStr: '01.06.2020',
};

const chatRef = (id: number, title: string): TdChat => ({
  id,
  title,
  type: { '@type': 'chatTypeSupergroup', supergroup_id: id },
});

describe('runAdminFlow — getChatHistory pagination', () => {
  it('paginates across multiple history batches and deletes every in-range sender', async () => {
    const world: WorldDef = {
      meId: ME,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          startTs: RANGE.startTs,
          endTs: RANGE.endTs,
          startMsgId: 1 * MUL,
          endMsgId: 5 * MUL,
          // 5 distinct users across 3 pages of 2 (limit mocked to 2).
          history: [
            { id: 5 * MUL, date: 1500, sender: 11 },
            { id: 4 * MUL, date: 1500, sender: 12 },
            { id: 3 * MUL, date: 1500, sender: 13 },
            { id: 2 * MUL, date: 1500, sender: 14 },
            { id: 1 * MUL, date: 1500, sender: 15 },
          ],
        },
      ],
      users: [{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }],
    };
    const { send, callsOf, countOf } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const deletedUsers = callsOf('deleteChatMessagesBySender')
      .map((c) => (c.params.sender_id as { user_id: number }).user_id)
      .sort((a, b) => a - b);
    expect(deletedUsers).toEqual([11, 12, 13, 14, 15]);
    // Proof the pagination actually ran more than one page per scan pass.
    expect(countOf('getChatHistory')).toBeGreaterThan(3);
    expect(fc.calls.find((c) => c.method === 'waitForAdminDone')!.args[3]).toBe(5);
  });

  it('stops paginating once the page falls entirely before startTs', async () => {
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
          startTs: RANGE.startTs,
          endTs: RANGE.endTs,
          startMsgId: 1 * MUL,
          endMsgId: 5 * MUL,
          history: [
            { id: 5 * MUL, date: 1500, sender: 11 }, // in range
            { id: 4 * MUL, date: 1400, sender: 12 }, // in range
            { id: 3 * MUL, date: 500, sender: 13 }, // before startTs → boundary
            { id: 2 * MUL, date: 400, sender: 14 }, // never reached
            { id: 1 * MUL, date: 300, sender: 15 }, // never reached
          ],
        },
      ],
      users: [{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }],
    };
    const { send, callsOf } = buildAdminSend(world);
    const fc = makeFakeController({
      adminChatSelect: [chatRef(5000, 'MyChat')],
      dateRange: [RANGE],
      adminConfirm: [true],
      adminDone: ['done'],
    });

    await runAdminFlow(send, fc.ctrl);

    const deletedUsers = callsOf('deleteChatMessagesBySender')
      .map((c) => (c.params.sender_id as { user_id: number }).user_id)
      .sort((a, b) => a - b);
    expect(deletedUsers).toEqual([11, 12]); // 13/14/15 are before the range
  });
});
