## aframe-dev-components

Helpers for making [A-Frame](https://aframe.io/) easier to work with.

![A-Frame dev-components](https://raw.githubusercontent.com/caseyyee/aframe-dev-components/master/img/screen.jpg)

### Usage

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
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
</html>
```

### Components

#### `retain-camera`

Persists the camera position and orientation between scene reloads.

```html
<a-scene retain-camera></a-scene>
```

| Key           | Description
| ------------- | -------------
| ` | reset to original camera.


#### `axis`

Adds an axis helper to an entity. Makes it easier to visualize an entity's orientation in a scene.

```html
<a-entity axis></a-entity>
```

When added to `<a-camera>` or an entity with the `camera` component, an axis is displayed in the viewport that shows the _world coordinate_ relative to the camera's orientation.

```html
<a-camera axis></a-camera>
```



| Property      | Description   | Default
| ------------- | ------------- | ----
| size | size of line representing axis | 1



See three.js' docs for [`AxisHelper`](https://threejs.org/docs/?q=axis#api/helpers/AxisHelper).


#### bounding-box

Draws a bounding box around an entity's mesh.

```html
<a-entity bb></a-axis>

```

See three.js' docs for [`BoxHelper`](https://threejs.org/docs/?q=box#api/helpers/BoxHelper).


### npm

Install via [npm](https://www.npmjs.com/package/aframe-dev-components):

```bash
npm install aframe-dev-components
```

Then require and use.

```js
require('aframe');
require('aframe-dev-components');
```
