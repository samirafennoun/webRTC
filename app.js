navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webKitGetUserMedia ||
  navigator.mozGetUserMedia;

function bindEvents(p) {
  p.on("error", function (err) {
    console.log("error", err);
  });
  p.on("signal", function (data) {
    document.querySelector("#offer").textContent = JSON.stringify(data);
  });
  p.on("stream", function (strem) {
    let Video = document.querySelector("#receiver-video");
    Video.volume = 0;

    Video.srcObject = stream;
    Video.play();
  });
  document.querySelector("#incoming").addEventListener("submit", function (e) {
    e.preventDefault();
    p.signal(JSON.parse(e.target.querySelector("textarea").value));
  });
}

function startPeer(initiator) {
  navigator.getUserMedia(
    {
      video: true,
      audio: true,
    },
    function (stream) {
      let p = new SimplePeer({
        initiator: initiator,
        stream: stream,
        trickle: false,
      });
      bindEvents(p);
      let emitterVideo = document.querySelector("#emitter-video");
      emitterVideo.volume = 0;

      emitterVideo.srcObject = stream;
      emitterVideo.play();
    },
    function () {}
  );
}

document.querySelector("#start").addEventListener("click", function (e) {
  startPeer(true);
});
document.querySelector("#receive").addEventListener("click", function (e) {
  startPeer(false);
});
