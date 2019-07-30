function rollover() {
  var container = document.querySelector('#container')
  var links = Array.from(container.querySelectorAll('.rollover a'))

  function highlight(e) {
    e.preventDefault()
    var category = e.target.classList[0]
    var matches = links.filter(link => link.classList[0] === category)
    matches.map((item) => {
      item.classList.toggle('current')
    })
  }
  container.addEventListener('mouseover', highlight, false)
  container.addEventListener('mouseout', highlight, false)

  var here = container.querySelector('.all-gray')
  var cards = Array.from(container.querySelectorAll('.card'))

  function grayHighlight(e) {
    cards.map(item => {
      Array.from(item.children).map(child => {
        child.classList.toggle('all-gray')
      })
    })
  }
  here.addEventListener('mouseover', grayHighlight, false)
  here.addEventListener('mouseout', grayHighlight, false)

}
rollover()
