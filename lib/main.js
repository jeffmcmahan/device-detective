/*jshint node:true */
var deviceDetective = require( "../bin/device-detect" );

var detect = function ( req ) {
    return deviceDetective.deviceDetect( req );
};

exports.detect = detect;