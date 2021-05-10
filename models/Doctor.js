const knex = require('../database/connection');

class Doctor {

  /**
   * @method list
   * @author HeyBrunoXavier
   * @description Listagem de Médicos
   */
  async list(){
		try {
			var o_response = await knex.select("*").from("doctor");
			if(o_response.length > 0){
				delete o_response[0].password;
				return o_response;
			}
		}catch (erro) {
			console.log(erro);
			return false;
		}
	}
  /**
   * @method insert
   * @param {*} doctor
   * @author HeyBrunoXavier
   * @description Inserção de Médicos
   */
  async insert(doctor){
		try{
			let o_doctor = await knex('doctor').insert(doctor).returning(['id','name','crm','cep','telefone','celular','especialidade']);
			return o_doctor;
		}catch(error){
			console.error(error);
			return error
		}
	}
}
module.exports = new Doctor();