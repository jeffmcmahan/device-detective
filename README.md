# Device Detective
Device Detective is an ExpressJS-compatible Node.js module, which determines whether a user agent is a phone, tablet, desktop, text browser, or web crawler, in accordance with [MDN recommendations](https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent) for detecting mobiles.

```js
{
  desktop: {Boolean},
  crawler: {Boolean},
  tablet:  {Boolean},
  mobile:  {Boolean},
  phone:   {Boolean},
  lynx:    {Boolean}
}
```

## Install it.
```
npm install device-detective
```

## Use it.
### As a middleware:
```js
// EXAMPLE APP.JS -------------------------------------------
var deviceDetective = require('device-detective')

app.use(deviceDetective)

```

Now examine `res.userAgentInfo` in any request handler.

### Or as a simple function call:
```js
// EXAMPLE ROUTE FILE ---------------------------------------
var deviceDetective = require('device-detective')

var device = deviceDetective.detect(req)
```

## Things to be aware of:
### Desktop is default.
If ```detect``` doesn't encounter anything to identify the user agent, it'll set `desktop` to `true` and the rest to ```false```. This may seem foolish, given that mobile devices will soon produce more web traffic than desktops (if they don't already), but setting `mobile` to `true` by default would lead request handlers to elide content when the user agent is a web crawler that can't be identified.

### Phone/tablet entails mobile.
If Device Detective sets either the ```phone``` or ```tablet``` properties to ```true```, it'll also set ```mobile``` to ```true```. You're free to treat phones and tablets alike without checking both.
