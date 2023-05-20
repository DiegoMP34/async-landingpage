const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCzpvRb1qNcS5NZIk0rHCJrA&part=snippet%2Cid&order=date&maxResults=9';

//elemento donde se colocara la info de los videos
const content = null || document.querySelector('#content')

const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': 'e990c8af82msh0a64205b3274400p1cea17jsn75e3ffbe380e',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//logica de la peticion
async function fetchData(urlApi){
    const response = await fetch(urlApi, options)
    const result = await response.json()
    return result
}

//funcion que se invoca a si mismo, realizamos peticion.
(async () => {
    try {
        const videos = await fetchData(API)
        //template string del contenido del elemento
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md 
                overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        `).slice(0,4).join('')}
        `;

        content.innerHTML = view
    } catch (err) {
        console.error(err)
    }
})()