const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const { port, env } = require('../config/vars')
const nuxtConfig = require('../../nuxt.config')

const app = express()

app.set('port', port)

// Import and Set Nuxt.js options
nuxtConfig.dev = !(env === 'production')

async function start() {
    app.get('/v1/status', function(req, res) {
        res.send('OK')
    })

    // Init Nuxt.js
    const nuxt = new Nuxt(nuxtConfig)

    // Build only in dev mode
    if (nuxtConfig.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, () =>
        console.info('Server started on port ' + port + '(' + env + ')')
    )
}
start()
