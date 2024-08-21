import gg from '../../js/canvas/2d.js';
import ft from '../../js/draw/text.js';
import machine from '../../js/statemachine/machine.js';

gg.emit('color', { bg: 'Tan', fill: 'Azure' });

let stateOne = machine.add('first');
let textOne = ft({text: 'This is the first state. Tap!'});
stateOne.on('draw', textOne.draw);

let stateTwo = machine.add('second');
let textTwo = ft({text: 'This is the second state. Tap!'});
stateTwo.on('draw', textTwo.draw);

gg.on('tap', () => {
    if (stateOne.active) {
        stateOne.stop('second');
    } else if (stateTwo.active) {
        stateTwo.stop('first');
    }
});
