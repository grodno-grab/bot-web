import { IconBack } from './Icons';

interface Props {
  title?: string;
  onBack?: () => void;
}

export function Header({ title, onBack }: Props) {
  return (
    <div class="app-header">
      <div class="app-header-inner">
        {onBack && (
          <button class="app-header-back" onClick={onBack} aria-label="Назад">
            <IconBack size={22} />
          </button>
        )}
        {title && (
          <div class={`app-header-title${onBack ? '' : ' no-back'}`}>
            {title}
          </div>
        )}
      </div>
    </div>
  );
}
