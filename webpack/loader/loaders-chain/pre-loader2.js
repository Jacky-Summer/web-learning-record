function loader(source) {
  console.log('pre2')
  return source + '//pre2'
}
loader.pitch = function (remainingRequest, previousRequest, data) {
  console.log('pre2 pitch')
}

module.exports = loader
