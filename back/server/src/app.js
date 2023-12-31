// app.js
//require('dotenv').config();
const express = require("express");
const fileUpload = require('express-fileupload');

const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);
const Crypto = require('crypto')

app.use(express.json());
app.use(cors());
app.use(fileUpload());

const salt = '100'
hashed_password = Crypto.pbkdf2Sync('password1', salt, 10000, 64, 'sha1').toString('base64')
password = 'password2'

const get_hash = (password) => {
    hashed_password = Crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
   // console.log('HASHED PW FROM LINE 24:', hashed_password)
    return hashed_password
}

const verify_pw = (password) => {
    if (hashed_password === get_hash(password)) {
        //console.log("Hashes Equal")
        return true
    } else { return false }
}
//console.log('password verified: ', verify_pw(password))

// '/upload' & 'getphoto' no errors
// For handling the upload request
app.post("/upload", function (req, res) {
    // When a file has been uploaded
    if (req.files && Object.keys(req.files).length !== 0) {
        // Uploaded path
        const uploadedFile = req.files.uploadFile;
        // Logging uploading file
        console.log(uploadedFile);
        // Upload path
        const uploadPath = process.cwd() + "/photos/" + uploadedFile.name;
        console.log(uploadPath);
        // To save the file using mv() function

        uploadedFile.mv(uploadPath, function (err) {
            if (err) {
                console.log(err);
                res.send("Failed !!");
            } else res.send("Successfully Uploaded !!");
        });
    } else res.send("No file uploaded !!");
});

// app.post('/download', (req, res) => {
//     console.log('OUR OUTPUT', req.file.photo)
//     res.download("/home/dad/projects/sdi17-capstone/back/server/photos/Lady.jpg",
//         (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });
// });

//front end needs to send the file path ex './photos/soldier/png'
app.post('/getphoto', (req, res) => {
    const { photopath } = req.body;
    // console.log(photopath);
    //const photo = './photos/soldier.png';
    //res.download(path.resolve('./photos/Lady.jpg'))
    res.download(path.resolve(`${photopath}`))
    //  res.attachment(path.resolve(`${photo}`))
    // res.send()
})

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

// UPDATED: commented out the base portion of the select. base table was updated awhile back.
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
            'users.userverified',
            //'base.basename',
            // 'base.branch',
            // 'base.city',
            // 'base.state',
            //'category.name'

        )
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again',
                error: err
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
    const { categoryname } = req.body;
    console.log(categoryname);
    knex('category')
        .then(categories => {
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
                            .then(() => res.status(201).json({ baseCreated: true, categoryid: categories.length + 1, message: 'Sme category created successfully' }))
                    }
                })
                .catch((err) =>
                    res.status(500).json({
                        message: 'An error occurred while creating a new category',
                        error: err,
                    })
                );
        })
    // knex('category')
    //     .select('categoryname')
    //     .where('categoryname', categoryname)
    //     .then((data) => {
    //         console.log('data length: ', data.length)
    //         if (data.length > 0) {
    //             res.status(404).json({ categoryCreated: false, message: `SME category: *${categoryname}* already exists!` });
    //         } else {
    //             knex('category')
    //                 .insert({
    //                     categoryname
    //                 })
    //                 .then(() => res.status(201).json({ baseCreated: true, message: 'Sme category created successfully' }))
    //         }
    //     })
    //     .catch((err) =>
    //         res.status(500).json({
    //             message: 'An error occurred while creating a new category',
    //             error: err,
    //         })
    //     );
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
            message: 'Error updating category information',
            error: err
        }))
})

app.delete('/deletecategory', function (req, res) {
    const { categoryid } = req.body;

    knex('category')
        .join('sme', 'category.categoryid', 'sme.category_id')
        .join('network', 'sme.smeid', 'network.sme_id')
        .select('network.networkid')
        .where('category.categoryid', categoryid)
        .then((output) => {
            output.map((elem, index) => {
                console.log(index + 2)
                knex('network')
                    //.then(() => console.log('entering first'))
                    .where('network.networkid', elem.networkid)
                    .del()
                    .then(() => console.log('leaving 1st'))
            })
        })
        .then(() => {
            knex('sme')
                .where('category_id', categoryid)
                .del()
                .then((data) => console.log("removed from sme table", data))
                .then(() => {
                    knex('category')
                        .where('categoryid', categoryid)
                        .del()
                        .then((rowCount) => {
                            console.log("here")
                            if (rowCount === 0) {
                                return res.status(404).json({
                                    message: 'This category is not found',
                                });
                            }
                            res.status(200).json({
                                message: 'category deleted successfully',
                            });
                        })
                        .catch((err) =>
                            res.status(500).json({
                                message: 'An error occurred while deleting category',
                                error: err,
                            }));
                })
        });
});

