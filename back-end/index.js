const express = require("express");

const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'teste123',
    database: 'tarefa',
});

app.use(cors());
app.use(express.json());

app.post("/register", (req,res)=>{
    const { marca } = req.body;
    const { modelo } = req.body;
    const { armazenamento } = req.body;
    const { lancamento } = req.body;

    let sql = "INSERT INTO celulares (marca, modelo, armazenamento, lancamento) VALUES (?,?,?,?)";

    db.query(sql, [marca,modelo,armazenamento,lancamento],(err,result)=>{
        console.log(err);
    })
})


app.get("/getCards", (req, res) => {
    let mysql = "SELECT * FROM celulares ";
    db.query(mysql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});


app.put("/edit", (req,res)=>{
  {
      const {id} = req.body;
      const {marca} = req.body;
      const {modelo} = req.body;
      const {armazenamento} = req.body;
      const {lancamento} = req.body;

      let sql = "UPDATE celulares SET marca=?, modelo=?, armazenamento=?, lancamento=? WHERE id=?";
      db.query(sql, [marca,modelo,armazenamento,lancamento,id],(err,result)=>{
          if(err){
              console.log(err);
          }else{
              res.send(result);
          }
      })
  }
});
  

app.listen(3001, ()=>{console.log('rodando server')});