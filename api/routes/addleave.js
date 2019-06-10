const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const moment = require('moment');
const cryptr = new Cryptr('myTotalySecretKey');

 let transporter = nodemailer.createTransport({
    //host: "smtp.ethereal.email",
    //port: 587,
    //secure: false, // true for 465, false for other ports
        service: "Gmail",

    auth: {
      user: "sumitchoudhary727@gmail.com", // generated ethereal user
      pass: "sumit1994" // generated ethereal password
    }
  });
app.post('/addleaves', (req, res, next) => {


     var user_id = req.body.user_id;
		
	let Data = new addleave({
		  EmployeeName: req.body.EmployeeName,
		  startDate: req.body.startDate,
	      Description: req.body.Description,
	      typeofDay: req.body.typeofDay,
	      typeofleave: req.body.typeofleave,
	      user_id:req.body.user_id,
	      status:"Pending",

	 
	 });

	 Data.save()
		   .then(addleave => {
            

            // let testAccount = await nodemailer.createTestAccount();

 

  // send mail with defined transport object
  var mailOptions = {
    from: '"Rahul chauhan" <from@example.com>',
    to: 'bavnsofts@gmail.com',
    subject: 'Personal Leave Application',
    text: 'I am writing this letter to inform you that I need to take a day of absence on the  Date '+moment(req.body.date).format("DD-MM-YYYY")+' .' , 
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
   console.log(req.body.user_id)
   var user_id = req.body.user_id;
   var role = req.body.role;
   if(role=="user"){
   		addleave.find({user_id:user_id}).sort({"_id":-1}).then(result=>{

					return res.status(200).json({
					          result: result,
					          status: true,
					          
					});
			});

   }else{
   		addleave.find({}).sort({"_id":-1}).then(result=>{

					return res.status(200).json({
					          result: result,
					          status: true,
					          
					});
			});
   }

     	
  
    
			  
})

app.post('/ApproveDisapproveCancelLeave', (req, res, next) => {
   console.log(req.body);
   var emp_id = req.body.emp_id;
   var status = req.body.status;
   var role = req.body.role;

  // return false

	employee.find({'_id':emp_id}).then(result=>{

	

		  addleave.update({'user_id': emp_id}, {'$set': {
                    'status': status,
                                
                        }}).then(result1=>{

              
                 
		             var message = '';
		             if(status=="Approve"){
                       message = "Your leave approve";
                       message1 = "Leave Added Successfully";
		             }else if(status=="Disapprove"){
                        message = "Your leave disapprove.";
                        message1 = "Leave disapprove successfully.";
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
                                  if(role=="user" && status=="Cancel"){
							          addleave.remove({user_id:emp_id})
									}
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

         });


     	
  
    
			  
})



module.exports = app;