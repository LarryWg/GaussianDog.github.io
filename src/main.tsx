import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import { Card, CardContent } from "@/components/ui/card"
import "./style.css"

function App() {
  const [previewReady, setPreviewReady] = useState(false)

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
          aria-label="Tricolor dog photograph and Gaussian reconstruction"
          aria-describedby="preview-hint"
          data-ready={previewReady}
        >
          <CardContent className="relative aspect-[488/584] overflow-hidden p-0">
            <img
              className="dog-photo absolute inset-0 h-full w-full object-cover"
              src={`${import.meta.env.BASE_URL}images/dog-photo.png`}
              alt="Original photograph of a seated black, white, and tan dog"
              width={488}
              height={584}
              draggable={false}
            />
            <img
              className="dog-preview absolute inset-0 h-full w-full object-contain opacity-0"
              src={`${import.meta.env.BASE_URL}images/dog-preview.png`}
              alt="Reconstructed Gaussian dog standing on a circular black grid against white"
              width={1000}
              height={1100}
              onLoad={() => setPreviewReady(true)}
              draggable={false}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>)
