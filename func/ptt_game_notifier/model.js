class PttGameNotifierModel {
  constructor() {
    // config (stored in chrome.storage.sync)
    this.keywords = [];
    this.botToken = '';
    this.chatId = '';
    this.enabled = false;
    // runtime state (stored in chrome.storage.local)
    this.lastUpdatedTime = 0;
    this.msg = '';
    this.notifiedKeys = [];
  }

  dateStr = function() {
    const timezone = "zh-TW";
    const date = new Date(this.lastUpdatedTime);
    const dateStr = date.toLocaleDateString(timezone);
    const timeStr = date.toLocaleTimeString(timezone);
    return dateStr + ' ' + timeStr;
  }

  load = async function() {
    const config = await chrome.storage.sync.get('ptt_game_notifier_config');
    if (config.ptt_game_notifier_config != null) {
      const c = config.ptt_game_notifier_config;
      // accept the new array form, fall back to the legacy comma-separated string
      this.keywords = Array.isArray(c.keywords) ? c.keywords : this.parseKeywords(c.keyword);
      this.botToken = c.botToken || '';
      this.chatId = c.chatId || '';
      this.enabled = c.enabled || false;
    }

    const state = await chrome.storage.local.get('ptt_game_notifier_state');
    if (state.ptt_game_notifier_state != null) {
      const s = state.ptt_game_notifier_state;
      this.lastUpdatedTime = s.lastUpdatedTime || 0;
      this.msg = s.msg || '';
      this.notifiedKeys = s.notifiedKeys || [];
    }
  }

  saveConfig = function() {
    return chrome.storage.sync.set({
      'ptt_game_notifier_config': {
        'keywords': this.keywords,
        'botToken': this.botToken,
        'chatId': this.chatId,
        'enabled': this.enabled
      }
    });
  };

  saveState = function(timestamp, msg) {
    this.lastUpdatedTime = timestamp;
    this.msg = msg;
    return chrome.storage.local.set({
      'ptt_game_notifier_state': {
        'lastUpdatedTime': this.lastUpdatedTime,
        'msg': this.msg,
        'notifiedKeys': this.notifiedKeys
      }
    });
  };

  isConfigured = function() {
    return this.enabled && this.keywords.length > 0 && this.botToken && this.chatId;
  };

  // Parse a comma-separated string (ex: "A,B") into a trimmed keyword list.
  parseKeywords = function(str) {
    return (str || '').split(',').map((k) => k.trim()).filter((k) => k.length > 0);
  };

  // Join the keyword list back into a comma-separated string for the popup input.
  keywordsStr = function() {
    return this.keywords.join(',');
  };

  // True if the title contains any of the configured keywords.
  matches = function(title) {
    return this.keywords.some((k) => title.includes(k));
  };

  isNotified = function(key) {
    return this.notifiedKeys.includes(key);
  };

  // Remember a notified post, keeping the list bounded so storage stays small.
  markNotified = function(key) {
    this.notifiedKeys.push(key);
    const MAX_KEYS = 100;
    if (this.notifiedKeys.length > MAX_KEYS) {
      this.notifiedKeys = this.notifiedKeys.slice(-MAX_KEYS);
    }
  };
}

// Expose globally so this file works both as a classic script (popup) and
// as a side-effect import in the module service worker (back.js).
globalThis.PttGameNotifierModel = PttGameNotifierModel;