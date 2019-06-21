    const express = require('express');
    const app = express();
    const morgan = require('morgan');
    const bodyParser = require('body-parser');
    const mongoose  = require('mongoose');
    var cors = require('cors')
    const path = require('path');
    app.use(cors())
    /*Routs*/
    const usersignup = require('./api/routes/signup');
    const userlogin = require('./api/routes/login');
    const forgotpassword = require('./api/routes/forgotpassword');
    const GetUserProfile = require('./api/routes/GetUserProfile');
    const payments = require('./api/routes/payments');
    const projects = require('./api/routes/project');
    const employees = require('./api/routes/employee');
    const addtasks = require('./api/routes/addtask');
    const timeouts = require('./api/routes/timeout');   
    const addleaves = require('./api/routes/addleave');
    const departments = require('./api/routes/department');
    const overtimes = require('./api/routes/overtime');


    //const newtasks = require('./api/routes/newtask');

    //const imageminPngquant = require('imagemin-pngquant');
    app.use('/signup',usersignup);
    app.use('/login',userlogin);
    app.use('/users/forgotpassword',forgotpassword);
    app.use('/users/payments',payments);
    app.use(GetUserProfile);
    app.use(projects);
    app.use(employees);
    app.use(addtasks);

    app.use(timeouts);
    app.use(addleaves);
    app.use(departments);
    app.use(overtimes);


    //app.use(newtasks);

    //Models 
    usermodel = require('./api/models/signup');
    userimg = require('./api/models/user_img');
    mobile_number = require('./api/models/mobile');
    userpayments = require('./api/models/payments');
    userPost = require('./api/models/Post');
    project = require('./api/models/project');
    employee = require('./api/models/employee');
    addtask = require('./api/models/addtask');   
    timeout = require('./api/models/timeout');
    newtask = require('./api/models/newtask');
    addleave = require('./api/models/addleave');
    department = require('./api/models/department');
    overtime = require('./api/models/overtime');



app.post('/addstatus', (req, res, next) => {
           
          var status =req.body.status;
          var id =req.body.id;

        
            project.update({'_id': id}, {'$set': {
                    'status': status,
                                
                        }}).then(result=>{
                                 return res.status(201).json({message:"Project status updated successfully",  status: true});

                     });
                                                       
    

});


    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    var uri = "mongodb://PmSoftware:PmSoftware123@ds147746.mlab.com:47746/pm_software";
    mongoose.connect(uri, options,function(error) {
      // Check error in initial connection. There is no 2nd param to the callback.
      console.log(error)
      if(!error){
        //console.log(db.test)
        console.log("mongoose connection created")

      }else{
        console.log(error)
      }
    }); 

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended : false}));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'uploads')));

    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        next();
    });

    app.get('/',(req,res)=>{
        res.send("api is working");
    });



    app.use( (req, res, next) =>{
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    });
    app.use( (error , req, res, next) =>{
        res.status(error.status || 500);
        res.json({
            error:{
                message: error.message
            }
        })
    });


module.exports = app;