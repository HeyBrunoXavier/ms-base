class Root {
	async all(req,res){
		let o_apresentation = {
			"application": process.env.MS_BASE,
			"type": process.env.TYPE,
			"version": process.env.VERSION,
			"author": process.env.AUTHOR
		}
		return res.json(o_apresentation).status(200).end();
	}
}
module.exports = new Root();
