import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const d = new Date();

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthsName = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const date = d.getDate();
const month = monthsName[d.getMonth()];
const day = weekday[d.getDay()];
const year = d.getFullYear();

let homeTasks = [];
let workTasks = [];


app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.get("/", (req, res) => {
    homeTasks = [];
    res.render("home.ejs", {
        tasks: homeTasks,
        day: day,
        date: date,
        month: month,
        year: year,
        numberOfTasks: homeTasks.length
    })
})


app.post("/", (req, res) => {
    const task = req.body["task"] // add this task to an array
    if (task) {
        homeTasks.push(task);
    }
    res.render("home.ejs", {
        tasks: homeTasks,
        day: day,
        date: date,
        month: month,
        year: year,
        numberOfTasks: homeTasks.length
    })
})

// Work page

app.get("/work", (req, res) => {
    workTasks = [];
    res.render("work.ejs", {
        tasks: workTasks, 
        numberOfTasks: workTasks.length, 
        day: day,
        date: date,
        month: month,
        year: year
    })
})

app.post("/work", (req, res) => {
    const workTask = req.body["task"] // add this task to an array
    if (workTask) {
        workTasks.push(workTask);
    }
    res.render("work.ejs", {
        tasks: workTasks, 
        numberOfTasks: workTasks.length, 
        day: day,
        date: date,
        month: month,
        year: year
    })
})

app.listen(port, (err) => {
    if (err) throw err;
})

