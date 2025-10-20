"use strict"
/*
TODO:
    O carregamento é limitado a 199 itens por requisição, deixei o 199 mas é uma solução temporária,
    estudar depois como fazer a requisição em partes menores para cobrir todo o conteúdo sem sobrecarregar

    Atualizar o texto da etapa que o usuário se encontra

    Implementar interação, porque até o momento só tem fetch sem navegação sequer para acessar os resultados

    Implementar busca por pesquis
*/


const buscaLista = document.getElementById('lista');

async function getOrders(){
    const endPoint = `https://api.inaturalist.org/v1/taxa?parent_id=3&rank=order&is_active=true&per_page=199`;
    const response = await fetch(endPoint);
    const data = await response.json();
    console.log(data);
    return data;
}

async function getFamilies(){
    //ROTA EXEMPLO DE PASSERIFORMES, alterar depois com o target selecionado pelo usuário
    const endPoint = `https://api.inaturalist.org/v1/taxa?parent_id=7251&rank=family&per_page=199`;
    const response = await fetch(endPoint);
    const data = await response.json();
    console.log(data);
    return data;
}

async function getSpecies(){
    //ROTA EXEMPLO DE PASSERIFORMES, alterar depois com o target selecionado pelo usuário
    const endPoint = `https://api.inaturalist.org/v1/taxa?parent_id=7823`;
    const response = await fetch(endPoint);
    const data = await response.json();
    console.log(data);
    return data;
}


function carregarCard(item){
    const itemCard = document.createElement('li');
    const itemNome = document.createElement('h2');
    const itemImg = document.createElement('img');

    itemNome.textContent = item.name;
    itemImg.src = item.default_photo.medium_url;
    itemCard.classList.add('busca-card')

    itemCard.appendChild(itemNome);
    itemCard.appendChild(itemImg);

    buscaLista.appendChild(itemCard);
}

async function loadOrdersPage(){
    const ordersData = await getOrders();

    ordersData.results.forEach(carregarCard);
}

async function loadFamiliesPage(order){
    const familiesData = await getFamilies(order);
    buscaLista.replaceChildren();

    familiesData.results.forEach(carregarCard);
}

async function loadSpeciesPage(family){
    const speciesData = await getSpecies(family);
    buscaLista.replaceChildren();

    speciesData.results.forEach(carregarCard);
}

console.log('hello world!');
// loadOrdersPage();
// loadFamiliesPage();
loadSpeciesPage();