function getTitle(vm) {
  const { title } = vm.$options;
  let t = "";
  if (title) {
    t += typeof title === "function" ? title.call(vm) : title;
  }
  return (t +=
    (process.env.VUE_APP_NAME ?? null) && t.length > 0
      ? " - " + process.env.VUE_APP_NAME
      : "");
}
export default {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
};
