// writeScript(`${location.hostname}:35729/livereload.js?snipver=1`);
export function writeScript(url) {
  const script = `<script src="${url}"></script>`

  document.write(script)
}
