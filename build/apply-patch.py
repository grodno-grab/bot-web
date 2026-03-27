#!/usr/bin/env python3
"""
Apply the takeout patch to TDLib sources.

Modifications summary:
  td/generate/scheme/td_api.tl  — add takeoutSession, initTakeoutSession,
                                   finishTakeoutSession, getLeftChats
  td/telegram/ChatManager.h     — add declarations
  td/telegram/ChatManager.cpp   — add query classes + method implementations
  td/telegram/Requests.h        — add on_request declarations
  td/telegram/Requests.cpp      — add RequestActor + on_request implementations

Usage:
  python3 apply-patch.py /path/to/td
"""

import sys
import os

TD = sys.argv[1] if len(sys.argv) > 1 else "."

def read(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def insert_after(content, anchor, insertion):
    """Insert `insertion` once, immediately after the first occurrence of `anchor`."""
    idx = content.find(anchor)
    if idx == -1:
        raise ValueError(f"Anchor not found: {anchor!r}")
    pos = idx + len(anchor)
    return content[:pos] + insertion + content[pos:]

def replace_once(content, old, new):
    """Replace `old` with `new` once (first occurrence). Raises if not found."""
    idx = content.find(old)
    if idx == -1:
        raise ValueError(f"String not found: {old!r}")
    return content[:idx] + new + content[idx + len(old):]

# ---------------------------------------------------------------------------
# 1. td/generate/scheme/td_api.tl
# ---------------------------------------------------------------------------

TL_FILE = os.path.join(TD, "td/generate/scheme/td_api.tl")
print(f"Patching {TL_FILE}")
tl = read(TL_FILE)

# 1a. Insert TakeoutSession *type constructor* in the types section (before ---functions---).
# Anchor: last test type just before the section separator.
TL_TYPES_ANCHOR = "testVectorStringObject value:vector<testString> = TestVectorStringObject;\n"
TL_TYPES_INSERT = """\
//@description Contains a takeout session identifier @id Takeout session identifier
takeoutSession id:int64 = TakeoutSession;

"""
tl = insert_after(tl, TL_TYPES_ANCHOR, TL_TYPES_INSERT)

# 1b. Insert three new *functions* after getInactiveSupergroupChats.
TL_ANCHOR = "getInactiveSupergroupChats = Chats;"
TL_INSERT = """
//@description Initializes a takeout session to export the current user's data. Must be finalized with finishTakeoutSession
//@message_users True, if private chats and chats with bots need to be included
//@message_chats True, if basic group chats need to be included
//@message_megagroups True, if supergroup chats need to be included
//@message_channels True, if channels need to be included
initTakeoutSession message_users:Bool message_chats:Bool message_megagroups:Bool message_channels:Bool = TakeoutSession;

//@description Finishes or cancels a previously started takeout session
//@takeout_session_id Identifier of the takeout session returned by initTakeoutSession
//@success Pass true if all data has been successfully transferred; pass false to cancel the session
finishTakeoutSession takeout_session_id:int64 success:Bool = Ok;

//@description Returns supergroups and channels that the current user has left. Requires an active takeout session
//@takeout_session_id Identifier of the takeout session returned by initTakeoutSession
//@offset Number of chats to skip; pass 0 for the first request
getLeftChats takeout_session_id:int64 offset:int32 = Chats;
"""

tl = insert_after(tl, TL_ANCHOR, TL_INSERT)
write(TL_FILE, tl)
print("  td_api.tl: OK")

# ---------------------------------------------------------------------------
# 2. td/telegram/ChatManager.h
# ---------------------------------------------------------------------------

CM_H = os.path.join(TD, "td/telegram/ChatManager.h")
print(f"Patching {CM_H}")
h = read(CM_H)

# 2a. Add on_get_left_channels after on_get_inactive_channels
h = insert_after(
    h,
    "  void on_get_inactive_channels(vector<tl_object_ptr<telegram_api::Chat>> &&chats, Promise<Unit> &&promise);\n",
    "\n  void on_get_left_channels(vector<tl_object_ptr<telegram_api::Chat>> &&chats, Promise<Unit> &&promise);\n",
)

# 2b. Add get_left_channels / init/finish_takeout_session after get_inactive_channels
h = insert_after(
    h,
    "  vector<DialogId> get_inactive_channels(Promise<Unit> &&promise);\n",
    """
  vector<DialogId> get_left_channels(int64 takeout_id, int32 offset, Promise<Unit> &&promise);

  void init_takeout_session(bool message_users, bool message_chats, bool message_megagroups,
                            bool message_channels, Promise<int64> &&promise);

  void finish_takeout_session(int64 takeout_id, bool success, Promise<Unit> &&promise);
""",
)

# 2c. Add on_create_left_channels after on_create_inactive_channels
h = insert_after(
    h,
    "  void on_create_inactive_channels(vector<ChannelId> &&channel_ids, Promise<Unit> &&promise);\n",
    "\n  void on_create_left_channels(vector<ChannelId> &&channel_ids, Promise<Unit> &&promise);\n",
)

# 2d. Add left_channel_ids_ready_ / left_channel_dialog_ids_ after inactive_channel_ids_
h = insert_after(
    h,
    "  vector<ChannelId> inactive_channel_ids_;\n",
    "\n  bool left_channel_ids_ready_ = false;\n  vector<DialogId> left_channel_dialog_ids_;\n",
)

write(CM_H, h)
print("  ChatManager.h: OK")

# ---------------------------------------------------------------------------
# 3. td/telegram/ChatManager.cpp
# ---------------------------------------------------------------------------

CM_CPP = os.path.join(TD, "td/telegram/ChatManager.cpp")
print(f"Patching {CM_CPP}")
cpp = read(CM_CPP)

# 3a. Insert query classes after GetInactiveChannelsQuery closing brace
# Anchor: end of GetInactiveChannelsQuery (on_error body) → start of GetChatsQuery
INACTIVE_END = "    promise_.set_error(std::move(status));\n  }\n};\n\nclass GetChatsQuery"
NEW_QUERIES = """\
    promise_.set_error(std::move(status));
  }
};

// Serializes invokeWithTakeout#aca9fd2e wrapping any inner MTProto function.
class TakeoutFunctionWrapper final : public telegram_api::Function {
  int64 takeout_id_;
  tl_object_ptr<telegram_api::Function> inner_;

 public:
  static constexpr int32 ID = static_cast<int32>(0xaca9fd2e);

  TakeoutFunctionWrapper(int64 takeout_id, tl_object_ptr<telegram_api::Function> inner)
      : takeout_id_(takeout_id), inner_(std::move(inner)) {
  }

  int32 get_id() const final {
    return ID;
  }

  void store(TlStorerCalcLength &s) const final {
    s.store_binary(ID);
    s.store_binary(takeout_id_);
    inner_->store(s);
  }

  void store(TlStorerUnsafe &s) const final {
    s.store_binary(ID);
    s.store_binary(takeout_id_);
    inner_->store(s);
  }

  void store(TlStorerToString &s, const char *field_name) const final {
    s.store_class_begin(field_name, "invokeWithTakeout");
    s.store_field("takeout_id", takeout_id_);
    inner_->store(s, "query");
    s.store_class_end();
  }
};

class GetLeftChannelsQuery final : public Td::ResultHandler {
  Promise<Unit> promise_;

 public:
  explicit GetLeftChannelsQuery(Promise<Unit> &&promise) : promise_(std::move(promise)) {
  }

  void send(int64 takeout_id, int32 offset) {
    send_query(G()->net_query_creator().create(TakeoutFunctionWrapper(
        takeout_id, telegram_api::make_object<telegram_api::channels_getLeftChannels>(offset))));
  }

  void on_result(BufferSlice packet) final {
    auto result_ptr = fetch_result<telegram_api::channels_getLeftChannels>(packet);
    if (result_ptr.is_error()) {
      return on_error(result_ptr.move_as_error());
    }
    auto chats_ptr = result_ptr.move_as_ok();
    LOG(INFO) << "Receive result for GetLeftChannelsQuery: " << to_string(chats_ptr);
    vector<tl_object_ptr<telegram_api::Chat>> chats;
    switch (chats_ptr->get_id()) {
      case telegram_api::messages_chats::ID:
        chats = std::move(move_tl_object_as<telegram_api::messages_chats>(chats_ptr)->chats_);
        break;
      case telegram_api::messages_chatsSlice::ID:
        chats = std::move(move_tl_object_as<telegram_api::messages_chatsSlice>(chats_ptr)->chats_);
        break;
      default:
        UNREACHABLE();
    }
    td_->chat_manager_->on_get_left_channels(std::move(chats), std::move(promise_));
  }

  void on_error(Status status) final {
    promise_.set_error(std::move(status));
  }
};

class InitTakeoutSessionQuery final : public Td::ResultHandler {
  Promise<int64> promise_;

 public:
  explicit InitTakeoutSessionQuery(Promise<int64> &&promise) : promise_(std::move(promise)) {
  }

  void send(bool message_users, bool message_chats, bool message_megagroups, bool message_channels) {
    int32 flags = 0;
    if (message_users) {
      flags |= 2;  // flags.1
    }
    if (message_chats) {
      flags |= 4;  // flags.2
    }
    if (message_megagroups) {
      flags |= 8;  // flags.3
    }
    if (message_channels) {
      flags |= 16;  // flags.4
    }
    send_query(G()->net_query_creator().create(telegram_api::account_initTakeoutSession(
        flags, false, message_users, message_chats, message_megagroups, message_channels, false, 0)));
  }

  void on_result(BufferSlice packet) final {
    auto result_ptr = fetch_result<telegram_api::account_initTakeoutSession>(packet);
    if (result_ptr.is_error()) {
      return on_error(result_ptr.move_as_error());
    }
    auto result = result_ptr.move_as_ok();
    LOG(INFO) << "Receive result for InitTakeoutSessionQuery: takeout_id=" << result->id_;
    promise_.set_value(std::move(result->id_));
  }

  void on_error(Status status) final {
    promise_.set_error(std::move(status));
  }
};

class FinishTakeoutSessionQuery final : public Td::ResultHandler {
  Promise<Unit> promise_;

 public:
  explicit FinishTakeoutSessionQuery(Promise<Unit> &&promise) : promise_(std::move(promise)) {
  }

  void send(int64 takeout_id, bool success) {
    int32 flags = success ? 1 : 0;  // flags.0 = SUCCESS
    send_query(G()->net_query_creator().create(
        telegram_api::account_finishTakeoutSession(flags, success)));
  }

  void on_result(BufferSlice packet) final {
    auto result_ptr = fetch_result<telegram_api::account_finishTakeoutSession>(packet);
    if (result_ptr.is_error()) {
      return on_error(result_ptr.move_as_error());
    }
    LOG(INFO) << "Receive result for FinishTakeoutSessionQuery";
    promise_.set_value(Unit());
  }

  void on_error(Status status) final {
    promise_.set_error(std::move(status));
  }
};

class GetChatsQuery"""

cpp = replace_once(cpp, INACTIVE_END, NEW_QUERIES)

# 3b. Insert method implementations after remove_inactive_channel
IMPL_ANCHOR = """\
void ChatManager::remove_inactive_channel(ChannelId channel_id) {
  if (inactive_channel_ids_inited_ && td::remove(inactive_channel_ids_, channel_id)) {
    LOG(DEBUG) << "Remove " << channel_id << " from list of inactive channels";
  }
}

void ChatManager::register_message_channels("""

IMPL_INSERT = """\
void ChatManager::remove_inactive_channel(ChannelId channel_id) {
  if (inactive_channel_ids_inited_ && td::remove(inactive_channel_ids_, channel_id)) {
    LOG(DEBUG) << "Remove " << channel_id << " from list of inactive channels";
  }
}

vector<DialogId> ChatManager::get_left_channels(int64 takeout_id, int32 offset, Promise<Unit> &&promise) {
  if (left_channel_ids_ready_) {
    left_channel_ids_ready_ = false;
    auto result = std::move(left_channel_dialog_ids_);
    left_channel_dialog_ids_.clear();
    promise.set_value(Unit());
    return result;
  }
  td_->create_handler<GetLeftChannelsQuery>(std::move(promise))->send(takeout_id, offset);
  return {};
}

void ChatManager::on_get_left_channels(vector<tl_object_ptr<telegram_api::Chat>> &&chats,
                                        Promise<Unit> &&promise) {
  auto channel_ids = get_channel_ids(std::move(chats), "on_get_left_channels");

  MultiPromiseActorSafe mpas{"GetLeftChannelsMultiPromiseActor"};
  mpas.add_promise(PromiseCreator::lambda(
      [actor_id = actor_id(this), channel_ids, promise = std::move(promise)](Unit) mutable {
        send_closure(actor_id, &ChatManager::on_create_left_channels, std::move(channel_ids),
                     std::move(promise));
      }));
  mpas.set_ignore_errors(true);
  auto lock_promise = mpas.get_promise();

  for (auto channel_id : channel_ids) {
    td_->messages_manager_->create_dialog(DialogId(channel_id), false, mpas.get_promise());
  }

  lock_promise.set_value(Unit());
}

void ChatManager::on_create_left_channels(vector<ChannelId> &&channel_ids, Promise<Unit> &&promise) {
  left_channel_ids_ready_ = true;
  left_channel_dialog_ids_ = DialogId::get_dialog_ids(channel_ids);
  promise.set_value(Unit());
}

void ChatManager::init_takeout_session(bool message_users, bool message_chats, bool message_megagroups,
                                        bool message_channels, Promise<int64> &&promise) {
  td_->create_handler<InitTakeoutSessionQuery>(std::move(promise))->send(
      message_users, message_chats, message_megagroups, message_channels);
}

void ChatManager::finish_takeout_session(int64 takeout_id, bool success, Promise<Unit> &&promise) {
  td_->create_handler<FinishTakeoutSessionQuery>(std::move(promise))->send(takeout_id, success);
}

void ChatManager::register_message_channels("""

cpp = replace_once(cpp, IMPL_ANCHOR, IMPL_INSERT)

write(CM_CPP, cpp)
print("  ChatManager.cpp: OK")

# ---------------------------------------------------------------------------
# 4. td/telegram/Requests.h
# ---------------------------------------------------------------------------

REQ_H = os.path.join(TD, "td/telegram/Requests.h")
print(f"Patching {REQ_H}")
rh = read(REQ_H)

rh = insert_after(
    rh,
    "  void on_request(uint64 id, const td_api::getInactiveSupergroupChats &request);\n",
    """
  void on_request(uint64 id, const td_api::getLeftChats &request);

  void on_request(uint64 id, const td_api::initTakeoutSession &request);

  void on_request(uint64 id, const td_api::finishTakeoutSession &request);
""",
)

write(REQ_H, rh)
print("  Requests.h: OK")

# ---------------------------------------------------------------------------
# 5. td/telegram/Requests.cpp
# ---------------------------------------------------------------------------

REQ_CPP = os.path.join(TD, "td/telegram/Requests.cpp")
print(f"Patching {REQ_CPP}")
rc = read(REQ_CPP)

# 5a. Insert GetLeftChatsRequest after GetInactiveSupergroupChatsRequest
RC_ANCHOR = """\
  GetInactiveSupergroupChatsRequest(ActorShared<Td> td, uint64 request_id) : RequestActor(std::move(td), request_id) {
  }
};

class SearchRecentlyFoundChatsRequest"""

RC_INSERT = """\
  GetInactiveSupergroupChatsRequest(ActorShared<Td> td, uint64 request_id) : RequestActor(std::move(td), request_id) {
  }
};

class GetLeftChatsRequest final : public RequestActor<> {
  int64 takeout_session_id_;
  int32 offset_;
  vector<DialogId> dialog_ids_;

  void do_run(Promise<Unit> &&promise) final {
    dialog_ids_ =
        td_->chat_manager_->get_left_channels(takeout_session_id_, offset_, std::move(promise));
  }

  void do_send_result() final {
    send_result(td_->dialog_manager_->get_chats_object(-1, dialog_ids_, "GetLeftChatsRequest"));
  }

 public:
  GetLeftChatsRequest(ActorShared<Td> td, uint64 request_id, int64 takeout_session_id, int32 offset)
      : RequestActor(std::move(td), request_id),
        takeout_session_id_(takeout_session_id),
        offset_(offset) {
  }
};

class SearchRecentlyFoundChatsRequest"""

rc = replace_once(rc, RC_ANCHOR, RC_INSERT)

# 5b. Insert on_request implementations after getInactiveSupergroupChats handler
RC_HANDLER_ANCHOR = """\
void Requests::on_request(uint64 id, const td_api::getInactiveSupergroupChats &request) {
  CHECK_IS_USER();
  CREATE_NO_ARGS_REQUEST(GetInactiveSupergroupChatsRequest);
}

void Requests::on_request(uint64 id, const td_api::getSuitablePersonalChats"""

RC_HANDLER_INSERT = """\
void Requests::on_request(uint64 id, const td_api::getInactiveSupergroupChats &request) {
  CHECK_IS_USER();
  CREATE_NO_ARGS_REQUEST(GetInactiveSupergroupChatsRequest);
}

void Requests::on_request(uint64 id, const td_api::getLeftChats &request) {
  CHECK_IS_USER();
  CREATE_REQUEST(GetLeftChatsRequest, request.takeout_session_id_, request.offset_);
}

void Requests::on_request(uint64 id, const td_api::initTakeoutSession &request) {
  CHECK_IS_USER();
  CREATE_REQUEST_PROMISE();
  auto query_promise =
      PromiseCreator::lambda([promise = std::move(promise)](Result<int64> result) mutable {
        if (result.is_error()) {
          promise.set_error(result.move_as_error());
        } else {
          promise.set_value(td_api::make_object<td_api::takeoutSession>(result.ok()));
        }
      });
  td_->chat_manager_->init_takeout_session(request.message_users_, request.message_chats_,
                                            request.message_megagroups_, request.message_channels_,
                                            std::move(query_promise));
}

void Requests::on_request(uint64 id, const td_api::finishTakeoutSession &request) {
  CHECK_IS_USER();
  CREATE_OK_REQUEST_PROMISE();
  td_->chat_manager_->finish_takeout_session(request.takeout_session_id_, request.success_,
                                              std::move(promise));
}

void Requests::on_request(uint64 id, const td_api::getSuitablePersonalChats"""

rc = replace_once(rc, RC_HANDLER_ANCHOR, RC_HANDLER_INSERT)

write(REQ_CPP, rc)
print("  Requests.cpp: OK")

print("\nAll patches applied successfully.")
