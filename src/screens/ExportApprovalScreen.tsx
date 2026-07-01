import { IconShield } from '../components/Icons';
import { openTelegram } from '../lib/utils';
import { TELEGRAM_SERVICE_URL } from '../lib/config';

interface Props {
  text: string;
  onContinue: () => void;
}

export function ExportApprovalScreen({ text, onContinue }: Props) {
  return (
    <div class="screen-centered">
      <div class="screen-icon">
        <IconShield size={80} color="var(--tg-primary)" />
      </div>
      <h2 class="screen-title">Разрешите экспорт данных</h2>
      <p class="screen-hint" dangerouslySetInnerHTML={{ __html: text }} />
      <button onClick={() => openTelegram(TELEGRAM_SERVICE_URL)}>
        Подтвердить действие в Telegram
      </button>
      <button type="button" class="btn-outline btn-gap" onClick={onContinue}>
        Продолжить
      </button>
    </div>
  );
}
