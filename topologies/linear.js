// bunch of hosts, each one connect to the next

module.exports = function (mn) {
  return function (count, opts) {
    if (!count) count = 2
    var topo = {}
    var prev = null
    for (var i = 0; i < count; i++) {
      var h = mn.createHost()
      if (prev) h.link(prev, opts)
      prev = topo[h.id] = h
    }
    return topo
  }
}
