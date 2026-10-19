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
