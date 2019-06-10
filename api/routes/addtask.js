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
		 discription: JSON.stringify(req.body.description),
		 date: moment(),
		 user_id:req.body.user_id,
		 project_id:JSON.stringify(req.body.projectName) ,
		 Hours:JSON.stringify(req.body.Hours),
		 employeename: req.body.employeename,
		 
		 status:"Disapprove",
	 });


let Data1 = new newtask({
		 discription: JSON.stringify(req.body.description),
		 date: moment(),
		 user_id:req.body.user_id,
		 project_id:JSON.stringify(req.body.projectName) ,
		 Hours:JSON.stringify(req.body.Hours),
		 status:"Disapprove",
	 });



	 Data.save()
		   .then(addtask => {
			   
		         
		        Data1.save()
				   .then(newtask => {
					   return res.status(200).json({
				          message: "Task added Successfully",
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
	addtask.find({'user_id':user_id}).then(result=>{
			return res.status(200).json({
			          result: result,
			          status: true,
			});
	});

	

});



app.post('/getalltask', (req, res, next) => {


	newtask.find({}).populate('user_id','employeename').sort({"_id":-1}).then(result=>{
			return res.status(200).json({
			          result: result,
			          status: true,
			});
	});

	

});

app.post('/TaskApprove', (req, res, next) => {

          var emp_id =req.body.emp_id;
			newtask.update({'user_id': emp_id}, {'$set': {'status': 'Approved'}
			}).then(result=>{
					addtask.update({'user_id': emp_id}, {'$set': {'status': 'Approved'}
					}).then(result1=>{
							return res.status(201).json({message:"Task approved successfully",  status: true});

					});

			});

	

});



app.post('/addmilestone', (req, res, next) => {
           
          var milestone =JSON.stringify(req.body.milestone);
          var id =req.body.id;
          
      
        
            project.update({'_id': id}, {'$set': {
                    'milestone': milestone,
                                
                        }}).then(result=>{
                                 return res.status(201).json({message:"Milestone Added successfully",  status: true});

                     });
                                                       
    



});



/*app.post('/getproject', (req, res, next) => {



                      let Data = new getproject({
					  NodeProject: req.body.NodeProject,
					  PhpProject: req.body.PhpProject,
					  ReactProject: req.body.ReactProject,
					  AngularProject: req.body.AngularProject,
					  WordpressProject: req.body.WordpressProject,
				       NetProject: req.body.NetProject,

				 });
          var user_id =req.body.user_id;

            console.log(user_id)
            getproject.find({}).then(result=>{
                    return res.status(200).json({
                              result: result,
                              status: true,
                              
                    });
            });

    

});*/

app.post('/GettaskById', (req, res, next) => {
	newtask.find({_id:req.body.id}).sort({"_id":-1}).then(result=>{
					return res.status(200).json({
					          result: result,
					          status: true,
					          
					});
			});
  		  
})




app.post('/editMyTaks', (req, res, next) => {

newtask.update({'user_id': req.body.user_id}, {'$set': {
                    'project_id': JSON.stringify(req.body.projectName),
                    'description': JSON.stringify(req.body.description),
                    'hours': JSON.stringify(req.body.Hours),
                }}).then(result=>{
   
addtask.update({'user_id': req.body.user_id}, {'$set': {
                    'project_id': JSON.stringify(req.body.projectName),
                    'discription': JSON.stringify(req.body.description),
                    'Hours': JSON.stringify(req.body.Hours),
                }}).then(result=>{
                     return res.status(201).json({message:"Task updated successfully",  status: true});

		             });

		             });

		

	

});


app.post('/getempolyestask', (req, res, next) => {
      console.log(req.body.user_id)
		  var user_id =req.body.user_id;
          var role = req.body.role;
          if(role=="user"){

			//console.log(user_id)
			addtask.find({user_id:user_id}).sort({"_id":-1}).then(result=>{
					return res.status(200).json({
					          result: result,
					          status: true,
					          
					});
			});

	}else{
	addtask.find({}).sort({"_id":-1}).then(result=>{
					return res.status(200).json({
					          result: result,
					          status: true,
					          
					});
			});

}
});



module.exports = app;