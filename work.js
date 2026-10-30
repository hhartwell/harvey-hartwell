// January 2020, matching "CKCollab, 2020–present."
const ckcollabStart = { year: 2020, month: 0 }

const numberWords = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen", "twenty", "twenty-one", "twenty-two",
  "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven",
  "twenty-eight", "twenty-nine", "thirty",
]

const tenurePhrase = (now = new Date()) => {
  let years = now.getFullYear() - ckcollabStart.year
  let months = now.getMonth() - ckcollabStart.month
  if (months < 0) {
    years -= 1
    months += 12
  }

  const almostNext = months >= 6
  const count = almostNext ? years + 1 : years
  const word = numberWords[count] || String(count)
  const unit = count === 1 ? "year" : "years"
  return almostNext ? `almost ${word} ${unit}` : `${word} ${unit}`
}

const tenure = document.querySelector("[data-tenure]")
if (tenure) tenure.textContent = tenurePhrase()

const sections = document.querySelectorAll(".work details")

const closeOthers = (current) => {
  sections.forEach((other) => {
    if (other !== current) other.open = false
  })
}

sections.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return
    closeOthers(item)
  })
})

const openWork = () => {
  const id = location.hash.replace("#", "")
  const item = id && document.getElementById(id)
  if (!item || item.tagName !== "DETAILS") return
  item.open = true
}

openWork()
window.addEventListener("hashchange", openWork)
