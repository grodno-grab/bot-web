import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { BotDoneScreen } from './BotDoneScreen';

describe('BotDoneScreen', () => {
  it('renders text and wires back/finish', () => {
    const onBack = vi.fn();
    const onFinish = vi.fn();
    render(<BotDoneScreen text="Все сообщения удалены." onBack={onBack} onFinish={onFinish} />);
    expect(screen.getByText('Все сообщения удалены.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Вернуться к выбору' }));
    fireEvent.click(screen.getByRole('button', { name: 'Завершить' }));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('defaults the title to "Удаление завершено" and honours a custom one', () => {
    const { rerender } = render(
      <BotDoneScreen text="x" onBack={() => {}} onFinish={() => {}} />,
    );
    expect(screen.getByText('Удаление завершено')).toBeInTheDocument();

    rerender(<BotDoneScreen text="x" title="Всё чисто" onBack={() => {}} onFinish={() => {}} />);
    expect(screen.getByText('Всё чисто')).toBeInTheDocument();
  });
});
