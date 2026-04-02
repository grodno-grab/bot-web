import { useState } from 'preact/hooks';
import { parseDdMmYyyy, todayDdMmYyyy } from '../lib/utils';
import { END_OF_DAY_OFFSET } from '../lib/config';
import type { DateRange } from '../lib/telegram';
import { IconCalendar } from '../components/Icons';

interface Props {
  chatTitle: string;
  defaultFrom?: string;
  defaultTo?: string;
  onSubmit: (range: DateRange) => void;
}

function autoFormatDate(raw: string): string {
  let d = raw.replace(/\D/g, '').slice(0, 8);
  if (d.length > 4) d = d.slice(0, 2) + '.' + d.slice(2, 4) + '.' + d.slice(4);
  else if (d.length > 2) d = d.slice(0, 2) + '.' + d.slice(2);
  return d;
}

export function DateRangeScreen({ chatTitle, defaultFrom = '01.01.2020', defaultTo = todayDdMmYyyy(), onSubmit }: Props) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const startDay = parseDdMmYyyy(from);
    const endDay   = parseDdMmYyyy(to);
    if (!startDay || !endDay) {
      setError('Укажите даты в формате дд.мм.гггг.');
      return;
    }
    if (startDay > endDay) {
      setError('Начальная дата не может быть позже конечной.');
      return;
    }
    setError('');
    const startTs = Math.floor(startDay.getTime() / 1000);
    const endTs   = Math.floor(endDay.getTime()   / 1000) + END_OF_DAY_OFFSET;
    onSubmit({ startTs, endTs, startDateStr: from.trim(), endDateStr: to.trim() });
  };

  return (
    <div class="screen">
      <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:20px">
        <IconCalendar size={72} color="var(--tg-primary)" />
      </div>
      {chatTitle && (
        <p style="font-size:0.875rem;color:var(--tg-text-secondary);margin:0 0 12px">
          Чат: <strong style="color:var(--tg-text)">{chatTitle}</strong>
        </p>
      )}
      <div class="info-box">
        Будут удалены <strong>все сообщения в чате</strong> от каждого пользователя,
        написавшего хотя бы одно сообщение в этот период (включая сообщения за другие даты).
      </div>
      <div class="date-range-form">
        <label>
          С
          <input
            class="plain"
            type="text"
            placeholder="дд.мм.гггг"
            inputMode="numeric"
            maxLength={10}
            value={from}
            onInput={e => setFrom(autoFormatDate((e.target as HTMLInputElement).value))}
          />
        </label>
        <label>
          По
          <input
            class="plain"
            type="text"
            placeholder="дд.мм.гггг"
            inputMode="numeric"
            maxLength={10}
            value={to}
            onInput={e => setTo(autoFormatDate((e.target as HTMLInputElement).value))}
          />
        </label>
      </div>
      <div class="field-error">{error}</div>
      <button onClick={handleSubmit}>Продолжить</button>
    </div>
  );
}
