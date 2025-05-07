

const express = require('express');
const axios = require('axios');
const router = express.Router();



router.get('/character', async (req, res) => {
    const name = req.query.name;
    let url = 'https://rickandmortyapi.com/api/character'
    
    if (name) {
        url += `?name=${encodeURIComponent(name)}`;
      }
    
      try {
        const response = await axios.get(url);
        const characters = response.data.results;
        res.json(characters);
    } catch (error) {
        res.status(404).json({ error: 'Personaje no encontrado' });
    }
});

   /* router.put('/character/:name', (req, res) => {
        const name = req.params.name;
        const character = characters.findIndex(c => c.name === name);
    
    if(character !== -1) {
      characters[character].status = req.body.status
      characters[character].species = req.body.species
      characters[character].gender = req.body.gender
      characters[character].image = req.body.image
         res.json(characters[character]);
       
    } else {
        res.status(404).send('Personaje no encontrado');
    }
    });*/
    
module.exports = router;

