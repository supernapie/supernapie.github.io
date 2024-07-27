# Plans

## Goals

- Focus on prototyping game mechanics
- Scalable to full games with a lot of content
- No buildtools, no dependencies
- Run in the browser or in deno
- Geared towards mobile games
- Ignore music and sound
- Get rid of the init and loop paradigm
- Define custom events
- Don't just wrap the canvas api, but provide easy access to the canvas
- Don't waste lines on game configuration (canvas resize, pointer input, animationloop work out of the box)
- Don't waste time with designing screens and menus (plug and play components)
- Lazy load physics, isometrics, pathfinding, vector math, 3d math, tweens, tilemaps, particles, when needed.
- Use svg graphics and sprites

## Requirements

### core

- Canvas resize
- Pointer input
- Animation loop

### Concepts for positioning and drawing elements

- The canvas resizes with pixelratio
- The game world coordinates map to the innerWidth/innerHeight size
