import nodemailer from 'nodemailer';
import Signup from '@/models/signupModel/route';
import bcrypt from 'bcrypt';

export const sendEmail = async (email,emailType,userId) => {

    try {
        const hashedToken = await bcrypt.hash(userId, 10);
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
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Account' : 'Reset Your Password',
            text: `Please click the following link to ${emailType === 'VERIFY' ? 'verify your account' : 'reset your password'}: 
            http://localhost:3000/${emailType === 'VERIFY' ? 'verify' : 'reset-password'}?token=${hashedToken}&id=${userId}`,
        };

       const mailresponse=await transporter.sendMail(mailOptions);
        return mailresponse;
}
catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
}
};