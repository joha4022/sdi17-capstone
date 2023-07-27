// app.js
//require('dotenv').config();
const express = require("express");

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);


app.use(express.json());
app.use(cors());


// API returns everything sme with categories combined and certain info omitted
app.get("/smes", (req, res) => {
    knex("users")
        .join("base", "users.base_id", "base.baseid")
        .join("sme", "users.userid", "sme.user_id")
        .join("network", "sme.user_id", "network.user_id")
        .join("category", "sme.category_id", "category.categoryid")
        .select(
            "users.userid",
            "users.firstname",
            "users.lastname",
            "users.email",
            "users.phonenumber",
            "users.photo",
            "users.branch",
            "base.basename AS base",
            knex.raw("ARRAY_AGG(category.categoryname) AS categories")
        )
        .groupBy(
            "users.userid",
            "users.firstname",
            "users.lastname",
            "users.email",
            "users.phonenumber",
            "users.photo",
            "users.branch",
            "base.basename",
        )
        .then((data) => {
            const formattedData = data.map((item) => {
                return {
                    ...item,
                    categories: item.categories, // categories will be returned as an array directly from the query
                };
            });

            res.status(200).json(formattedData);
        })
        .catch((err) =>
            res.status(404).json({
                message:
                    "The data you are looking for could not be found. Please try again",
                error: err,
            })
        );
});

app.get('/', function (req, res) {
    knex('users')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
});

//--------------------------------------------------------------------------------------------------------
// API to get category list
app.get('/categories', function (req, res) {
    knex('category')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
});




//--------------------------------------------------------------------------------------------------------
// API to get base data only  base name, base
app.get('/base', function (req, res) {
    knex('base')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
});

//-------------------------------------------------------------------------------------------------------

app.get('/userMeetings/:meetingid', function (req, res) {
    //const userid = req.params.userid;
    const meetingid = req.params.meetingid;

    /**
     We want to get all the users that are going to a particualr meeting
     Which ever users assiged to a particular meetingid we want to see

     We want to see a user and which meetings that user is attending
        ex -> meeting: [
            "Capstone",
            "something else",
        ]
    Then,

    first select: which meetings this guy is going to.
    second select: how many people are going to that meeting?
     */
    knex('users')
        .join('userMeetings', 'users.userid', 'userMeetings.user_id')
        .join('meetings', 'meetings.meetingid', 'userMeetings.meeting_id')
        .select('users.userid',
            'users.firstname',
            'users.lastname',
            'users.username',
            'meetings.meetingTitle',
            'meetings.meetingDescription',
            'meetings.startTime',
            'meetings.endTime',
            'meetings.meetingDate',
        )
        //.where('userid', userid)
        .where('meetingid', meetingid)
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again',
                error: err,
            })
        );
});

// --------------------------------------------------------------------------------------------------------
// API returns everything in database - all tables joined
app.get('/all', function (req, res) {
    knex('users')
        .select('*')
        .join('base', 'users.base_id', 'base.baseid')
        .join('sme', 'users.userid', 'sme.user_id')
        .join('network', 'sme.user_id', 'network.user_id')
        .join('category', 'sme.category_id', 'category.categoryid')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
});
//-------------------------------------------------------------------------------------------------------------
// API returns everything in database - all tables joined
app.get('/all2', function (req, res) {
    knex('users')

        .join('base', 'users.base_id', 'base.baseid')
        .join('sme', 'users.userid', 'sme.user_id')
        .join('network', 'sme.user_id', 'network.user_id')
        //.join('category', 'sme.category_id', 'category.categoryid')
        .select('users.userid',
            'users.firstname',
            'users.lastname',
            'users.username',
            'users.email',
            'users.supervisoremail',
            'users.approveremail',
            'users.phonenumber',
            'users.worklocation',
            'users.bio',
            'users.photo',
            'users.branch',
            'users.sme',
            'users.admin',
            'base.basename',
            'base.branch',
            'base.city',
            'base.state',
            //'category.name'

        )
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
});

//----------------------------------------------------------------------------------------------------------
//API to get all users
app.get('/profile/:userid', function (req, res) {
    const userid = req.params.userid;

    knex('users')
        .select('users.userid',
            'users.firstname',
            'users.lastname',
            'users.username',
            'users.email',
            'users.supervisoremail',
            'users.approveremail',
            'users.phonenumber',
            'users.bio',
            'users.photo',
            'users.sme',
            'users.admin',
        )

        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
});

app.post('/createuser', (req, res) => {
    const { firstname,
        lastname,
        username,
        password,
        email,
        supervisoremail,
        approveremail,
        phonenumber,
        bio,
        photo,
        sme,
        admin
    } = req.body;
    console.log(firstname, lastname, username, password);
    //let userid = 4
    knex('users')
        .select('username')
        .where('username', username)
        .then((data) => {
            console.log('data length: ', data.length)
            if (data.length > 0) {
                res.status(404).json({ userCreated: false, message: `Username: *${username}* already taken!` });
            } else {
                knex('users')
                    .insert({
                        firstname,
                        lastname,
                        username,
                        password,
                        email,
                        supervisoremail,
                        approveremail,
                        phonenumber,
                        bio,
                        photo,
                        sme,
                        admin
                    })
                    .then(() => res.status(201).json({ userCreated: true, code: 201, message: 'Username created successfully' }))
            }
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while fetching the login',
                error: err,
            })
        );
});

app.delete('/deleteuser/:userid', function (req, res) {
    const userid = req.params.userid;
    console.log(userid)
    knex('users')
        .where('userid', userid)
        .del()
        .then((rowCount) => {
            console.log("here")
            if (rowCount === 0) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            res.status(200).json({
                message: 'User deleted successfully',
            });
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while deleting the user',
                error: err,
            })
        );
});

// Check user name and password against database
app.post('/login/', (req, res) => {
    const { user, pw } = req.body;
    //console.log('req.body: ',req.body)
    console.log('user password:', user, pw)
    knex('users')
        .select('userid', 'firstname', 'lastname')
        .where('username', user)
        .where('password', pw)
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: 'Username and/or password are incorrect',
                });
            }
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(500).json({
                code: 500,
                message: 'An error occurred while fetching the login',
                error: err,
            })
        );
});

// Check user name and password against database
app.post("/login/", (req, res) => {
    const { user, pw } = req.body;
    //console.log('req.body: ',req.body)
    console.log("user password:", user, pw);
    knex("users")
        .select("userid", "firstname", "lastname")
        .where("username", user)
        .where("password", pw)
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({
                    message: "User name and/or passowrd are incorrect",
                });
            }
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(500).json({
                message: "An error occurred while fetching the login",
                error: err,
            })
        );
});

// post for base
// Check user name and password against database

app.post('/createbase', (req, res) => {
    const { basename,
        basecity,
        basestate
    } = req.body;
    console.log(basename, basecity, basestate);
    knex('base')
        .select('basename')
        .where('basename', basename)
        .then((data) => {
            console.log('data length: ', data.length)
            if (data.length > 0) {
                res.status(404).json({ baseCreated: false, message: `Base: *${basename}* already exists!` });
            } else {
                knex('base')
                    .insert({
                        basename,
                        basecity,
                        basestate
                    })
                    .then(() => res.status(201).json({ baseCreated: true, message: 'Base created successfully' }))
            }
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while creating a new Base',
                error: err,
            })
        );
});


app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});

