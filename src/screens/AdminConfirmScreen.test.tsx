import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { AdminConfirmScreen } from './AdminConfirmScreen';

describe('AdminConfirmScreen', () => {
  it('renders the text and warning and confirms', () => {
    const onConfirm = vi.fn();
    render(<AdminConfirmScreen text="Чат: «X»." warning="Опасно!" onConfirm={onConfirm} />);
    expect(screen.getByText('Чат: «X».')).toBeInTheDocument();
    expect(screen.getByText('Опасно!')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Начать удаление' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
