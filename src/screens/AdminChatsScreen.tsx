import { Avatar } from '../components/Avatar';
import type { TdChat, AdminChatGroup } from '../lib/telegram';

interface Props {
  groups: AdminChatGroup[];
  onSelect: (chat: TdChat | null) => void;
}

export function AdminChatsScreen({ groups, onSelect }: Props) {
  return (
    <div>
      {groups.map(group => (
        <div key={group.label}>
          <div class="chat-list-group-label">{group.label}</div>
          {group.chats.map(chat => (
            <button
              key={chat.id}
              class="chat-list-item"
              onClick={() => onSelect(chat)}
            >
              <Avatar name={chat.title} size={48} thumbnail={chat.photo?.minithumbnail?.data} />
              <span class="chat-list-title">{chat.title}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
