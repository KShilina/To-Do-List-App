const express = require("express");
const app = express(); // npm i express
const cors = require("cors"); // npm i cors
const uniqid = require("uniqid"); // npm i uniqid
const morgan = require("morgan"); // npm i morgan
const bodyParser = require("body-parser");

const PORT = 8080;

// Single routing
const router = express.Router();
router.use(bodyParser.json());

router.use(morgan("dev"));
router.use(cors());

const data = [
  { id: uniqid(), task: "buy milk", done: false },
  { id: uniqid(), task: "wash dishes", done: false },
  { id: uniqid(), task: "clean up", done: true },
];

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the todos API!" });
});

router.get("/todos", (req, res) => {
  res.json(data);
});

router.post("/todos", (req, res) => {
  console.log("req.body:", req.body);
  const newTask = { id: uniqid(), task: req.body.task, done: req.body.done };
  data.push(newTask);
  res.send(newTask);
});

router.delete("/todos/:id/delete", (req, res) => {
  console.log("req.params:", req.params);
  const toDeleteItem = data.findIndex((obj) => obj.id === req.params.id);

  if (toDeleteItem > -1) {
    data.splice(toDeleteItem, 1);
  }
  res.send(req.params.id);
});
app.use(router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
