import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function adsIndexPlugin() {
  const adsDir = path.resolve(__dirname, 'public/ads')
  const indexFile = path.join(adsDir, 'index.json')

  function generate() {
    const ids = fs.readdirSync(adsDir).filter((name) => {
      if (name === 'index.json') return false
      return fs.statSync(path.join(adsDir, name)).isDirectory()
    })
    fs.writeFileSync(indexFile, JSON.stringify(ids.sort()) + '\n')
  }

  return {
    name: 'ads-index',
    buildStart() { generate() },
    configureServer(server: any) {
      generate()
      let timer: ReturnType<typeof setTimeout> | null = null
      fs.watch(adsDir, (_event, filename) => {
        if (filename === 'index.json') return
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          generate()
          server.ws.send({ type: 'full-reload' })
        }, 100)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), adsIndexPlugin()],
})
