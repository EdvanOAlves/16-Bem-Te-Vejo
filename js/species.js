"use strict"

const hero = document.getElementById('hero-container');
const content = document.getElementById('content-text');

const MESSAGE_EXTINCT = 'Status: Extinto';
const MESSAGE_NOT_EXTINCT = 'Status: Pode ser encontrado na natureza';

async function loadData(birdName){
    
    const endPoint = `https://api.inaturalist.org/v1/taxa?q=${birdName}`;
    const response = await fetch(endPoint);
    const data = await response.json(); 
    const birdData = data.results[0];
    return birdData;
}

async function loadInfo(birdName){
    const endPoint = `https://pt.wikipedia.org/api/rest_v1/page/summary/${birdName}`;
    const response = await fetch(endPoint);
    const info = await response.json(); 
    const birdinfo = info;
    return birdinfo;
}

async function extractData(input){
    let birdData = {
        name: undefined,
        description: 'Descrição: N/A',
        image_url: undefined,
        status: 'Status: indisponível',
        wikipedia_url: undefined
    }
    const inaturalistData = await loadData(input);
    const wikiInfo = await loadInfo(input);

    // console.log(inaturalistData);
    console.log(wikiInfo);

    if (wikiInfo){
        if (wikiInfo.title)
            birdData.name = wikiInfo.title;
        else
            birdData.name = inaturalistData.preferred_common_name;

        birdData.description = wikiInfo.extract;
    }
    birdData.image_url = inaturalistData.default_photo.medium_url;

    if (inaturalistData.extinct)
        birdData.status = MESSAGE_EXTINCT;
    else
        birdData.status = MESSAGE_NOT_EXTINCT;

    birdData.wikipedia_url = wikiInfo.content_urls.desktop.page;
    console.log(wikiInfo.content_urls.desktop);
    return birdData;
}

async function loadPage(){
    const input = 'Ramphastos toco';
    const birdData = await extractData(input);


    const birdImg = document.createElement('img');
    const birdName = document.createElement('h2');

    const birdDetails = document.createElement('p');
    const birdStatus = document.createElement('p');
    const wikiLink = document.createElement('a');


    birdImg.src = birdData.image_url;
    birdName.textContent = birdData.name;
    birdDetails.textContent = birdData.description;
    birdStatus.textContent =birdData.status;
    wikiLink.textContent ='Página da Wikipédia'
    wikiLink.href = birdData.wikipedia_url;
    wikiLink.classList.add('wiki-link');

    hero.appendChild(birdImg);
    hero.appendChild(birdName);
    content.appendChild(birdDetails);
    content.appendChild(birdStatus);
    content.appendChild(wikiLink);

    
}

console.log('hello world!');
loadPage();