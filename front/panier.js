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

        const elementQuantity = 1;
        const sousTotal = articleDansPanier.elementPrice / 100 * elementQuantity; // Article dans le panier et son prix
        const totalElement = articleDansPanier * elementQuantity; // Total des quantitées des articles
        const totalPanier = totalElement * sousTotal; // Total des quantitées et de leur prix


        let row = corpsPanier.insertRow(-1);

        let cell1 = row.insertCell(0);
        cell1.innerHTML += articleDansPanier.elementName;

        let cell2 = row.insertCell(1);
        cell2.innerHTML += articleDansPanier.elementColorie;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = `<form>
                                <input type="button" value="-" id="moins"/>
                                <input type="text" name="quantity" value="1" maxlength="2" max="20" size="1" id="number" />
                                <input type="button" value="+" id="plus"/>
                            </form>`;

        const numb = document.getElementById('number');
        const plus = document.getElementById('plus');
        const moins = document.getElementById('moins');

        result = parseInt(numb.value, 10); // parsInt(string,base) converti une chaine de caractère vers un entier

        numb.addEventListener('blur', function () {  // Prends en compte la modification du nombre au clavier
            result = document.getElementById('number');
            result = parseInt(result.value, 10);
        });

        moins.addEventListener('click', function () {  // Pour le bouton -
            if (result > 0 && result <= 20) {
                result--;
                document.getElementById('number').value = result;
            }
        });   

        plus.addEventListener('click', function () { // Pour le bouton +
            if (result >= 0 && result < 20) {
                result++;
                document.getElementById('number').value = result;
            }
        });

        let cell4 = row.insertCell(3);
        cell4.innerHTML += articleDansPanier.elementPrice / 100 + ",00€";

        let cell5 = row.insertCell(4);
        cell5.innerHTML += sousTotal + ",00€";

        let cell6 = row.insertCell(5);
        cell6.innerHTML += '<button id="supprimer"> X </button>';
        const supp = document.getElementById('supprimer');

        supp.addEventListener('click', function() {
            corpsPanier.deleteRow(i)
            panierAjout.splice(i, 1);
            localStorage.setItem('panier', JSON.stringify(panierAjout));
            document.location.reload()
        });


        const totalCommande = document.getElementById('totalCommande');
        totalCommande.innerHTML = `<span><strong>Le total de votre commande est de : ${totalPanier},00€ </strong></span>`;



    }

}