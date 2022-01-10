// const req = require("express/lib/request")
// const weather = require("../../src/utils/weather")
// var jsdom = require("jsdom");
// var JSDOM = jsdom.JSDOM;
// global.document = new JSDOM(html).window.document;
// var document = require('browserify')

console.log('this is client side javascript file')
// let window == 'object'
// GLOBAL.document = new JSDOM(html).window.document;git add
// global.document = new JSDOM.window.document
const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = "Loading......"
    messageTwo.textContent = ' '

    fetch('http:localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                        messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        
        })
    })
})
)