var bel = require('bel')
var morphdom = require('morphdom')
var matrix = require('../index.js')

const app = module.exports = function() {
  var el = render({ x: 1, y: 20 })

  function render(pinPos) {
    function clickHover(pos) {
      // console.log('Hover', pos)
    }

    function handleClick(pos) {
      morphdom(el, render(pos))
    }

    function handleSubmit(e) {
      e.preventDefault();

      console.log('importance', form.importance.value)
      console.log('urgency', form.urgency.value)
    }

    const pinStyle = `top:${(pinPos.y - 1) * 16}px;left:${(pinPos.x - 1) * 16}px;`
    const pin = bel`<span class="pin" style="${pinStyle}">📍</span>`

    return bel`<div class="app">
      ${matrix(160, clickHover, handleClick)}
      ${pin}
      <form id="form" onsubmit=${handleSubmit}>
        <input type="range" name="importance" min="1" max="20" step="1" value=${pinPos.x} />
        <input type="range" name="urgency" min="5" max="100" step="5" value=${(21 - pinPos.y) * 5} />
        <button type="submit">Send</button>
      </form>
    </div>`
  }

  return el
}

document.getElementById('app-root').appendChild(app())