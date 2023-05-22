// Http module
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // if(req.url === "/"){
  //     fs.readFile(path.join(__dirname, "public", "index.html"),(err, content)=>{
  //         if(err){
  //             throw err
  //         }

  //         res.writeHead(200, {'Content-Type': 'text/html'})
  //         res.write(content)
  //         res.end()

  //     })
  // }
  // else if(req.url === "/about"){
  //     fs.readFile(path.join(__dirname, "public", "about.html"),(err, content)=>{
  //         if(err){
  //             throw err
  //         }

  //         res.writeHead(200, {'Content-Type': 'text/html'})
  //         res.write(content)
  //         res.end()

  //     })
  // }
  // else{
  //     res.writeHead(200, {'Content-Type': 'text/html'})
  //     res.write("<h1>OOP's 404 page not found</h1>")
  //     res.end()
  // }

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  console.log(req.url);

  let contentType = "text/css";

  let ext = path.extname(filePath);
  if (!ext) {
    filePath += ".html";
  }

  switch (ext) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;

    default:
      contentType = "text/html";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(path.join(__dirname, "public", "error.html"), (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Error!!!");
        } else {
          res.writeHead(404, {
            "Content-Type": contentType,
          });
          res.write(data);
          res.end();
        }
      });
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
      });
      res.write(content);
      res.end();
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
