const db = require('../../db/models/index')
const Category = db.categories
const {
	successResponse,
	errorResponse,
} = require('../../responseService');
module.exports = {
    async getAllCategories(req, res, next){
        try{
        const response = await Category.findAll({
            attributes: [
                'catid',
                'catdesc',
                'catmid',
            ],
        });
        res.status(200).send(response);
    }
    catch(error){
    errorResponse(res, 'Could not perform operation!', 400);
    }
},
}