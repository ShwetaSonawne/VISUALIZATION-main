const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./Models/Employee");
const Rawdata = require("./Models/Data");
const Geo = require("./Models/Geodata");
const jsondata = require("./Data/jsondata.json");
//import jsondata from "./Data/jsondata.json"


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://shwetasonawanera2:aTjiw6UVwcPTuhOx@cluster0.wfshwg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(3001, () => {
  console.log("server is running");
  //Rawdata.insertMany(jsondata)
  //Geo.insertMany(jsondata)
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((employee) => {
    if (employee) {
      if (employee.password === password) {
        res.json("Success");
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("No User existed");
    }
  });
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.get("/getRawdata", (req, res) => {
    const { end_year, intensity, sector, topic, insight, url, region, start_year, impact, added, published, country, relevance, pestle, source, title, likelihood } = req.body;
    Rawdata.find(req.body)
      .then((Rawdata) => {
        res.json(Rawdata);}
    )
      .catch((err) => res.json(err));
  });

  app.get("/geo", (req, res) => {
    const { country, title, sector, start_year } = req.body;
    Geo.find(req.body)
      .then((Geo) => {
        res.json(Geo);}
    )
      .catch((err) => res.json(err));
  });


