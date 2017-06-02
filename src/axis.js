module.exports = {
  schema: {
    size: { type: 'number', default: 1 },
    windowSize: { type: 'int', default: 100 },
    windowBackground: { type: 'string', default: 'rgb(3, 44, 113)' }
  },

  init: function () {
    var axisHelper = this.makeAxisHelper();
    this.axisHelper = axisHelper;
    this.isCamera = this.el.getObject3D('camera') === undefined ? false : true;
    if (this.isCamera) {
      this.makeAxisWindow();
      // adds axis to axis window
      this.axisScene.add(this.axisHelper);
    } else {
      this.el.object3D.add(axisHelper);
    }
  },

  makeAxisWindow: function () {
    var axisRenderer = new THREE.WebGLRenderer({ alpha: true });
    var el = axisRenderer.domElement;
    axisRenderer.setSize(this.data.windowSize, this.data.windowSize);
    el.style.position = 'absolute';
    el.style.background = this.data.windowBackground;
    el.style.bottom = 0;
    el.style.left = 0;
    el.style.zIndex = 100;
    this.el.sceneEl.appendChild(el);
    this.axisRenderer = axisRenderer;

    var axisScene = new THREE.Scene();
    this.axisScene = axisScene;

    var axisCamera = new THREE.PerspectiveCamera(20, 1, 1, 1000);
    axisCamera.position.set(0, 0, 10);
    this.axisCamera = axisCamera;
  },

  makeAxisHelper: function () {
    var axisHelper = new THREE.AxisHelper(this.data.size);
    axisHelper.material.transparent = true;
    axisHelper.material.depthTest = false;

    var geometry = new THREE.ConeGeometry( 0.1, 0.2, 8 );

    var x = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xff00c7, depthTest: false, transparent: true}));
    x.rotation.z = -1.5708;
    x.position.x = this.data.size;
    axisHelper.add(x);

    var y = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x00ffab, depthTest: false, transparent: true}));
    y.position.y = this.data.size;
    axisHelper.add(y);

    var z = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x0085ff, depthTest: false, transparent: true}));
    z.rotation.x = 1.5708;
    z.position.z = this.data.size;
    axisHelper.add(z);

    return axisHelper;
  },

  tick: function () {
    if (this.isCamera) {
      var q = this.el.sceneEl.camera.getWorldQuaternion();
      this.axisHelper.setRotationFromQuaternion(q.inverse());
      this.axisRenderer.render(this.axisScene, this.axisCamera);
    }
  }
};

