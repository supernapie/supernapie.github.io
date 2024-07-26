import { emit } from './events.js';

let color = () => {
    emit('color', { bg: 'black', fill: 'white', stroke: 'white' });
};

export default color;
