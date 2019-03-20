document.querySelectorAll('tr').forEach((e) => {
  let team = e.querySelector('.team-name')
  let rating = e.querySelector('.rating')
  if (team) {
    team = team.innerHTML.split(' <')[0]
    console.log(`team: ${team}`)
  }

  if (rating) {
    rating = rating.innerHTML
    console.log(`rating: ${rating}`)
  }
})
