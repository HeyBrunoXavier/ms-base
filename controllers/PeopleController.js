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
			let people = await People.insert(request.body);
			if(people.constraint == "people_email_unique") return response.status(406).end("ERR_DUPLICATE_EMAIL");
			return response.json(people).status(200).end();
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

	/**
  	* @method view
   	* @description Visualização de uma pessoa
   	* @param {*} request
   	* @param {*} response
  	*/
	  async view(request,response){
		try{
			console.log(request.params.id);
			if(request.params.id){
				let find_people = await People.list();
				for(let st_people of find_people){
					if(request.params.id == st_people.id){
						let people = await People.view(request.params.id);
						return response.json(people).status(200).end();
					}
				}
				return response.status(404).end("Id not found");
			}else{
				return response.status(400).end();
			}
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

	/**
  	* @method update
   	* @description Atualização de uma pessoa
   	* @param {*} request
   	* @param {*} response
  	*/
	  async update(request,response){
		try{
			let id = request.params.id;
			let name = request.body.name;
			let phone = request.body.phone;
			let email = request.body.email;
			let type = request.body.type;

			if(id){
				let people = await People.updated(id,name,phone,email,type);
				if(people.constraint == "people_email_unique") return response.status(406).end("ERR_DUPLICATE_EMAIL");
				return response.json(people).status(200).end();
			}
			else{
				return response.status(400).end();
			}
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

	/**
  	* @method delete
   	* @description Exclusão de uma pessoa
   	* @param {*} request
   	* @param {*} response
  	*/
	  async delete(request,response){
		try{
			let id = request.params.id;
			if(id){
				let people = await People.delete(id);
				return response.json(people).status(200).end();
			}
			else{
				return response.status(400).end();
			}
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}


}
module.exports = new PeopleController();