import { useState } from 'preact/hooks';
import { Avatar } from '../components/Avatar';
import { pluralMessages, pluralChats } from '../lib/utils';
import type { BotChatItem } from '../lib/types';

interface Props {
  chats: BotChatItem[];
  onProceed: (ids: Set<number>) => void;
  onBack: () => void;
}

export function BotChatSelectScreen({ chats, onProceed, onBack }: Props) {
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set(chats.map(c => c.chatId)),
  );

  const toggle = (chatId: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(chatId)) next.delete(chatId);
      else next.add(chatId);
      return next;
    });
  };

  const totalMessages = chats
    .filter(c => selected.has(c.chatId))
    .reduce((sum, c) => sum + c.messageCount, 0);

  return (
    <div style="display:flex;flex-direction:column;flex:1">
      <div class="tg-list" style={`flex:1${chats.length === 0 ? ';display:flex;align-items:center;justify-content:center' : ''}`}>
        {chats.length === 0 && (
          <p style="font-size:0.9375rem;color:var(--tg-text-secondary);text-align:center;margin:0;padding:24px">
            Сообщений для удаления не найдено.
          </p>
        )}
        {chats.map(chat => (
          <button
            key={chat.chatId}
            class="chat-list-item"
            onClick={() => toggle(chat.chatId)}
          >
            <Avatar name={chat.displayName} size={48} thumbnail={chat.thumbnail} />
            <div style="flex:1;min-width:0">
              <div class="chat-list-title">{chat.displayName}</div>
              <div style="font-size:0.8125rem;color:var(--tg-text-secondary);margin-top:2px">
                {chat.messageCount} {pluralMessages(chat.messageCount)}
              </div>
            </div>
            <div class={`tg-check${selected.has(chat.chatId) ? ' checked' : ''}`}>
              {selected.has(chat.chatId) && (
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M1.5 5l3.5 3.5 7-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
      <div class="screen" style="padding-top:16px;padding-bottom:16px">
        {chats.length === 0 ? null : selected.size > 0 && (
          <p style="font-size:0.8125rem;color:var(--tg-text-secondary);text-align:center;margin:0 0 12px">
            Выбрано {selected.size} {pluralChats(selected.size)}, {totalMessages} {pluralMessages(totalMessages)}
          </p>
        )}
        <div style="display:flex;flex-direction:column;gap:12px">
          {chats.length > 0 && (
            <button
              class="btn-danger"
              disabled={selected.size === 0}
              onClick={() => onProceed(new Set(selected))}
            >
              Приступить к удалению
            </button>
          )}
          <button class="btn-secondary" onClick={onBack}>Назад</button>
        </div>
      </div>
    </div>
  );
}
