export function todayDdMmYyyy(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

export function parseDdMmYyyy(str: string): Date | null {
  const parts = str.trim().split('.');
  if (parts.length !== 3) return null;
  const [dd, mm, yyyy] = parts.map(Number);
  if (!dd || !mm || !yyyy || mm < 1 || mm > 12 || dd < 1 || dd > 31 || yyyy < 1900) return null;
  const d = new Date(yyyy, mm - 1, dd);
  if (d.getDate() !== dd || d.getMonth() !== mm - 1 || d.getFullYear() !== yyyy) return null;
  return d;
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
}

// ─── Russian pluralisation ──────────────────────────────────────────────────────
// Counting form (after a bare numeral): 1 → nominative singular, 2–4 → genitive
// singular, 5+ → genitive plural. Correct for "Выбрано N …" / "Будет удалено N …".

export function pluralMessages(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'сообщение';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'сообщения';
  return 'сообщений';
}

export function pluralChats(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'чат';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'чата';
  return 'чатов';
}

/**
 * Genitive form for use after a preposition that governs the genitive (e.g. "из"):
 * "из 1 чата", "из 2 чатов", "из 5 чатов", "из 21 чата". Differs from the counting
 * form because an oblique numeral pulls the noun into the genitive plural for 2–4.
 */
export function pluralChatsGenitive(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'чата';
  return 'чатов';
}

// ─── Telegram integration helpers ────────────────────────────────────────────────

/** Open a tg:// deep link like a real anchor click — launches the app, keeps this page. */
export function openTelegram(url: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.rel = 'noreferrer';
  a.click();
}

/**
 * Identify this web client to Telegram the way a browser would (as shown in the user's
 * active-sessions list), e.g. "Chrome 120" / "Linux" — instead of a generic "Web".
 * mtcute sends whatever device_model we pass verbatim, so we derive it from the UA here.
 */
export function browserProfile(): { deviceModel: string; systemVersion: string } {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const ver = (re: RegExp): string => re.exec(ua)?.[1] ?? '';

  let deviceModel = 'Web';
  if (/Edg\//.test(ua)) deviceModel = `Edge ${ver(/Edg\/(\d+)/)}`;
  else if (/OPR\//.test(ua)) deviceModel = `Opera ${ver(/OPR\/(\d+)/)}`;
  else if (/Firefox\//.test(ua)) deviceModel = `Firefox ${ver(/Firefox\/(\d+)/)}`;
  else if (/Chrome\//.test(ua)) deviceModel = `Chrome ${ver(/Chrome\/(\d+)/)}`;
  else if (/Safari\//.test(ua)) deviceModel = `Safari ${ver(/Version\/(\d+)/)}`;

  let systemVersion = (typeof navigator !== 'undefined' && navigator.platform) || 'Unknown';
  if (/Windows NT/.test(ua)) systemVersion = 'Windows';
  else if (/Android/.test(ua)) systemVersion = `Android ${ver(/Android[ /](\d+)/)}`.trim();
  else if (/iPhone|iPad|iPod/.test(ua)) systemVersion = 'iOS';
  else if (/Mac OS X/.test(ua)) systemVersion = 'macOS';
  else if (/Linux/.test(ua)) systemVersion = 'Linux';

  return { deviceModel: deviceModel.trim(), systemVersion };
}
