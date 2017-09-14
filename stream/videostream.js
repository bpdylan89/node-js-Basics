var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");

http.createServer(function (req, res) {
  if (req.url != "/sample.mp4") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<video src="http://bdprescott.ddns.net:8082/sample.mp4" controls></video>');
  } else {
    var file = path.resolve(__dirname,"sample.mp4");
    fs.stat(file, function(stats) {

      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var nuggetsize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": nuggetsize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        });
    });
  }
}).listen(8082);
