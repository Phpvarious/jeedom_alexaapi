let Alexa = require('./lib/alexa-remote');
let alexa = new Alexa();

let cookieLocation = __dirname + '/data/alexa-cookie.json';
var fs = require('fs');

const amazonserver = process.argv[3];
const alexaserver = process.argv[4];

console.log('Alexa-Config - Lancement de '+ __filename );

alexa.init({
  proxyOnly: true,
  proxyOwnIp: process.argv[2],
  proxyPort: 3457,
  proxyLogLevel: 'info',
  logger: console.log,
  //alexaServiceHost: 'layla.amazon.de', // optional, e.g. "pitangui.amazon.com" for amazon.com, default is "layla.amazon.de"
  alexaServiceHost: alexaserver,
          useWsMqtt: true, // optional, true to use the Websocket/MQTT direct push connection
        cookieRefreshInterval: 3*24*60*60*1000 // optional, cookie refresh intervall, set to 0 to disable refresh
},
function (err)
{
  if (err)
  {
    console.log('initCookie - ' + err);
    return; // Wait next call
  }
  
 console.log('Alexa-Config (initCookie.js): amazonserver=' + amazonserver );
 console.log('Alexa-Config (initCookie.js): alexaserver=' + alexaserver );

  if (!alexa.cookieData)
    return; // Wait next call

 
 console.log ('initCookie - Cookie successfully retrieved from Amazon');
  fs.writeFile(cookieLocation, JSON.stringify(alexa.cookieData), 'utf8', (err) =>
  {
    if (err)
    {
      console.log('initCookie - Error while saving the cookie to: ' + cookieLocation);
      console.log('initCookie - ' + err);
      process.exit();
    }

    console.log ('initCookie - Cookie saved to:' + cookieLocation);
    process.exit();
  });
});

