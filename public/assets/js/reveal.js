(function() {
  const currentCards = document.querySelectorAll('#grid.hidden .card.current')

  function reveal(e) {
    e.preventDefault()
    e.stopPropagation()
    let target = e.currentTarget
    Array.from(target.children).map(item => item.classList.toggle('current'))
  }

  Array.from(currentCards).map(card => {
    card.addEventListener('mouseover', reveal, false)
    card.addEventListener('mouseout', reveal, false)
  })
})()
