# Asmaa Alabed Training Center — Website Source

This archive contains the current Arabic/English website source, logo and public assets, plus its shared API-client package and dependency lockfile. It preserves the original pnpm workspace structure. The separate animated promotional video is not included.

## Requirements
- Node.js 22.16+ (or Node.js 24)
- pnpm 10

## Install and run
Open a terminal in this extracted folder:

```sh
pnpm install --frozen-lockfile
```

macOS / Linux:
```sh
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/asmaa-alabed-center run dev
```

Windows PowerShell:
```powershell
$env:PORT="5173"
$env:BASE_PATH="/"
pnpm --filter @workspace/asmaa-alabed-center run dev
```

Open http://localhost:5173 in your browser.

## Build for hosting
Set PORT=5173 and BASE_PATH=/ as above, then:
```sh
pnpm --filter @workspace/asmaa-alabed-center run build
```
Deploy the resulting `artifacts/asmaa-alabed-center/dist/public` folder to a static host. For subdirectory hosting, set BASE_PATH to the subdirectory path (including trailing slash) before building.

Use the website-specific commands above, not the original workspace-wide build command (which targets other applications not included here).

## Main files
- artifacts/asmaa-alabed-center/src/content.ts — Arabic and English content
- artifacts/asmaa-alabed-center/src/pages/site.tsx — page layout
- artifacts/asmaa-alabed-center/src/components/ — visual components and animations
- artifacts/asmaa-alabed-center/src/index.css — colors, typography, styling
- artifacts/asmaa-alabed-center/public/images/center-logo.jpg — center logo

No private credentials, environment files, node_modules, deployment state or build output are included. This marketing website needs no database or secret keys. Some photographs and web fonts load from external services and require an internet connection. The included workspace configuration retains its original Linux-oriented native-package overrides; other operating systems may need those overrides adjusted if their native build packages cannot be installed.
