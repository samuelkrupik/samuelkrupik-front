export default {
  isLoggedIn: () => {
    if (JSON.parse(localStorage.getItem("authenticated")) === true) {
      return true;
    }
    return false;
  },
};
