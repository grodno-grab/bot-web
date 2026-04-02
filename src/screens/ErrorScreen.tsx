import { IconWarning } from '../components/Icons';

interface Props {
  message: string;
}

export function ErrorScreen({ message }: Props) {
  return (
    <div class="screen-centered">
      <div class="screen-icon">
        <IconWarning size={80} color="var(--tg-error)" />
      </div>
      <h2 class="screen-title">Что-то пошло не так</h2>
      <p class="screen-hint">{message}</p>
      <button class="btn-outline" onClick={() => location.reload()}>Перезагрузить</button>
    </div>
  );
}
