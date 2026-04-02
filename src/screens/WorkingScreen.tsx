import { IconCheck } from '../components/Icons';

interface Props {
  text: string;
  spinner: boolean;
}

export function WorkingScreen({ text, spinner }: Props) {
  return (
    <div class="screen-centered">
      {spinner
        ? <div class="spinner" />
        : (
          <div class="screen-icon">
            <IconCheck size={80} color="var(--tg-success)" />
          </div>
        )
      }
      <p id="working-status">{text}</p>
    </div>
  );
}
