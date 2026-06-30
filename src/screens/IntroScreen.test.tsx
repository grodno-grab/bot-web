import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { IntroScreen } from './IntroScreen';

describe('IntroScreen', () => {
  it('wires proceed and cancel', () => {
    const onProceed = vi.fn();
    const onCancel = vi.fn();
    render(<IntroScreen onProceed={onProceed} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Продолжить' }));
    fireEvent.click(screen.getByRole('button', { name: 'Отмена' }));
    expect(onProceed).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('links to the legitimate bot source', () => {
    render(<IntroScreen onProceed={() => {}} onCancel={() => {}} />);
    const links = screen.getAllByRole('link', { name: /FindMessagesBot/ });
    expect(links[0]).toHaveAttribute('href', 'https://t.me/FindMessagesBot');
  });
});
