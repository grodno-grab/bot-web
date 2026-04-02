interface IconProps {
  size?: number;
  color?: string;
  class?: string;
}

export function IconBack({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15.5 19l-7-7 7-7" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function IconPhone({ size = 80, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill={color} fill-opacity="0.12"/>
      <rect x="26" y="18" width="28" height="44" rx="5" stroke={color} stroke-width="2.5" fill="none"/>
      <rect x="34" y="56" width="12" height="3" rx="1.5" fill={color}/>
      <rect x="32" y="22" width="16" height="2" rx="1" fill={color} fill-opacity="0.5"/>
    </svg>
  );
}

export function IconMessage({ size = 80, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill={color} fill-opacity="0.12"/>
      <path d="M20 28a4 4 0 014-4h32a4 4 0 014 4v22a4 4 0 01-4 4H28l-8 6V28z" stroke={color} stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <circle cx="32" cy="39" r="2" fill={color}/>
      <circle cx="40" cy="39" r="2" fill={color}/>
      <circle cx="48" cy="39" r="2" fill={color}/>
    </svg>
  );
}

export function IconLock({ size = 80, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill={color} fill-opacity="0.12"/>
      <rect x="24" y="38" width="32" height="22" rx="4" stroke={color} stroke-width="2.5" fill="none"/>
      <path d="M30 38v-8a10 10 0 0120 0v8" stroke={color} stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <circle cx="40" cy="49" r="3" fill={color}/>
      <line x1="40" y1="52" x2="40" y2="57" stroke={color} stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  );
}

export function IconShield({ size = 80, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill={color} fill-opacity="0.12"/>
      <path d="M40 20l16 6v12c0 9-6.5 16.5-16 19-9.5-2.5-16-10-16-19V26l16-6z" stroke={color} stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <path d="M33 40l4 4 10-9" stroke={color} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function IconWarning({ size = 80, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill={color} fill-opacity="0.12"/>
      <path d="M40 24L62 58H18L40 24z" stroke={color} stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <line x1="40" y1="37" x2="40" y2="47" stroke={color} stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="40" cy="52" r="1.5" fill={color}/>
    </svg>
  );
}

export function IconCheck({ size = 80, color = '#4caf50' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill={color} fill-opacity="0.15"/>
      <circle cx="40" cy="40" r="20" stroke={color} stroke-width="2.5" fill="none"/>
      <path d="M30 40l7 7 13-14" stroke={color} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function IconCalendar({ size = 80, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill={color} fill-opacity="0.12"/>
      <rect x="22" y="26" width="36" height="30" rx="4" stroke={color} stroke-width="2.5" fill="none"/>
      <line x1="22" y1="34" x2="58" y2="34" stroke={color} stroke-width="2" stroke-opacity="0.6"/>
      <line x1="32" y1="22" x2="32" y2="30" stroke={color} stroke-width="2.5" stroke-linecap="round"/>
      <line x1="48" y1="22" x2="48" y2="30" stroke={color} stroke-width="2.5" stroke-linecap="round"/>
      <rect x="28" y="40" width="6" height="5" rx="1" fill={color} fill-opacity="0.7"/>
      <rect x="37" y="40" width="6" height="5" rx="1" fill={color} fill-opacity="0.7"/>
      <rect x="46" y="40" width="6" height="5" rx="1" fill={color} fill-opacity="0.7"/>
    </svg>
  );
}

export function IconUser({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} stroke-width="1.8" fill="none"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} stroke-width="1.8" stroke-linecap="round" fill="none"/>
    </svg>
  );
}

export function IconAdmin({ size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="8" r="3.5" stroke={color} stroke-width="1.8" fill="none"/>
      <path d="M3 20c0-3.5 3.1-6 7-6" stroke={color} stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M18 13l1.5 3 3 .4-2.2 2.1.5 3-2.8-1.5-2.8 1.5.5-3L13.5 16.4l3-.4L18 13z" fill={color}/>
    </svg>
  );
}

export function IconTrash({ size = 80, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill={color} fill-opacity="0.12"/>
      <path d="M27 31h26M37 27h6M35 56h10a4 4 0 004-4l2-21H29l2 21a4 4 0 004 4z" stroke={color} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <line x1="36" y1="39" x2="36" y2="50" stroke={color} stroke-width="2" stroke-linecap="round"/>
      <line x1="44" y1="39" x2="44" y2="50" stroke={color} stroke-width="2" stroke-linecap="round"/>
    </svg>
  );
}

export function IconEye({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} stroke-width="1.8" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke={color} stroke-width="1.8" fill="none"/>
    </svg>
  );
}

export function IconEyeOff({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17.9 17.9A10.9 10.9 0 0112 20C5 20 1 12 1 12a18.5 18.5 0 015.1-5.9M9.9 4.3A10 10 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.1 3.2M1 1l22 22" stroke={color} stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  );
}
