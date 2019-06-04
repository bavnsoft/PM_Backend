const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
/*
 let transporter = nodemailer.createTransport({
    //host: "smtp.ethereal.email",
    //port: 587,
    //secure: false, // true for 465, false for other ports
        service: "Gmail",

    auth: {
      user: "sumitchoudhary727@gmail.com", // generated ethereal user
      pass: "sumit1994" // generated ethereal password
    }
  });*/
 var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'sumitchoudhary727@gmail.com', // Your email id
        pass: 'sumit1994' // Your password
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});
app.post('/addleaves', (req, res, next) => {
console.log (req.body);

     var user_id = req.body.user_id;
			console.log(user_id)

	let Data = new addleave({
		  EmployeeName: req.body.EmployeeName,
		  typeofDay: req.body.typeofDay,
		  typeofleave: req.body.typeofleave,
		  date: req.body.date,
	      Description: req.body.Description,
	      user_id:req.body.user_id,

	 
	 });

	 Data.save()
		   .then(addleave => {
            

            // let testAccount = await nodemailer.createTestAccount();

 

  // send mail with defined transport object
 /* var mailOptions = {
    from: '"Rahul chauhan" <from@example.com>',
    to: 'bavnsofts@gmail.com',
    subject: 'Personal Leave Application',
    text: 'I am writing this letter to inform you that I need to take a day of absence on the  Date  2019 this month.' , 
    html: ''
};
  transporter.sendMail(mailOptions,(error,info)=>{
  	if(error){
  		return console.log(error);
  	}

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

	

*/



var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'foobar@gmail.com',
        pass: 'foobar'
    }
});

router.post('/send',function(req,res){

    var mailOptions = {
        from: '"Rahul chauhan" <from@example.com>',
        to: 'bavnsofts@gmail.com',
        subject:  'Personal Leave Application',
        text:'I am writing this letter to inform you that I need to take a day of absence on the  Date '+moment(req.body.date).format("DD-MM-YYYY")+' .' , 
        html: "<p>Hello " + req.body.email + " </p>",
        bcc: "fred@gmail.com"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
            res.send(200);
        }
    });        
});


			   return res.status(200).json({
		          message: " Added Leave Successful",
		          status: true,
		         
		        });
		   })
		   .catch(err => {
		   	 console.log(err);
		      return res.status(201).json({
		          message: "Something went wrong,Please try again",
		          status: false,
		        });
		   })

});




app.post('/getleaves', (req, res, next) => {

	addleave.find({}).then(result=>{
					return res.status(200).json({
					          result: result,
					          status: true,
					          
					});
			});
     	
  
    
			  
})

app.post('/ApprovedDisapprovedCancelLeave', (req, res, next) => {
   console.log(req.body);
   var emp_id = req.body.emp_id;
   var status = req.body.status;

  // return false

	employee.find({'_id':"5cda831abf80ac17acc9b543"}).then(result=>{

		             var message = '';
		             if(status=="Approved"){
                       message = "Your leave approved";
                       message1 = "Leave approved successfully";
		             }else if(status=="Disapproved"){
                        message = "Your leave disapproved.";
                        message1 = "Leave disapproved successfully.";
		             }else{
                         message = "Your leave cancelled.";
                         message1 = "Leave cancelled successfully.";
		             }
					  var mailOptions = {
						    from: 'bavnsofts@gmail.com',
						    to: result[0].employeeemail,
						    subject: 'Leave Status',
						    text: message,
						    html: ''
						};
						  transporter.sendMail(mailOptions,(error,info)=>{
						  	if(error){
						  		return console.log(error);
						  	}else{
						  		 console.log("Message sent: %s", info.messageId);
								  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

								  // Preview only available when sending through an Ethereal account
								  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
								  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
								   return res.status(200).json({
								          message: message1,
								          status: true,
								         
								        });

						  	}

						 
						})
			});


     	
  
    
			  
})



module.exports = app;