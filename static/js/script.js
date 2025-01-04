const form = document.getElementById("form");
const nomAnimal = document.getElementById("nomAnimal");
const especeAnimal = document.getElementById("especeAnimal");
const raceAnimal = document.getElementById("raceAnimal");
const ageAnimal = document.getElementById("ageAnimal");
const descriptionAnimal = document.getElementById("descriptionAnimal");
const courrielProprietaire = document.getElementById("courrielProprietaire");
const adresseCivique = document.getElementById("adresseCivique");
const ville = document.getElementById("ville");
const codePostal = document.getElementById("codePostal");

const messagesErreur = {
  champObligatoire: "Ce champ est obligatoire",
  chiffreInterdit: "Ce champ ne peut pas contenir des valeur numérique",
  lettreInterdite: "Ce champ ne peut pas contenir de lettres",
  virguleInterdite: "Ce champ ne peut pas contenir de virgule",
  longueurNomAnimal: "Le nom de l'animal doit avoir entre 3 et 20 caractères",
  ageNumerique: "L'âge doit être une valeur numérique entre 0 et 30",
  formatCourriel: "Format d'adresse courriel est invalide",
  formatAdresse: "Format d'adresse invalide ",
};

const afficheErreur = (element, message) => {
  const controle = element.parentElement;
  const affichageErreur = controle.querySelector(".erreur");

  affichageErreur.innerText = message;
  controle.classList.add("erreur");
  controle.classList.remove("succes");
};

const afficheSucces = (element) => {
  const controle = element.parentElement;
  const affichageErreur = controle.querySelector(".erreur");

  affichageErreur.innerText = "";
  controle.classList.add("succes");
  controle.classList.remove("erreur");
};

function estVide(valeur) {
  return valeur.trim() === "";
}

function contientVirgule(valeur) {
  return valeur.includes(",");
}

function contientChiffre(valeur) {
  valeur = valeur.trim();

  for (let i = 0; i < valeur.length; i++) {
    if (valeur[i] >= "0" && valeur[i] <= "9") {
      return true;
    }
  }
  return false;
}

function contientLettre(valeur) {
  valeur = valeur.trim();
  const lettres = /[a-zA-Z]/;

  for (let i = 0; i < valeur.length; i++) {
    if (lettres.test(valeur[i])) {
      return true;
    }
  }

  return false;
}

function validerLongueurNomAnimal(nomAnimal) {
  return nomAnimal.length >= 3 && nomAnimal.length <= 20;
}

function estAgeValide(age) {
  return age >= 0 && age <= 30;
}

function estCourrielValide(courriel) {
  let verifierACommercial = false;
  let verifierPoint = false;

  for (let i = 0; i < courriel.length; i++) {
    if (courriel[i] === "@") {
      verifierACommercial = true;
    }
    else if (verifierACommercial && courriel[i] === ".") {
      verifierPoint = true;
    }
  }

  return verifierACommercial && verifierPoint;
}

function estCodePostalValide(codePostal) {
  let codePostalRegex = /^[A-Z0-9]{3} [A-Z0-9]{3}$/;
  return codePostalRegex.test(codePostal);
}

// Validation du nom de l'animal
const validerNomAnimal = () => {
  const nomAnimalValeur = nomAnimal.value.trim();
  if (estVide(nomAnimalValeur)) {
    afficheErreur(nomAnimal, messagesErreur.champObligatoire);
    return false;
  } else if (contientVirgule(nomAnimalValeur)) {
    afficheErreur(nomAnimal, messagesErreur.virguleInterdite);
    return false;
  } else if (!validerLongueurNomAnimal(nomAnimalValeur)) {
    afficheErreur(nomAnimal, messagesErreur.longueurNomAnimal);
    return false;
  } else if (contientChiffre(nomAnimalValeur)) {
    afficheErreur(nomAnimal, messagesErreur.chiffreInterdit);
    return false;
  } else {
    afficheSucces(nomAnimal);
    return true;
  }
};

// Validation de l'espèce de l'animal
const validerEspeceAnimal = () => {
  const especeAnimalValeur = especeAnimal.value.trim();
  if (estVide(especeAnimalValeur)) {
    afficheErreur(especeAnimal, messagesErreur.champObligatoire);
    return false;
  } else if (contientVirgule(especeAnimalValeur)) {
    afficheErreur(especeAnimal, messagesErreur.virguleInterdite);
    return false;
  } else if (contientChiffre(especeAnimalValeur)) {
    afficheErreur(especeAnimal, messagesErreur.chiffreInterdit);
    return false;
  } else {
    afficheSucces(especeAnimal);
    return true;
  }
};

// Validation de la race de l'animal
const validerRaceAnimal = () => {
  const raceAnimalValeur = raceAnimal.value.trim();
  if (estVide(raceAnimalValeur)) {
    afficheErreur(raceAnimal, messagesErreur.champObligatoire);
    return false;
  } else if (contientVirgule(raceAnimalValeur)) {
    afficheErreur(raceAnimal, messagesErreur.virguleInterdite);
    return false;
  } else if (contientChiffre(raceAnimalValeur)) {
    afficheErreur(raceAnimal, messagesErreur.chiffreInterdit);
    return false;
  } else {
    afficheSucces(raceAnimal);
    return true;
  }
};

