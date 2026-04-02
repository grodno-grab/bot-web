import { IconUser, IconAdmin } from '../components/Icons';

interface Props {
  onSelect: (mode: 'user' | 'admin') => void;
}

export function ModeSelectScreen({ onSelect }: Props) {
  return (
    <div class="tg-list">
      <button class="tg-list-item" onClick={() => onSelect('user')}>
        <div class="tg-list-item-icon">
          <IconUser size={22} />
        </div>
        <div class="tg-list-item-body">
          <div class="tg-list-item-title">Удалить мои сообщения</div>
          <div class="tg-list-item-desc">
            Получить от бота список моих сообщений и удалить их из чатов.
          </div>
        </div>
      </button>
      <button class="tg-list-item" onClick={() => onSelect('admin')}>
        <div class="tg-list-item-icon">
          <IconAdmin size={22} />
        </div>
        <div class="tg-list-item-body">
          <div class="tg-list-item-title">Удалить как администратор</div>
          <div class="tg-list-item-desc">
            Выбрать чат, в котором я администратор, и удалить все сообщения участников за указанный период.
          </div>
        </div>
      </button>
    </div>
  );
}
