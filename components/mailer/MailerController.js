const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
  async sendMail(req, res, next) {
    try {
      const { oid } = req.body;
      const { cname } = req.body;
      const { cmid } = req.body;
      const { clast } = req.body;
      const { cphone } = req.body;
      const { selectedAddress } = req.body;
      const { totalPrice } = req.body;
      const { products } = req.body;
      const { items } = req.body;

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_SENDER_MAIL,
          pass: process.env.GMAIL_SENDER_APP_PASSWORD,
        },
      });

      let mailDetails = {
        from: process.env.GMAIL_SENDER_MAIL,
        to: process.env.GMAIL_RECEIVER_MAIL,
        subject: "Order# " + oid,
        html: `
                <body style="background-color: #008080; padding: 2rem 0 2rem 2rem;">
                <h2 style="color: #fff;">SmartMart Delivery Request:</h2>
                <h3 style="color: #fff;">Client First Name: ${cname}</h3>
                <h3 style="color: #fff;">Client Middle Name: ${cmid}</h3>
                <h3 style="color: #fff;">Client Last Name: ${clast}</h3>
                <h3 style="color: #fff;">Client Phone Number: ${cphone}</h3>
                <h3 style="color: #fff;">Client Address: ${selectedAddress}</h3>
                <h3 style="color: #fff;">Total Price: ${totalPrice}</h3>
                <table>
                    <thead>
                        <tr>
                            <th style="color:white;">Item Description</th>
                            <th style="color:white;">Quantity</th>
                            <th style="color:white;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="color:white;text-align: center;">${products.map(
                              (product) => `<p>${product.pdesc}</p>`
                            )}</td>
                            <td style="color:white;text-align: center;">${items.map(
                              (item) => `<p>${item.olqtty}</p>`
                            )}</td>
                            <td style="color:white;text-align: center;">${items.map(
                              (item) => `<p>${item.olprice}</p>`
                            )}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style="color:white;text-align: center;">Total Price</td>
                            <td style="color:white;text-align: center;">${totalPrice}</td>
                        </tr>
                    </tfoot>
                </table>
                </body>
                `,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          errorResponse(err, "Could not Perform Operation! ", 400);
        } else {
          console.log("Email Sent Successfully!");
        }
      });
    } catch (error) {
      errorResponse(error, "Could not Perform Operation! ", 400);
    }
  },
};
