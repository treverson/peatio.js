const nodemailer = require('nodemailer');
const config = require('configs').config;

const mailTransport = nodemailer.createTransport({
	host : 'smtp.sina.com',
	secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
	auth : {
		user : '你的邮箱地址',
		pass : '你的邮箱密码'
	},
});

const options = {
	from: '"UWIFI" <uwifi@uwifi.com>',
	to: 'receive.@uwifi.com' ,
	// cc          : ''    //抄送
	// bcc         : ''    //密送
	subject: '一封来自UWIFI的邮件',
	text: '一封来自UWIFI的邮件',
	html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p></p>'
}

let transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: account.user, // generated ethereal user
		pass: account.pass  // generated ethereal password
	}
});

// setup email data with unicode symbols
let mailOptions = {
	from: 'uwifi@uwifi.com', // sender address
	to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
	subject: 'Hello ✔', // Subject line
	text: 'Hello world?', // plain text body
	html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log('Message sent: %s', info.messageId);
	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});