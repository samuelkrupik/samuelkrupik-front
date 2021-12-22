function getIframe(url) {
  const videoId = getVideoId(url);
  if (!videoId) {
    return null;
  }
  const iframe = `
  <div class="iframe-wrapper">
    <iframe src="//www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
  </div>`;
  return iframe;
}

function getVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function getThumbnail(url) {
  const id = getVideoId(url);
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}

export default { getIframe };
export { getVideoId, getIframe, getThumbnail };
