import { IconCheck } from '../components/Icons';

interface Props {
  text: string;
  onBack: () => void;
  onFinish: () => void;
}

export function BotDoneScreen({ text, onBack, onFinish }: Props) {
  return (
    <div class="screen-centered">
      <div class="screen-icon">
        <IconCheck size={80} color="var(--tg-success)" />
      </div>
      <h2 class="screen-title">Удаление завершено</h2>
      <p class="screen-hint">{text}</p>
      <button onClick={onBack}>Вернуться к выбору</button>
      <button class="btn-outline-danger btn-gap" onClick={onFinish}>Завершить</button>
    </div>
  );
}
