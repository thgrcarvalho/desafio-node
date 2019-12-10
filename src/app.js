import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'express-async-errors'
import routes from './routes'

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares() {
    this.server.use(helmet())
    this.server.use(
      cors({
        origin: process.env.FRONT_URL,
      })
    )
    this.server.use(express.json())

  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      console.log(err)
      return res.status(500).json({ "mensagem": "Erro interno no servidor" })
    })
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
