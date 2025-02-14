const EventEmitter = require('events'); 

const myEmitter = new EventEmitter();

// Register an event listener
myEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Emit the event
myEmitter.emit('greet', 'Alice');
