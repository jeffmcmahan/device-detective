/**
 * Returns an object containing all available information provided by the
 * User-Agent HTTP header.
 * @function
 * @param {Object} req - native HTTP req or an ExpressJS req
 * @param {Object|} res - optional
 * @param {Function|} next - optional
 * @return {object}
 * @note This function can be used either as a middleware or as a simple
 * function call (passing only the first parameter in the latter case).
 */
function deviceDetect(req, res, next) {
  var ua = regexDetect(req.headers['user-agent'])
  if (ua.phone || ua.tablet) ua.mobile = true
  if (res) {
    res.userAgentInfo = ua
    if (next) next()
    return
  }
  return ua
}

/**
 * Uses some regular expressions to examine the UA header, and update the
 * userAgentInfo object.
 * @function
 * @param {string} userAgentHeader
 * @return {Object}
 */
function regexDetect(uaHeader) {
  var ua = {
    'desktop': false,
    'crawler': false,
    'tablet':  false,
    'mobile':  false,
    'phone':   false,
    'lynx':    false
  }
  var crawler = new RegExp('(' + [
    'googlebot',
    'mediapartners',
    'adsbot',
    'msnbot',
    'bingbot',
    'Yo(u)?daoBot',
    'Ya)(andex|DirectBot',
    'baiduspider',
    'duckduckbot',
    'slurp',
    'blekkobot',
    'scribdbot',
    'asterias',
    'DoCoMo',
    'Sogou',
    'ichiro',
    'moget',
    'NaverBot',
    'MJ12bot'
  ].join(')|(') + ')', 'i').test(uaHeader)
  var phone = /(mobi)/i.test(uaHeader)
  var tablet = /(tablet)|(iPad)/i.test(uaHeader)
  var textBrowser = (
    /(Lynx)|(ELinks)|(Links[ s]\()|(Net-Tamer)|(w3m)/i
    .test(uaHeader)
  )
  if (crawler) ua.crawler = true
  else if (phone) ua.phone = true
  else if (tablet) ua.tablet = true
  else if (textBrowser) ua.lynx = true
  else ua.desktop = true
  return ua
}

exports.deviceDetect = deviceDetect
