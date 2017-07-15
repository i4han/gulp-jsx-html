var through = require('through2')
var gutil = require('gulp-util')
var jsxHtml = require("jsx-html")

// plugin level function (dealing with files)
module.exports = function () {

    // creating a stream through which each file will pass
    var stream = through.obj( function(file, _, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-jsx-html', 'Streams are not supported!'))
            return cb()
        }

        if (file.isBuffer()) {
            file.contents = new Buffer(jsxHtml(file.contents))
        }

        // make sure the file goes through the next gulp plugin
        this.push(file)

        // tell the stream engine that we are done with this file
        cb()
    })

    // returning the file stream
    return stream
}