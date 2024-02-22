const express = require('express');
//é um Framework para o desenvolvimento de aplicações JavaScript com o Node. js

const axios = require('axios');
// recebe informação da api

const path = require('path');
//mapeamento de caminhos

const cors = require('cors');
//informar aos navegadores se determinado recurso pode ser ou não acessado

const config = require('./config.json');
//chamar o arquivo
const apikey = config.apikey;
//não subir a chave gitHub

const app = express();
app.listen(3000);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const traducaoClima = {
    "few clouds ": "Poucas nuvens",
    "scattered clouds":"Nuvens dispersas"
}

app.get("/climatempo/:cidade", async (req,res) => {
    const city = req.params.cidade;
    try{
        const reponde = await axaios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
        if(reponde.status === 200){
            const clima = traducaoClima[reponde.data.weather[0].descripition] || reponde.data.weather[0].descripition;
            const weatherData ={
                Temperatura: responde.data.main.temp,
                Unidade: responde.data.main.humidity,
                VelocidadeDoVento: responde.data.wind.speed,
                Clima: clima
            };
            res.send(weatherData);
        }else{
            res.status(responde.status).send({erro: 'Erro ao obter dados materológicos'})
        }
}catch(error){
res.status(500).send({erro:'Erro ao obter dados meteorológicos', error});
}

}); 
