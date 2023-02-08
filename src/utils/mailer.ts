import nodemailer from "nodemailer";

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const response = await new Promise((resolve) => {
    transporter.verify((error, success) => {
      if (error) resolve(error);
      else resolve(success);
    });
  });

  console.log(response);

  const message = {
    from: '"Workout Tracker" <workoutwizardapp@gmail.com>',
    to: email,
    subject: "Login to your account",
    html: `Login by clicking here <a href="${url}/sessions#token=${token}">Login</a>`,
  };

  const responseMessage = await new Promise((resolve) => {
    transporter.sendMail(message, (error, success) => {
      if (error) resolve(error);
      else resolve(success);
    });
  });

  return responseMessage;
}
