const { request } = require("express");

const getLandingPage = (request, response) => {
    response.render("index")
}


const getSignup = (request, response) => {
    response.render("signup")
}



module.exports = {getLandingPage, getSignup}