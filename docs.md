# Documentation

## Programming interface

`js/events.js`

Event methods

- `on = (type, e => {}) => {}`
- `off = (type, e => {}) => {}`
- `once = (type, e => {}) => {}`
- `emit = (type, e) => {}`
- `last = (type) => e`

`js/canvas/2d.js`

Event types and e objects

- `step` `{ t, dt }`
- `draw` `{ ctx }`
- `tap` `{ x, y }`
- `color` `{ bg, fill, stroke }`
- `resize` `{ vw, vh, vc }`
