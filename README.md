# GaussianDog Viewer

A minimal photo gallery for [GaussianDog](https://github.com/LarryWg/GaussianDog).

Hover over the dog photograph, or focus the card with the Tab key, to play a looping preview of the dog looking around on a rotating circular black grid. There is no click action or full viewer yet.

The preview is a 12-second video rendered from the actual Gaussian reconstruction. Playback pauses when the card is no longer hovered or focused. Reduced-motion preferences show a still frame. The website does not download the research model or require WebGL.

## Development

Requires Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

Built with React, Vite, Tailwind CSS, and the [shadcn/ui Card](https://ui.shadcn.com/docs/components/card). The Card source is distributed under shadcn/ui's MIT license, included in `THIRD_PARTY_NOTICES.md`.

The source photograph was provided for Huawei's Fetching Reality Challenge. The preview was rendered from the GaussianDog research example. These demonstration images are not offered under the component license.

## Publishing

The GitHub Actions workflow builds and deploys to GitHub Pages. Set the repository's Pages source to GitHub Actions. Relative asset paths support a project URL as well as a custom domain.
