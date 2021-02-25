class Root {
  /**
   * @method all
   * @description Rota de Apresentação
   * @param {*} request
   * @param {*} response
   */
	async all(request,response){
		let o_apresponseentation = {
			"application": process.env.MS_BASE,
			"type": process.env.TYPE,
			"version": process.env.VERSION,
			"author": process.env.AUTHOR
		}
		return response.json(o_apresponseentation).status(200).end();
	}
}
module.exports = new Root();
