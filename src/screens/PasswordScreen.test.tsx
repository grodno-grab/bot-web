import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { PasswordScreen } from './PasswordScreen';

const input = () => document.querySelector('input') as HTMLInputElement;
const submit = () => fireEvent.click(screen.getByRole('button', { name: 'Продолжить' }));

describe('PasswordScreen', () => {
  it('shows a generic hint when none is provided', () => {
    render(<PasswordScreen hint="" onSubmit={() => Promise.resolve()} />);
    expect(screen.getByText('Введите облачный пароль двухэтапной проверки.')).toBeInTheDocument();
  });

  it('shows the server-provided hint', () => {
    render(<PasswordScreen hint="my-hint" onSubmit={() => Promise.resolve()} />);
    expect(screen.getByText('Введите облачный пароль. Подсказка: my-hint')).toBeInTheDocument();
  });

  it('submits the password as typed (no trimming)', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<PasswordScreen hint="" onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '  spaced pass  ' } });
    submit();
    expect(onSubmit).toHaveBeenCalledWith('  spaced pass  ');
  });

  it('toggles password visibility', () => {
    render(<PasswordScreen hint="" onSubmit={() => Promise.resolve()} />);
    expect(input().getAttribute('type')).toBe('password');
    fireEvent.click(screen.getByRole('button', { name: 'Показать пароль' }));
    expect(input().getAttribute('type')).toBe('text');
    fireEvent.click(screen.getByRole('button', { name: 'Скрыть пароль' }));
    expect(input().getAttribute('type')).toBe('password');
  });

  it('shows an error when submission fails', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Неверный пароль'));
    render(<PasswordScreen hint="" onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: 'x' } });
    submit();
    expect(await screen.findByText('Неверный пароль')).toBeInTheDocument();
  });

  it('submits on Enter', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<PasswordScreen hint="" onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: 'pw' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('pw');
  });

  it('hides the icon on focus and restores it on blur', () => {
    const { container } = render(<PasswordScreen hint="" onSubmit={() => Promise.resolve()} />);
    const icon = container.querySelector('.auth-screen-icon')!;
    fireEvent.focus(input());
    expect(icon.className).toContain('auth-screen-icon--hidden');
    fireEvent.blur(input());
    expect(icon.className).not.toContain('auth-screen-icon--hidden');
  });
});
