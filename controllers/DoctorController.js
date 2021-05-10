const Doctor = require("../models/Doctor");
class doctorController {
	/**
   * @method list
   * @description Listagem de pessoas
   * @param {*} request
   * @param {*} response
   */
  async list(request, response){
		let doctor = await Doctor.list();
		return response.json(doctor).status(200).end();
	}
  /**
   * @method insert
   * @description Inserção de uma pessoa
   * @param {*} request
   * @param {*} response
   */
  async insert(request,response){
		try{
			let doctor = await Doctor.insert(request.body);
			if(doctor.constraint == "doctor_crm_unique") return response.status(406).send("Duplicate CRM");
			if(doctor.detail) return response.status(400).send("Invalid Request");
			return response.json(doctor).status(200).end();
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

}
module.exports = new doctorController();