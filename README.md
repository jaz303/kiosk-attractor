# kiosk-attractor

## Installl

```shell
npm install --save kiosk-attractor
```

## Require

```javascript
var attractor = require('kiosk-attractor');
```

## API

#### `var iface = attractor(opts)`

Options keys:

  * `activate`, required: function used to activate attractor mode. Will be called automatically after no interaction has occurred for `delay` milliseconds. Should return a promise that will be fulfilled when the attractor mode is fully active. Receives a single parameter, `firstTime` which will true the first time the attractor activates.
  * `deactivate`, required: function used to deactivate attractor mode, called automatically after a user interaction event is detected whilst the attractor is active. Should return a promise that will be fulfilled when the attractor mode is fully deactivated.
  * `events`: DOM events which should which should be considered "interaction events". Capturing listeners for such events will be attached to the document body and will be used to deactivate attractor mode/prolong exhibit mode. Default: `['mousedown', 'touchstart']`.
  * `delay`: milliseconds of inactivity after which the attractor will activate.

#### `iface.start()`

Start the interface; will launch into attractor mode.

#### Events

`iface` is an [`event-box`](https://github.com/jaz303/event-box) instance and emits the following events:

  * `willActivate`: fired when a transition to attractor mode begins
  * `didActivate`: fired when a transition to attractor mode completes
  * `willDeactivate`: fired when a transition from attractor mode begins
  * `didDeactivate`: fired when a transition from attractor mode completes
