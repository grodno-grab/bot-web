import { useState, useRef, useEffect } from 'preact/hooks';
import { IconPhone } from '../components/Icons';

interface Props {
  onSubmit: (phone: string) => Promise<void>;
}

export function PhoneScreen({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = async () => {
    const phone = inputRef.current?.value.trim() ?? '';
    setError('');
    setLoading(true);
    try {
      await onSubmit(phone);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <div class="auth-screen">
      <div class="auth-screen-icon">
        <IconPhone size={96} color="var(--tg-primary)" />
      </div>
      <h1 class="auth-screen-title">Вход в Telegram</h1>
      <p class="auth-screen-hint">
        Введите номер телефона в международном формате.
      </p>
      <div class="auth-screen-form">
        <div class="tg-input-wrap">
          <input
            ref={inputRef}
            type="tel"
            placeholder=" "
            autocomplete="off"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          <label>Номер телефона</label>
        </div>
        <div class="field-error">{error}</div>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Подождите…' : 'Продолжить'}
        </button>
      </div>
    </div>
  );
}
