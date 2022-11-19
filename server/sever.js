var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

let requestCount = 0;

app.get('/', function (req, res, next) {
  if (requestCount < 10 ) {
    res.status(200);
    res.json({status:200 ,msg: 'pending'})
    console.log("pending")
    requestCount++;
  } else {
    res.status(200);
    res.json({status:200 ,msg: "success"})
    console.log("success")
    requestCount++;
  }
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})