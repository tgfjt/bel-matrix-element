var bel = require('bel')
var morphdom = require('morphdom')
var matrix = require('../index.js')

const app = module.exports = function() {
  var el = render({ x: 1, y: 20 })

  function render(pinPos) {
    function clickHover(pos) {
      console.log('Hover', pos)
    }

    function clickHandle(pos) {
      morphdom(el, render(pos))
      console.log(pos.x)
    }

    const pinStyle = `top:${(pinPos.y - 1) * 16}px;left:${(pinPos.x - 1) * 16}px;`
    const pin = bel`<span class="pin" style="${pinStyle}">📍</span>`

    return bel`<div class="app">
      ${matrix(160, clickHover, clickHandle)}
      ${pin}
      <input type="range" name="importance" min="1" max="20" step="1" value=${pinPos.x} />
      <input type="range" name="urgency" min="5" max="100" step="5" value=${(20 - pinPos.y) * 5} />
    </div>`
  }

  return el
}

document.getElementById('app-root').appendChild(app())