const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 2000;
const hostName = "localhost";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    return serveHTML(res, "index.html");
  } else if (req.url === "/about") {
    return serveHTML(res, "about.html");
  } else if (req.url === "/contact") {
    return serveHTML(res, "contact.html");
  } else {
    return serve404(res);
  }
});

server.listen(PORT, hostName, () => {
  console.log(`Server is working on http://${hostName}:${PORT}`);
});

function serveHTML(res, fileName) {
  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return serve404(res);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

function serve404(res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("<h1>404 Page Not Found</h1>");
}
