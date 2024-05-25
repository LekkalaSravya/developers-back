const express=require('express');
const bodyparser= require('body-parser'); 
const cors=require('cors');
const mysql= require('mysql2');
const app= express();
app.use(cors());
app.use(bodyparser.json());
const connection= mysql.createConnection({
    host:'b0sjc07pixwrkzasi8sr-mysql.services.clever-cloud.com',
    user:'uyvntgepm0wpcmly',
    password:'hu3aIEwpRquQbHT5CEhE',
    database:'b0sjc07pixwrkzasi8sr',
    port:3306
});
connection.connect(err=>{
    if(err) return console.error('Error connecting to MySQL:',err);
    console.log('connected to MySQL');
});

let users = [];
app.post('/signup',(req,res)=>{
    // console.log(req.body,'Post data '); 
    let Id = req.body.id;
    let Name = req.body.name;
    let Email = req.body.email;
    let Password = req.body.password;
    let qr=`insert into user(name,email,password) value( '${Name}' ,'${Email}','${Password}'  )`
    connection.query(qr,(err,results)=>{
        if(err){
            console.log(err)
        }
         
        const newUser = {Name,Email, Password };
        users.push(newUser);
        res.send({
            message:"Data added successfully",
            data:results
        })
    })

});
    
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
  app.listen(7700,()=>{
    console.log("Server is running on 3000 PORT,Testycodeiz");
});