import nodemailer from 'nodemailer';
import Signup from '@/models/signupModel/route';
import bcrypt from 'bcryptjs';


export const sendEmail = async (email,emailType,userId) => {

    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if(emailType === 'VERIFY') {
            await Signup.findByIdAndUpdate(userId, 
        { verifyToken: hashedToken ,
         verifyTokenExpiry: Date.now() + 3600000 });
        }
        else if(emailType === 'RESET') {
            await Signup.findByIdAndUpdate(userId,
        { forgotPasswordToken: hashedToken , forgotPasswordTokenExpiry: Date.now() + 3600000 });

        }

       const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
             port: 2525,
             auth: {
              user: "55af200ed7b03d",
               pass: "088bc48aae5176"
             }
        });

        const mailOptions = {
            from: "qaissumshahaab@gmail.com",
            to: "qaissumshahaab@gmail.com",
            subject: emailType === 'VERIFY' ? 'Verify Your Account' : 'Reset Your Password',
            html: `Please click the following link to ${emailType === 'VERIFY' ? 'verify your account' : 'reset your password'}: 
            <a href="http://localhost:3000/${emailType === 'VERIFY' ? 'verifyEmail' : 'reset-password'}?token=${hashedToken}&id=${userId}">Click here</a>`,
        };

       const mailresponse=await transporter.sendMail(mailOptions);
        return mailresponse;
}
catch (error) {
    console.error('Error sending email:', error);
    throw new Error(error.message);
}
};