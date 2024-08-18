import gg from '../../js/canvas/2d.js';
import ft from '../../js/draw/text.js';
import machine from '../../js/statemachine/machine.js';

gg.emit('color', { bg: 'Tan', fill: 'Azure' });

let states = machine(gg);

let stateOne = states.add('first');
let textOne = ft({text: 'This is the first state. Tap!'});
stateOne.on('draw', textOne.draw);

let stateTwo = states.add('second');
let textTwo = ft({text: 'This is the second state. Tap!'});
stateTwo.on('draw', textTwo.draw);

gg.on('tap', () => {
    let next = stateOne.active ? 'second' : 'first';
    states.start(next);
});