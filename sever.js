var http = require("http");

let requestCount = 0;
var server = http.createServer(function (req, res) {
  if (requestCount === 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Bad Request" }));
    res.end();
    requestCount++;
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "OK" }));
    res.end();
    requestCount++;
  }
});

server.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
