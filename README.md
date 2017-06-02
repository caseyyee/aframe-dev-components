## aframe-dev-components

Helpers for making [A-Frame](https://aframe.io) easier to work with.

![A-Frame dev-components](https://raw.githubusercontent.com/caseyyee/aframe-dev-components/master/img/screen.jpg)

### Usage

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>

  <!-- Include component script into your project along with A-Frame. -->
  <script src="https://unpkg.com/aframe-dev-components/dist/aframe-dev-components.min.js"></script>
</head>

<body>
  <a-scene>
    <!-- A-Frame markup -->
  </a-scene>
</body>
```

### Components

#### retain-camera

Retains camera position and orientation through scene reloads.

```html
<a-scene retain-camera></a-scene>
```

| Key           | Description
| ------------- | -------------
| ` | reset to original camera.


#### axis

Adds axis helper to entity.   Makes it easier to visualize entity orientation in a scene.

```html
<a-entity axis></a-entity>
```

When added to `<a-camera>` or entity with `camera` component, a axis is displayed in the viewport that shows the _world coordinate_ relative to the cameras orientation.

```html
<a-camera axis></a-camera>
```



| Property      | Description   | Default
| ------------- | ------------- | ----
| size | size of line representing axis | 1



See three.js docs [AxisHelper](https://threejs.org/docs/?q=axis#Reference/Helpers/AxisHelper).


#### bounding-box

draws bounding box around entity mesh.

```html
<a-entity bb></a-axis>

```

See three.js docs [BoxHelper](https://threejs.org/docs/?q=box#Reference/Helpers/BoxHelper)


### npm

Install via npm:

```bash
npm install aframe-dev-components
```

Then require and use.

```js
require('aframe');
require('aframe-dev-components');
```
