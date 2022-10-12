const banco = require("mysql2/promise");

async function conecta(){    
    const conexao = await banco.createConnection({
        host: "localhost",
        port: 3306,
        database: "pw4bd",
        user: "root",
        password: "larissa"
    });
    return conexao;
}

// ------ Poções ------ 

async function criaTabelaPotions(){
    console.log("Criando a tabela poção");
    const conexaoAtiva = await conecta(); 
    const sql = "CREATE TABLE IF NOT EXISTS potions(" +
    "id INT AUTO_INCREMENT PRIMARY KEY, " +
    "nome VARCHAR(100) );" ;

    return await conexaoAtiva.query(sql);
}
async function listarPotions(){
    console.log(`Exibindo a lista de poções...`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("SELECT * FROM potions;");    
    return resultado;
}

async function consultaPotion(id){
    console.log(`Consultando a poção de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("SELECT * FROM potions WHERE id = ?;", [id]);

    return resultado;
}

async function inserePotion(potion){
    console.log(`Inserindo uma poção ${potion.nome} no banco`);
    const conexaoAtiva = await conecta();
    const sql = "INSERT INTO potions(nome) VALUES (?);";
    const parametros = [potion.nome];

    return await conexaoAtiva.query(sql, parametros);
}

async function editaPotion(id){
    console.log(`Editando a poção de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("UPDATE potions SET nome = (?) WHERE id = ?;", [position.nome], [id]);

    return resultado;
}

async function deletePotion(id){
    console.log(`Deletando a poção de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("DELETE FROM potions WHERE id = ?;", [id]);

    return resultado;
}

// ------ Feitiços ------ 

async function criaTabelaSpells(){
    console.log("Criando a tabela feitiço");
    const conexaoAtiva = await conecta(); 
    const sql = "CREATE TABLE IF NOT EXISTS spells(" +
    "id INT AUTO_INCREMENT PRIMARY KEY, " +
    "nome VARCHAR(100) );" ;

    return await conexaoAtiva.query(sql);
}

async function listarSpells(){
    console.log(`Exibindo a lista de feitiços...`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("SELECT * FROM spells;");

    return resultado;
}

async function consultaSpell(id){
    console.log(`Consultando feitiço de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("SELECT * FROM spells WHERE id = ?;", [id]);

    return resultado;
}

async function insereSpell(spell){
    console.log(`Inserindo um feitiço ${spell.nome} no banco`);
    const conexaoAtiva = await conecta();
    const sql = "INSERT INTO spells(nome) VALUES (?);";
    const parametros = [spell.nome];

    return await conexaoAtiva.query(sql, parametros);
}

async function editaSpell(id){
    console.log(`Editando feitiço de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("UPDATE spells SET nome = (?) WHERE id = ?;", [position.nome], [id]);

    return resultado;
}

async function deleteSpell(id){
    console.log(`Deletando feitiço de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("DELETE FROM spells WHERE id = ?;", [id]);

    return resultado;
}

module.exports = {criaTabelaPotions, listarPotions, consultaPotion, inserePotion, editaPotion, deletePotion, criaTabelaSpells, listarSpells, consultaSpell, insereSpell, editaSpell, deleteSpell};