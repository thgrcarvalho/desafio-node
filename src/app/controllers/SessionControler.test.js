import SessionController from './SessionController'
import { initializeUserDatabase, clearUserDatabase } from '../../test/dbMockData'

beforeEach(async () => {
  await initializeUserDatabase();
});

afterEach(async () => {
  await clearUserDatabase();
});

test("verifica se um usuário válido consegue logar no sistema", async () => {
  const req = {
    body: {
      email: 'fulano.ciclano@gmail.com',
      senha: '123456'
    }
  }

  const res = {}

  res.status = () => res;
  res.json = (user) => {
    const { nome, email, telefones, CEP } = user
    return {
      nome,
      email,
      telefones,
      CEP
    }
  }

  const returnReq = await SessionController.createSession(req, res)

  expect(returnReq).toEqual({
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
    CEP: '12345-666'
  })

})
