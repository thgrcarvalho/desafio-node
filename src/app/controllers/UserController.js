import instantiatedModels from '../../database'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { formatUserOutput } from '../util/userDataFormat'

const { User, Phone } = instantiatedModels

class UserController {

  async createUser(req, res) {

    const emailAlreadyExists = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (emailAlreadyExists) {
      return res.status(400).json({ mensagem: 'E-mail já existente' })
    }

    const {
      id,
      nome,
      email,
      Phones,
      senhaHash,
      cep,
      createdAt,
      updatedAt,
      ultimoLogin
    } = await User.create(req.body,{
        include: [{
          model: Phone
        }]
      }
    )

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    })

    await User.update(
      { token },
      { where: {id} }
    )

    const geolocation = null

    return res.json(
      formatUserOutput({
        id,
        nome,
        email,
        Phones,
        senhaHash,
        cep,
        geolocation,
        token,
        createdAt,
        updatedAt,
        ultimoLogin
      })
    )
  }

  async find(req, res) {
    const authHeader = req.headers.authorization
    const [, token] = authHeader.split(' ')
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Phone
      }]
    })

    if (token !== user.token) {
      return res.status(401).json({ mensagem: 'Não autorizado' })
    }

    return res.json(formatUserOutput(user))
  }
}
export default new UserController()