//cant delete category because associated with sme, and sme associated with network
//join and then pull out smeid and networkid and categoryid?

//=============================================================================================//
// "sme" Table APIs. GET, POST, and DELETE
// API returns everything sme with categories combined and certain info omitted
app.get("/smes", (req, res) => {
    knex("users")
        .join("base", "users.base_id", "base.baseid")
        .join("sme", "users.userid", "sme.user_id")
        // .join("network", "sme.user_id", "network.user_id")
        .join("category", "sme.category_id", "category.categoryid")
        .select(
            "users.userid",
            "users.firstname",
            "users.lastname",
            "users.email",
            "users.phonenumber",
            "users.photo",
            "users.branch",
            "base.baseid AS base",
            "users.userverified",
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
            "base.baseid",
            "users.userverified"
        )
        .orderBy(
            'users.userid'
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

app.get("/smesnetwork/:id", (req, res) => {
    const userid = req.params.id
    knex("users")
        .join("base", "users.base_id", "base.baseid")
        .join("sme", "users.userid", "sme.user_id")
        .join("network", "network.sme_id", "users.userid")
        .join("category", "sme.category_id", "category.categoryid")
        .select(
            "users.userid",
            "users.firstname",
            "users.lastname",
            "users.email",
            "users.phonenumber",
            "users.photo",
            "users.branch",
            "base.baseid AS base",
            "users.userverified",
            knex.raw("ARRAY_AGG(category.categoryname) AS categories")
        )
        .where("network.user_id", userid)
        .groupBy(
            "users.userid",
            "users.firstname",
            "users.lastname",
            "users.email",
            "users.phonenumber",
            "users.photo",
            "users.branch",
            "base.baseid",
            "users.userverified"
        )
        .orderBy(
            'users.userid'
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

// API to fetch the SME categories for a specific user only
app.get("/smecategories/:id", (req, res) => {
    const userid = req.params.id
    knex("users")
        .join("sme", "users.userid", "sme.user_id")
        .join("category", "sme.category_id", "category.categoryid")
        .select(
            "users.userid",
            knex.raw("ARRAY_AGG(category.categoryname) AS categories")
        )
        .where("users.userid", userid)
        .groupBy("users.userid")
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
                message: "The data you are looking for could not be found. Please try again",
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
            if (data.length > 0) {
                res.status(404).json({ code: 404, message: `User *${user_id}* already has this SME category!` });
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

    knex('network')
        .where('sme_id',
            knex('sme')
                .select('smeid')
                .where('user_id', user_id)
                .where('category_id', category_id)
        )
        .del()
        .then(() => {
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
                        code: 200,
                        message: 'User category relationship deleted successfully',
                    });
                })
                .catch((err) =>
                    res.status(500).json({
                        message: 'An error occurred while deleting user category relationship',
                        error: err,
                    })
                );
        })
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

// API provides suggestions for user search
app.get('/users/suggest', function (req, res) {
    const query = req.query.q;

    knex('users')
        .select('userid', 'username')
        .where('username', 'like', `${query}%`)
        .where('admin', false)  // Exclude admin users
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
    // console.log('userid: ', userid)
    knex('users')
        .join('base', 'users.base_id', 'base.baseid')
        .select(
            'users.userid',
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
            'users.userverified',
            'base.basename',
            'users.worklocation',
            'users.branch'
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
    //hashedpw = get_hash(pw)
    const {
        userid,
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
        admin,
        userverified,
        branch,
        base_id
    } = req.body;
    //let userid = 4
    knex('users')
        .select('username')
        .where('username', username)
        .then((data) => {
            console.log('data length: ', data.length)
            if (data.length > 0) {
                res.status(404).json({ userCreated: false, code: 404, message: `Username: "${username}" is already taken!` });
            } else {
                knex('users')
                    .insert({
                        userid,
                        firstname,
                        lastname,
                        username,
                        password,
                        hashedpassword: get_hash(password), //just added, can be deleted if giving issues
                        email,
                        supervisoremail,
                        approveremail,
                        phonenumber,
                        bio,
                        photo,
                        sme,
                        admin,
                        userverified,
                        branch,
                        base_id
                    })
                    .then(() => res.status(201).json({ userCreated: true, code: 201, message: 'Username created successfully' }))
            }
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while creating user',
                error: err,
            })
        );
});

//if password is changed then do that piece
//if password not empty then we can hash
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
            userverified,
            base_id
        } = req.body

    //if statement for this spacific thing
    if (!password) {
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
            userverified: userverified,
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
            'userverified',
            'base_id'
        ])
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json({
            message: 'Error updating user information',
            error: err,
            code: 500
        }))
    } else {
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
            hashedpassword: get_hash(password), ////just added, can be deleted if giving issues
            worklocation: worklocation,
            bio: bio,
            photo: photo,
            branch: branch,
            sme: sme,
            admin: admin,
            userverified: userverified,
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
            'hashedpassword',
            'worklocation',
            'bio',
            'photo',
            'branch',
            'sme',
            'admin',
            'userverified',
            'base_id'
        ])
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json({
            message: 'Error updating user information',
            error: err,
            code: 500
        }))
    }
    //original code
    // knex('users')
    //     .where({ userid: userid })
    //     .update({
    //         firstname: firstname,
    //         lastname: lastname,
    //         username: username,
    //         email: email,
    //         supervisoremail: supervisoremail,
    //         approveremail: approveremail,
    //         phonenumber: phonenumber,
    //         password: password,
    //         hashedpassword: get_hash(password), ////just added, can be deleted if giving issues
    //         worklocation: worklocation,
    //         bio: bio,
    //         photo: photo,
    //         branch: branch,
    //         sme: sme,
    //         admin: admin,
    //         userverified: userverified,
    //         base_id: base_id
    //     }, [
    //         'firstname',
    //         'lastname',
    //         'username',
    //         'email',
    //         'supervisoremail',
    //         'approveremail',
    //         'phonenumber',
    //         'password',
    //         'hashedpassword',
    //         'worklocation',
    //         'bio',
    //         'photo',
    //         'branch',
    //         'sme',
    //         'admin',
    //         'userverified',
    //         'base_id'
    //     ])
    //     .then((data) => res.status(201).json(data))
    //     .catch((err) => res.status(500).json({
    //         message: 'Error updating user information',
    //         error: err,
    //         code: 500
    //     }))
})

