import { IconTrash } from '../components/Icons';
import { pluralMessages, pluralChatsGenitive } from '../lib/utils';
import type { ConfirmSummary } from '../lib/types';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  summary?: ConfirmSummary;
}

export function ConfirmScreen({ onConfirm, onCancel, summary }: Props) {
  return (
    <div class="screen-centered">
      <div class="screen-icon">
        <IconTrash size={80} color="var(--tg-danger)" />
      </div>
      <h2 class="screen-title">Приступить к удалению?</h2>
      <p class="screen-hint">
        Сообщения, найденные ботом, будут безвозвратно удалены из чатов.
      </p>
      {summary && (
        <p style="font-size:0.875rem;color:var(--tg-text-secondary);margin:0 0 20px;line-height:1.55;text-align:center">
          Будет удалено{' '}
          <strong style="color:var(--tg-text)">{summary.totalMessages}</strong>{' '}
          {pluralMessages(summary.totalMessages)} из{' '}
          <strong style="color:var(--tg-text)">{summary.chatNames.length}</strong>{' '}
          {pluralChatsGenitive(summary.chatNames.length)}: {summary.chatNames.join(', ')}.
        </p>
      )}
      <div style="display:flex;gap:12px;width:100%">
        <button class="btn-secondary" style="flex:1" onClick={onCancel}>Назад</button>
        <button class="btn-danger" style="flex:1" onClick={onConfirm}>Начать удаление</button>
      </div>
    </div>
  );
}
