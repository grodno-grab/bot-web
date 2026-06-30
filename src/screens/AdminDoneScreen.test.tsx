import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { AdminDoneScreen } from './AdminDoneScreen';

describe('AdminDoneScreen', () => {
  it('renders text and wires next/finish', () => {
    const onNext = vi.fn();
    const onFinish = vi.fn();
    render(<AdminDoneScreen text="Готово: 5 пользователей." onNext={onNext} onFinish={onFinish} />);
    expect(screen.getByText('Готово: 5 пользователей.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Выбрать другой чат' }));
    fireEvent.click(screen.getByRole('button', { name: 'Завершить' }));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});
