import { useState, useRef, useEffect } from 'preact/hooks';
import { IconMessage } from '../components/Icons';

interface Props {
  onSubmit: (code: string) => Promise<void>;
}

const CODE_LENGTH = 5;

export function CodeScreen({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleInput = (e: Event) => {
    const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, CODE_LENGTH);
    setValue(raw);
    if (raw.length === CODE_LENGTH) {
      setError('');
      setLoading(true);
      onSubmit(raw).catch(err => {
        setError((err as Error).message);
        setLoading(false);
      });
    }
  };

  const handleSubmit = async () => {
    if (value.length !== CODE_LENGTH) return;
    setError('');
    setLoading(true);
    try {
      await onSubmit(value);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <div class="auth-screen">
      <div class="auth-screen-icon">
        <IconMessage size={96} color="var(--tg-primary)" />
      </div>
      <h1 class="auth-screen-title">Код для входа</h1>
      <p class="auth-screen-hint">
        Введите код, который Telegram отправил вам.
      </p>
      <div class="auth-screen-form">
        <div class="code-boxes" onClick={() => inputRef.current?.focus()}>
          {Array.from({ length: CODE_LENGTH }, (_, i) => (
            <div
              key={i}
              class={[
                'code-box',
                focused && i === value.length ? 'code-box--cursor' : '',
                value[i] ? 'code-box--filled' : '',
              ].join(' ')}
            >
              {value[i] ?? ''}
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autocomplete="one-time-code"
            maxLength={CODE_LENGTH}
            value={value}
            disabled={loading}
            onInput={handleInput}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style="position:absolute;inset:0;opacity:0;cursor:default;width:100%;height:100%"
          />
        </div>
        <div class="field-error" style="text-align:center">{error}</div>
        <button onClick={handleSubmit} disabled={loading || value.length !== CODE_LENGTH}>
          {loading ? 'Подождите…' : 'Подтвердить'}
        </button>
      </div>
    </div>
  );
}
