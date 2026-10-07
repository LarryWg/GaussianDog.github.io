import { StrictMode, useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { Card, CardContent } from "@/components/ui/card"
import "./style.css"

function App() {
  const video = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [previewReady, setPreviewReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const active = hovered || focused

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(preference.matches)
    preference.addEventListener("change", update)
    return () => preference.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const player = video.current
    if (!player) return
    if (active && !reducedMotion) {
      void player.play().catch(() => {})
    } else {
      player.pause()
      player.currentTime = 0
    }
    return () => player.pause()
  }, [active, reducedMotion])

  return (
    <main className="min-h-svh bg-white px-6 py-16 sm:px-12 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="text-xl font-semibold tracking-tight">GaussianDog</h1>
          <p id="preview-hint" className="mt-2 text-sm text-neutral-500">
            Hover to see the reconstruction.
          </p>
        </header>
        <Card
          className="dog-card w-full max-w-[360px] gap-0 overflow-hidden rounded-2xl border-neutral-200 py-0 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
          tabIndex={0}
          role="figure"
          aria-label="Tricolor dog photograph and animated Gaussian reconstruction"
          aria-describedby="preview-hint"
          data-preview={active && previewReady}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <CardContent className="relative aspect-[488/584] overflow-hidden p-0">
            <div className="dog-photo absolute inset-3 overflow-hidden rounded-lg">
              <img
                className="h-full w-full object-contain [clip-path:inset(0_3px_round_8px)]"
                src={`${import.meta.env.BASE_URL}images/dog-photo.png`}
                alt="Full original photograph of a seated black, white, and tan dog"
                width={488}
                height={584}
                draggable={false}
              />
            </div>
            <video
              ref={video}
              className="dog-preview absolute inset-0 h-full w-full object-contain opacity-0"
              src={`${import.meta.env.BASE_URL}images/dog-preview.mp4`}
              aria-label="Gaussian dog looking around on a rotating circular black grid"
              width={800}
              height={960}
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => setPreviewReady(true)}
              onError={() => setPreviewReady(false)}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>)
