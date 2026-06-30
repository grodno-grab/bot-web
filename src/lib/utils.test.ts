import { describe, it, expect, afterEach, vi } from 'vitest';
import {
  parseDdMmYyyy, todayDdMmYyyy, formatMonthYear,
  pluralMessages, pluralChats, pluralChatsGenitive,
} from './utils';

describe('parseDdMmYyyy', () => {
  it('parses a valid dd.mm.yyyy string into a local Date', () => {
    const d = parseDdMmYyyy('15.03.2024')!;
    expect(d).not.toBeNull();
    expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2024, 2, 15]);
  });

  it('trims surrounding whitespace', () => {
    const d = parseDdMmYyyy('  01.01.2020  ')!;
    expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2020, 0, 1]);
  });

  it.each([
    ['wrong separators', '2024-03-15'],
    ['slash separators', '15/03/2024'],
    ['too few parts', '15.03'],
    ['too many parts', '15.03.2024.1'],
    ['empty string', ''],
    ['non-numeric', 'aa.bb.cccc'],
  ])('rejects %s', (_label, input) => {
    expect(parseDdMmYyyy(input)).toBeNull();
  });

  it.each([
    ['day 0', '00.01.2024'],
    ['day 32', '32.01.2024'],
    ['month 0', '15.00.2024'],
    ['month 13', '15.13.2024'],
    ['year before 1900', '15.03.1899'],
  ])('rejects out-of-range %s', (_label, input) => {
    expect(parseDdMmYyyy(input)).toBeNull();
  });

  it('rejects impossible calendar dates (round-trip check)', () => {
    expect(parseDdMmYyyy('31.02.2024')).toBeNull();
    expect(parseDdMmYyyy('31.04.2024')).toBeNull();
    expect(parseDdMmYyyy('30.02.2024')).toBeNull();
  });

  it('handles leap years', () => {
    expect(parseDdMmYyyy('29.02.2024')).not.toBeNull(); // 2024 is a leap year
    expect(parseDdMmYyyy('29.02.2023')).toBeNull(); // 2023 is not
  });
});

describe('todayDdMmYyyy', () => {
  afterEach(() => vi.useRealTimers());

  it('formats the current date with zero-padding', () => {
    vi.useFakeTimers();
    // Construct a local date at midday so timezone never flips the day.
    vi.setSystemTime(new Date(2024, 2, 5, 12, 0, 0));
    expect(todayDdMmYyyy()).toBe('05.03.2024');
  });

  it('does not pad already two-digit components', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 10, 25, 12, 0, 0));
    expect(todayDdMmYyyy()).toBe('25.11.2023');
  });
});

describe('formatMonthYear', () => {
  it('formats a date as a Russian long month + year', () => {
    const out = formatMonthYear(new Date(2024, 0, 15));
    expect(out).toMatch(/январ/i);
    expect(out).toMatch(/2024/);
  });
});

describe('Russian pluralisation', () => {
  it.each([
    [1, 'сообщение'], [2, 'сообщения'], [4, 'сообщения'], [5, 'сообщений'],
    [11, 'сообщений'], [21, 'сообщение'], [22, 'сообщения'], [25, 'сообщений'],
    [0, 'сообщений'],
  ])('pluralMessages(%i) = %s', (n, expected) => {
    expect(pluralMessages(n)).toBe(expected);
  });

  it.each([
    [1, 'чат'], [2, 'чата'], [4, 'чата'], [5, 'чатов'],
    [11, 'чатов'], [21, 'чат'], [22, 'чата'], [25, 'чатов'],
  ])('pluralChats(%i) = %s (counting form)', (n, expected) => {
    expect(pluralChats(n)).toBe(expected);
  });

  // Genitive form used after "из": for 2–4 the noun goes to the genitive *plural*,
  // unlike the counting form ("из 2 чатов", not "из 2 чата").
  it.each([
    [1, 'чата'], [2, 'чатов'], [4, 'чатов'], [5, 'чатов'],
    [11, 'чатов'], [21, 'чата'], [22, 'чатов'],
  ])('pluralChatsGenitive(%i) = %s', (n, expected) => {
    expect(pluralChatsGenitive(n)).toBe(expected);
  });
});
