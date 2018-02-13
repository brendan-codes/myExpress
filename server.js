// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myFirstDB');
mongoose.Promise = global.Promise;


let UserSchema = new mongoose.Schema({
    name: String,
    age: Number
}, {timestamps: true})

// mongoose.model("User", UserSchema);
// let User = mongoose.model("User");

let User = mongoose.model("User", UserSchema);
// ==============================




// ===== ROUTES! ======
app.get('/', function(req, res){
    User.find({}, function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.render('index', {data: results});
        }
    })
})

app.post('/submit', function(req, res){
    console.log(req.body);
    let new_user = new User(req.body);
    new_user.save(function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.redirect('/');
        }
    })
})
// ======================




// ==== SERVER LISTENER! =======
app.listen(8000, function(){
    console.log("Express on port 8000!")
});
// =============================




// ======= HERE BE DRAGONS (or possibly socket code) ========

// ==========================================================