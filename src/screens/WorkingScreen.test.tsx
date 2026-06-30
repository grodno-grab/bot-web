import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { WorkingScreen } from './WorkingScreen';

describe('WorkingScreen', () => {
  it('shows a spinner while working', () => {
    const { container } = render(<WorkingScreen text="Загрузка…" spinner={true} />);
    expect(container.querySelector('.spinner')).not.toBeNull();
    expect(screen.getByText('Загрузка…')).toBeInTheDocument();
  });

  it('shows a success icon (no spinner) when done', () => {
    const { container } = render(<WorkingScreen text="Готово" spinner={false} />);
    expect(container.querySelector('.spinner')).toBeNull();
    expect(container.querySelector('.screen-icon svg')).not.toBeNull();
  });
});
