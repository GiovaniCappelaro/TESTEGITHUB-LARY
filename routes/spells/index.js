const express = require("express");
const app = express();

const router = require("express").Router();
const banco = require ("../../conexao.js");

app.use(express.urlencoded({extended: true}));

/* FEITIÇOS */

//listar todos feitiços
router.get("/", async(req, res)=>{    
    console.log("Listando todos os feitiços");     
    
    const [resultado] = await banco.listarSpells();    
    res.send(resultado);
});

//listando um feitiço
router.get("/findSpell/:id", async(req, res)=>{    
    console.log("Listando feitiço");    

    if(req.params.id){
        const resultado = await banco.consultaSpell(req.params.id);
        res.send(`Feitiço consultada: ${resultado[0].nome}`);
    }
    else{
        res.send("Favor inserir o ID do feitiço a ser buscado!");
    }
});

//cadastro de feitiço
router.post("/addSpell", async(req, res)=>{
    console.log("Cadastrando feitiço");

    const resultado = await banco.insereSpell({
        nome: req.body.nome        
    })
    res.send(resultado);
})

//Edição de feitiço
router.put("/editSpell/:id", async(req, res)=>{
    console.log("Editando feitiço");

    if(req.params.id){
        const resultado = await banco.editaSpell({
            nome: req.body.nome        
        })
        res.send(`Feitiço editado: ${resultado[0].nome}`);
    }
    else{
        res.send("Favor inserir o ID do feitiço a ser editado!");
    }
})

//Deletando um feitiço
router.delete("/deleteSpell/:id", async(req, res)=>{
    console.log("Excluindo feitiço");

    if(req.params.id){
        await banco.deleteSpell(req.params.id);
        res.send(`Feitiço deletado`);
    }
    else{
        res.send("Favor inserir o ID do feitiço a ser deletado!");
    }
})


module.exports = router;