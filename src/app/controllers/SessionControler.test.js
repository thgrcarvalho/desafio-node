import SessionController from './SessionController'
import instantiatedModels from '../../database'

const { User, Phone } = instantiatedModels

beforeEach(async () => {
  await initializeUserDatabase();
});

afterEach(async () => {
  await clearCityUserDatabase();
});

test("teste", async() => {
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

const initializeUserDatabase = async() => {
  const user = {
    nome: 'Fulano Ciclano',
    email: 'fulano.ciclano@gmail.com',
    senha: '123456',
    Phones: [
      {
    		numero: '123456789',
    		ddd: '11'
    	},{
    		numero: '954115665',
    		ddd: '11'
    	}
    ],
    cep: '12345-666'
  }

  await User.create(user,{
    include: [{
      model: Phone
    }]
  })
}

const clearCityUserDatabase = async() => {
  await User.destroy({
    where: {},
    include: [{
      model: Phone
    }]
  })
}
