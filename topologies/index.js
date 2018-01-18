module.exports = function (mn) {
  return {
    basic: require('./basic')(mn),
    linear: require('./linear')(mn)
  }
}
