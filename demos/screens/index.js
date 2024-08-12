import gg from '../../js/canvas/2d.js';
import ft from '../../js/draw/text.js';
import machine from '../../js/statemachine/machine.js';

gg.emit('color', { bg: 'navy', fill: 'white' });

let states = machine(gg);

let stateOne = states.add('first');
let textOne = ft({text: 'This is the first state'});
stateOne.on('draw', textOne.draw);

let stateTwo = states.add('second');
let textTwo = ft({text: 'This is the second state'});
stateTwo.on('draw', textTwo.draw);

gg.on('tap', () => {
    let next = states.active === 'first' ? 'second' : 'first';
    states.start(next);
});
