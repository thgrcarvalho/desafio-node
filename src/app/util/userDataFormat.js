const formatUserInput = (inputJson) => {
  const {
    nome,
    email,
    senha,
    telefones,
    CEP,
  } = inputJson

  const teste = {
    nome,
    email,
    senha,
    Phones: telefones,
    cep: CEP
  }

  console.log(teste)

  return teste
}

const formatUserOutput = (outputJson) => {

  const {
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
  } = outputJson

    return {
      id,
      nome,
      email,
      telefones: formatPhones(Phones),
      senha: senhaHash,
      CEP: cep,
      token,
      data_criacao: createdAt,
      data_atualizacao: updatedAt,
      ultimo_login: ultimoLogin
    }
}

const formatPhones = (Phones) => {
  return Phones.map(Phone => {
    const {
      numero,
      ddd
    } = Phone

    return {
      numero,
      ddd
    }
  })
}

export { formatUserInput, formatUserOutput }
