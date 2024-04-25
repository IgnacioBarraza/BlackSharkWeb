import app from './app'
import { PORT, MYSQLPORT } from './utils/config'

app.listen(PORT, () => {
    console.log('Server up!')
    console.log(`http://localhost:${PORT}`)
})