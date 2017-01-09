
export function getData(url) {
  var audioCtx = new AudioContext();
  var source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.responseType = 'arraybuffer';

  request.onload = function() {
    audioCtx.decodeAudioData(request.response, function(buffer) {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
      },
      (e) => `Error with decoding audio data ${e.err}`);
  }

  request.send();

  return source;
}

function getAudioClockFromUrl(url) {
  var source = getData(url);
  window._source = source;
  var clock = new WAAClock(source.context);
  clock.start();
  source.start();
  return clock;
}

function getAudioClockFromElement(el) {
  var audioCtx = new AudioContext();
  window._audioCtx = audioCtx;
  var mediaElementSource = audioCtx.createMediaElementSource(el);
  window._mediaElementSource = mediaElementSource;
  mediaElementSource.connect(audioCtx.destination)
  var bufferSource = audioCtx.createBufferSource()
  window._bufferSource = bufferSource;
  // var buffAudio = new BuffAudio(audioCtx, bufferSource);
  // window._buffAudio = buffAudio;
  // bufferSource.connect(audioCtx.destination);

  el.play();
  var clock = new WAAClock(mediaElementSource.context);
  clock.start();

  window._newSource = mediaElementSource;

  return clock;
}

export function getAudioClock(opts = {}) {
  if (opts.url) {
    return getAudioClockFromUrl(opts.url);
  } else if (opts.el) {
    return getAudioClockFromElement(opts.el);
  }
}
