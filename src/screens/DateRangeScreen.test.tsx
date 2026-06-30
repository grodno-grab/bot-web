import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { DateRangeScreen } from './DateRangeScreen';

const END_OF_DAY = 86399;

const inputs = () => screen.getAllByRole('textbox') as HTMLInputElement[];
const setFrom = (v: string) => fireEvent.input(inputs()[0], { target: { value: v } });
const setTo = (v: string) => fireEvent.input(inputs()[1], { target: { value: v } });
const submit = () => fireEvent.click(screen.getByRole('button', { name: 'Продолжить' }));

describe('DateRangeScreen', () => {
  it('renders the chat title', () => {
    render(<DateRangeScreen chatTitle="My Group" onSubmit={() => {}} />);
    expect(screen.getByText('My Group')).toBeInTheDocument();
  });

  it('auto-formats raw digit input into dd.mm.yyyy (reflected in the submitted strings)', () => {
    const onSubmit = vi.fn();
    render(<DateRangeScreen chatTitle="" onSubmit={onSubmit} />);
    setFrom('01012020');
    setTo('01062020');
    submit();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ startDateStr: '01.01.2020', endDateStr: '01.06.2020' }),
    );
  });

  it('submits a correct DateRange payload (endTs covers the full day)', () => {
    const onSubmit = vi.fn();
    render(<DateRangeScreen chatTitle="" onSubmit={onSubmit} />);
    setFrom('01.01.2020');
    setTo('01.06.2020');
    submit();

    const expectedStart = Math.floor(new Date(2020, 0, 1).getTime() / 1000);
    const expectedEnd = Math.floor(new Date(2020, 5, 1).getTime() / 1000) + END_OF_DAY;
    expect(onSubmit).toHaveBeenCalledWith({
      startTs: expectedStart,
      endTs: expectedEnd,
      startDateStr: '01.01.2020',
      endDateStr: '01.06.2020',
    });
  });

  it('shows a format error and does not submit on an invalid date', () => {
    const onSubmit = vi.fn();
    render(<DateRangeScreen chatTitle="" onSubmit={onSubmit} />);
    setFrom('99');
    setTo('01.06.2020');
    submit();
    expect(screen.getByText('Укажите даты в формате дд.мм.гггг.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('rejects a start date after the end date', () => {
    const onSubmit = vi.fn();
    render(<DateRangeScreen chatTitle="" onSubmit={onSubmit} />);
    setFrom('02.01.2020');
    setTo('01.01.2020');
    submit();
    expect(screen.getByText('Начальная дата не может быть позже конечной.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('drops the warning only after onHideMembers resolves successfully', async () => {
    const onHideMembers = vi.fn().mockResolvedValue(undefined);
    render(<DateRangeScreen chatTitle="" onHideMembers={onHideMembers} onSubmit={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: 'Скрыть' }));
    expect(onHideMembers).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Скрыть' })).not.toBeInTheDocument(),
    );
  });

  it('keeps the warning (and re-enables the button) if hiding members fails', async () => {
    const onHideMembers = vi.fn().mockRejectedValue(new Error('not enough rights'));
    render(<DateRangeScreen chatTitle="" onHideMembers={onHideMembers} onSubmit={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: 'Скрыть' }));
    expect(onHideMembers).toHaveBeenCalledTimes(1);
    // The warning must remain so the admin knows members are still visible.
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Скрыть' })).toBeEnabled(),
    );
    expect(screen.getByText('Список участников чата не скрыт')).toBeInTheDocument();
  });

  it('does not show the hide-members warning without the callback', () => {
    render(<DateRangeScreen chatTitle="" onSubmit={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Скрыть' })).not.toBeInTheDocument();
  });
});
