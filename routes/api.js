var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// "/api"
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// "/api/todos"
router.get("/todos", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM items ORDER BY id ASC;")
  .then(results => {
      res.send(results.data);
    })
  .catch(err => res.status(500).send(err));
});

//adding to the database
router.post("/todos", async (req, res) => {
  // The request's body is available in req.body
  //client sent just "text". I assume the complete is initially false
  console.log(req.body);
    const {text} = req.body;
  //create sql query
  const sql = `INSERT INTO items (text, complete) VALUES('${text}', false) ;`
  try{
    //insert the new item to the items table
    await db(sql);
    //// If the query is successfull you should send back the full list of items
    const result = await db("SELECT * FROM items");
    res.status(201).send(result.data)
  }
  catch(e){
    res.status(500).send(e)

  }
});

//replace the whole record with another one
router.put("/todos/:todo_id", async (req, res) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  let taskId= req.params.todo_id;
  try{
    let result = await db(`SELECT * FROM items WHERE id = ${taskId};`);
    if(result.data.length === 1){
      //task was found
      //SQL is a language=> you cana use && and ! sign here
      let sql = `UPDATE items SET text='${result.data[0].text}', complete=${!result.data[0].complete} WHERE id=${taskId};`;
      // update the task
    await db(sql);
    // REturn updated list
    result = await db(`SELECT * FROM items;`);
    res.status(200).send(result.data);

    }
    else{ // task with id = taskid not found
      res.status(404).send({error: "task not found!"})
    }

  }catch(e){//SERVER ERROR
      res.status(500).send(e)

  }
});

router.delete("/todos/:todo_id", async (req, res) => {
  const taskId = req.params.todo_id;
 try{
  let result = await db(`SELECT * FROM items WHERE id = ${taskId}`);
  if(result.data.length === 1){//task was found
    let sql = `DELETE FROM items WHERE id = ${taskId}`
    await db(sql);
    //Return the updated list
    const result02 = await db(`SELECT * FROM items;`);
    res.status(200).send(result02.data);

    }
    else{ // task with id = taskid not found
      res.status(404).send({error: "task not found!"})
    }

 }
 catch(e){
  res.status(500).send(e)

 }
});

module.exports = router;
