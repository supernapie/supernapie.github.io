// gg can be anything you want
// use it for namespacing
import gg from '../js/index.js';

// documentation
console.log(gg);

gg.on('resize', (e, context) => {
    console.log('resize', e, context);
    console.log(gg.vw, gg.vh, gg.pxR);
}, {test: 'test'});

gg.on('tap', (e, context) => {
    console.log('tap', e, context);
    console.log(gg.pointer);
});

gg.on('update', (e, context) => {
    console.log('update', e, context);
});
