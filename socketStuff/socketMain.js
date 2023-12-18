// where all our socket stuff will go

const io = require('../servers').io;

// oh... we need express, get app but only put what we need to inside of our socket
const app  = require('../servers').app;