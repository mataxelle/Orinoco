if (!localStorage.getItem('panier')) {
    localStorage.setItem('panier', JSON.stringify([]))

}

const panierAjout = JSON.parse(localStorage.getItem('panier'));

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
        bigTotal += sousTotal;

        //console.log(bigTotal);


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

        supp.addEventListener('click', function() {
            corpsPanier.deleteRow(i) // supprime la ligne
            panierAjout.splice(i, 1); // La méthode splice() modifie le contenu d'un tableau en retirant et/ou en ajoutant des éléments
            localStorage.setItem('panier', JSON.stringify(panierAjout));
            document.location.reload(true) // La méthode location.reload recharge la page, équivalent au clic sur le bouton Actualiser la page du navigateur
        });


        const totalCommande = document.getElementById('totalCommande');
        totalCommande.innerHTML = `<span><strong>Le total de votre commande est de : ${bigTotal},00€ </strong></span>`;


        const confirmationAchat = document.getElementById('confirmationAchat').action = " ../front/confirmation-de-commande.html";

    }

}