import confetti from 'canvas-confetti'

/** Fire a short burst for personal-best moments in Builder. */
export function triggerLoukyConfetti(): void {
  const count = 160
  const defaults = { origin: { y: 0.65 }, zIndex: 9999 }

  function fire(particleRatio: number, opts: Record<string, unknown>) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ['#a78bfa', '#e879f9', '#fcd34d'] })
  fire(0.2, { spread: 60, colors: ['#a78bfa', '#38bdf8'] })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.85, colors: ['#c4b5fd', '#f472b6'] })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.1 })
}
