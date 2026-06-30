import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { ModeSelectScreen } from './ModeSelectScreen';

describe('ModeSelectScreen', () => {
  it('selects the user mode', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Удалить мои сообщения').closest('button')!);
    expect(onSelect).toHaveBeenCalledWith('user');
  });

  it('selects the admin mode', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Удалить как администратор').closest('button')!);
    expect(onSelect).toHaveBeenCalledWith('admin');
  });
});
