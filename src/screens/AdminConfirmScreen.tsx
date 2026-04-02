import { IconWarning } from '../components/Icons';

interface Props {
  text: string;
  warning: string;
  onConfirm: () => void;
}

export function AdminConfirmScreen({ text, warning, onConfirm }: Props) {
  return (
    <div class="screen">
      <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:20px">
        <IconWarning size={72} color="var(--tg-danger)" />
      </div>
      <p style="font-size:0.9375rem;color:var(--tg-text-secondary);margin:0 0 14px">{text}</p>
      <div class="warning-box">{warning}</div>
      <button class="btn-danger" onClick={onConfirm}>Начать удаление</button>
    </div>
  );
}
