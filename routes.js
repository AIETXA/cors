

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/character', async (req, res) => {
    const name = req.query.name;
    let url = 'https://rickandmortyapi.com/api/character?name=rick';
    
    if (name) {
        url += `/?name=${encodeURIComponent(name)}`;
      }
    
    try {
        const allCharacters = []; 
        while(url) {
            const response = await axios.get(url)
            const data = response.data;
            allCharacters.push(...data.results);
            url = data.info.next;
        }
       
    res.json(allCharacters);
    
      } catch (ERROR) {
        res.status(404).json({error: 'personaje no encontrado'});
    
      }
    });


    router.put('/character/:nombre', (req, res) => {
        const name = req.params.name;
        const character = allCharacters.findIndex(c => c.name === name);
    
    if(character !== -1) {
        allCharacters[character].status = req.body.status
        allCharacters[character].species = req.body.species
        allCharacters[character].gender = req.body.gender
        allCharacters[character].image = req.body.image
         res.json(allCharacters[character]);
       
    } else {
        res.status(404).send('Personaje no encontrado');
    }
    });
    
module.exports = router;

