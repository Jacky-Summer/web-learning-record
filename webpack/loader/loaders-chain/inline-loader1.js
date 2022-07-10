function loader(source) {
  console.log('inline1', this.name, this.age)
  return source + '//inline1'
}
loader.pitch = function (remainingRequest, previousRequest, data) {
  console.log('inline1 pitch')
}

module.exports = loader
