

fetch('http://localhost:3000/api/teddies', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
})
.then(reponse => reponse.json())
.then(reponse => {
    console.log(reponse)
    const allProduits = document.getElementById('allproducts')
    reponse.forEach(element => {
        const myDiv = document.createElement('div')
        myDiv.classList.add('produit__ours--fond')

        const myDivA = document.createElement('div')
        myDivA.classList.add('produit__ours--1')
        myDiv.append(myDivA)

        /*const lienProd = document.createElement('a')   POUR LE LIEN
        lienProd*/

        const img = document.createElement('img')
        img.src = element.imageUrl
        myDiv.append(img)

        const myDivB = document.createElement('div')
        myDivB.classList.add('produit__ours--2')
        myDiv.append(myDivB)

        const details = document.createElement('div')
        details.classList.add('details')
        myDivB.append(details)

        const nom = document.createElement('p')
        nom.textContent = element.name
        myDivB.append(nom)

        const prix = document.createElement('p')
        prix.textContent = element.price
        myDivB.append(prix)

        

        allProduits.append(myDiv)
    });
})

// EXEMPLE DU HTML
/*<section class="produit__ours">
                <div class="produit__ours--fond">
                    <div class="produit__ours--1">
                        <a href="produits/produit-teddy-1.html">
                            <img src="images/teddy_1.jpg" alt="Ours en peluche Teddy brun foncé poilu">
                        </a>
                    </div>
                    <div class="produit__ours--2">
                        <div class="details">
                            <a href="produits/produit-teddy-1.html">
                                <p class="ours__nom"> Nounours Booly Holly</p>
                                <p class="prix">Prix : 19.99€</P>
                                <button>Voir le produit</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>*/