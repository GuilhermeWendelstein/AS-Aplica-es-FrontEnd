const triagemService = require('../services/triagemService');

async function criarTriagem(req, res) {
  try {
    const dados = req.body;
    // faz validaçao basica, verifica se paciente e os sintomas foram enviadoos
    
    if (!dados || !dados.paciente || !dados.sintomas) {
      return res.status(400).json({
        erro: 'Dados obrigatórios não enviados.',
      });
    }

    const usuarioId = req.usuario ? req.usuario.id : null;
    const resultado = await triagemService.processarTriagem(dados, usuarioId);

    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao processar triagem.',
      detalhe: error.message,
    });
  }
}

module.exports = {
  criarTriagem,
};