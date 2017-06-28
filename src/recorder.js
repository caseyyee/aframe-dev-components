module.exports = {
  schema: {
    framerate: { type: 'number', default: 24 }
  },

  init: function () {
    var scene = this.el.sceneEl
    var framerate = 5;
    var chunks = [];
    this.recording = false;

    this.getSceneCanvas = new Promise(function (resolve) {
      if (scene.loaded) {
        resolve(scene.canvas);
      }
      scene.addEventListener('loaded', function () {
        resolve(scene.canvas);
      });
    });
    this.getSceneCanvas.then(this.setupRecorder.bind(this));
  },

  setupRecorder: function (canvas) {
    var videoData = [];
    var recording = false;
    var stream = canvas.captureStream(this.data.framerate);
    var recorder = new MediaRecorder(stream);
    recorder.ondataavailable = handleDataAvailable;

    // playback window
    var playback = document.createElement('video');
    playback.style.cssText = 'position: absolute; top: 100px; left: 0px; background: black; visibility: hidden';
    playback.width = 320;
    playback.height = 240;
    document.body.appendChild(playback);

    // record button
    var recordButton = document.createElement('button');
    recordButton.style.cssText = 'position: absolute; top: 0px; left: 0px;'
    recordButton.innerHTML = 'Record';
    document.body.appendChild(recordButton);
    recordButton.addEventListener('click', toggleRecorder);

    // status
    var div = document.createElement('div');
    div.style.cssText = 'position: absolute; top: 20px; left: 0px; color: white; background: black; visibility: hidden; font-family: Helvetica, Arial, Sans-Serif; padding: 10px;';
    
    // window.addEventListener('keydown', function(e) {
    //   if(e.key === 'r') {
    //     toggleRecorder();
    //   }
    // });

    function toggleRecorder() {
      if (!recording) {
        startRecorder();
      } else {
        stopRecorder();
      }

      recording = (recording) ? false : true;
    }

    function startRecorder() {
      if (playback.currentTime > 0) {
        playback.pause();
        playback.src = '';
        playback.load();
        playback.style.visibility = 'hidden';
      }
      videoData = [];
      recorder.start();
      document.body.appendChild(div);
      div.style.visibility = 'visible';
      div.innerHTML = 'Recording';
      recordButton.innerHTML = 'Stop';
    }

    function stopRecorder() {
      recorder.stop();
      div.innerHTML = 'Finished!';
      setTimeout(function () {
        div.style.visibility = 'hidden';
      }, 2000)

      recordButton.innerHTML = 'Record';
    }

    function handleDataAvailable(e) {
      if (e.data.size > 0) {
        videoData.push(e.data);

        // download chunks
        var blob = new Blob(videoData, {
          type: 'video/mp4'
        });
        var url = URL.createObjectURL(blob);
        playback.autoplay = true;
        playback.loop = true;
        playback.style.visibility = 'visible';
        playback.src = url;
        playback.play();

        // var a = document.createElement('a');
        // document.body.appendChild(a);
        // a.style = 'display: none';
        // a.href = url;
        // a.download = 'a-recording.webm';
        // a.click();
        // window.URL.revokeObjectURL(url);
      }
    }
  }
};