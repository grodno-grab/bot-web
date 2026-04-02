import { IconCheck } from '../components/Icons';

interface Props {
  text: string;
  onNext: () => void;
  onFinish: () => void;
}

export function AdminDoneScreen({ text, onNext, onFinish }: Props) {
  return (
    <div class="screen-centered">
      <div class="screen-icon">
        <IconCheck size={80} color="var(--tg-success)" />
      </div>
      <h2 class="screen-title">Удаление завершено</h2>
      <p class="screen-hint">{text}</p>
      <button onClick={onNext}>Выбрать другой чат</button>
      <button class="btn-outline-danger btn-gap" onClick={onFinish}>Завершить</button>
    </div>
  );
}
