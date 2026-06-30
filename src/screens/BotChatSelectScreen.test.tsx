import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { BotChatSelectScreen } from './BotChatSelectScreen';
import type { BotChatItem } from '../lib/types';

const chats: BotChatItem[] = [
  { chatId: 1, displayName: 'Alpha', messageCount: 1 },
  { chatId: 2, displayName: 'Beta', messageCount: 2 },
  { chatId: 3, displayName: 'Gamma', messageCount: 5 },
];

const proceedBtn = () => screen.getByRole('button', { name: 'Приступить к удалению' });
const chatButtons = (c: HTMLElement) => Array.from(c.querySelectorAll('.chat-list-item')) as HTMLElement[];

describe('BotChatSelectScreen', () => {
  it('selects every chat by default and totals the messages', () => {
    render(<BotChatSelectScreen chats={chats} onProceed={() => {}} onBack={() => {}} />);
    // 1 + 2 + 5 = 8 messages across 3 chats
    expect(screen.getByText('Выбрано 3 чата, 8 сообщений')).toBeInTheDocument();
    expect(proceedBtn()).toBeEnabled();
  });

  it('pluralises the per-chat message counts correctly', () => {
    render(<BotChatSelectScreen chats={chats} onProceed={() => {}} onBack={() => {}} />);
    expect(screen.getByText('1 сообщение')).toBeInTheDocument();
    expect(screen.getByText('2 сообщения')).toBeInTheDocument();
    expect(screen.getByText('5 сообщений')).toBeInTheDocument();
  });

  it('toggles a chat off and passes the remaining ids to onProceed', () => {
    const onProceed = vi.fn();
    const { container } = render(
      <BotChatSelectScreen chats={chats} onProceed={onProceed} onBack={() => {}} />,
    );
    fireEvent.click(chatButtons(container)[1]); // deselect Beta
    fireEvent.click(proceedBtn());
    expect(onProceed).toHaveBeenCalledWith(new Set([1, 3]));
  });

  it('disables the proceed button when nothing is selected', () => {
    const { container } = render(
      <BotChatSelectScreen chats={chats} onProceed={() => {}} onBack={() => {}} />,
    );
    chatButtons(container).forEach((b) => fireEvent.click(b));
    expect(proceedBtn()).toBeDisabled();
  });

  it('shows an empty-state message and only a Back button when there are no chats', () => {
    render(<BotChatSelectScreen chats={[]} onProceed={() => {}} onBack={() => {}} />);
    expect(screen.getByText('Сообщений для удаления не найдено.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Приступить к удалению' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Назад' })).toBeInTheDocument();
  });

  it('invokes onBack', () => {
    const onBack = vi.fn();
    render(<BotChatSelectScreen chats={chats} onProceed={() => {}} onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: 'Назад' }));
    expect(onBack).toHaveBeenCalled();
  });
});
