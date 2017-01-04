
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

export function getAudioClock(url) {
    var source = getData(url);
    var clock = new WAAClock(source.context);
    clock.start();
    source.start();
    return clock;
}
