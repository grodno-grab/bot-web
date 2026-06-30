import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { ConfirmScreen } from './ConfirmScreen';

describe('ConfirmScreen', () => {
  it('renders a grammatically correct singular summary (genitive "из 1 чата")', () => {
    const { container } = render(
      <ConfirmScreen
        summary={{ totalMessages: 1, chatNames: ['Alpha'] }}
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(container.textContent).toMatch(/Будет удалено\s*1\s*сообщение из\s*1\s*чата: Alpha\./);
  });

  it('pluralises larger message and chat counts (genitive "из N чатов")', () => {
    const five = render(
      <ConfirmScreen summary={{ totalMessages: 5, chatNames: ['A', 'B'] }} onConfirm={() => {}} onCancel={() => {}} />,
    );
    expect(five.container.textContent).toMatch(/5\s*сообщений из\s*2\s*чатов: A, B\./);
    five.unmount();

    const three = render(
      <ConfirmScreen summary={{ totalMessages: 3, chatNames: ['A'] }} onConfirm={() => {}} onCancel={() => {}} />,
    );
    expect(three.container.textContent).toMatch(/3\s*сообщения из\s*1\s*чата:/);
  });

  it('renders without a summary', () => {
    render(<ConfirmScreen onConfirm={() => {}} onCancel={() => {}} />);
    expect(screen.getByText('Приступить к удалению?')).toBeInTheDocument();
  });

  it('wires up confirm and cancel', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(<ConfirmScreen onConfirm={onConfirm} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Начать удаление' }));
    fireEvent.click(screen.getByRole('button', { name: 'Назад' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
