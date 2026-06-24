const triagemService = require("../services/triagemService");

async function criarTriagem(req, res) {
  try {
    const dados = req.body;

    if (!dados || !dados.paciente || !dados.sintomas) {
      return res.status(400).json({
        erro: "Dados obrigatórios não enviados.",
      });
    }

    const resultado = await triagemService.processarTriagem(dados);

    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao processar triagem.",
      detalhe: error.message,
    });
  }
}

module.exports = {
  criarTriagem,
};