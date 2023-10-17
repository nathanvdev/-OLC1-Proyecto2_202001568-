import { appserver } from './app.js'

const PORT = 5000
appserver.listen(PORT)
console.log(`Server en: http://localhost:${PORT}`)
