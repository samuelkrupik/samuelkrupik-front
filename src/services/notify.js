import store from "../store/index";

const defaultDuration = 5000;

const success = (message, text = null, duration = defaultDuration) => {
  make({
    message,
    text,
    duration,
    type: NotificationType.SUCCESS,
  });
};

const error = (message, text = null, duration = defaultDuration) => {
  make({
    message,
    text,
    duration,
    type: NotificationType.ERROR,
  });
};

const warning = (message, text = null, duration = defaultDuration) => {
  make({
    message,
    text,
    duration,
    type: NotificationType.WARNING,
  });
};

const info = (message, text = null, duration = defaultDuration) => {
  make({
    message,
    text,
    duration,
    type: NotificationType.INFO,
  });
};

const make = (notification) => {
  store.dispatch("notifications/addNotification", notification);
};

export class NotificationType {
  static ERROR = "error";
  static SUCCESS = "success";
  static WARNING = "warning";
  static INFO = "info";
}

export default {
  success,
  error,
  warning,
  info,
};
