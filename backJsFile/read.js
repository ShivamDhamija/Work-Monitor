const fs = require("fs");

function read(path, callback)
{
  fs.readFile(path,"utf-8", callback) 
}

module.exports = read;