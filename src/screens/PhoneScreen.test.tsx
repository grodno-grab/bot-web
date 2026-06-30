import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { PhoneScreen } from './PhoneScreen';

const input = () => screen.getByRole('textbox') as HTMLInputElement;
const submit = () => fireEvent.click(screen.getByRole('button', { name: 'Продолжить' }));

describe('PhoneScreen', () => {
  it('submits the trimmed phone number', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<PhoneScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '  +49123456  ' } });
    submit();
    expect(onSubmit).toHaveBeenCalledWith('+49123456');
  });

  it('submits on Enter', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<PhoneScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '+49123' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('+49123');
  });

  it('shows an error and re-enables the button when submission fails', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Неверный номер'));
    render(<PhoneScreen onSubmit={onSubmit} />);
    fireEvent.input(input(), { target: { value: '+1' } });
    submit();
    expect(await screen.findByText('Неверный номер')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Продолжить' })).toBeEnabled();
  });
});
