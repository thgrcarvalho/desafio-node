import Router from 'express'
import UserController from './app/controllers/UserController'

import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/authentication'
import validateSessionCreation from './app/validators/SessionCreation'
import validateUserCreation from './app/validators/UserCreation'

const routes = new Router()

routes.post(
  '/sessions',
  validateSessionCreation,
  SessionController.createSession
)

routes.post('/users',
  validateUserCreation,
  UserController.createUser
)

routes.get('/users/:id', authMiddleware, UserController.find)

export default routes
