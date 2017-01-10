
export function getData(url, callback = () => {}) {
  var audioCtx = new AudioContext();
  var source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.responseType = 'arraybuffer';

  request.onload = function() {
    audioCtx.decodeAudioData(request.response, function(buffer) {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        callback(source);
      },
      (e) => `Error with decoding audio data ${e.err}`);
  }

  request.send();

  return source;
}

export function getAudioData(url) {
  return new Promise(resolve => {
    return getData(url, resolve);
  });
}

function getAudioClockFromUrl(url) {
  return getAudioData(url).then(source => {
    const clock = new WAAClock(source.context);
    clock.start();
    source.start();

    return { source, clock };
  });
}

// window._song = document.querySelector('audio');
// window.clock = getAudioClock({ el: _song });
// window._song = document.querySelector('audio');
// window._song.play();
// window._songClock = new WAAClock(_song);
// document.querySelector('audio').onload = function() {
//   console.log('here, now');
// };
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
