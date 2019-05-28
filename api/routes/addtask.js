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


app.post('/addtask', (req, res, next) => {



	let Data = new addtask({
		 discription: req.body.discription,
		 date: moment(),
		 user_id:req.body.user_id,
		 status:"Disapprove",
	 });


let Data1 = new newtask({
		 discription: req.body.discription,
		 date: moment(),
		 user_id:req.body.user_id,
		 status:"Disapprove",
	 });



	 Data.save()
		   .then(addtask => {
			   
		         
		        Data1.save()
				   .then(newtask => {
					   return res.status(200).json({
				          message: "You Have Save Successfully",
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

				
		   }).catch(err => {
		      return res.status(201).json({
		          message: "Something went wrong,Please try again",
		          status: false,
		        });
		   })

    

});


app.post('/featchTask', (req, res, next) => {

  var user_id =req.body.user_id;

	console.log(user_id)
	newtask.find({'user_id':user_id}).then(result=>{
			return res.status(200).json({
			          result: result,
			          status: true,
			});
	});

	

});



app.post('/getalltask', (req, res, next) => {

  var user_id =req.body.user_id;

	console.log(user_id)
	addtask.find({}).populate('user_id','employeename').then(result=>{
		console.log(result,'----');
			return res.status(200).json({
			          result: result,
			          status: true,
			});
	});

	

});

app.post('/TaskApprove', (req, res, next) => {

          var emp_id =req.body.emp_id;
          console.log(emp_id,'-----')
			newtask.update({'user_id': emp_id}, {'$set': {'status': 'Approved'}
			}).then(result=>{
					addtask.update({'user_id': emp_id}, {'$set': {'status': 'Approved'}
					}).then(result1=>{
							return res.status(201).json({message:"Task approved successfully",  status: true});

					});

			});

	

});





module.exports = app;