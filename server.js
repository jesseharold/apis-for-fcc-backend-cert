var express = require('express')
var app = express()
var defaultPageHTML = `
<html>
<body>
<head><title>Timestamp microservice API</title>
<h1>API Project for Free Code Camp</h1>
<h2>Timestamp microservice</h2>
<h3>User stories</h3>
<ol>
<li>I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)</li>
<li>If it does, it returns both the Unix timestamp and the natural language form of that date.</li>
<li>If it does not contain a date or Unix timestamp, it returns null for those properties.</li>
</ol>
<h3>Example usage</h3>
<code>
https://timestamp-ms.herokuapp.com/December%2015,%202015
<br>
https://timestamp-ms.herokuapp.com/1450137600
</code>

<h3>Example output:</h3>
<code>
{ "unix": 1450137600, "natural": "December 15, 2015" } 
</code>
</body></html>`;

function isTimestamp(string){
    // is this string all digits?
    var re = /^\d+$/;
    return re.test(string);
}

function isNatural(string){
    string.replace(/%20/, " ");
    var re = /(january|february|march|april|may|june|july|august|september|october|november|december)\s\d+,\s\d\d\d\d/i;
    return re.test(string);
}

function convertToNatural(string){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date(parseInt(string));
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function convertToTimestamp(string){
    var d = new Date(string);
    return d.getTime();
}

app.get("/", function(req, res){
    res.send(defaultPageHTML);
})

app.get('/:timestamp', function (req, res) {
    var responseObject = {"unix": null, "natural": null};
    var input = req.params["timestamp"];
    if (isTimestamp(input)){
        responseObject.unix = input;
        responseObject.natural = convertToNatural(input);
    } else if (isNatural(input)){
        responseObject.natural = input;
        responseObject.unix = convertToTimestamp(input);
    }
    res.send(responseObject);
})

app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})
