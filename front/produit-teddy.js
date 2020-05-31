
//URLSearchParams() constructor créée et retourne un new objet URLSearchParams
const url = new URL(window.location.href);// Cette objet retourne l'url de la page actuel
const Params = new URLSearchParams(url.search);  // récupère params via url.search (doc.dev-moz)

const elementId = Params.get('id'); // récupère l'id

async function adress(url) {  // fonction async/await
    let result = await fetch(url)
    return result.json()
}

/*const url = async (url) => {
    const result = await fetch(url)
    const json = await result.json();
    console.log(json);
}*/

adress('http://localhost:3000/api/teddies' + '/' + elementId).then(element => {
    console.log(element)

    // Information produit et choix couleur

    const pageProduitOurs = document.getElementById('page-produit__ours--1');
        const nom = document.getElementById('ours__nom');
        const prix = document.getElementById('prix');
        const description = document.getElementById('description');

        const image = document.createElement('img');
        image.src = element.imageUrl;
        pageProduitOurs.append(image);

        prix.innerHTML = element.price;
        nom.innerHTML = element.name;
        description.innerHTML = "<strong>Description : </strong>" + "<br>" + element.description + "<br> <br>" + element.description + " " + element.description + "<br> <br>" + element.description;

        /*const chooseColors = document.getElementById('chooseColor')  //btn select
        chooseColors.addEventListener('change', element => {
            const myColor = document.createElement('option');
            chooseColors.append(myColor);
            myColor.innerHTML = element.colors.length;
        })*/

        const formColor = document.getElementById('form-color').action = '../front/panier.html?id=' + element._id;

        const chooseColor = document.getElementById('chooseColor');
        chooseColor.insertAdjacentHTML('afterbegin', '<option id="color"></option>'); // Insérer du contenu en choisissant l'emplacement exact.
        for ( i = 0; i < element.colors.length; i++) {

        }


        // Bouton Panier

        const panier = document.getElementById('panier');

        const btnPanier = document.createElement('button');
        btnPanier.innerHTML = 'Ajouter au panier';
        panier.append(btnPanier);

        btnPanier.addEventListener( 'click', function (ajout) {  // l'objet Event fournit une multitude d'informations sur l'événement actuellement déclenché, ici il se récupère dans l'argument "ajout"
            ajout.target.innerHTML = 'Article ajouté'; // Target modifie le contenu de l'élément qui a été déclenché/cliqué
        });

        function saveCart() {
            sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
        }
        


});