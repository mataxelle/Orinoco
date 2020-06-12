const confirmation = document.getElementById('confirmation');

const message = document.createElement('p');
message.innerHTML = 'Merci pour votre commande !';

const numeroCommande = document.createElement('p');
numeroCommande.innerHTML = 'votre numéro de commande est : '

confirmation.append(message);
confirmation.append(numeroCommande);