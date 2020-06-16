const url = new URL(window.location.href);// Cette objet retourne l'url de la page actuel
const Params = new URLSearchParams(url.search);  // récupère params via url.search (doc.dev-moz)

const orderId = Params.get("orderId")
const orderName = Params.get("nom")
const orderFirstName = Params.get("prenom")

const confirmation = document.getElementById('confirmation');

const responseMessage = document.createElement('span');
const thanksMessage = document.createElement('p');
thanksMessage.innerHTML = `Merci pour votre commande cher ${orderName} ${orderFirstName}`;
const numeroCommande = document.createElement('p');
numeroCommande.innerHTML = `Votre numéro de commande est : ${orderId} ` 

confirmation.append(responseMessage);
confirmation.append(thanksMessage);
confirmation.append(numeroCommande);