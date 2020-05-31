const urls = new URL(window.location.href);
const searchParams = new URLSearchParams(urls.search);
const elementId = searchParams.get('id');

async function result(url) {
    let result = await fetch(url)
    return result.json()
}

result('http://localhost:3000/api/teddies' + '/' + elementId).then(element => {
    console.log(element)

});