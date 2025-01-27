import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MYEMAIL,
        pass: process.env.APPPASS
    }
});

app.post('/mailus', async (req, res) => {
    try {
        const { name, email, mobile, address, cartItems, total } = req.body;
        const mailBody = {
            to: 'mevadigamers@gmail.com',
            from: process.env.MYEMAIL,
            subject: 'New order from krishi Bazar',
            html: `
            Customer name: ${name} <br>
            Customer Email: ${email} <br>
            Mobile number: ${mobile} <br>
            Address: ${address} <br>
            <h2>Order Summary</h2>
            <ul>
              ${cartItems?.map((curElem, index) =>
                `<li><span> ${index + 1}. ${curElem?.name}</span> - <span>₹${curElem?.price}</span></li>`
            )
                }
                <b>Total: ₹${total}</b>
            </ul>

            `
        };
        const sendMail = await transporter.sendMail(mailBody);
        if (sendMail) {
            return res.status(200).json({
                success: true,
                message: 'order placed successfully 😊'
            })
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'error while placing your order!\n Please try again later 🙏'
            });
        }
    } catch (error) {
        console.log('while mailing', error);
    }
})

app.post('/contactus', async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;
        const mailBody = {
            to: 'abhishekmali9825@gmail.com',
            from: process.env.MYEMAIL,
            subject: 'Someone want to contact you through krishi bazar',
            html: `
            Name: ${name} <br>
            Email: ${email} <br>
            Mobile number: ${mobile} <br>
            Message: ${message} 
            `
        };
        const sendMail = await transporter.sendMail(mailBody);
        if (sendMail) {
            return res.status(200).json({
                success: true,
                message: 'Thanks! We do our best for you 😊'
            })
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'error while Sending your message!\n Please try again later 🙏'
            });
        }
    } catch (error) {
        console.log('while mailing', error);
    }
});

const dirname = path.resolve();

app.use(express.static(path.join(dirname, "/frontend/build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`Server runs on PORT ${process.env.PORT}`)

});