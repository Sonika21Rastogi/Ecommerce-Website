var conn = require('./connection');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    //console.log('hello');
    res.sendFile(__dirname + '/register.html')
});


var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set('view engine', 'ejs');

app.post('/', function (req, res) {
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Mno = req.body.Mno;

    conn.connect(function (err) {

        if (err) console.log(err);

        var sql = `insert into student (Name,Email,Mno)values('${Name}','${Email}','${Mno}')`;

        conn.query(sql, function (err, result) {
            if (err) console.log(err);

            res.send('Student Regestration Successful:' + result.insertId);
        })
    })
});

//upper proccess is called data (insert from registraton form:)

//lower code says (select data from registration form:)

app.get('/student', function (req, res) {
    conn.connect(function (err) {
        if (err) console.log(err);

        var sql = `select * from student`;

        conn.query(sql, function (err, result) {
            if (err) console.log(err);
            res.render(__dirname + '/student', { student: result });
        })
    })
});

//delete data registration form:)

app.get('/delete-student', function (req, res) {
    conn.connect(function (err) {
        if (err) console.log(err);

        var sql = `delete from student where Id=?`;

        var Id = req.query.Id;

        conn.query(sql, [Id], function (err, result) {
            if (err) console.log(err);

            res.redirect('/student');
        })
    })
});

//update data registration form:)


app.get('/Update-student', function (req, res) {
    conn.connect(function (err) {
        if (err) console.log(err);

        var sql = `select * from student where Id=?`;

        var Id = req.query.Id;

        conn.query(sql, [Id], function (err, result) {
            if (err) console.log(err);
            res.render(__dirname + '/update-student', { student:result });
        })
    })
});

app.post('/update-student', function (req, res) {
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Mno = req.body.Mno;
    var Id = req.body.Id;
    conn.connect(function (err) {
        if (err) console.log(err);

        var sql = "update student set Name=?, Email=?, Mno=? where Id=? ";

        conn.query(sql, [Name, Email, Mno, Id], function (err, result) {
            if (err) console.log(err);
            res.redirect('/student');
        })
   })

})

app.listen(5000);
