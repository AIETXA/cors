

const express = require('express');
const axios = require('axios');
const router = express.Router();



router.get('/characters', async (req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const characters = response.data.results;
        res.json(characters);
    } catch (error) {
        res.status(404).json({ error: 'Personaje no encontrado' });
    }
})

router.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name;
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
        const results = response.data.results
        
        if (results && results.length > 0) {
            const character = results[0]; 
            return res.json({
                name: character.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                origin: character.origin.name,
                image: character.image
      });
            
        } else {
        res.status(404).send('personaje no encontrado')
    }

} catch (error) {
       console.error('Error al buscar el personaje:', error.response?.data || error.message);; 
       res.status(500).json({ error: 'Personaje no encontrado' });
    }
})
module.exports = router;

