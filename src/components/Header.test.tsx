import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Header } from './Header';

describe('Header', () => {
  it('renders a title without a back button by default', () => {
    render(<Header title="Заголовок" />);
    expect(screen.getByText('Заголовок')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Назад' })).not.toBeInTheDocument();
  });

  it('shows a back button that invokes onBack', () => {
    const onBack = vi.fn();
    render(<Header title="Заголовок" onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: 'Назад' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
