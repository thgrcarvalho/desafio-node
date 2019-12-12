import instantiatedModels from '../database'

const { User, Phone } = instantiatedModels

const initializeUserDatabase = async () => {
  const user = {
    nome: 'Fulano Ciclano',
    email: 'fulano.ciclano@gmail.com',
    senha: '123456',
    Phones: [
      {
        numero: '123456789',
        ddd: '11'
      }, {
        numero: '954115665',
        ddd: '11'
      }
    ],
    cep: '12345-666'
  }

  await User.create(user, {
    include: [{
      model: Phone
    }]
  })
}

const clearUserDatabase = async () => {
  await User.destroy({
    where: {},
    include: [{
      model: Phone
    }]
  })
}

export { initializeUserDatabase, clearUserDatabase }
