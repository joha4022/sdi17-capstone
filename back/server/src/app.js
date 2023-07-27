// app.js
//require('dotenv').config();
const express = require("express");

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);


app.use(express.json());
app.use(cors());




//--------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------
// API returns everything in database - all tables joined
app.get('/all', function (req, res) {
    knex('users')
        //.select('*')
        .join('base', 'users.base_id', 'base.baseid')
        .join('sme', 'users.userid', 'sme.user_id')
        .join('network', 'sme.user_id', 'network.user_id')
        .join('category', 'sme.category_id', 'category.categoryid')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
});


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

//===================================================================================================
// Category APIs. GET, POST, PATCH, & DELETE

// API to get category list. GET
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

app.post('/createcategory', (req, res) => {
    const {categoryname} = req.body;
    console.log(categoryname);
    knex('category')
        .select('categoryname')
        .where('categoryname', categoryname)
        .then((data) => {
            console.log('data length: ', data.length)
            if (data.length > 0) {
                res.status(404).json({ categoryCreated: false, message: `SME category: *${categoryname}* already exists!` });
            } else {
                knex('category')
                    .insert({
                        categoryname
                    })
                    .then(() => res.status(201).json({ baseCreated: true, message: 'Sme category created successfully' }))
            }
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while creating a new category',
                error: err,
            })
        );
});

app.patch('/updatecategory', (req, res) => {
    const
        {
            categoryid,
            categoryname
        } = req.body

    knex('category')
        .where({ 'categoryid': categoryid })
        .update({
            categoryname: categoryname

        }, ['categoryid', 'categoryname'])
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json({
            message: 'Error updating catagory information',
            error: err
        }))
})

app.delete('/deletecategory', function (req, res) {
    const { categoryid } = req.body;

    knex('category')
        .where('categoryid', categoryid)
        .del()
        .then((rowCount) => {
            console.log("here")
            if (rowCount === 0) {
                return res.status(404).json({
                    message: 'This base is not found',
                });
            }
            res.status(200).json({
                message: 'base deleted successfully',
            });
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while deleting base',
                error: err,
            })
        );
});


//=============================================================================================//
// "sme" Table APIs. GET, POST, and DELETE
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

app.post('/smes', (req, res) => {
    const { user_id, category_id } = req.body;
    console.log('USERID AND CATID: ', user_id, category_id);
    knex('sme')
        .select('user_id')
        .where('user_id', user_id)
        .where('category_id', category_id)
        .then((data) => {
            console.log('data length: ', data.length)
            if (data.length > 0) {
                res.status(404).json({ message: `User *${user_id}* already has this SME category!` });
            } else {
                knex('sme')
                    .insert({
                        user_id,
                        category_id
                    })
                    .then(() => res.status(201).json({ smeUserAndCatCreated: true, code: 201, message: 'SME relationship successful' }))
            }
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while posting',
                error: err,
            })
        );

});

app.delete('/deletesme', function (req, res) {
    const { user_id, category_id } = req.body;
    console.log('USER OUTPUT ', user_id);

    knex('sme')
        .where('user_id', user_id)
        .where('category_id', category_id)
        .del()
        .then((rowCount) => {
            console.log("here")
            if (rowCount === 0) {
                return res.status(404).json({
                    message: 'User with this SME category is not found',
                });
            }
            res.status(200).json({
                message: 'User category relationship deleted successfully',
            });
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while deleting user category relationship',
                error: err,
            })
        );
});


//=============================================================================================//
// "users" Table APIs
//API to get all user data. GET, POST, PATCH & DELETE
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

app.get('/getusers', function (req, res) {
    knex('users')
        .select('username')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again',
                error: err
            })
        );
});


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
        .where('userid', userid) // Needed this to get the correct user
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

app.patch('/updateuser', (req, res) => {
    const
        {
            userid,
            firstname,
            lastname,
            username,
            email,
            supervisoremail,
            approveremail,
            phonenumber,
            password,
            worklocation,
            bio,
            photo,
            branch,
            sme,
            admin,
            base_id
        } = req.body

    knex('users')
        .where({ userid: userid })
        .update({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            supervisoremail: supervisoremail,
            approveremail: approveremail,
            phonenumber: phonenumber,
            password: password,
            worklocation: worklocation,
            bio: bio,
            photo: photo,
            branch: branch,
            sme: sme,
            admin: admin,
            base_id: base_id
        }, [
            'firstname',
            'lastname',
            'username',
            'email',
            'supervisoremail',
            'approveremail',
            'phonenumber',
            'password',
            'worklocation',
            'bio',
            'photo',
            'branch',
            'sme',
            'admin',
            'base_id'
        ])
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json({
            message: 'Error updating user information',
            error: err
        }))
})

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


