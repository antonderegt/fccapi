var express = require('express')
var app = express()

app.get('*', function (req, res) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
  
  if(req.params[0].length === 1) {
    res.end('<h1>Timestamp microservice</h1><h2>Example usage:</h2>' + 
      'https://fcc-api-antondregt.c9users.io/December%2015,%202015<br />' + 
      'https://fcc-api-antondregt.c9users.io/1450137600<br />' + 
      '<h2>Example output:</h2>' +
      '{ "unix": 1450137600, "natural": "December 15, 2015" }')
  }
  
  var parameter = req.params[0].slice(1)
  var date;
  
  if(parameter/1000) {
    date = new Date(parameter * 1000)
  } else {
    date = new Date(parameter)
  }
  
  if(monthNames[date.getMonth()] === undefined) {
    res.end('{"unix": null,"natural": null}')
  }
  
  res.end('{"unix": ' + 
    date.getTime()/1000 + ',"natural": ' + 
    monthNames[date.getMonth()] + ' ' + 
    date.getDate() + ', ' + 
    date.getFullYear() + '}')
})

app.listen(8080, function () {
  console.log('Timestamp app listening on port 8080!')
})