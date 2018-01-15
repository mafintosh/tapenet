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

    h2.on('listening', function (ip) {
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
      h2.emit('listening', global.ip)
    })
  })
})
```

## API

#### `var h = test.createHost()`

Same as [mininet.createHost()](https://github.com/mafintosh/mininet#var-host--mncreatehost)

#### `var s = test.createSwitch()`

Same as [mininet.createSwitch()](https://github.com/mafintosh/mininet#var-host--mncreateswitch)

#### `test.mininet`

The underlying [mininet](https://github.com/mafintosh/mininet) instance.

#### `test(name, runner)`

Start a test. `name` is a description of your test and `runner` should be a function.
When the test is run, `runner` is ran with the argument `t` which is a [tape](https://github.com/substack/tape) test instance.

#### `t.run(host, source)`

In addition to all the other tape test methods, `t.run` will run a source function inside a mininet host.
The host will have access to the test object through the `t` variable, and a set of shared event emitters `h1`, `h2`, ...
If you emit an event on any of those event emitters it will be emitted across all mininet hosts currently running.

## License

MIT
