class Root {
  /**
   * @method all
   * @description Rota de Apresentação
   * @param {*} request
   * @param {*} response
   */
	async all(request,response){
		let o_apresentation = {
			"application": process.env.MS_DOC,
			"type": process.env.TYPE,
			"version": process.env.VERSION,
			"author": process.env.AUTHOR
		}
		return response.json(o_apresentation).status(200).end();
	}
}
module.exports = new Root();
