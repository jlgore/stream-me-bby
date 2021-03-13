const fetch = require('node-fetch');
fs = require('fs');
var cron = require('node-cron');
var GphApiClient = require('giphy-js-sdk-core')

client = GphApiClient('UR_KEY')

async function fetchNowPlaying() {
    const response = await fetch('http://localhost:8010/status-json.xsl');
    const data = await response.json();
    const dataParsed = data.icestats.source.yp_currently_playing
    try {
        fs.writeFile('nowplaying.txt', dataParsed, function (err) {
            if (err) return console.log(err);
            console.log('Now Playing ' + dataParsed)
        });
        console.log(dataParsed)
    } catch(err) {
        console.error(err)
    }
  }

async function fetchGif() {
   var witchVibes = client.search('gifs', {"q": "UR_QUERY", "limit": 1}).then((response) => {
       response.data.forEach((gifObject) => {
           console.log(gifObject)
       })
   })
   console.log(witchVibes)
}


cron.schedule('*/1 * * * *', () => {
     fetchNowPlaying()
     console.log('updating nowplaying.txt');
   });

