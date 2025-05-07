

const characterNameInput = document.getElementById('characterName');
const characterInfo = document.getElementById('characterInfo');
const characterForm = document.getElementById('characterform')

async function getCharacters(characterName) {
 const response = await fetch(`http://localhost:3000/characters/${characterName}`)
 
if(!response.ok) {
    throw new Error('Error en la API')
}
const data = await response.json()
return data;
}

characterForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const characterName = characterNameInput.value;

    try {
    const characters = await getCharacters(characterName);
    characterInfo.innerHTML = '';
    
   
    if(!characters || (Array.isArray(characters) && characters.length === 0)) {
        characterInfo.innerHTML = '<li>Personaje no encontrado</li>'
      } else {
        const results = Array.isArray(characters) ? characters : [characters];
        characterInfo.innerHTML = results.map(character => `
          <li>
          <h2>${character.name}</h2>
          <img src=${character.image} alt=${character.name} />
          <p>Origen: ${character.origin?.name || 'Desconocido'}</p>
          <p>Genero: ${character.gender}</p>
          <p>Especie: ${character.species}</p>
          <p>Status: ${character.status}</p>
          </li>
        `).join('');
      
      }

    } catch (err) {
      console.log(`Error: ${err}`);
    }
  });


