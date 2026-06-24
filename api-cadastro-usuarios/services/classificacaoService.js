function classificarRisco(sintomas) {
  const dor = Number(sintomas.nivelDor);
  const temFebre = sintomas.temFebre === true;

  if (dor >= 8) {
    return {
      nivel: "Alto",
      recomendacao:
        "Procure atendimento médico com urgência. A dor informada é intensa.",
    };
  }

  if (temFebre || dor >= 5) {
    return {
      nivel: "Médio",
      recomendacao:
        "Recomenda-se procurar atendimento médico ou acompanhar os sintomas com atenção.",
    };
  }

  return {
    nivel: "Baixo",
    recomendacao:
      "Sintomas leves. Mantenha repouso e observe se há piora no quadro.",
  };
}

module.exports = {
  classificarRisco,
};