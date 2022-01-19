const urlRegex = /(https?:\/\/[^\s]+)/g;

const linkify = (text, config = {}) => {
  return text.replace(
    urlRegex,
    `<a 
        class="${config.classes ?? "link"}" 
        target="${config.target ?? "_self"}" 
        href="$1">$1
      </a>`
  );
};

export { linkify };
