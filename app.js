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
    "scattered clouds":"Nuvens dispersas",  
    "overcast clouds" : "Nublado",
    "broken clouds" : "Sem nuvens",
    "clear sky" : "céu claro",
    "moderate rain" : "chuva moderada",
    "light snow" : "Pouca neve",
    "haze" : "neblina",
    "clear" : "Céu limpo",
    "clouds" : "Céu parcialmente nublado",
    "drizzle" : "Chuva fraca",
    "rain" : "Chuva moderada a forte",
    "thunderstorm" : "Tempestade com trovões",
    "snow" : "Neve",
    "mist": "Névoa",
    "smoke" : "Fumaça no ar",
    "dust ": "Poeira suspensa no ar",
    "fog ": "Neblina densa",
    "sand ": "Areia no ar",
    "ash" : "Cinzas vulcânicas suspensas no ar",
    "squall": "Rajadas de vento súbitas e intensas"

}

app.get('/climatempo/:cidade', async (req,res) => {
    const city = req.params.cidade;
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
        if(response.status === 200){
            const clima = traducaoClima[response.data.weather[0].description] || response.data.weather[0].description;
            const weatherData ={
                Temperatura: response.data.main.temp,
                Umidade: response.data.main.humidity,
                VelocidadeDoVento: response.data.wind.speed,
                Clima: clima
            }
            res.send(weatherData);
        }else{
            res.status(response.status).send({erro: 'Erro ao obter dados materológicos'})
        }
}catch(error){
res.status(500).send({erro:'Erro ao obter dados meteorológicos', error});
}

}); 
