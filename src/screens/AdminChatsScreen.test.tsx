import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { AdminChatsScreen } from './AdminChatsScreen';
import type { AdminChatGroup, TdChat } from '../lib/telegram';

const chat = (id: number, title: string): TdChat => ({
  id,
  title,
  type: { '@type': 'chatTypeSupergroup', supergroup_id: id },
});

const groups: AdminChatGroup[] = [
  { label: 'Публичные чаты', chats: [chat(1, 'Alpha')] },
  { label: 'Приватные чаты', chats: [chat(2, 'Beta')] },
];

describe('AdminChatsScreen', () => {
  it('renders group labels and chats', () => {
    render(<AdminChatsScreen groups={groups} onSelect={() => {}} />);
    expect(screen.getByText('Публичные чаты')).toBeInTheDocument();
    expect(screen.getByText('Приватные чаты')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('selects the clicked chat', () => {
    const onSelect = vi.fn();
    render(<AdminChatsScreen groups={groups} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Beta').closest('button')!);
    expect(onSelect).toHaveBeenCalledWith(groups[1].chats[0]);
  });
});
