const apiUrl = 'http://localhost:3000/api/teddies' + '/'

if (!localStorage.getItem('panier')) {
    localStorage.setItem('panier', JSON.stringify([]))
}

const panierAjout = JSON.parse(localStorage.getItem('panier')); // Récupération et affichage des éléments depuis le localSorage

const votrePanier = document.querySelector('.etatPanier');
const votrePanierTitre = document.createElement('h2');
votrePanier.append(votrePanierTitre);

const corpsPanier = document.getElementById('corpsPanier');


if (!panierAjout.length) {  // Si le panier est vide alors :

    votrePanierTitre.textContent = "Votre panier est vide !";

} else { // Sinon alors : 

    votrePanierTitre.textContent = "Finalisez votre commande !";


    for (let i = 0; i < panierAjout.length; i++) {
        const articleDansPanier = panierAjout[i];

        const elementId = articleDansPanier.elementId;
        const elementName = articleDansPanier.elementName;
        const elementColorie = articleDansPanier.elementColorie;
        const elementQuantity = articleDansPanier.elementQuantity;
        const elementPrice = articleDansPanier.elementPrice / 100;


        const sousTotal = elementPrice * elementQuantity; // total de la ligne

        let bigTotal = 0;

        panierAjout.forEach(produit => {

            if (produit.elementId === elementId) {
                bigTotal += sousTotal;
            }
            console.log(bigTotal)
        });


        let row = corpsPanier.insertRow(-1);

        let cell1 = row.insertCell(0);
        cell1.innerHTML += elementName;

        let cell2 = row.insertCell(1);
        cell2.innerHTML += elementColorie;

        // Bouton quantité
        let cell3 = row.insertCell(2);
        cell3.innerHTML = `<form>
                                <input type="button" value="-" id="moins"/>
                                <input type="text" name="quantity" maxlength="2" max="20" size="1" id="number" />
                                <input type="button" value="+" id="plus"/>
                            </form>`;

        const numb = document.getElementById('number');
        const plus = document.getElementById('plus');
        const moins = document.getElementById('moins');
        numb.value = elementQuantity;

        result = parseInt(numb.value, 10); // parsInt(string,base) converti une chaine de caractère vers un entier

        moins.addEventListener('click', function () {  // Pour le bouton -
            if (result > 1 && result <= 20) {
                result--;
                document.getElementById('number').value = result;
                panierAjout.forEach(produit => {
                    if (produit.elementId === elementId) {
                        produit.elementQuantity--
                    }
                });
                localStorage.setItem('panier', JSON.stringify(panierAjout));
                document.location.reload()
            }
        });

        plus.addEventListener('click', function () { // Pour le bouton +
            if (result >= 1 && result < 20) {
                result++;
                document.getElementById('number').value = result;
                panierAjout.forEach(produit => {
                    if (produit.elementId === elementId) {
                        produit.elementQuantity++
                    }
                });
                localStorage.setItem('panier', JSON.stringify(panierAjout));
                document.location.reload()
            }
        });

        let cell4 = row.insertCell(3);
        cell4.innerHTML += elementPrice + ",00€";

        let cell5 = row.insertCell(4);
        cell5.innerHTML += sousTotal + ",00€";

        // Bouton supprimer
        let cell6 = row.insertCell(5);
        const supp = document.createElement('button');
        supp.classList.add('supprimer');
        supp.textContent = "x";
        cell6.append(supp);

        supp.addEventListener('click', function () {
            corpsPanier.deleteRow(i) // supprime la ligne
            panierAjout.splice(i, 1); // La méthode splice() modifie le contenu d'un tableau en retirant et/ou en ajoutant des éléments
            localStorage.setItem('panier', JSON.stringify(panierAjout));
            document.location.reload(true) // La méthode location.reload recharge la page, équivalent au clic sur le bouton Actualiser la page du navigateur
        });


        const totalCommande = document.getElementById('totalCommande');
        totalCommande.innerHTML = `<span><strong>Le total de votre commande est de : ${bigTotal},00€ </strong></span>`;

    }

    // informations necessaires pour la confirmation de commande
    let products = [];
    let contact;

    checkPanier = () => {
        if (panierAjout > 0) { // Si panier il y a au moins un produit
            panierAjout.forEach(produit => { // Chaque produit est envoyés vers l'Api
                products.push(produit.elementId); // Insertion des produits dans le tableau products envoyé à l'Api
            });
            console.log("Tableau envoyé à l'API : " + products);
            return true;
        } else {
            console.log("Le panier est vide");
            return false;
        };
    };


    // Partie renseignement client

    //Récupération des inputs

    let nomInput = document.getElementById("nom");
    let prenomInput = document.getElementById("prenom");
    let emailInput = document.getElementById("email");
    let adresseInput = document.getElementById("adresse");
    let villeInput = document.getElementById("ville");

    const btnValider = document.querySelector('#valider');
    console.log(btnValider);

    btnValider.addEventListener('click', function ($event) {  
    

        $event.preventDefault();

        contact = {
            firstName: nomInput.value,
            lastName: prenomInput.value,
            address: adresseInput.value,
            city: villeInput.value,
            email: emailInput.value
        };
        submitFormData({contact: contact, products: products}); // Appel de la fonction
    });

    makeRequest = (data) => {  // Création d'un POST request a envoyé vers l'Api
        return new Promise((resolve, reject) => {  // La fonction retournera une promesse
            let request = new XMLHttpRequest();  // Création de l'objet xhr
            request.open("POST", apiUrl + "order");  // Définition du type d'appel et de l'url à charger avec le endpoint
            request.onreadystatechange = function () {  // Déclaration des évènements : si la requête est complète et réponse reçu 
                if (request.readyState == XMLHttpRequest.DONE) {
                    if (request.status == 201) {
                        resolve(JSON.parse(request.response));
                    } else {
                        reject(JSON.parse(request.response));
                    }
                }
            };
            request.setRequestHeader("Content-Type", "application/json");  //  Définition de l'appel en mode POST
            request.send(JSON.stringify(data)); // Déclenchement de l'appel
        })
    };

    async function submitFormData(contact) {
        try {
            const requestPromise = makeRequest(contact);
            const response = await requestPromise;
            console.log(response)
            window.location.href = "./confirmation-de-commande.html?orderId=" + response.orderId + "&nom=" + response.contact.lastName + "&prenom=" + response.contact.firstName;

        } catch (errorResponse) {
            alert('Vous devez compléter le formulaire afin de valider votre commande !');
        }
    };

};