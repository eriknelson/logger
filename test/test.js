var assert = require("assert");
var fs = require("fs");
require("shelljs/global");

describe('myLogger module', function () {

    var Logger = require('../index'),
        myLogger = Logger.getLogger();

    // we use child process to excute parser via CLI
    it('should return an instance of the Logger module', function (done) {
        if (Logger) {
            done();
        } else {
            return done('Failed to instantiate Logger');
        }
    });

    // we use child process to excute parser via CLI
    it('should return an instance of the the custom Logger', function (done) {
        if (myLogger) {
            done();
        } else {
            return done('Failed to instantiate myLogger');
        }
    });

    it('should return a colorized output for log level', function (done) {
        if (myLogger) {

            myLogger('debug', 'test debug level');
            myLogger('info', 'test info level');
            myLogger('silly', 'test silly level');
            myLogger('warn', 'test warn level');
            myLogger('error', 'test error level');

            done();
        } else {
            return done('Failed to instantiate myLogger');
        }
    });

    it('should turn off colorized output to console', function (done) {
        if (Logger) {
            Logger.set('colorize', false);
            if (Logger.get('colorize') === false) {
                done();
            }
        } else {
            return done('Failed to instantiate myLogger');
        }
    });

    it('should silence log output to console', function (done) {
        if (Logger) {
            Logger.set('silent', true);
            if (Logger.get('silent') === true) {
                done();
            }
        } else {
            return done('Failed to instantiate myLogger');
        }
    });

    it('should turn on json format output to console\n', function (done) {
        if (Logger) {
            Logger.set('json', true);
            if (Logger.get('json') === true) {
                done();
            }
        } else {
            return done('Failed to instantiate myLogger');
        }
    });

    it('should not handle exceptions', function (done) {
        if (Logger) {
            Logger.set('handleExceptions', false);
            if (Logger.get('handleExceptions') === false) {
                done();
            }
        } else {
            return done('Failed to instantiate myLogger');
        }
    });

    it('should have logToFile available', function (done) {
      assert(Logger["logToFile"]);
      done();
    });

    it('should log to file if specified', function (done) {
      var testFile = __dirname+"/test.tmp.log";
      Logger.logToFile(testFile);
      myLogger("info", "hello world", function(err){
        assert(fs.existsSync(testFile));

        var grepCommand = 'grep -q "hello world" ' + testFile;
        exec(grepCommand, function(code){
          assert(code === 0);

          fs.unlink(testFile, function(err){
            if(err){ assert(false); }
            assert(fs.existsSync(testFile) === false);
            done();
          })

        });
      });
    });

});
