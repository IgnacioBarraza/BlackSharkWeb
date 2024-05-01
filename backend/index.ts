import app from './app'
import { PORT } from './utils/config'

app.listen(PORT, () => {
    console.log('Server up!')
    console.log(`http://localhost:${PORT}`)
})