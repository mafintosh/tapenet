# tapenet

Test runner for distributed systems based on mininet and tape

```
npm install tapenet
```

## Usage

``` js
var test = require('tapenet')

var h1 = test.createHost()
var h2 = test.createHost()
var s1 = test.createSwitch()

h1.link(s1)
h2.link(s1)

test('start a server and connect to it', function (t) {
  t.run(h1, function () {
    // this is run inside a mininet container on h1
    var net = require('net')

    h1.on('listening', function (ip) {
      var socket = net.connect(10000, ip)
      var bufs = []

      socket.on('data', data => bufs.push(data))
      socket.on('end', function () {
        t.same(Buffer.concat(bufs).toString(), 'hello from h2')
        t.end()
      })
    })
  })

  t.run(h2, function () {
    // this is run inside a mininet container on h2
    var net = require('net')

    var server = net.createServer(function (socket) {
      t.pass('got connection')
      socket.write('hello from h2')
      socket.end()
    })

    server.listen(10000, function () {
      h1.emit('listening', global.ip)
    })
  })
})
```

## License

MIT
