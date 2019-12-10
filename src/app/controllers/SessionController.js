import jwt from 'jsonwebtoken'
import instantiatedModels from '../../database'
import authConfig from '../../config/auth'
import { formatUserOutput } from '../util/userDataFormat'

const { User, Phone } = instantiatedModels

class SessionController {
  async createSession(req, res) {
    const { email, senha } = req.body

    const user = await User.findOne({
      where: {
        email
      },
      include: [{
        model: Phone
      }]
    })
    if (!user) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos' })
    }
    if (!(await user.checkPassword(senha))) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos' })
    }
    const {
      id,
      nome,
      Phones,
      senhaHash,
      cep,
      createdAt,
      updatedAt,
      ultimoLogin
    } = user

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    })

    await user.update({
       token,
       ultimoLogin: new Date()
      },
      {
        where: id
      }
    )

    return res.json(
      formatUserOutput({
        id,
        nome,
        email,
        Phones,
        senhaHash,
        cep,
        token,
        createdAt,
        updatedAt,
        ultimoLogin,
      })
    )
  }
}

export default new SessionController()
