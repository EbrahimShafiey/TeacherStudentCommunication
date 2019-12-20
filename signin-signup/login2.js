var http = require('http');
var fs = require('fs');
var frd = require('formidable');
var filestore = require('fs-extra');
var server = http.createServer(function (req, res) {
    
    app.get('/', function(req, res) {
        fs.readFile('C:\Users\Mohammad Jadidi\Desktop', (err, data) => {
            if (err)
                  throw err;
                
                    res.send(data);
                
        });
    });
});
server.listen(80);