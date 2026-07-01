import { useState, useRef, useEffect } from 'preact/hooks';
import { IconLock, IconEye, IconEyeOff } from '../components/Icons';

interface Props {
  hint: string;
  onSubmit: (password: string) => Promise<void>;
}

export function PasswordScreen({ hint, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = async () => {
    const password = inputRef.current?.value ?? '';
    setError('');
    setLoading(true);
    try {
      await onSubmit(password);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  const hintText = hint
    ? `Введите облачный пароль. Подсказка: ${hint}`
    : 'Введите облачный пароль двухэтапной проверки.';

  return (
    <div class="auth-screen">
      <div class={`auth-screen-icon${iconVisible ? '' : ' auth-screen-icon--hidden'}`}>
        <IconLock size={96} color="var(--tg-primary)" />
      </div>
      <h1 class="auth-screen-title">Введите пароль</h1>
      <p class="auth-screen-hint">{hintText}</p>
      <div class="auth-screen-form">
        <div class="tg-input-wrap">
          <input
            ref={inputRef}
            type={showPassword ? 'text' : 'password'}
            placeholder=" "
            class="has-toggle"
            autocomplete="off"
            disabled={loading}
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          <label>Пароль</label>
          <button
            class="tg-input-toggle"
            type="button"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        </div>
        <div class="field-error">{error}</div>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Подождите…' : 'Продолжить'}
        </button>
      </div>
    </div>
  );
}
