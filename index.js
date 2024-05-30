
require('dotenv').config();  
const express = require('express');
const mongoose = require("mongoose");
const server = express()
server.use(express.json())
const port = 8080


const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const Koder = mongoose.model("koder", new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    lastName:{
        type: String,
        required: false,
        maxLength: 100,
    },
    email:{
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    birthdate:{
        type: Date,
        required: false,
    },
    generation:{
        type: Number,
        required: true,
        min:1,
        max: 100,
    },
})
)

server.post('/koders', (request, response) => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Conexion exitosa");
        
        const { firstName, lastName, email, birthdate, generation } = request.body;
        
        Koder.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthdate: birthdate,
            generation: generation,
        })
             .then(() => {console.log("Se ha creado koder")
            response.json({
                message: "se añadio 1 koder a la lista",
            })
        })
        .catch((error) => console.error("Error al crear Koder", error));
    })
    .catch ((error) => {
        console.error("Error al conectar con la base de datos", error);
    })
    })
    

    
    server.listen(port, () => {
        console.log(`el servidor corre en: http://localhost:${port}`);
    });


