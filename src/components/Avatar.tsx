const COLORS = ['#e17076','#faa774','#a695e7','#7bc862','#6ec9cb','#65aadd','#ee7aae'];

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

interface Props {
  name: string;
  size?: number;
  thumbnail?: string;
}

export function Avatar({ name, size = 48, thumbnail }: Props) {
  if (thumbnail) {
    return (
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={`data:image/jpeg;base64,${thumbnail}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          alt=""
        />
      </div>
    );
  }
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: getColor(name),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${Math.round(size * 0.38)}px`,
      fontWeight: '500',
      color: '#fff',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {getInitials(name)}
    </div>
  );
}
