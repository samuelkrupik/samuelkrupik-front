export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  getters: {},
  mutations: {
    APPEND_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications;
    },
  },
  actions: {
    addNotification({ commit }, data) {
      const newNotification = {
        id: (Math.random() + 1).toString(36).substring(2, 7),
        ...data,
      };
      commit("APPEND_NOTIFICATION", newNotification);
    },
    removeNotification({ state, commit }, toRemove) {
      const newNotifications = state.notifications.filter((notification) => {
        return notification.id !== toRemove.id;
      });
      commit("SET_NOTIFICATIONS", newNotifications);
    },
  },
};
