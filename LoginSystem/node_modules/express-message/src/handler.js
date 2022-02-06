/*!
 * accepts
 * Copyright(c) 2019 Manvel Khnkoyan
 * MIT Licensed
 */

'use strict';

module.exports = class Handler {

    /*
    *
    * */
    constructor() {
        this.handlers = [];
    }

    /*
    *
    * */
    async handle( ) {
        let pattern = arguments[0];
        let func = arguments[1];

        if( arguments.length == 1 ){
            pattern = {};
            func = arguments[0];
        }
        if( func.constructor.name !== 'AsyncFunction' && !(func instanceof Handler) ){
            throw 'Use a async function as a handler or express-message handler in: ' +  func.toString() +
                "\n" + 'See more information from https://www.npmjs.com/package/express-message';
        }
        this.handlers.push({ pattern, func });
    }
};

