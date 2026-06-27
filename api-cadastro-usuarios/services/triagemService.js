const classificacaoService = require('./classificacaoService');
const triagemModel = require('../models/triagemModel');

async function processarTriagem(dados, usuarioId = null) {
  // executa  a logica de classificaçao de risco
  const classificacao = classificacaoService.classificarRisco(dados.sintomas);
  //prepara o objeto para persistência
  const dadosTriagem = {
    sintomas: JSON.stringify({
      ...dados,
      resultado: classificacao,
    }),
    nivel_urgencia: classificacao.nivel,
    user_id: usuarioId,
  };

  const id = await triagemModel.criar(dadosTriagem);

  return {
    id,
    paciente: dados.paciente,
    sintomas: dados.sintomas,
    medicamentos: dados.medicamentos || [],
    alergias: dados.alergias || '',
    resultado: classificacao,
    criadoEm: new Date(),
  };
}

module.exports = {
  processarTriagem,
};