// Validation de l'âge de l'animal (numérique entre 0 et 30)
const validerAgeAnimal = () => {
  const ageAnimalValeur = ageAnimal.value.trim();
  if (estVide(ageAnimalValeur)) {
    afficheErreur(ageAnimal, messagesErreur.champObligatoire);
    return false;
  } else if (contientVirgule(ageAnimalValeur)) {
    afficheErreur(ageAnimal, messagesErreur.virguleInterdite);
    return false;
  } else if (contientLettre(ageAnimalValeur)) {
    afficheErreur(ageAnimal, messagesErreur.lettreInterdite);
    return false;
  } else if (!estAgeValide(ageAnimalValeur)) {
    afficheErreur(ageAnimal, messagesErreur.ageNumerique);
    return false;
  } else {
    afficheSucces(ageAnimal);
    return true;
  }
};

// Validation de la description de l'animal (obligatoire)
const validerDescriptionAnimal = () => {
  const descriptionAnimalValeur = descriptionAnimal.value.trim();
  if (estVide(descriptionAnimalValeur)) {
    afficheErreur(descriptionAnimal, messagesErreur.champObligatoire);
    return false;
  } else if (contientVirgule(descriptionAnimalValeur)) {
    afficheErreur(descriptionAnimal, messagesErreur.virguleInterdite);
    return false;
  } else {
    afficheSucces(descriptionAnimal);
    return true;
  }
};

// Validation de l'adresse courriel du propriétaire (format valide requis)
const validerCourrielProprietaire = () => {
  const courrielProprietaireValeur = courrielProprietaire.value.trim();
  if (estVide(courrielProprietaireValeur)) {
    afficheErreur(courrielProprietaire, messagesErreur.champObligatoire);
    return false;
  } else if (contientVirgule(courrielProprietaireValeur)) {
    afficheErreur(courrielProprietaire, messagesErreur.virguleInterdite);
    return false;
  } else if (!estCourrielValide(courrielProprietaireValeur)) {
    afficheErreur(courrielProprietaire, messagesErreur.formatCourriel);
    return false;
  } else {
    afficheSucces(courrielProprietaire);
    return true;
  }
};

const validerAdresseCivique = () => {
  const adresseCiviqueValeur = adresseCivique.value.trim();
  if (estVide(adresseCiviqueValeur)) {
    afficheErreur(adresseCivique, messagesErreur.champObligatoire);
    return false;
  } else if (contientVirgule(adresseCiviqueValeur)) {
    afficheErreur(adresseCivique, messagesErreur.virguleInterdite);
    return false;
  } else {
    afficheSucces(adresseCivique);
    return true;
  }
};

const validerVille = () => {
  const villeValeur = ville.value.trim();
  if (estVide(villeValeur)) {
    afficheErreur(ville, messagesErreur.champObligatoire);
    return false;
  } else if (contientVirgule(villeValeur)) {
    afficheErreur(ville, messagesErreur.virguleInterdite);
    return false;
  } else if (contientChiffre(villeValeur)) {
    afficheErreur(ville, messagesErreur.chiffreInterdit);
    return false;
  } else {
    afficheSucces(ville);
    return true;
  }
};

const validerCodePostal = () => {
  const codePostalValeur = codePostal.value.trim();

  if (estVide(codePostalValeur)) {
    afficheErreur(codePostal, messagesErreur.champObligatoire);
    return false;
  } else if (contientVirgule(codePostalValeur)) {
    afficheErreur(codePostal, messagesErreur.virguleInterdite);
    return false;
  } else if (!estCodePostalValide(codePostalValeur)) {
    afficheErreur(codePostal, messagesErreur.formatAdresse);
    return false;
  } else {
    afficheSucces(codePostal);
    return true;
  }
};

nomAnimal.addEventListener("input", validerNomAnimal);
especeAnimal.addEventListener("input", validerEspeceAnimal);
raceAnimal.addEventListener("input", validerRaceAnimal);
ageAnimal.addEventListener("input", validerAgeAnimal);
descriptionAnimal.addEventListener("input", validerDescriptionAnimal);
courrielProprietaire.addEventListener("input", validerCourrielProprietaire);
adresseCivique.addEventListener("input", validerAdresseCivique);
ville.addEventListener("input", validerVille);
codePostal.addEventListener("input", validerCodePostal);

form.addEventListener("submit", (event) => {
  const estNomAnimalValide = validerNomAnimal();
  const estEspeceAnimalValide = validerEspeceAnimal();
  const estRaceAnimalValide = validerRaceAnimal();
  const estAgeAnimalValide = validerAgeAnimal();
  const estDescriptionAnimalValide = validerDescriptionAnimal();
  const estCourrielProprietaireValide = validerCourrielProprietaire();
  const estAdresseCiviqueValide = validerAdresseCivique();
  const estVilleValide = validerVille();
  const estCodePostalValide = validerCodePostal();

  if (
    !estNomAnimalValide ||
    !estEspeceAnimalValide ||
    !estRaceAnimalValide ||
    !estAgeAnimalValide ||
    !estDescriptionAnimalValide ||
    !estCourrielProprietaireValide ||
    !estAdresseCiviqueValide ||
    !estVilleValide ||
    !estCodePostalValide
  ) {
    event.preventDefault();
  }
});
