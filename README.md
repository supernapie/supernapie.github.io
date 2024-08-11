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

## TODO

- [x] Canvas resize
- [x] Pointer input
- [x] Animation loop
- [x] Text
- [x] SVG paths
- [ ] Tap areas
- [ ] Hover areas
- [ ] SVG sprites
- [ ] Cameras
- [ ] States
- [ ] Screens
- [ ] Menus
- [ ] Physics
- [ ] Isometrics
- [ ] Pathfinding
- [ ] Vector math
- [ ] 3d math
- [ ] Tweens
- [ ] Timers
- [ ] Tilemaps
- [ ] Particles
- [ ] Sound
- [ ] Music
- [ ] Webgl canvas