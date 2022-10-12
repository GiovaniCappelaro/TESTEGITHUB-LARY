const express = require("express");
const app = express();

const router = require("express").Router();
const banco = require ("../../conexao.js");

app.use(express.urlencoded({extended: true}));

/* POÇÕES */

//listar todas poções 
router.get("/", async(req, res)=>{    
    console.log("Listando todas as poções");   
    
    const [resultado] = await banco.listarPotions();    
    res.send(resultado);
});

//listando uma poção 
router.get("/findPotion/:id", async(req, res)=>{    
    console.log("Consultando poção");        
    if(req.params.id){
        const resultado = await banco.consultaPotion(req.params.id);
        res.send(`Poção consultada: ${resultado[0].nome}`);
    }
    else{
        res.send("Favor inserir o ID da poção a ser buscado!");
    }
});

//cadastro de poção
router.post("/addPotion", async(req, res)=>{
    console.log("Cadastrando poção");   

    const resultado = await banco.inserePotion({
        nome: req.body.nome        
    })
    res.send(resultado);
})

//Edição de poção
router.put("/editPotion/:id", async(req, res)=>{
    console.log("Editando poção");
    if(req.params.id){
        const resultado = await banco.editaPotion({
            nome: req.body.nome        
        })
        res.send(`Poção editada: ${resultado[0].nome}`);
    }
    else{
        res.send("Favor inserir o ID da poção a ser editada!");
    }
})

//Deletando uma poção
router.delete("/deletePotion/:id", async(req, res)=>{
    console.log("Excluindo poção");

    if(req.params.id){
        await banco.deletePotion(req.params.id);
        res.send(`Poção deletada`);
    }
    else{
        res.send("Favor inserir o ID da poção a ser deletada!");
    }
})

module.exports = router;