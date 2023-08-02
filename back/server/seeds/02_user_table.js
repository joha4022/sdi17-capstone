/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      firstname: 'John',
      lastname: 'Doe',
      username: 'user1',
      email: 'user1@gmail.com',
      supervisoremail: 'super1@gmail.com',
      approveremail: 'approver1@gmail.com',
      phonenumber: '123-456-0001',
      password: 'password1',
      hashedpassword: 'uknBN5aRYXdqC9wCdFLWduuuD4CxkLUURGffd8rMewMK+Nub1v69u/l2HYwwQXe9R0yQH59GI0Ou8DCXtS7xZg==',
      worklocation: 'BLDG 272 RM 1',
      bio:'Active Duty Space Force , 1 ',
      photo: './photos/male1.jpg', 
      branch: 'Space Force',
      sme: true,
      admin: true,
      userverified: 'verified',
      base_id: 1 //changed the table name here
    },

    {

      firstname: 'Jane',
      lastname: 'Doe',
      username: 'user2',
      email: 'user2@gmail.com',
      supervisoremail: 'super2@gmail.com',
      approveremail: 'approver2@gmail.com',
      phonenumber: '123-456-0002',
      password: 'password2',
      hashedpassword: 'FFPUFgF3fm59NmsPCdwfk6SvBlDK0p7zIclUmY0m3b8ZzxOkPeJGNwFNtWnk/E2cdXxBFwyXlOTg86Idh8DHog==',
      worklocation: 'BLDG 271 RM 2',
      bio:'10 year Air Force veteran, 2 ',
      photo: './photos/female1.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 2 //changed the table name here
    },
    {
      firstname: 'James',
      lastname: 'Smith',
      username: 'user3',
      email: 'user3@gmail.com',
      supervisoremail: 'super3@gmail.com',
      approveremail: 'approver3@gmail.com',
      phonenumber: '123-456-0003',
      password: 'password3',
      hashedpassword: 'Pgy86yyH5NeKg/kSYTKBGD/AW7WbeIHZFGpDmS6bxUdi8qsxRyRYCE7gIDhagShkmkfyurYnLXDYKTzkJtRBcQ==',
      worklocation: 'BLDG 271 RM 4',
      bio:'10 year Air Force veteran, 3 ',
      photo: './photos/male2.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 3 //changed the table name here
    },

    {
      firstname: 'Emma',
      lastname: 'Davis',
      username: 'user4',
      email: 'user4@gmail.com',
      supervisoremail: 'super4@gmail.com',
      approveremail: 'approver4@gmail.com',
      phonenumber: '123-456-0004',
      password: 'password4',
      hashedpassword: 'iAsOOjd8QMfGOQRIvBNUggj2VhZoDf8VlOOwcubxIynoP82bYF6AHByFpQMTcuYCswVAqx/I4xfbTfXIQSMxFQ==',
      worklocation: 'BLDG 271 RM 4',
      bio:'10 year Air Force veteran, 4 ',
      photo: './photos/female2.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 4 //changed the table name here
    },
    {
      firstname: 'Henry',
      lastname: 'Miller',
      username: 'user5',
      email: 'user5@gmail.com',
      supervisoremail: 'super5@gmail.com',
      approveremail: 'approver5@gmail.com',
      phonenumber: '123-456-0005',
      password: 'password5',
      hashedpassword: 'bfCmEFaI4+qKIW6i/RPRe7d5E/4gEAqIMvMiigUa701Z+ZaNaAS2Wraeafhr/S45jOpaF1F4H8P0ud59nykVJw==',
      worklocation: 'BLDG 271 RM 5',
      bio: '10 year Air Force veteran, 5 ',
      photo:  './photos/male3.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 5 //changed the table name here
    },
    {
      firstname: 'Olivia',
      lastname: 'Johnson',
      username: 'user6',
      email: 'user6@gmail.com',
      supervisoremail: 'super6@gmail.com',
      approveremail: 'approver6@gmail.com',
      phonenumber: '123-456-0006',
      password: 'password6',
      hashedpassword: 'P4Je6XOeK2pKgf+crLn6CmWgrFdruYFQT8PqshJqKCwWNBMomYPx8dT1wxjGi/KnftA1LIkWDyvcMIteR4WqfQ==',
      worklocation: 'BLDG 271 RM 6',
      bio:'10 year Air Force veteran, 6 ',
      photo: './photos/female3.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 5 //changed the table name here
    },
    {
      firstname: 'Daniel',
      lastname: 'Williams',
      username: 'user7',
      email: 'user3@gmail.com',
      supervisoremail: 'super7@gmail.com',
      approveremail: 'approver7@gmail.com',
      phonenumber: '123-456-0007',
      password: 'password7',
      hashedpassword: 'bm0TOjJbKCin7G0Vq2IFloeE0HPXYGUrUtuCXvQn9y2qzdFeQkeQRXQpzx4bOtVhfut2n5hu/+jMnAhZSXNsvA==',
      worklocation: 'BLDG 271 RM 7',
      bio:'10 year Air Force veteran, 7 ',
      photo: './photos/male4.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 6 //changed the table name here
    },
    {
      firstname: 'Sarah',
      lastname: 'Wilson',
      username: 'user8',
      email: 'user8@gmail.com',
      supervisoremail: 'super8@gmail.com',
      approveremail: 'approver8@gmail.com',
      phonenumber: '123-456-0008',
      password: 'password8',
      hashedpassword: 'bzplg6ZbwWAbS949BXpguEis77B7veWVXTGJWBIr/tmfhuua3FVpjj15pxC+Am8fOS/gzKKt+lXAlLeddnlwHQ==',
      worklocation: 'BLDG 271 RM 8',
      bio:'10 year Air Force veteran, 8 ',
      photo: './photos/female4.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 6 //changed the table name here
    },
    {
      firstname: 'Anthony',
      lastname: 'Brown',
      username: 'user9',
      email: 'user9@gmail.com',
      supervisoremail: 'super9@gmail.com',
      approveremail: 'approver9@gmail.com',
      phonenumber: '123-456-0009',
      password: 'password9',
      hashedpassword: 'FjwzUi2WTX5q9V567iiHD9bseGa8Xqe3my2o6DEDTL6O+4d8BkoDjAXtDopAtloJW00gjMC+BZf99QjUu/0jrA==',
      worklocation: 'BLDG 271 RM 9',
      bio:'10 year Air Force veteran, 9 ',
      photo: './photos/male5.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 7 //changed the table name here
    },
    {
      firstname: 'Emily',
      lastname: 'Anderson',
      username: 'user10',
      email: 'user10@gmail.com',
      supervisoremail: 'super10@gmail.com',
      approveremail: 'approver10@gmail.com',
      phonenumber: '123-456-0010',
      password: 'password10',
      hashedpassword: 'GS6BemAWYPjGmm+8ginTgfNGclbL+RzqK2k5WSKUYKC7iSaVqVRtLC6nz2IS2K53BIfkAkpnNG4kiQ1BQCKzrA==',
      worklocation: 'BLDG 271 RM 10',
      bio:'10 year Air Force veteran, 10 ',
      photo: './photos/female5.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 9 //changed the table name here
    },
    {
      firstname: 'Matthew',
      lastname: 'Rodriquez',
      username: 'user11',
      email: 'user11@gmail.com',
      supervisoremail: 'super11@gmail.com',
      approveremail: 'approver11@gmail.com',
      phonenumber: '123-456-0011',
      password: 'password11',
      hashedpassword: 'GMWa5PMW8v0scbx8GFSnnjPdbW7VrvziHi1/jm1qd6EU2On5L4apBkYh3t6Pw/GWZQAunNrIjq2E55q35l6txA==',
      worklocation: 'BLDG 271 RM 11',
      bio:'10 year Air Force veteran, 11 ',
      photo: './photos/male6.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 10 //changed the table name here
    },

    {

      firstname: 'Jane',
      lastname: 'Clark',
      username: 'user12',
      email: 'user12@gmail.com',
      supervisoremail: 'super12@gmail.com',
      approveremail: 'approver12@gmail.com',
      phonenumber: '123-456-0012',
      password: 'password12',
      hashedpassword: 'S+D72L1cX7eJZ8NYTKKuVE6w+pgwSk2kTEVcpSodxEDB11VedFwjzzJHVQnIZTM0Q6/m3xi+S5rS+O5pM6XdMw==',
      worklocation: 'BLDG 271 RM 12',
      bio:'10 year Air Force veteran, 12 ',
      photo: './photos/female6.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 11 //changed the table name here
    },
    {
      firstname: 'James',
      lastname: 'Walker',
      username: 'user13',
      email: 'user13@gmail.com',
      supervisoremail: 'super13@gmail.com',
      approveremail: 'approver13@gmail.com',
      phonenumber: '123-456-0013',
      password: 'password13',
      hashedpassword: 'iH0DPdHFPKnHkC7EaC4dqj+MkxPryiy0SI7tRxyY0/H8ow8JfLUVCZEkIGqwzKT7t23IOD5ShpNoYUKxba1i3g==',
      worklocation: 'BLDG 271 RM 13',
      bio:'10 year Air Force veteran, 13 ',
      photo: './photos/male7.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 12 //changed the table name here
    },

    {
      firstname: 'Emma',
      lastname: 'Hill',
      username: 'user14',
      email: 'user14@gmail.com',
      supervisoremail: 'super14@gmail.com',
      approveremail: 'approver14@gmail.com',
      phonenumber: '123-456-0014',
      password: 'password14',
      hashedpassword: 'Yyo0OUUxT5UsxgdLrUdLf5Kj9tECL1MEsU40N82nKXweglq4+BjoiC6I4qMakIWQrcAdvy34axmwtWBjMQ0/AA==',
      worklocation: 'BLDG 271 RM 14',
      bio:'10 year Air Force veteran, 14 ',
      photo: './photos/female7.jpg', 
      branch: 'Air Force',
      sme: false,
      admin: false,
      userverified: 'pending',
      base_id: 12 //changed the table name here
    },
    {
      firstname: 'Henry',
      lastname: 'Lopez',
      username: 'user15',
      email: 'user15@gmail.com',
      supervisoremail: 'super15@gmail.com',
      approveremail: 'approver15@gmail.com',
      phonenumber: '123-456-0015',
      password: 'password15',
      hashedpassword: 'kWCWRyA7BBWqV27Es+KUDruzGK/9oQ1EzIqEEngPN5oTWMFjzpOkgXVc3r/IBur/8yzvjSgoiN2QhLRBwxcIBw==',
      worklocation: 'BLDG 271 RM 15',
      bio:'10 year Air Force veteran, 15 ',
      photo: './photos/Blank_Avatar.jpg',
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'pending',
      base_id: 13 //changed the table name here
    },
    {
      firstname: 'Olivia',
      lastname: 'Adams',
      username: 'user16',
      email: 'user16@gmail.com',
      supervisoremail: 'super16@gmail.com',
      approveremail: 'approver16@gmail.com',
      phonenumber: '123-456-0016',
      password: 'password16',
      hashedpassword: 'Jrzjv3YARLPVBKjXdZL29vTfYlWcHaxuF1CwWS2gLcD1Tmyr/NOu9PetvvTh7JLeV7aeskhEbDklnN85vr46Rw==',
      worklocation: 'BLDG 271 RM 16',
      bio:'10 year Air Force veteran, 16 ',
      photo: './photos/female8.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'pending',
      base_id: 14 //changed the table name here
    },
    {
      firstname: 'Daniel',
      lastname: 'Scott',
      username: 'user17',
      email: 'user17@gmail.com',
      supervisoremail: 'super17@gmail.com',
      approveremail: 'approver17@gmail.com',
      phonenumber: '123-456-0017',
      password: 'password17',
      hashedpassword: 'EzEcWudYPV906fVraSsIMT4Ryx4CCsFe7Acdih/iCRK+jaLcXHS08u+cCVvEdyohANmuw8HNw2Ehr2/UwvxY3g==',
      worklocation: 'BLDG 271 RM 17',
      bio:'10 year Air Force veteran, 17 ',
      photo: './photos/male8.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 14 //changed the table name here
    },
    {
      firstname: 'Sarah',
      lastname: 'Robinson',
      username: 'user18',
      email: 'user18@gmail.com',
      supervisoremail: 'super18@gmail.com',
      approveremail: 'approver18@gmail.com',
      phonenumber: '123-456-0018',
      password: 'password18',
      hashedpassword: 'VGpQbrHem2Vs9ROY7Okx+aicBNWFR55YoyjNJxs+PbVLQWXbVAn3bMnWgUFQVx02+wzb+frIZuEbwCEawfe38Q==',
      worklocation: 'BLDG 271 RM 18',
      bio:'10 year Air Force veteran, 18 ',
      photo: './photos/female9.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'pending',
      base_id: 9 //changed the table name here
    },
    {
      firstname: 'Anthony',
      lastname: 'Brown',
      username: 'user19',
      email: 'user19@gmail.com',
      supervisoremail: 'super19@gmail.com',
      approveremail: 'approver19@gmail.com',
      phonenumber: '123-456-0019',
      password: 'password19',
      hashedpassword: 'vJa590E37vt5fYH/We3s3iSLMl+oD9ZMznPxHI+OfHC9S43KJ3An9t8+zBNcWE3G+iH+hdkXQMMlQh34fIRt9w==',
      worklocation: 'BLDG 271 RM 19',
      bio:'10 year Air Force veteran, 19 ',
      photo: './photos/male9.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 7 //changed the table name here
    },
    {
      firstname: 'Emily',
      lastname: 'Lewis',
      username: 'user20',
      email: 'user20@gmail.com',
      supervisoremail: 'super20@gmail.com',
      approveremail: 'approver20@gmail.com',
      phonenumber: '123-456-0020',
      password: 'password20',
      hashedpassword: 'frxfZB8Z2+JDYyvAOCiU2mY+gZmsg/7bHVEAwxwXzA0pimI5V81ZjNyHE0YUx5OtBv6NAK1i0A7VDPjyILLuog==',
      worklocation: 'BLDG 271 RM 20',
      bio:'10 year Air Force veteran, 20 ',
      photo: './photos/female10.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'pending',
      base_id: 8 //changed the table name here
    },
    {
      firstname: 'Matthew',
      lastname: 'Rodriquez',
      username: 'user21',
      email: 'user21@gmail.com',
      supervisoremail: 'super21@gmail.com',
      approveremail: 'approver21@gmail.com',
      phonenumber: '123-456-0021',
      password: 'password21',
      hashedpassword: 'f2T3Yl21NZcv+4XhaxJchL6Pah+mYq+s+qwt7uT5dD8JeMf6ErMLUOHu3L9QVtBgRXlVIlZQdl4vkQ6h7mJtRQ==',
      worklocation: 'BLDG 271 RM 21',
      bio:'10 year Air Force veteran, 21 ',
      photo: './photos/male10.jpg', 
      branch: 'Air Force',
      sme: true,
      admin: false,
      userverified: 'verified',
      base_id: 4 //changed the table name here
    },

  ])
    .catch(err => console.log(err));
};
