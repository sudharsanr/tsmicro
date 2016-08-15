const express = require('express');
const app = express();
const port = process.env.port || 8080;
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function validateDate(date) {
    //check if date is valid epoch format
    var dateObj = null;
    if (!date) return null;
    if (parseInt(date)) {
        dateObj = new Date(0);
        dateObj.setUTCSeconds(parseInt(date));
        return dateObj;
    } else {
        //validate whether the date is proper natural string
        var dateStr = date.split(' ');
        if (!dateStr || dateStr.length != 3 || month.indexOf(dateStr[1]) == -1 || dateStr[2].length != 4) return null;
        return new Date(date);
    }
}

app.get('/:time', (req, res) => {
var date = validateDate(req.params.time);
if (date) {
    console.log(date.toDateString());
    var data = {
        unix: date.getTime()/1000,
        natural: month[date.getMonth()] + " " + date.getDate() + ", " + parseInt ( date.getYear() + 1900)
    }
    res.send(JSON.stringify(data));
}
else {
    res.send(JSON.stringify({
        unix: null
        , natural: null
    }));
}
});

app.listen(port, () => console.log('Listening in port ' + port));