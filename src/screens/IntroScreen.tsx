import { IconShield } from '../components/Icons';

interface Props {
  onProceed: () => void;
  onCancel: () => void;
}

export function IntroScreen({ onProceed, onCancel }: Props) {
  return (
    <div class="intro-content">
      <h2 class="intro-title">
        <IconShield size={28} color="var(--tg-primary)" />
        Перед началом
      </h2>

      <p class="intro-text">
        <strong>Важно:</strong> единственным легитимным источником ссылки на эту страницу
        является бот{' '}
        <a href="https://t.me/FindMessagesBot" target="_blank" rel="noreferrer">
          @FindMessagesBot
        </a>
        . Рекомендуем в режиме инкогнито загуглить «
        <a
          href="https://www.google.com/search?q=%D0%91%D0%B5%D0%BB%D0%B0%D1%80%D1%83%D1%81%D1%8C+%D0%B1%D0%BE%D1%82+%D0%BF%D0%BE%D0%B8%D1%81%D0%BA+%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9"
          target="_blank"
          rel="noreferrer"
        >
          Беларусь бот поиск сообщений
        </a>
        », среди результатов найти упоминание бота в независимых СМИ, перейти в него и взять
        ссылку на эту страницу из описания бота. Если вы нашли ссылку на эту страницу в
        каком-то посте/репосте в каком-то чате или получили от незнакомого источника —{' '}
        <strong>немедленно закройте страницу</strong> и{' '}
        <a href="https://t.me/GrodnograbSOS" target="_blank" rel="noreferrer">
          сообщите нам
        </a>
        .
      </p>

      <p class="intro-text">
        Этот инструмент — неофициальный <strong>веб-клиент Telegram</strong>, цель которого
        — помочь удалить сообщения из чатов, которые нашел{' '}
        <a href="https://t.me/FindMessagesBot" target="_blank" rel="noreferrer">
          @FindMessagesBot
        </a>
        . Для его работы потребуется вход в ваш аккаунт Telegram.
      </p>

      <p class="intro-text">Что произойдёт:</p>
      <ol>
        <li>
          Вы пройдёте стандартную авторизацию Telegram — введёте номер телефона, код
          подтверждения из приложения и, если настроен, двухфакторный пароль.
        </li>
        <li>
          После входа приложение получит от бота список сообщений, которые нужно удалить.
        </li>
        <li>Вы подтвердите удаление, и сообщения будут удалены от вашего имени.</li>
        <li>
          По завершении бот выйдет из аккаунта (проверьте в разделе Конфиденциальность -
          Активные сеансы), а все данные сессии будут удалены из браузера.
        </li>
      </ol>

      <p class="intro-text">
        Всё происходит <strong>локально, прямо в вашем браузере</strong>. Никакие данные не
        отправляются на сторонние серверы.
      </p>

      <p class="intro-source">
        Исходный код страницы доступен в{' '}
        <a href="https://github.com/grodno-grab/bot-web" target="_blank" rel="noreferrer">
          репозитории на GitHub
        </a>
        .
      </p>

      <div class="intro-actions">
        <button class="btn-outline-danger" onClick={onCancel}>Отмена</button>
        <button onClick={onProceed}>Продолжить</button>
      </div>
    </div>
  );
}
