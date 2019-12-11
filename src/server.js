// server and app files are separeted because of TDD. TDD does not need a server to run, just instanciate a App class.
import app from './app'

const port = process.env.PORT || 3003

app.listen(port)
