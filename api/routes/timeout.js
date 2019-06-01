const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var moment = require('moment');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


    
app.post('/timeout', (req, res, next) => {

   var timeIn =req.body.timeIn;
   var TimeOut =req.body.TimeOut;
   var user_id =req.body.user_id;

	let Data = new timeout({
			 timein: timeIn,
			 timeout: TimeOut,
			 user_id:user_id,
			 status:false,

		 });

	 Data.save()
		   .then(timeout => {

		   	   newtask.remove({user_id:user_id})
				   .then(timeout => {moment(),moment(TimeIn)

		      });


		   	    addtask.remove( { user_id:user_id});

		   	    addtask.update({'user_id': user_id}, {'$set': {'timeout': TimeOut}
					}).then(result=>{
							return res.status(201).json({message:"Task approved successfully",  status: true});

					});
					   return res.status(200).json({
				          message: "You Have clockout Successfully",
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

module.exports = app;