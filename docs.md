# Documentation

## Programming interface

Event methods

- `on = (type, e => {}) => {}`
- `off = (type, e => {}) => {}`
- `once = (type, e => {}) => {}`
- `emit = (type, e) => {}`
- `last = (type) => e`

Event types and e objects

- `update` `{ t, dt }`
- `draw` `{ ctx }`
- `tap` `{ x, y }`
- `color` `{ bg, fill, stroke }`
- `resize` `{ vw, vh, vc }`
