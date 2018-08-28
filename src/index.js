const http = require('http')
const conf = require('./config/defaultConfig.js')

const server = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader('content-type','text/plain')
    res.end('hello nodejs')
})

server.listen(conf.port,conf.hostname, () => {
    const addr = 'nodejs server is running at http://${conf.hostname}:${conf.port}'
    console.info(addr)
})