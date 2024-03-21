import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

export const SendEmail = (userEmail, name, eventName, date, time, meetingUrl) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		// secure: true,
		auth: {
			user: 'muhammadhaiderbukhari@gmail.com',
			pass: process.env.ApplicationPassword,
		},
	});
	const mailGenerator = new Mailgen({
		theme: 'default',
		product: {
			name: 'EventsHub',
			link: 'www.eventshub.com',
		},
		header: {
			title: 'Yours truly',
			imageUrl: 'https://example.com/logo.png', // Replace with your logo image URL
		},
		footer: {
			name: "Hiii",
			title: 'EventsHub',
			imageUrl: 'https://example.com/signature.png', // Replace with your signature image URL
		},
	});

	const email = {
		body: {
			name: name,
			intro: `Thank you for purchasing ${eventName} Event. Here are the details of the event. <br><br>Event Date: ${date}<br>Event Time: ${time}. <br><br>`,
			action: {
				instructions: 'Please click the button below to Login to your account:',
				button: {
					color: '#22BC66',
					text: 'Join meeting',
					link: meetingUrl,
				},
			},
			outro: 'If you need any help or have questions, please reach out to us at our email (contact@eventshub.com). Or customer support team will always be ready to help you.',
		},
	}

	const emailBody = mailGenerator.generate(email);

	const mailOptions = {
		from: 'muhammadhaiderbukhari@gmail.com',
		to: userEmail,
		subject: `Invitation for ${eventName} Event offered by EventsHub`,
		html: emailBody,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent successfully:', info.response);
		}
	});
};