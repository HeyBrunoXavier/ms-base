const knex = require('../database/connection');
class Asset{
  async list(){
    try {
      var result = await knex.select("*").from("account");
      if(result.length > 0)
        return result;
    }catch (erro) {
      console.log(erro);
      return false;
    }
  }


}
module.exports = new Asset();