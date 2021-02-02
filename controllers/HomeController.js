let user = require("../models/User");
class HomeController{

    async list(req, res){
        let o_response = await user.list();
        return res.json(o_response).status(200).end();
    }

}

module.exports = new HomeController();