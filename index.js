// localhost:3000/cursos/...
//CRUD - Create Read Update Delete
const express = require('express');
const server = express();
server.use(express.json());

server.get('/cursos/bananafunciona',(req,res)=>{
    return res.send('BANANA FUNCIONA');
})

const cursos= ['NodeJS','JavaScript', 'React Native','Banana Funciona'];

// Middleware Global
server.use((req,res, next)=>{
    console.log(`URL CHAMADA : ${req.url}`);
    return next();
});

//Middleware de checagem se a requisição está correta
function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({Error:"Nome Invalido"});
    }
    return next();
}

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({ Error: "Curso não Existe"});
    }

    return next();
}

server.get('/cursos', (req,res)=>{
    return res.json(cursos);
});

// Adicionando um curso
server.post('/cursos', checkCurso, (req, res)=>{
    const { name } = req.body;
    cursos.push(name);
    
    return res.json(cursos);
});

// Atualizando um Curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req,res)=>{
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
});

// Deletando um Curso
server.delete('/cursos/:index', checkIndexCurso, (req,res)=>{
    const { index } = req.params;
    cursos.splice(index, 1);

    return res.json({message:"Curso Deletado"});
})

//Consultando Cursos
server.get('/cursos/:index',(req,res) =>{
    const { index } = req.params;
    return res.json(cursos[index]);
})

//-----------------------------------------------
server.get('/cursos',(req,res) =>{
    const nome = req.query.nome;
    return res.json({curso: `Aprendendo ${nome}`});
    
})

server.listen(3000);
