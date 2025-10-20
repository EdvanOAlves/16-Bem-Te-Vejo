"use strict"
/*
TODO:
    O carregamento é limitado a 200 itens por requisição, deixei em 48 mas é uma solução temporária,
    estudar depois como fazer a requisição em partes menores para cobrir todo o conteúdo sem sobrecarregar 

    Atualizar o texto da etapa que o usuário se encontra

    Implementar busca por pesquisa

    Implementar voltar um nível na navegação de busca

*/
let nivel = 0 //Contagem de páginas, quando chega em 3 está em família, exibindo a lista de espécies

const buscaLista = document.getElementById('lista');

async function getChildren(id){
    const endPoint = `https://api.inaturalist.org/v1/taxa?parent_id=${id}&per_page=100`
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
}


function carregarCard(item){
    const itemCard = document.createElement('li');
    const itemNome = document.createElement('h2');
    const itemImg = document.createElement('img');
    const id = item.id;

    itemNome.textContent = item.name;
    itemImg.src = item.default_photo.medium_url;
    itemCard.classList.add('busca-card');
    
    itemCard.appendChild(itemNome);
    itemCard.appendChild(itemImg);
    

    buscaLista.appendChild(itemCard);
    console.log(item);
    
    if (nivel >= 3 && item.rank == 'species'){   // Caso estejamos lidando com espécie
    itemCard.addEventListener('click', () => window.location.href = `info-ave.html?especie=${item.name}`); 
    }

    else // Caso contrário
    itemCard.addEventListener('click', () => loadChosenPage(id));
   
}



async function loadChosenPage(id){
    const pageData = await getChildren(id);
    buscaLista.replaceChildren();
    
    console.log(nivel)
    pageData.results.forEach(carregarCard);
    
    nivel+=1;
}

console.log('hello world!');
loadChosenPage(3); //id de aves é 3
// loadFamiliesPage();
// loadSpeciesPage();