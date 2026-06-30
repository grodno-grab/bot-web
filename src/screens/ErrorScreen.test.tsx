import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { ErrorScreen } from './ErrorScreen';

describe('ErrorScreen', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders the message', () => {
    render(<ErrorScreen message="Что-то сломалось" />);
    expect(screen.getByText('Что-то сломалось')).toBeInTheDocument();
  });

  it('reloads the page on click', () => {
    const reload = vi.fn();
    const original = window.location;
    // location.reload itself is non-configurable in jsdom; swap the whole object.
    Object.defineProperty(window, 'location', { configurable: true, value: { reload } });
    try {
      render(<ErrorScreen message="x" />);
      fireEvent.click(screen.getByRole('button', { name: 'Перезагрузить' }));
      expect(reload).toHaveBeenCalledTimes(1);
    } finally {
      Object.defineProperty(window, 'location', { configurable: true, value: original });
    }
  });
});
