export default async (req, res, next) => {
  return res.status(404).json({ mensagem: 'A página não pôde ser encontrada' });
};