//=============================================================================================//
// "base" Table APIs. GET, POST, PATCH, & DELETE.
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

// post for base
// Check name and city against database
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

app.patch('/updatebase', (req, res) => {
    const
        {
            baseid,
            basename,
            basecity,
            basestate
        } = req.body

    knex('base')
        .where({ baseid: baseid })
        .update({
            basename: basename,
            basecity: basecity,
            basestate: basestate
        }, ['basename', 'basecity', 'basestate'])
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json({
            message: 'Error updating base information',
            error: err
        }))
})

app.delete('/deletebase', function (req, res) {
    const { baseid } = req.body;

    knex('base')
        .where('baseid', baseid)
        .del()
        .then((rowCount) => {
            console.log("here")
            if (rowCount === 0) {
                return res.status(404).json({
                    message: 'This base is not found',
                });
            }
            res.status(200).json({
                message: 'base deleted successfully',
            });
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while deleting base',
                error: err,
            })
        );
});

//=============================================================================================//
// "Network" Table APIs. GET, POST, & DELETE.
app.get('/network', function (req, res) {
    knex('network')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
});

app.post('/network', (req, res) => {
    const { user_id, sme_id } = req.body;
    console.log('USERID AND SMEID: ', user_id, sme_id);
    knex('network')
        .select('user_id')
        .where('user_id', user_id)
        .where('sme_id', sme_id)
        .then((data) => {
            console.log('data length: ', data.length)
            if (data.length > 0) {
                res.status(404).json({ message: 'SME is already in your network !' });
            } else {
                knex('network')
                    .insert({
                        user_id,
                        sme_id
                    })
                    .then(() => res.status(201).json({ newSMEaddedToNetwork: true, code: 201, message: 'SME assigned to network' }))
            }
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred during connection',
                error: err,
            })
        );

});

app.delete('/deletenetworkSME', function (req, res) {
    const { user_id, sme_id } = req.body;
    console.log('USER OUTPUT ', user_id);

    knex('network')
        .where('user_id', user_id)
        .where('sme_id', sme_id)
        .del()
        .then((rowCount) => {
            console.log("here")
            if (rowCount === 0) {
                return res.status(404).json({
                    message: 'This SME is not found',
                });
            }
            res.status(200).json({
                message: 'Network SME relationship deleted successfully',
            });
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while deleting network SME relationship',
                error: err,
            })
        );
});


//=============================================================================================//
// "meetings" Table APIs

//get all the users that are attending one meeting
app.get('/listameeting/:meetingid', function (req, res) {
    const meetingid = req.params.meetingid;

    knex('meetings')
        .join('usermeetings', 'meetings.meetingid', 'usermeetings.meeting_id')
        .join('users', 'users.userid', 'usermeetings.user_id')
        .select('users.userid',
            'users.firstname',
            'users.lastname',
            'meetings.meetingTitle',
            'meetings.meetingDescription',
            'meetings.startTime',
            'meetings.endTime',
            'meetings.meetingDate',
        )
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

//We get all of the meetings that one user is in
app.get('/usermeetings/:userid', function (req, res) {
    const userid = req.params.userid;

    knex('meetings')
        .join('usermeetings', 'meetings.meetingid', 'usermeetings.meeting_id')
        .join('users', 'users.userid', 'usermeetings.user_id')
        .select('users.userid',
            'users.firstname',
            'users.lastname',
            'meetings.meetingTitle',
            'meetings.meetingDescription',
            'meetings.startTime',
            'meetings.endTime',
            'meetings.meetingDate',
        )
        .where('userid', userid)
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again',
                error: err,
            })
        );
});
//=============================================================================================//
// "usermeetings" Table APIs
//this post would post meetingid and userid
app.post('/attendmeeting', (req, res) => {
    const { user_id, meeting_id } = req.body;
    console.log('USERID AND MEETINGID: ', user_id, meeting_id);
    knex('usermeetings')
        .select('user_id')
        .where('user_id', user_id)
        .where('meeting_id', meeting_id)
        .then((data) => {
            console.log('data length: ', data.length)
            if (data.length > 0) {
                res.status(404).json({ message: `User *${user_id}* already attending this meeting!` });
            } else {
                knex('usermeetings')
                    .insert({
                        user_id,
                        meeting_id
                    })
                    .then(() => res.status(201).json({ userAndmeetingCreated: true, code: 201, message: `added user as an attendee to meeting ${meeting_id} successful` }))
            }
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while trying to add user as a meeting attendee',
                error: err,
            })
        );

});

app.delete('/deleteuserfrommeeting', function (req, res) {
    const { user_id, meeting_id } = req.body;
    console.log('USER OUTPUT ', user_id);

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
//===================================================================================================
// Login 
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

////----------------------------------------------------------//
// All CRUD for categories

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});

