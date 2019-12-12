import UserController from './UserController'
import { clearUserDatabase } from '../../test/dbMockData'

beforeEach(async () => {
  await clearUserDatabase();
});

afterEach(async () => {
  await clearUserDatabase();
});

test('verifica o método de criação de usuário', async () => {

  const { req, res } = setupInputData()

  const returnReq = await UserController.createUser(req, res)

  expect(returnReq).toEqual({
    ...res,
    nome: 'Fulano Ciclano',
    email: 'fulano.ciclano@gmail.com',
    telefones: [
      {
        numero: '123456789',
        ddd: '11'
      },
      {
        numero: '954115665',
        ddd: '11'
      }
    ],
    CEP: '12345-666',
  })
})

test('verifica se o método de criação de usuário está impedindo criação com o mesmo e-mail', async () => {

  const { req: reqFirst, res: resFirst } = setupInputData()

  await UserController.createUser(reqFirst, resFirst)

  const { req, res } = setupInputData()

  const returnReq = await UserController.createUser(req, res)

  expect(returnReq).toEqual({
    ...res,
    mensagem: 'E-mail já existente',
    statusCode: 400,
  })
})

const setupInputData = () => {
  const req = {
    body: {
      'nome': 'Fulano Ciclano',
      'email': 'fulano.ciclano@gmail.com',
      'senha': '123456',
      'Phones': [
        {
          'numero': '123456789',
          'ddd': '11'
        }, {
          'numero': '954115665',
          'ddd': '11'
        }],
      'cep': '12345-666'
    }
  }

  let res = {}

  res.status = (status) => {
    if (status) {
      res = {
        ...res,
        statusCode: status
      }
    }

    return res
  };

  res.json = (user) => {
    const { nome, email, telefones, CEP, mensagem } = user

    if (mensagem) {
      res = {
        ...res,
        mensagem
      }
    } else {
      res = {
        ...res,
        nome,
        email,
        telefones,
        CEP
      }
    }

    return res
  }

  return {
    req,
    res
  }
}
