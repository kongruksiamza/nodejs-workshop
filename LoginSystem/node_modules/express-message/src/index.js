/*!
 * accepts
 * Copyright(c) 2019 Manvel Khnkoyan
 * MIT Licensed
 */

'use strict';

const jpv = require('jpv');
const Handler = require('./handler');

class App extends Handler {
    /*
    *
    * */
    constructor() {
        super()
    }

    /*
    *
    * */
    async emit(message, argHandlers = null) {
        let handlers = argHandlers || this.handlers;
        for (var i = 0; i < handlers.length; i++) {
            let {pattern, func} = handlers[i];
            if( func instanceof Handler ){
                let result = await this.emit(message, func.handlers);
                if( !result ){
                    break;
                }
                continue;
            }
            if (jpv.validate(message, pattern)) {
                let error = await func(message);
                if (error) {
                    break;
                }
            }
        }

        return true;
    }
}

exports = module.exports =  function () {
  return new App();
};

exports.Handler = function () {
    return new Handler();
};


