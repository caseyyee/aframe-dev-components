module.exports = {
  schema: {
    framerate: { type: 'number', default: 24 },
    postUrl: { type: 'string' },
    mediaType: { type: 'string', default: 'mp4' },
    fileName: { type: 'string', default: 'preview' }
  },

  init: function () {
    var scene = this.el.sceneEl;
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
    var playbackContainer = document.createElement('div');
    playbackContainer.style.cssText = 'position: absolute; top: 100px; left: 0px; visibility: hidden';

    var playback = document.createElement('video');
    playback.style.cssText = 'background: black;';
    playback.width = 320;
    playback.height = 240;
    playbackContainer.appendChild(playback);

    var saveButton = document.createElement('button');
    saveButton.style.cssText = 'display: block';
    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', function () {
      var xhr = new XMLHttpRequest();
      var formData = new FormData();

      xhr.addEventListener('load', function () {
        console.log('loaded', xhr.responseText);
      });

      var blob = new Blob(videoData, {
        type: 'video/' + this.data.mediaType
      });

      formData.append('files', blob, this.data.fileName + '.' + this.data.mediaType);
      xhr.open('POST', this.data.postUrl, true);
      xhr.send(formData);
    }.bind(this));

    playbackContainer.appendChild(saveButton);

    document.body.appendChild(playbackContainer);


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
        playbackContainer.style.visibility = 'hidden';
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
          type: 'video/webm'
        });
        var url = URL.createObjectURL(blob);
        playback.autoplay = true;
        playback.loop = true;
        playback.src = url;
        playback.play();
        playbackContainer.style.visibility = 'visible';

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