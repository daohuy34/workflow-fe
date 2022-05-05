const path = require('path')

// import .env variables
require('dotenv-safe').load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example')
})

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    version: process.env.VERSION || 'both',
    cloudinary_url: process.env.CLOUDINARY_URL,
    cloudinary_name: process.env.CLOUDINARY_NAME
}
