import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { CodeScreen } from './CodeScreen';

const input = () => screen.getByRole('textbox') as HTMLInputElement;

describe('CodeScreen', () => {
  it('auto-submits once five digits are entered', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<CodeScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '12345' } });
    expect(onSubmit).toHaveBeenCalledWith('12345');
  });

  it('strips non-digits and caps at five characters', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<CodeScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: 'a1b2c3d4e5f6' } });
    expect(onSubmit).toHaveBeenCalledWith('12345');
  });

  it('does not submit before five digits', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<CodeScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '123' } });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does nothing on Enter before five digits are entered', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<CodeScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '123' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows an error and re-enables input when the code is rejected', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Неверный код'));
    render(<CodeScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '00000' } });
    expect(await screen.findByText('Неверный код')).toBeInTheDocument();
    expect(input()).toBeEnabled();
  });

  it('submits again on Enter when five digits are already present', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<CodeScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '12345' } }); // auto-submit
    fireEvent.keyDown(input(), { key: 'Enter' }); // manual handleSubmit
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });

  it('shows an error when a manual (Enter) submit is rejected', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Код не принят'));
    render(<CodeScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '54321' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(await screen.findByText('Код не принят')).toBeInTheDocument();
  });

  it('focuses the hidden input and shows the cursor box on click, hiding it on blur', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const { container } = render(<CodeScreen onSubmit={onSubmit} />);
    fireEvent.click(container.querySelector('.code-boxes')!);
    expect(container.querySelector('.code-box--cursor')).toBeTruthy();
    fireEvent.blur(input());
    expect(container.querySelector('.code-box--cursor')).toBeFalsy();
  });
});
