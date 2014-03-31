# Device Detective

## What it does

Device Detective is a featherweight Node.js module which determines whether a user agent is a phone, tablet, desktop, text browser (*e.g.,* Lynx), or a search engine crawler (*e.g.,* GoogleBot, BingBot, Baiduspider, etc.). And it makes this info easy to get at.

Like all UA sniffers, Device Detective relies on a handful of regular expressions to determine what sort of device has issued the HTTP request. Device Detective implements [MDN recommendations](https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent) for detecting mobiles, and allows the developer to choose whether to use the distinction between tablets and smaller mobile devices, which is available via the UA header (it's not recommended for the general use case).

## Installation

Simply ```cd``` to your project's root directory and issue the following command.

    npm install device-detective
    
Include it in your project, wherever you please.
```js
var deviceDetective = require("device-detective");
```

## Reference

### Getting User Agent Information

The API consists of a single function, which takes a request object as a parameter (expressjs compatible).

```js
var device = detect( req );
```
    
When invoked, ```detect()``` returns an object of the following form:

```js
device = {
  "phone" : [boolean],
  "tablet" : [boolean],
  "mobile" : [boolean],
  "desktop" : [boolean],
  "lynx" : [boolean],
  "crawler" : [boolean]
}
```

**_Nota bene:_** If ```detect``` doesn't encounter anything to identify the user agent as crawler, text browser, or phone, it will set ```desktop``` to ```true``` irrespective of whether the user agent is also identified as a tablet. That is to say, the desktop and tablet categories will overlap depending upon whether the vendor put "mobi(le)" in the UA string or not. If not, the device should be treated as a desktop (according to MDN's advice).

Defaulting to desktop in the general case may seem foolish, given that mobile devices will soon produce more web traffic than desktops (if they don't already), but setting ```mobile : true``` by default would lead developers to create request handlers that automatically elide content when the user agent is one of the thousands of web crawlers that can't be identified based on HTTP headers.

### Phone, Tablet & Mobile

Tablet does not entail mobile; that is, if a vendor chooses not to include a tag identifying the device/browser as mobile (for example, on a high-powered tablet-turned-laptop sort of device), it won't be---and shouldn't be---identified as a mobile device. So, while phone entails mobile, tablet does not. Consult the tablet property to determine whether the user agent is an iPad or an Android tablet (both register as "mobile" by the vendors).

## Partial Route Example

In a hypothetical project's main.js, expressjs ```get``` request handlers match strings and pass them over to routes, as shown below.
```js
var blogRouter = require( "./routes/blog" );
app.get( "/blog", blogRouter.home );
```

The above code invokes ```blogRouter.home()```, implicitly passing 3 parameters (a ```request```, a ```response``` and a ```next``` object, respectively). Passing the ```request``` object into ```detect()``` returns the user agent information object. Plausible source code for this, in ```/routes/blog.js```, is below.

```js
var deviceDetector = require( "device-detector" );

var home = function ( req, res, next ) {
  
  var device = deviceDetector.detect( req );
  
  // typeof device === 'object'
  // typeof device.phone === 'boolean'
  
  if ( device.phone ) {
    // Do phone-specific stuff.
  } else if ( device.tablet ) {
    // Do tablet-specific stuff.
  } else if ( device.desktop || device.crawler || device.lynx ) {
    // Do other stuff. 
  }
  // Finish routing.
};

exports.home = home;
```
