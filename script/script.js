const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');
const cors = require('cors'); // Adicione esta linha

// Configuração do banco de dados PostgreSQL
const entrada = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Pokedex',
    password: '123',
    port: 5432
});

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Criação da aplicação Express
const app = express();
app.use(express.json());
app.use(express.static('public'));

// Habilite CORS para todas as origens
app.use(cors());

// Rota para adicionar Pokemon
app.post('/add-pokemon', upload.single('img'), async (req, res) => {
    const { nome, tipos } = req.body;
    const imgPath = req.file.path;

    if (!nome || !imgPath || !tipos) {
        return res.status(400).send('Termine de Preencher');
    }

    try {
        const imgData = fs.readFileSync(imgPath);
        const imgBase64 = imgData.toString('base64');

        await entrada.query(
            'INSERT INTO pokemons (nome, imagem, tipos) VALUES ($1, $2, $3)',
            [nome, imgBase64, JSON.parse(tipos)]
        );
        res.send('Pokemon Adicionado!');
    } catch (error) {
        res.status(500).send('Erro ao adicionar o pokemon');
    }
});

app.listen(3000, () => {
    console.log('Server on port 3000');
});
