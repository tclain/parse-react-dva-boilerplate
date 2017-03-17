var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var resolve = require('path').resolve;
var app = express();

const APP_NAME = process.env.APP_NAME || 'app';

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/'+APP_NAME, // Connection string for your MongoDB database
  cloud: resolve('./server/cloud.js'), // Absolute path to your Cloud Code
  appId: APP_NAME,
  masterKey: '4VDB6ZM267YV84HpQA8nqRj175Ci0Mrw', // Keep this key secret!
  fileKey: '3G9oQs7JXVejl7VOb01N7nv9689tUYWR',
  serverURL: 'http://localhost:1338/parse' // Don't forget to change to https if needed
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);
app.use(express.static('dist'));

app.use('/', function(request, response){
  response.sendFile(resolve('./dist/index.html'));
})



app.listen(1338, function() {
  console.log('parse-server-example running on port 1338');
})