var yo = require('yo-yo')
var matrix = require('../index.js')

var el = matrixInput({ x: 1, y: 20 })

function matrixInput (pinPos) {
  function handleHover (pos) {
    // console.log('Hover', pos)
  }

  function handleClick (pos) {
    yo.update(el, matrixInput(pos))
  }

  function handleSubmit (e) {
    e.preventDefault()

    console.log('importance', form.importance.value)
    console.log('urgency', form.urgency.value)
  }

  const pinStyle = `top:${(pinPos.y - 1) * 16}px;left:${(pinPos.x - 1) * 16}px;`
  const pin = yo`<span class="pin" style="${pinStyle}">️️㊙️</span>`

  return yo`<div class="app">
    ${matrix(160, handleClick, handleHover)}
    ${pin}
    <div class="name-importance">importance</div>
    <div class="name-urgency">urgency</div>
    <form id="form" onsubmit=${handleSubmit}>
      <div class="forminner">
        <div class="formgroup">
          <input type="range" id="importance" name="importance" min="1" max="20" step="1" value="${pinPos.x}" />
          <output for="importance">${pinPos.x}</output>
        </div>
        <div class="formgroup">
          <input type="range" name="urgency" min="5" max="100" step="5" value="${(21 - pinPos.y) * 5}" />
          <output for="urgency">${(21 - pinPos.y) * 5}</output>
        </div>
      </div>
    </form>
  </div>`
}

document.getElementById('app-root').appendChild(el)
