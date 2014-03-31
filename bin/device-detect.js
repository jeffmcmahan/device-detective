/*jshint node: true */
var deviceDetect = function ( req ) {
    
    /**
     * @desc Returns an object containing all available information provided by the User-Agent HTTP header.
     * @param {object} Can be either (i) a node.js-native HTTP request object, or (ii) an expressjs req object.
     * @return {object} Consult the variable declaration for userAgentInfo for details (immediately below).
     */
    
    var userAgentHeader = getUAHeader( req );
    var userAgentInfo = regexDetect( userAgentHeader );
    
    if ( userAgentInfo.phone || userAgentInfo.tablet ) {
        userAgentInfo.mobile = true;
    }
    
    return userAgentInfo;
};

var getUAHeader = function ( req ) {
    
    /**
     * @desc Determines whether the req object was produced by expressjs, or by node's HTTP core module.
     * @param {object}
     * @return {string} User Agent HTTP header.
     */
    
    if ( !!req.somethingAddedByExpress ) {
        return req.headers["user-agent"];
    }
    return req.headers["user-agent"];
};

var regexDetect = function ( userAgentHeader ) {
    
    /**
     * @desc Uses some regular expressions to examine the UA header, and update the userAgentInfo object.
     * @param {object}
     * @param {string}
     */
    
    var userAgentInfo = {
        "phone" : false, // mobile-first defaults
        "tablet" : false,
        "mobile" : false,
        "desktop" : false,
        "lynx" : false,
        "crawler" : false
    };
    var crawler = /(googlebot)|(mediapartners)|(adsbot)|(msnbot)|(bingbot)|(Yo(u)?daoBot)|(Ya)(andex|DirectBot)|(baiduspider)|(duckduckbot)|(slurp)|(blekkobot)|(scribdbot)|(asterias)|(DoCoMo)|(Sogou)|(ichiro)|(moget)|(NaverBot)|(MJ12bot)/i.test(userAgentHeader);
    var phone = /(mobi)/i.test( userAgentHeader );
    var tablet = /(tablet)|(iPad)/i.test( userAgentHeader );
    var textBrowser = /(Lynx)|(ELinks)|(Links[ s]\()|(Net-Tamer)|(w3m)/i.test( userAgentHeader );
    
    if (!!crawler) {
        userAgentInfo.crawler = true;
        return userAgentInfo;
    }
    
    if (!!phone) {
        userAgentInfo.phone = true;
        return userAgentInfo;
    }
    
    if (!!tablet) {
        userAgentInfo.tablet = true;
        return userAgentInfo;
    }
    
    if (!!textBrowser) {
        userAgentInfo.lynx = true;
        return userAgentInfo;
    }
    
    userAgentInfo.desktop = true;
    return userAgentInfo;
};

exports.deviceDetect = deviceDetect;