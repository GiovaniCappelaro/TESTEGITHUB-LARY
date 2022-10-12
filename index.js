const express = require("express");
const app = express();
const i18n = require("i18n");
const cookieParser = require("cookie-parser");
const banco = require("./conexao.js");

const porta = 8888;

i18n.configure({
    locales: ["pt-BR", "en"],
    defaultLocale: "pt-BR",
    directory: "./locales",
    extension: ".js",
    cookie: "lang"
});

app.use(cookieParser());

app.use(i18n.init);

app.use((req, res, next)=>{
    const idioma = req.acceptsLanguages()[0];
    //guardando no objeto de requisição e de resposta o idioma que se deseja trabalhar
    req.setLocale(idioma); 
    res.setLocale(idioma);
    next();
});

app.get("/", (req, res)=>{    
    // res.send(res.__(`hello`) + "\n" +  i18n.getLocale(req)); // \n junta as respostas.
    res.status(201).send(`Bem vindo!`);

    //criação das tabelas poções e feitiços
    console.log("Criando a tabela poção...");
    banco.criaTabelaPotions();

    console.log("Criando a tabela feitiço...");
    banco.criaTabelaSpells();    
});

// chamada das rotas (poções e feitiços)
app.use("/potions", require("./routes/potions/index"));
app.use("/spells", require("./routes/spells/index"));

app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta ${porta}`);
});
