const express = require("express");
//const request = require('supertest')
const app = express();
const cors = require('cors');

app.use(express())
app.use(express.json());
app.use(cors());


//API Functionality Tests

describe('Test sme APIs', () => {
    test('The GET sme route', () => {
        return fetch('http://127.0.0.1:3001/smes')
            .then((res) => res.json())
            .then((data) => {
                //console.log('test 1', data)
                expect(data[0]['userid']).toBe(1)
            })
    })

    test('The GET sme route by userid', () => {
        return fetch('http://127.0.0.1:3001/smes/2')
            .then((res) => res.json())
            .then((data) => {
                //console.log('test 2', data)
                expect(data[0]['userid']).toBe(1)
            })
    })

    test('Add/POST a new SME/SME Category relationship in sme table', () => {

        var body ={"user_id":1, "category_id":10}
        return fetch('http://127.0.0.1:3001/smes',{
            method: 'POST',
            headers: {
              //Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            //Cache: 'default'
        })
            .then((res) => res.json())
            .then((data) => {
                //console.log('test 3', data)
                expect(data.message).toEqual('SME relationship successful')
            })
    })


test('DELETE SME/SME Category relationship in sme table', () => {
    var body ={"user_id":1, "category_id":10}
    return fetch('http://127.0.0.1:3001/deletesme',{
        method: 'DELETE',
        headers: {
          //Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        //Cache: 'default'
    })
        .then((res) => res.json())
        .then((data) => {
            //console.log('test 4', data)
            //expect(data.message).toEqual('User category relationship deleted successfully')
        })
})
})

describe('Test category APIs', () => {
    test('The GET category  route', () => {
        return fetch('http://127.0.0.1:3001/categories')
            .then((res) => res.json())
            .then((data) => {
                //console.log('test 5', data)
                expect(data[0]['categoryid']).toBe(1)
            })
    })
})