// WORKS WELL WITH NO ERRORS
app.delete('/deleteuser/:userid', function (req, res) {
    const userid = req.params.userid;

    knex('network')
        .where('user_id', userid)
        .del()
        .then(() => console.log('1'))
        //.then(()=> {return res.json({message: 'first user deleted!'})})
        .then(() => {
            knex('sme')
                .where('user_id', userid)
                //.returning('sme_id')
                .then((output) => {
                    output.map((elem, index) => {
                        console.log(index + 2)
                        knex('network')
                            //.then(() => console.log('entering first'))
                            .where('sme_id', elem.smeid)
                            .del()
                            .then(() => console.log('leaving 1st'))
                    })
                })

                .then(() => {
                    knex('sme')
                        .where('user_id', userid)
                        .del()
                        .then(() => console.log('4'))
                        //.then(() => res.json({ message: 'fourth knex deleted!' }))
                        .then(() => {
                            knex('usermeetings')
                                .where('user_id', userid)
                                .del()
                                .then(() => console.log('5'))
                                .then(() => {
                                    knex('users')
                                        .where('userid', userid)
                                        .del()
                                        .then(() => {
                                            return res.json({ message: 'this user deleted!' })

                                        })
                                })
                        })
                })
        })
})
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
        basestate,
        baselat,
        baselon
    } = req.body;
    console.log(basename, basecity, basestate);
    knex('base')
        .select('basename')
        .where('basename', basename)
        .then((data) => {
            console.log('data length: ', data.length)
            if (data.length > 0) {
                res.status(404).json({ baseCreated: false, message: `Base: * ${basename}* already exists!` });
            } else {
                knex('base')
                    .insert({
                        basename,
                        basecity,
                        basestate,
                        baselat,
                        baselon
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
            basestate,
            baselat,
            baselon
        } = req.body

    knex('base')
        .where({ baseid: baseid })
        .update({
            basename: basename,
            basecity: basecity,
            basestate: basestate,
            baselat: baselat,
            baselon: baselon
        }, ['basename', 'basecity', 'basestate', 'baselat', 'baselon'])
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json({
            message: 'Error updating base information',
            error: err
        }))
})

// DON'T FORSEE USING THIS END POINT.
app.delete('/deletebase', function (req, res) {
    const { baseid } = req.body;

    //option 1
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

    //option number 2
    // knex('users')
    //     .join('base', 'users.base_id','base.baseid')
    //     .select('users.base_id')
    //     .where('users.base_id', baseid)
    //     .update({
    //         'base_id': null
    //     })
    //     .then(() => {
    //         knex('base')
    //             .where('baseid', baseid)
    //             .del()
    //             .then((rowCount) => {
    //                 if (rowCount === 0) {
    //                     return res.status(404).json({
    //                         message: 'This base is not found'
    //                     });
    //                 }
    //                 res.status(201).json({
    //                     message: 'Base deleted successfully'
    //                 });
    //             })
    //             .catch((err) => res.status(500).json({
    //                 message: 'An error occured trying to delete base',
    //                 error: err
    //             }));
    //     })

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

//NO CHANGE NEEDED, WORKS WITH NO ERRORS
app.delete('/deletenetworkSME', function (req, res) {
    const { user_id, sme_id } = req.body;

    //in the body of the delete request we need the user_id and the sme_id
    //these two are needed to delete the networkid
    //OR you can modify the req.body to equal the networkid, you'll get the same result
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
// "meetings" Table APIs. GET, POST, PATCH(TBD), & DELETE

// API to get all meetings
app.get('/meetinglist', function (req, res) {
    const meetingid = req.params.meetingid;

    knex('meetings')
        .select()
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again',
                error: err,
            })
        );
});

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
        .select(
            'users.userid',
            'users.firstname',
            'users.lastname',
            'meetings.meetingid',
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

//created meetings
app.post('/meetings', (req, res) => {
    const { meetingTitle, meetingDescription, startTime, endTime, meetingDate, attendees } = req.body;

    knex('meetings')
        .insert({
            meetingTitle,
            meetingDescription,
            startTime,
            endTime,
            meetingDate,
        })
        .returning('meetingid')
        .then((meetingid) => {
            const attendeeUsernames = attendees.map((attendee) => attendee.trim());
            return Promise.all(attendeeUsernames.map((username) =>
                knex('users')
                    .select('userid')
                    .where('username', username)
                    .then((rows) => rows[0].userid)
            ))
                .then((userIds) => {
                    const userMeetings = userIds.map((userId) => ({ user_id: userId, meeting_id: meetingid[0].meetingid }));
                    console.log(userMeetings)
                    return knex('usermeetings').insert(userMeetings);
                });
        })
        .then(() => res.status(201).json({ message: 'Meeting created successfully' }))
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'An error occurred while creating a new meeting',
                error: err,
            });
        }
        );
});

