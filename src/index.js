const http = require('http')
const fs = require('fs')
const path = require('path')
const conf = require('./config/defaultConfig.js')

const server = http.createServer((req,res) => {
    const filePath = path.join(conf.root, req.url)
    console.info(conf.root)
    console.info(req.url)
    fs.stat(filePath, (err,stats) => {
        if(err){
            res.statusCode = 404
            res.setHeader('content-type','text/plain')
            res.end('${filePath} is not a file or directory')
            return
        }

        if(stats.isFile()) {
            res.statusCode = 200
            res.setHeader('content-type','text/plain')
            // fs.readFile(filePath,(err,data) => {
            //     res.end(data)
            // })
            fs.createReadStream(filePath).pipe(res)
        }else if(stats.isDirectory){
            fs.readdir(filePath,(err,files) => {
                res.statusCode = 200
                res.setHeader('content-type','text/plain')
                res.end(files.join(','))
            })
        }
    })
})

server.listen(conf.port,conf.hostname, () => {
    const addr = 'nodejs server is running at http://${conf.hostname}:${conf.port}'
    console.info(addr)
})