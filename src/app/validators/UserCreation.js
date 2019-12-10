import * as Yup from 'yup'
import { formatUserInput } from '../util/userDataFormat'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6),
      cep: Yup.string().required().min(9).max(9)
    })

    await schema.validate(
      formatUserInput(req.body),
      { abortEarly: false }
    )

    req.body = formatUserInput(req.body)

    return next()
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner })
  }
}
