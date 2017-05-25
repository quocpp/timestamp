var express = require("express");
var url = require('url');
var moment = require('moment');
const app = express();

app.get('/*', function (req, res) {
  var obj = { unix: null, natural: null };
  var format = 'MMMM D, YYYY';
  var purl = url.parse(req.url);
  var timestamp = purl.pathname.replace(/%20/g, " ").replace(/\//g,"");
  console.log(timestamp);
  var unix = moment.unix(timestamp);
  var date = moment(timestamp, format);
  if (unix.isValid()) {
    obj.unix = unix.unix();
    obj.natural = unix.format(format);
  } else if (date.isValid()) {
    obj.unix = date.unix();
    obj.natural = date.format(format);
  }

  res.send(obj);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  
})
