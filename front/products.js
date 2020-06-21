if (!localStorage.getItem('panier')) {  // Création du panier (appliqué sur chaque page js)
    localStorage.setItem('panier', JSON.stringify([]))
    
}

// Fonction fetch avec url pour effectuer une requête GET afin de récupérer les données précises
fetch('http://localhost:3000/api/teddies', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
})

.then(response => response.json())         // L'appel de then() déclenche l'objet Promise
.then(response => {
    console.log(response)
    
    const allProduits = document.getElementById('allproducts');
    response.forEach(element => {                        //Création contenu HTML pour chaque Produit

        const myDiv = document.createElement('div');
        myDiv.classList.add('produit__ours--fond');

        const part1 = document.createElement('div');
        part1.classList.add('part1');

        const myDivA = document.createElement('div');
        myDivA.classList.add('produit__ours--1');
        part1.append(myDivA);

        const img = document.createElement('img');
        img.src = element.imageUrl;
        img.innerHTML = ` alt="${element.name}" src="${element.imageUrl}"`;
        myDivA.append(img);

        const myDivB = document.createElement('div');
        myDivB.classList.add('produit__ours--2');
        part1.append(myDivB);

        const details = document.createElement('div');
        details.classList.add('details');
        myDivB.append(details);

        const nom = document.createElement('p');
        nom.textContent = element.name;
        details.append(nom);

        const prix = document.createElement('p');
        prix.textContent = element.price / 100 + "€";
        details.append(prix);

        const btn = document.createElement('button');
        const lien = document.createElement('a');
        const link = document.createTextNode("Voir le produit"); // La méthode creatTextNode() sert a créer un noeud textuel (de type : text)

        lien.appendChild(link);  
        lien.href = "../front/produit-teddy-1.html?id=" + element._id;  // lien menant vers la page du produit grâce à son _id
        btn.append(lien);
        myDivB.append(btn);

        myDiv.append(part1);

        const part2 = document.createElement('div');
        part2.classList.add('part2');

        const descriptText = document.createElement('P');
        descriptText.textContent = element.description;
        part2.append(descriptText);
        myDiv.append(part2);

        allProduits.append(myDiv);
    });
});