var bel = require('bel')
var raf = require('raf')

function pathLine(size) {
  return `M ${size} 0 L 0 0 0 ${size}`
}

function noop() {

}

module.exports = function (size, hover, click) {
  var smallSize = Math.floor(size / 10)
  var small = pathLine(smallSize)
  var normal = pathLine(size)
  var pos = { x: 0, y: 0 }

  const handleHover = hover ? hover : noop
  const handleClick = click ? click : noop

  function mousemove(e) {
    var rect = e.target.getBoundingClientRect()
    var x = e.clientX + 1 - rect.left
    var y = e.clientY + 1 - rect.top

    var gridX = x < 0 ? 0 : Math.ceil(x / smallSize)
    var gridY = y < 0 ? 0 : Math.ceil(y / smallSize)

    raf(function() {
      pos.x = gridX
      pos.y = gridY
      handleHover(pos)
    })
  }

  function here(e) {
    e.preventDefault()
    handleClick(pos)
  }

  var el = bel`<div style="width:100%;height:100%;"
    onclick=${here}
    onmousemove=${mousemove}>
    <svg width="100%" height="100%">
      <defs>
        <pattern id="smallGridLine" width="${smallSize}" height="${smallSize}" patternUnits="userSpaceOnUse">
          <path d="${small}" fill="none" stroke="gray" stroke-width="0.25" class="s" />
        </pattern>
        <pattern id="gridLine" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
          <rect width="${size}" height="${size}" fill="url(#smallGridLine)"/>
          <path d="${normal}" fill="none" stroke="gray" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridLine)" />
    </svg>
  </div>`

  return el
}
