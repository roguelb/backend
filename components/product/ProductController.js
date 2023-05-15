const db = require("../../db/models/index");
const Product = db.products;
const { successResponse, errorResponse } = require("../../responseService");
const { Op } = require("sequelize");
const { validateCreateProductBody } = require("../../RequestBodyValidator");
module.exports = {
  // This Method Gets All Products
  async getAllProducts(req, res, next) {
    try {
      // const reqHeaderApiSecretKey = req.headers.authorization;
      // const localApiSecretKey = process.env.API_SECRET_KEY;
      // if (
      //   !reqHeaderApiSecretKey ||
      //   reqHeaderApiSecretKey !== localApiSecretKey
      // ) {
      //   return errorResponse(res, 'API Violation!', 401);
      // }
      const response = await Product.findAll({
        attributes: ["pid", "pdesc", "pprice", "imageurl", "pshow"],
      });
      successResponse(res, response, "Products Received!");
      next();
    } catch (error) {
      errorResponse(res, "Could not perform operation!", 400) && next(error);
    }
  },

  // Get a product by id
  async getProductById(req, res, next) {
    try {
      // const reqHeaderApiSecretKey = req.headers.authorization;
      // const localApiSecretKey = process.env.API_SECRET_KEY;
      // if (
      //   !reqHeaderApiSecretKey ||
      //   reqHeaderApiSecretKey !== localApiSecretKey
      // ) {
      //   return errorResponse(res, 'API Violation!', 401);
      // }
      const { pid } = req.params;
      const response = await Product.findOne({
        where: {
          pid,
        },
      });
      if (!response) {
        return errorResponse(res, "Product Not Found!", 401);
      }
      successResponse(res, response, "Product Received!", 200);
      return next();
    } catch (error) {
      errorResponse(res, "Could not perform operation!", 400) && next(error);
    }
  },

  // Add new Product
  async addProduct(req, res, next) {
    try {
      // const reqHeaderApiSecretKey = req.headers.authorization;
      // const localApiSecretKey = process.env.API_SECRET_KEY;
      // if (
      //   !reqHeaderApiSecretKey ||
      //   reqHeaderApiSecretKey !== localApiSecretKey
      // ) {
      //   return errorResponse(res, 'API Violation!', 401);
      // }
      const isRequestBodyValid = validateCreateProductBody(req.body);
      if (!isRequestBodyValid) {
        return errorResponse(res, "Form is not valid!", 401);
      }
      const { barcode, description, price, imageurl, ShowHide } = req.body;
      const doProductExist = await Product.findOne({
        where: {
          pid: barcode,
        },
      });
      if (doProductExist) {
        return errorResponse(res, "Product Already Exist!", 401);
      }
      await Product.create({
        pid: barcode,
        pdesc: description,
        pprice: price,
        imageurl,
        pshow: ShowHide,
      });
      successResponse(res, true, "Product Inserted Successfully!");
      return next();
    } catch (error) {
      return (
        errorResponse(res, "Could not perform operation!", 400) && next(error)
      );
    }
  },
  // This Method Updates a Single Product
  async updateProduct(req, res, next) {
    try {
      const { description } = req.body;
      const { price } = req.body;
      const { imageurl } = req.body;
      const { ShowHide } = req.body;
      const { pid } = req.params;
      await Product.update(
        {
          pdesc: description,
          pprice: price,
          imageurl,
          pshow: ShowHide,
        },
        {
          where: {
            pid,
          },
        }
      );
      successResponse(res, true, "Product Updated Successfully!");
    } catch (error) {
      errorResponse(error, "Could not Perform Operation! ", 400);
    }
  },
  async searchProductResult(req, res, next) {
    try {
      const { search } = req.body;
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            {
              pdesc: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              pid: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
        attributes: ["pid", "pdesc", "catid", "pprice", "imageurl", "pshow"],
      });
      res.status(200).send(products);
    } catch (error) {
      errorResponse(error, "Could not Perform Operation! ", 400);
    }
  },
};