// NO UPDATE NEEDED, WORKS WELL WITH NO ERRORS
app.delete('/deletemeeting', function (req, res) {
    const { meetingid } = req.body;
    if (!meetingid) {
        return res.status(400).json({ message: 'Meeting ID is required.' });
    }

    knex('usermeetings')
        .where('meeting_id', meetingid)
        .del()
        .then((data) => {
            console.log("removed from user meeting", data);
            knex('meetings')
                .where('meetingid', meetingid)
                .del()
                .then((rowCount) => {
                    if (rowCount === 0) {
                        return res.status(404).json({
                            message: 'This meeting is not found',
                        });
                    }
                    res.status(201).json({
                        message: 'Meeting deleted successfully',
                    });
                })
                .catch((err) =>
                    res.status(500).json({
                        message: 'An error occurred while deleting meeting',
                        error: err,
                    })
                );
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while deleting from user meeting',
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
                res.status(404).json({ message: `User * ${user_id}* already attending this meeting!` });
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

// WORKS WELL WITH NO ERRORS
app.delete('/deleteuserfrommeeting', function (req, res) {
    const { user_id, meeting_id } = req.body;
    console.log('USER OUTPUT ', user_id);

    knex('usermeetings')
        .where('user_id', user_id)
        .where('meeting_id', meeting_id)
        .del()
        .then((rowCount) => {
            console.log("here")
            if (rowCount === 0) {
                return res.status(404).json({
                    message: 'User is not attending this meeting',
                });
            }
            res.status(200).json({
                message: 'User removed from meeting successfully',
            });
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while removing user from meeting',
                error: err,
            })
        );
});

//===================================================================================================
// Login
// Check user name and password against database
app.post('/login/', (req, res) => {
    const { user, pw } = req.body;
    hashedpw = get_hash(pw) //user input

    knex('users')
        .select('userid', 'firstname', 'lastname', 'admin', 'sme', 'userverified', 'branch', 'photo')
        .where('username', user)
        //changed from 'password' to 'hashedpassword'
        .where('hashedpassword', get_hash(pw))
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


////----------------------------------------------------------//

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT} `);
});
