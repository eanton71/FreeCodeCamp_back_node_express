require('dotenv').config();
let express = require('express');
var bodyParser = require("body-parser");
let app = express();

app.use((req, res, next) => {
    let string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});
app.use('/public', express.static(__dirname + '/public/'));
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/views/index.html");
});
const middleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
};

app.get("/now", middleware, (req, res) => {
    res.send({
        time: req.time
    });
});
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({
            message: "Hello json".toUpperCase()
        });
    } else {
        res.json({
            message: "Hello json"
        });
    }
    
});
app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    });
});
app.get("/name", function (req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
        name: `${firstName} ${lastName}`
    });
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/name", function (req, res) {
    // Handle the data in the request
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
});































 module.exports = app;
