const db = require("../../db/models/index");
const User = db.users;
const ClientUser = db.clientuser;
const crypto = require("crypto");
const expressJwt = require("express-jwt");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cookie = require("cookie");
const bcrypt = require("bcryptjs");
const { successResponse, errorResponse } = require("../../responseService");
const jwt = require("jsonwebtoken");
module.exports = {
  async getAllUsers(req, res, next) {
    try {
      // const accessToken = req.headers.authorization;
      // if (!accessToken) {
      //   return res.status(401).send("Unauthorized, Please login!");
      // }
      let response = await User.findAll({
        attributes: ["username"],
      });
      if (response) {
        successResponse(res, response, "Users Received!");
        next();
      }
    } catch (error) {
      errorResponse(error, "Could not Perform Operation! ", 400);
    }
  },

  async getSingleUserByUsername(req, res, next) {
    try {
      // const accessToken = req.headers.authorization;
      // if (!accessToken) {
      //   return res.status(401).send("Unauthorized, Please login!");
      // }
      const { username } = req.params;
      const response = await User.findOne({
        where: {
          username,
        },
      });
      res.status(200).send(response);
    } catch (error) {
      errorResponse(error, "Could not Perform Operation! ", 400);
    }
  },

  async login(req, res, next) {
    try {
      const secret_key = process.env.API_SECRET_KEY || "secret_key";
      const { username } = req.body;
      const { password } = req.body;
      const response = await User.findOne({
        where: {
          username,
        },
      });
      if (response) {
        //const isMatchedPassword = await bcrypt.compare(password,response.password);
        if (password === response.password) {
          const payload = {
            username: response.username,
            level: response.level,
          };
          const options = {
            expiresIn: "1h",
          };
          const accessToken = jwt.sign(payload, secret_key, options);
          successResponse(res, accessToken, "Login Success!");
          next();
        } else {
          return errorResponse(res, "Wrong Password", 401);
        }
      } else {
        const response = await ClientUser.findOne({
          where: {
            username,
          },
        });
        if (response) {
          //const isMatchedPassword = await bcrypt.compare(password,response.password);
          if (password === response.password) {
            const payload = {
              username: response.username,
            };
            const options = {
              expiresIn: "1h", // expires in 1 hour
            };
            const accessToken = jwt.sign(payload, secret_key, options);
            successResponse(res, accessToken, "Login Success!");
            next();
          } else {
            return errorResponse(res, "Wrong password! ", 401);
          }
        } else {
          return errorResponse(res, "Wrong Username! ", 401);
        }
      }
    } catch (error) {
      return errorResponse(error, "Could not Perform Operation! ", 400);
    }
  },
  async editUser(req, res, next) {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        return res.status(401).send("Unauthorized, Please login!");
      }
      const { username, password, level } = req.body;
      const response = await User.update(
        {
          password,
          level,
        },
        {
          where: {
            username,
          },
        }
      );
      if (response) {
        res.send({ message: "User Updated Successfully!!" });
      } else {
        res.send({ message: "User Update Failed ):" });
      }
    } catch (error) {
      res.send({ message: "Fail, Please try again later!" });
    }
  },
  async createNewUser(req, res, next) {
    try {
      const username = req.body.username.toLowerCase();
      // const accessToken = req.headers.authorization;
      // if (!accessToken) {
      //   return res.status(401).send("Unauthorized, Please login!");
      // }
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (user) {
        return res.status(401).send({ message: "User already exist!" });
      } else {
        const { password } = req.body;
        const { level } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, hashedPassword, level });
        res.send({ message: "User created successfully!", code: 200 });
      }
    } catch (error) {
      res.send({ message: "Could not Perform Operation!", code: 400 });
    }
  },
};
