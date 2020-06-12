if (!localStorage.getItem('panier')) {
    localStorage.setItem('panier', JSON.stringify([]))
}


//URLSearchParams() constructor créée et retourne un new objet URLSearchParams
const url = new URL(window.location.href);// Cette objet retourne l'url de la page actuel
const Params = new URLSearchParams(url.search);  // récupère params via url.search (doc.dev-moz)

const elementId = Params.get('id'); // récupère l'id du produit

async function adress(url) {  // fonction async/await
    let result = await fetch(url)
    return result.json()
}



adress('http://localhost:3000/api/teddies' + '/' + elementId).then(element => { // element désigne chaque teddy
    console.log(element)

    // Information produit et choix couleur

    const pageProduitOurs = document.getElementById('page-produit__ours--1');
    const nom = document.getElementById('ours__nom');
    const prix = document.getElementById('prix');
    const description = document.getElementById('description');

    const image = document.createElement('img');
    image.src = element.imageUrl;
    //image.innerHTML = " alt=" element.name " ";
    pageProduitOurs.append(image);

    prix.innerHTML = element.price / 100 + "€";
    nom.innerHTML = element.name;
    description.innerHTML = "<strong>Description : </strong>" + "<br>" + element.description + "<br> <br>" + element.description + " " + element.description + "<br> <br>" + element.description;

    const chooseColor = document.getElementById('chooseColor');  // selection couleur
    console.log(element);

    for (let i = 0; i < element.colors.length; i++) {     // Boucle pour les couleurs disponibles par article
        const couleur = element.colors[i];
        const myColor = document.createElement('option');
        chooseColor.append(myColor);
        myColor.textContent = couleur;
        myColor.value = couleur;

    }


    // Bouton Panier

    const panier = document.getElementById('panier')

    const btnPanier = document.createElement('button');
    btnPanier.innerHTML = 'Ajouter au panier';
    panier.append(btnPanier);


    // l'objet Event fournit une multitude d'informations sur l'événement actuellement déclenché, ici il se récupère dans l'argument "ajout"
    btnPanier.addEventListener('click', function (ajout) {

        ajout.preventDefault()

        
        
        const panierAjout = JSON.parse(localStorage.getItem('panier'));

        // Permet de récupérer les valeurs d'un select multiple ici les couleurs
        let elementColorie = chooseColor.options[chooseColor.selectedIndex].value;    // ?les Const ou les Let

        // La méthode find() permet de récupérer dans le tableau le premier produit qui correspond au id et a la couleur sélectionnée  ? ////////
        let elementDuPanier = panierAjout.find(teddy => {
            return teddy.elementId == elementId && teddy.elementColorie == elementColorie
        });

        console.log(elementDuPanier);
        if (elementDuPanier == undefined) {
            let elementName = element.name;
            let elementPrice = element.price;
            let elementQuantity = 1;
            panierAjout.push({elementId, elementName, elementColorie, elementPrice, elementQuantity}); // Ajout du produit dans le localStorage
        } else {
            panierAjout.forEach(produit => {
                if (produit.elementId === elementId) {
                    produit.elementQuantity++
                }
                
            });
            console.log('ok')
        }

        localStorage.setItem('panier', JSON.stringify(panierAjout));
        ajout.target.innerHTML = 'Article ajouté'; // Target modifie le contenu de l'élément qui a été déclenché/cliqué

        window.location.href = 'http://127.0.0.1:5500/front/panier.html'

    });


    /*function onLoadCartNumbers() { // Affiche le nombre d'article dans le panier sur chaque page

        const panierAjout = JSON.parse(localStorage.getItem('panier'));

        if (panierAjout) {
            document.querySelector('.menuPanier span').textContent = panierAjout;
        }
    }*/

    //onLoadCartNumbers();



});