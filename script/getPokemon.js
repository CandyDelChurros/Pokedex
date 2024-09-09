// Função para buscar os Pokémons do banco de dados
function fetchPokemons() {
    fetch('http://localhost:3000/get-pokemons')
        .then(response => response.json())
        .then(pokemons => {
            pokemons.forEach(pokemon => {
                criarPokemonDiv(pokemon);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar Pokémons:', error);
        });
}

// Função para criar a div do Pokémon
function criarPokemonDiv(pokemon) {
    // Criando a div principal
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');

    // Criando a div da imagem com background
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');
    imgDiv.style.backgroundImage = `url('data:image/jpeg;base64,${pokemon.imagem}')`;
    imgDiv.style.backgroundSize = '5rem';
    imgDiv.style.backgroundRepeat = 'no-repeat';
    imgDiv.style.backgroundPosition = 'center';

    // Criando a div do ID
    const numDiv = document.createElement('div');
    numDiv.classList.add('num');
    const numHeading = document.createElement('h3');
    numHeading.textContent = 'N°' + pokemon.id;
    numDiv.appendChild(numHeading);

    // Criando a div do Nome
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    const nameHeading = document.createElement('h5');
    nameHeading.textContent = pokemon.nome;
    nameDiv.appendChild(nameHeading);

    // Criando a div dos tipos
    const typerDiv = document.createElement('div');
    typerDiv.classList.add('typer');
    
    pokemon.tipos.forEach(tipo => {
        const typeDiv = document.createElement('div');
        typeDiv.classList.add(tipo); // Classe com o nome do tipo
        typeDiv.textContent = tipo;
        typerDiv.appendChild(typeDiv);
    });

    // Adicionando as divs criadas dentro da div principal
    pokemonDiv.appendChild(imgDiv);
    pokemonDiv.appendChild(numDiv);
    pokemonDiv.appendChild(nameDiv);
    pokemonDiv.appendChild(typerDiv);

    // Adicionando o Pokémon na página
    document.getElementById('pokemon').appendChild(pokemonDiv);
}

// Chame a função para buscar os Pokémons quando a página for carregada
window.onload = fetchPokemons;
