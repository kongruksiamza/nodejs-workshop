
const app = require('../../express-message')();

app.handle( {}, async (message) => {
    if( !message.jsonrpc || "2.0" !== message.jsonrpc ){
        return message.error = {code: 100, message: "Invalid jsonRpc protocol"}
    }
});

app.handle( { method : "multiply" }, async (message) => {
    message.result = message.params[0] * message.params[1];
});

app.handle( { method : "concat" }, async (message) => {
    message.result = message.params[0].toString() + message.params[1].toString();
});


/* Custom Handler */
const customHandler = require('../../express-message').Handler();
customHandler.handle( { method : "subtract" }, async (message) => {
    message.result = message.params[0] - message.params[1];
});
app.handle( {}, customHandler);


/**/
app.handle( { method : "add" }, async (message) => {
    message.result = message.params[0] + message.params[1];
});


const messages = [
    {"jsonrpc": "2.0", "method": "subtract", "params": [42, 23]},
    {"jsonrpc": "1.0", "method": "multiply", "params": [23, 42]},
    {"jsonrpc": "2.0", "method": "add", "params": [42, 23]},
    {"jsonrpc": "2.0", "method": "concat", "params": ["bar", 5] },
];



messages.forEach( async message => {
    await app.emit(message)
});

// because of library calls asynchronously
setTimeout(() => {
    console.log(messages)
},100);


