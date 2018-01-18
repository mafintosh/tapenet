// bunch of hosts, one switch

module.exports = function (mn) {
  return function (count, opts) {
    if (!count) count = 2
    var topo = {}
    topo.s1 = mn.createSwitch()
    for (var i = 0; i < count; i++) {
      var h = mn.createHost()
      h.link(topo.s1, opts)
      topo[h.id] = h
    }
    return topo
  }
}
