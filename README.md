# supernapie.github.io

https://supernapie.github.io

## Documentation

### Events

`js/events.js`

Event methods

- `on = (type, e => {}) => {}`
- `off = (type, e => {}) => {}`
- `once = (type, e => {}) => {}`
- `emit = (type, e) => {}`
- `last = (type) => e`

### Canvas

`js/canvas/2d.js`

Event types and e objects

- `step` `{ t, dt }`
- `clear` `{ ctx }`
- `draw` `{ ctx }`
- `tap` `{ x, y }`
- `color` `{ bg, fill, stroke }`
- `resize` `{ vw, vh, vc }`

### Text

`js/draw/text.js`

### Path

`js/draw/path.js`

### Pointer

Properties

- down
- pointing

`js/pointer/rect.js`

Event types and e objects

- `tap` `{ x, y }`
- `move` `{ x, y }`
- `down` `{ x, y }`
- `up` `{ x, y }`
- `startpointing` `{ x, y }`
- `stoppointing` `{ x, y }`

## TODO

- [x] Canvas resize
- [x] Pointer input
- [x] Animation loop
- [x] Text
- [x] SVG paths
- [x] Pointer areas (rect)
- [ ] Statemachine
- [ ] Cameras
- [ ] Timers
- [ ] Lerps
- [ ] Springs
- [ ] Tweens
- [ ] SVG sprites
- [ ] Physics
- [ ] Pathfinding
- [ ] Vector math
- [ ] 3d math
- [ ] Isometrics
- [ ] Tilemaps
- [ ] Particles
- [ ] Sound
- [ ] Music
- [ ] Webgl canvas
