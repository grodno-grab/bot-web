/*
 * Browser-side fake of the `tdweb` global, injected via addInitScript in e2e (see
 * fixtures/setup.ts) so it wins over the real adapter. Behaviour is driven by plain
 * data in window.__TD_CONFIG__. Mirrors test/helpers/adminWorld + tdSimulator so the
 * app can run end-to-end without a real Telegram connection.
 */
(function () {
  var cfg = window.__TD_CONFIG__ || {};
  var BOT = cfg.botChatId;

  function P(v) { return Promise.resolve(v); }
  function Rej(m) { return Promise.reject(new Error(m)); }
  function auth(type, extra) {
    return { '@type': 'updateAuthorizationState', authorization_state: Object.assign({ '@type': type }, extra || {}) };
  }

  var admin = cfg.admin || null;
  var bot = cfg.bot || null;

  function aChat(idLike) {
    if (!admin) return null;
    var n = Number(String(idLike).replace('-100', ''));
    return admin.chats.filter(function (c) { return c.id === n; })[0] || null;
  }
  function aChatBySg(sg) {
    if (!admin) return null;
    return admin.chats.filter(function (c) { return c.supergroupId === Number(sg); })[0] || null;
  }
  function aUser(id) {
    return ((admin && admin.users) || []).filter(function (u) { return u.id === id; })[0] || null;
  }
  function toMessage(m) {
    return {
      id: m.id,
      date: m.date,
      sender_id: m.sender === 'chat'
        ? { '@type': 'messageSenderChat', chat_id: -100 }
        : { '@type': 'messageSenderUser', user_id: m.sender },
      content: { '@type': m.service ? 'messageChatAddMembers' : 'messageText' },
    };
  }
  function memberStatus(chat) {
    if (chat.myStatus === 'creator') return { '@type': 'chatMemberStatusCreator' };
    if (chat.myStatus === 'admin') {
      return { '@type': 'chatMemberStatusAdministrator', rights: { can_delete_messages: chat.canDelete === true } };
    }
    return { '@type': 'chatMemberStatusMember' };
  }
  function botResolve(idLike) {
    if (!bot || !bot.chatsById) return null;
    return bot.chatsById[String(idLike).replace('-100', '')] || null;
  }

  function handle(type, p) {
    switch (type) {
      case 'getMe': return P({ id: cfg.meId });

      case 'searchPublicChat': return P({ id: BOT });
      case 'openChat':
      case 'setMessageSenderBlockList':
      case 'closeChat':
      case 'sendMessage':
      case 'deleteMessages':
      case 'deleteChatMessagesBySender':
      case 'resetChatLocalDeletedMessages':
      case 'toggleSupergroupHasHiddenMembers':
      case 'logOut':
        return P({});

      case 'getMessages':
        return admin ? P({ messages: [] }) : P({ messages: (p.message_ids || []).map(function (id) { return { id: id }; }) });

      case 'getChat': {
        if (admin) {
          var c = aChat(p.chat_id);
          if (!c) return Rej('no chat');
          return P({ id: c.id, title: c.title, type: { '@type': c.typeName || 'chatTypeSupergroup', supergroup_id: c.supergroupId, is_channel: !!c.isChannel } });
        }
        var bc = botResolve(p.chat_id);
        return bc ? P(bc) : Rej('no chat');
      }

      // ── admin discovery ──
      case 'loadChats': return Rej('no more chats');
      case 'getChats':
        return P({ chat_ids: p.chat_list && p.chat_list['@type'] === 'chatListArchive' ? (admin.archiveIds || []) : admin.chatIds });
      case 'getChatMember': {
        var chat = aChat(p.chat_id);
        var memberId = p.member_id.user_id;
        if (memberId === cfg.meId) return P({ status: memberStatus(chat) });
        var anon = chat && chat.anonymousAdmins && chat.anonymousAdmins.indexOf(memberId) >= 0;
        return P({ status: { '@type': 'chatMemberStatusAdministrator', is_anonymous: !!anon } });
      }
      case 'getSupergroup': {
        var sg = aChatBySg(p.supergroup_id);
        return P({ usernames: { active_usernames: sg && sg.username ? [sg.username] : [] }, username: sg && sg.username, has_linked_chat: !!(sg && sg.hasLinkedChat) });
      }
      case 'getSupergroupFullInfo': {
        var sgf = aChatBySg(p.supergroup_id);
        return P({ can_hide_members: !!(sgf && sgf.canHideMembers), has_hidden_members: !!(sgf && sgf.hasHiddenMembers) });
      }
      case 'getChatMessageByDate': {
        var dc = aChat(p.chat_id);
        if (p.date === dc.endTs) { if (dc.throwEndDate) return Rej('no end msg'); return P({ id: dc.endMsgId || 0 }); }
        return P({ id: dc.startMsgId || 0 });
      }
      case 'getChatHistory': {
        var hc = aChat(p.chat_id);
        var msgs = (hc.history || [])
          .filter(function (m) { return m.id < p.from_message_id; })
          .sort(function (a, b) { return b.id - a.id; })
          .slice(0, p.limit)
          .map(toMessage);
        return P({ messages: msgs });
      }
      case 'getChatAdministrators': {
        var ac = aChat(p.chat_id);
        return P({ administrators: ((ac && ac.admins) || []).map(function (id) { return { user_id: id }; }) });
      }
      case 'getUser': {
        var u = aUser(p.user_id);
        if (u && u.getUserThrows) return Rej('getUser failed');
        return P({ type: { '@type': u && u.bot ? 'userTypeBot' : 'userTypeRegular' } });
      }
    }
    return P({});
  }

  function TdSimClient() {
    var self = this;
    this.onUpdate = null;
    setTimeout(function () { self._emit(auth('authorizationStateWaitTdlibParameters')); }, 0);
  }
  TdSimClient.prototype._emit = function (u) { if (this.onUpdate) this.onUpdate(u); };
  TdSimClient.prototype._defer = function (u) {
    var self = this;
    setTimeout(function () { self._emit(u); }, 0);
  };
  TdSimClient.prototype.send = function (req) {
    var type = req['@type'];
    switch (type) {
      case 'setTdlibParameters': this._defer(auth('authorizationStateWaitEncryptionKey')); return P({});
      case 'setDatabaseEncryptionKey': this._defer(auth('authorizationStateWaitPhoneNumber')); return P({});
      case 'setAuthenticationPhoneNumber': this._defer(auth('authorizationStateWaitCode')); return P({});
      case 'checkAuthenticationCode':
        this._defer(cfg.requirePassword
          ? auth('authorizationStateWaitPassword', { password_hint: cfg.passwordHint || '' })
          : auth('authorizationStateReady'));
        return P({});
      case 'checkAuthenticationPassword': this._defer(auth('authorizationStateReady')); return P({});
    }

    var result = handle(type, req);
    if (type === 'sendBotStartMessage' && bot && bot.botMessage) {
      this._defer({ '@type': 'updateNewMessage', message: bot.botMessage });
    }
    return result;
  };

  window.tdweb = { default: TdSimClient };
})();
