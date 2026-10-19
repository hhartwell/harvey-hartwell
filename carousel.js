const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
const rotateEvery = 5000

const carousels = document.querySelectorAll("[data-carousel]")

carousels.forEach((carousel) => {
  const slides = [...carousel.querySelectorAll(".slide")]
  const dots = carousel.querySelector("[data-dots]")
  const dotButtons = slides.map((slide, slideIndex) => {
    const dot = document.createElement("button")
    const caption = slide.querySelector("figcaption")
    dot.type = "button"
    dot.setAttribute("aria-label", caption ? caption.textContent : `Photo ${slideIndex + 1}`)
    dots.appendChild(dot)
    return dot
  })
  let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")))
  let startX = null
  let timer = null
  let paused = false

  const show = (next) => {
    index = (next + slides.length) % slides.length
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index
      slide.classList.toggle("is-active", active)
      slide.setAttribute("aria-hidden", active ? "false" : "true")
    })
    dotButtons.forEach((dot, dotIndex) => {
      const active = dotIndex === index
      dot.classList.toggle("is-active", active)
      if (active) dot.setAttribute("aria-current", "true")
      else dot.removeAttribute("aria-current")
    })
  }

  const stop = () => {
    if (timer === null) return
    clearInterval(timer)
    timer = null
  }

  const start = () => {
    if (paused || reducedMotion.matches || slides.length < 2) return
    stop()
    timer = setInterval(() => {
      show(index + 1)
    }, rotateEvery)
  }

  const turn = (next) => {
    show(next)
    start()
  }

  carousel.querySelector("[data-prev]").addEventListener("click", () => {
    turn(index - 1)
  })
  carousel.querySelector("[data-next]").addEventListener("click", () => {
    turn(index + 1)
  })

  dotButtons.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      turn(dotIndex)
    })
  })

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") turn(index - 1)
    if (event.key === "ArrowRight") turn(index + 1)
  })

  carousel.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) {
      startX = null
      return
    }
    startX = event.clientX
  })

  carousel.addEventListener("pointerup", (event) => {
    if (startX === null) return
    const delta = event.clientX - startX
    if (delta > 40) turn(index - 1)
    if (delta < -40) turn(index + 1)
    startX = null
  })

  carousel.addEventListener("pointerenter", () => {
    paused = true
    stop()
  })

  carousel.addEventListener("pointerleave", () => {
    paused = carousel.contains(document.activeElement)
    start()
  })

  carousel.addEventListener("focusin", () => {
    paused = true
    stop()
  })

  carousel.addEventListener("focusout", () => {
    paused = carousel.matches(":hover")
    start()
  })

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop()
      return
    }
    start()
  })

  show(index)
  start()
})
