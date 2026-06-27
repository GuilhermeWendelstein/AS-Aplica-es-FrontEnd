const knex = require('../database/connection');

async function criar(dadosTriagem) {
//insere os dados da triagem e retorna id gerado
    const ids = await knex('triagens').insert(dadosTriagem);
  return ids[0];
}

module.exports = {
  criar,
};