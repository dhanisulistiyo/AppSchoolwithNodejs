var exp = require('express');
var app = exp();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


//init mongodb
var db;
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var mongourl = 'mongodb://localhost:27017/SchoolSystem';
mongo.connect(mongourl, function (err, database) {
	if (err) {
		console.log('Mongo db is not connected');
	} else {
		console.log('Mongo db is connected')
		db = database;
		app.listen(8484, 'localhost', function () {
			console.log('Listening on localhost:8484');
		});
	};
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




//create students
app.post('/api/students/create', function (req, res) {
var nis= req.body.nis;
var nama= req.body.nama;
var kelas= req.body.kelas;
var jk= req.body.jk;

	var st = db.collection('students')
	var newStudents = {nis:nis, nama: nama, kelas:kelas, jenisKelamin:jk};	
	st.insert(newStudents,function (err, result){
		if(err){
				res.send(500, {error : err});			
		}else{
			res.send({success:true , students : result});
			res.end();
		}		
	})	
});

//view students List
app.get('/api/students',function(req,res){
	var st= db.collection('students');
	st.find().toArray(function(err, manyStudents){
		res.json({
			students: manyStudents
		});
	});
});



//delete students
app.post('/api/students/delete', function (req, res) {
	var id= req.body.id;
	var students = db.collection('students');
	students.deleteOne({_id: ObjectId(id)}, function(err, result){
            if (err) {
                console.log(err);
            }else{
			res.send({success:true , students : result});
			res.end();
		}	
        });
});

//search students by id
app.put('/api/students/search', function (req, res) {
	var id= req.body.id;
	var students = db.collection('students');
	students.findOne({_id: ObjectId(id)}, function(err, result){
            if (err) {
                console.log(err);
            }else{
			res.send({success:true , students : result});
			res.end();
		}	
        });
});

//edit students
app.put('/api/students/edit',function(req,res){
 var id = req.body.id;
 var st = db.collection('students');
 st.findAndModify({_id: ObjectId(id)},[['_id','asc']],
  {$set:{nis: req.body.nis, nama : req.body.nama,kelas: req.body.kelas, jenisKelamin: req.body.jk}},
	function(err, result){
			if(err){
				res.send(500,err)
			}else{
				res.send(200,{success:true , st : result});
				res.end();
			}
	}
 )
})




app.listen('8383', '0.0.0.0', function () {
	console.log('Listening..');
});
