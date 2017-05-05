var express = require('express')
var app = express()

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
    return string+"-natural";
}

function convertToTimestamp(string){
    return string+"-timestamp";
}

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
