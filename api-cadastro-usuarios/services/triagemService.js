const classificacaoService = require("./classificacaoService");

async function processarTriagem(dados) {
  const classificacao = classificacaoService.classificarRisco(dados.sintomas);

  return {
    paciente: dados.paciente,
    sintomas: dados.sintomas,
    medicamentos: dados.medicamentos || [],
    alergias: dados.alergias || "",
    resultado: classificacao,
    criadoEm: new Date(),
  };
}

module.exports = {
  processarTriagem,
};