"use strict"
/*
TODO:
    O carregamento é limitado a 199 itens por requisição, deixei o 199 mas é uma solução temporária,
    estudar depois como fazer a requisição em partes menores para cobrir todo o conteúdo sem sobrecarregar
*/


const buscaLista = document.getElementById('lista');

async function getOrders(){
    const endPoint = `https://api.inaturalist.org/v1/taxa?parent_id=3&rank=order&is_active=true&per_page=199`;
    const response = await fetch(endPoint);
    const data = await response.json();
    console.log(data);
    return data;
}

function carregarCard(item){
    const ordemCard = document.createElement('li');
    const ordemNome = document.createElement('h2');
    const ordemImg = document.createElement('img');

    ordemNome.textContent = item.name;
    ordemImg.src = item.default_photo.medium_url;
    ordemCard.classList.add('busca-card')

    ordemCard.appendChild(ordemNome);
    ordemCard.appendChild(ordemImg);

    buscaLista.appendChild(ordemCard);
}

async function loadOrdersPage(){
    const ordersData = await getOrders();

    ordersData.results.forEach(carregarCard);
}

console.log('hello world!');
loadOrdersPage();