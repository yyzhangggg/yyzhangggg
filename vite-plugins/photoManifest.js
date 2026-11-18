import fs from 'node:fs'
import path from 'node:path'

/**
 * Exposes `virtual:photo-manifest`: { [folder]: ['images/<folder>/<n>.<ext>', ...] }
 *
 * For each folder in public/images, walks the numbers 0, 1, 2, ... and keeps
 * every file named `<n>.jpg|jpeg|png|webp` (any case). Missing numbers are
 * skipped, but once more than MAX_GAP numbers in a row are missing, it stops.
 */
const ID = 'virtual:photo-manifest'
const RESOLVED_ID = '\0' + ID
const FILE = /^(\d+)\.(jpe?g|png|webp)$/i
const MAX_GAP = 5

export default function photoManifest({ dir = 'public/images' } = {}) {
  let base

  function scan() {
    const manifest = {}
    for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const byNumber = new Map()
      for (const file of fs.readdirSync(path.join(base, entry.name))) {
        const match = file.match(FILE)
        if (match && !byNumber.has(Number(match[1]))) byNumber.set(Number(match[1]), file)
      }
      const files = []
      let gap = 0
      for (let n = 0; gap <= MAX_GAP; n++) {
        const file = byNumber.get(n)
        if (file) {
          files.push(`images/${entry.name}/${file}`)
          gap = 0
        } else {
          gap++
        }
      }
      manifest[entry.name] = files
    }
    return manifest
  }

  return {
    name: 'photo-manifest',
    configResolved(config) {
      base = path.resolve(config.root, dir)
    },
    resolveId(id) {
      if (id === ID) return RESOLVED_ID
    },
    load(id) {
      if (id === RESOLVED_ID) return `export default ${JSON.stringify(scan())}`
    },
    configureServer(server) {
      // Re-scan when photos are added or removed during `npm run dev`.
      const refresh = (file) => {
        if (!file.startsWith(base)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (!mod) return
        server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}
