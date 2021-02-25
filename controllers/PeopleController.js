const People = require("../models/People");
class PeopleController {
	/**
   * @method list
   * @description Listagem de pessoas
   * @param {*} request
   * @param {*} response
   */
  async list(request, response){
		let people = await People.list();
		return response.json(people).status(200).end();
	}
  /**
   * @method insert
   * @description Inserção de uma pessoa
   * @param {*} request
   * @param {*} response
   */
  async insert(request,response){
		try{
			let people = request.body;
			people = await People.insert(people);
			if(people.constraint == "people_cpf_unique")
			return response.status(406).end("Duplicate CPF");
			if(people.detail)
			return response.status(400).end("Invalid Request");
			return response.json(people).status(200).end();
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

}
module.exports = new PeopleController();