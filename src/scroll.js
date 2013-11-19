var getWindow = require('getWindow');

var methods = {
  scrollLeft: 'pageXOffset',
  scrollTop: 'pageYOffset'
}

function scroll_to(method) {
  var prop = methods[method]
  var top = 'pageYOffset' === prop

  return function (val) {
    var win = getWindow(this.el)

    // GETTER
    if(val === undefined)
      return win ? win[prop] : this.el[method]

    // SETTER

    if(!win)
      return this.el[method] = val

    win.scrollTo(
      !top ? val : window.pageXOffset,
      top ? val : window.pageYOffset
    )
  }
}

var scroll = module.exports = function (el) {
  if(!(this instanceof scroll)) return new scroll(el)

  this.el = el
}

scroll.prototype.left = scroll_to('scrollLeft')
scroll.prototype.top = scroll_to('scrollTop')