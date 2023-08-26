const {transports, createLogger, format} = require('winston');
var winston = require('winston');
 
//winston.add(winston.transports.File, { filename: 'somefile.log' });
//winston.configure
const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new (winston.transports.Console)({'timestamp':true}),
        new (winston.transports.File)({ 
            name: 'info-file',
            filename: './logs/info.log',
            level:'info' 
        }),

        new (winston.transports.File)({
          name: 'debug-file',
          filename: './logs/debug.log',
          level: 'debug'  
        }),

        new (winston.transports.File)({
            name: 'error-file',
            filename: './logs/error.log',
            level: 'error'  
        }),
    ]
  });

  /*
winston.log('info', 'Hello distributed log files!');
winston.info('Hello again distributed logs');

winston.level = 'debug';
winston.log('debug', 'Now my debug messages are written to console!');

winston.level = 'error';
winston.log('error',"mensaje de error");
*/

module.exports = logger;