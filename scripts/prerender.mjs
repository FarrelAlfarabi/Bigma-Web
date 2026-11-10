// Runs after the client and SSR builds. Puts the rendered page into dist/index.html
// so crawlers and no-JavaScript visitors get real content.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const htmlPath = resolve('dist/index.html')
const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)

const html = readFileSync(htmlPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('prerender: root marker not found in dist/index.html')

const body = render()
if (!body.includes('<h1')) throw new Error('prerender: rendered page has no <h1>')

writeFileSync(htmlPath, html.replace(marker, `<div id="root">${body}</div>`))
rmSync(resolve('dist-ssr'), { recursive: true, force: true })
console.log(`prerender: wrote ${body.length} bytes of HTML into dist/index.html`)
