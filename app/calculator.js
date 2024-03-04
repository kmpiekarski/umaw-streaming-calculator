// Constants for royalty rates. Adjust these as needed.

const umawTotalRate = 0.0056
const umawMonthlyCap = 290000
const spotifyTotalRate = 0.0051446772
const spotifyMonthlyCap = 1000

// Calculate royalties for each type
const spotifyPayout = (plays) => {
  let payout = null
  payout = plays >= spotifyMonthlyCap ? plays * spotifyTotalRate : 0
  return payout
}
const umawPayout = (plays) => {
  console.log('plays: ' + plays)
  let payout = null
  payout = umawTotalRate * plays
  return payout
}

document.getElementById('plays').addEventListener('input', function () {
  let value = this.value.replace(/[^0-9]/g, '')

  // Convert the number string back to a number, then to a locale string to add commas
  let realValue = parseFloat(value)
  this.value = realValue.toLocaleString('en-US', { maximumFractionDigits: 0 })

  // If the input starts with a comma (e.g., ",234"), remove it
  if (this.value.charAt(0) === ',') {
    this.value = this.value.substr(1)
  }

  // If the initial value was empty or zero, it'll become 'NaN', so clear it
  if (this.value === 'NaN') {
    this.value = ''
    return
  }

  // Restrict user input
  if (realValue > 99999999999) {
    console.log('The maximum value is 99999999999.')
    realValue = 99999999999
    this.value = realValue.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }

  const plays = realValue

  let pdecimals = 0
  if (plays < 100000) pdecimals = 2

  const spotifyTotal = spotifyPayout(plays)
  const umawTotal = Math.min(umawPayout(plays), umawMonthlyCap)
  const total = spotifyTotal - umawTotal

  // Format the royalty values as currency

  document.getElementById('spotify-total-result').innerHTML =
    spotifyTotal.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: pdecimals,
      maximumFractionDigits: pdecimals,
    })
  document.getElementById('umaw-total-result').innerHTML =
    umawTotal.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: pdecimals,
      maximumFractionDigits: pdecimals,
    })
})
