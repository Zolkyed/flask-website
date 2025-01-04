# Copyright 2024 <Votre nom et code permanent>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask
from flask import render_template, request, redirect, url_for
from flask import g
from .database import Database
import random

app = Flask(__name__, static_url_path="", static_folder="static")

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()

# Page d'accueil
@app.route('/')
def accueil():
    db = get_db()
    liste_animaux = db.get_animaux()
    animaux_aleatoire = random.sample(liste_animaux, 5)
    return render_template('accueil.html', animaux_aleatoire=animaux_aleatoire)

# Page d'adoption
@app.route('/adoption', methods=['GET'])
def adoption_form():
    return render_template('adoption.html')

# Validation de tous les champs obligatoires
def validation_champ_obligatoire(champ):
    if champ.strip() == "":
        return "Tous les champs du formulaire sont obligatoires."
    return None

# Validation ne contient pas de virgule
def valider_virgule(champ):
    if ',' in champ:
        return "Aucun champ ne peut contenir une virgule."
    return None

# Validation nom entre 3 et 20 caractères
def valider_nom(nom):
    if len(nom) < 3 or len(nom) > 20:
        return "Le nom de l'animal doit avoir entre 3 et 20 caractères."
    return None

# Validation age entre 0 et 30
def valider_age(age):
    if int(age) < 0 or int(age) > 30:
        return "L'âge doit être une valeur numérique entre 0 et 30."
    return None

# Validation courriel contient un @
def valider_courriel(courriel):
    if "@" not in courriel:
        return "L'adresse courriel doit avoir un format valide."
    return None

# Submission Form
@app.route('/adoption', methods=['POST'])
def submit_adoption_form():
    db = get_db()
    # Récupération des champs dans le form
    if request.method == 'POST':
        nom = request.form['nomAnimal']
        espece = request.form['especeAnimal']
        race = request.form['raceAnimal']
        age = request.form['ageAnimal']
        description = request.form['descriptionAnimal']
        courriel = request.form['courrielProprietaire']
        adresse = request.form['adresseCivique']
        ville = request.form['ville']
        cp = request.form['codePostal']

        # Validation des champs backend
        liste_erreurs = []
        liste_erreurs.append(validation_champ_obligatoire(nom))
        liste_erreurs.append(validation_champ_obligatoire(espece))
        liste_erreurs.append(validation_champ_obligatoire(race))
        liste_erreurs.append(validation_champ_obligatoire(age))
        liste_erreurs.append(validation_champ_obligatoire(description))
        liste_erreurs.append(validation_champ_obligatoire(courriel))
        liste_erreurs.append(validation_champ_obligatoire(adresse))
        liste_erreurs.append(validation_champ_obligatoire(ville))
        liste_erreurs.append(validation_champ_obligatoire(cp))

        liste_erreurs.append(valider_virgule(nom))
        liste_erreurs.append(valider_virgule(espece))
        liste_erreurs.append(valider_virgule(race))
        liste_erreurs.append(valider_virgule(age))
        liste_erreurs.append(valider_virgule(description))
        liste_erreurs.append(valider_virgule(courriel))
        liste_erreurs.append(valider_virgule(adresse))
        liste_erreurs.append(valider_virgule(ville))
        liste_erreurs.append(valider_virgule(cp))

        liste_erreurs.append(valider_nom(nom))
        liste_erreurs.append(valider_age(age))
        liste_erreurs.append(valider_courriel(courriel))

        erreurs = []
        for erreur in liste_erreurs:
          if erreur is not None:
            erreurs.append(erreur)

        if erreurs:
            return render_template('adoption.html', erreurs=erreurs)

        # Ajouter un animal dans la DB
        animal_id = db.add_animal(nom, espece, race, age, description, courriel, adresse, ville, cp)
        return redirect(url_for('animal', id=animal_id))

    return render_template('adoption.html')

# Page animal/id
@app.route('/animal/<int:id>')
def animal(id):
    db = get_db()
    animal = db.get_animal(id)
    if animal:
        return render_template('animal.html', animal=animal)
    else:
        return render_template('404.html'), 404

@app.route('/animal/<int:id>/<courriel>')

# Page Recherche
@app.route('/recherche', methods=['GET', 'POST'])
def recherche_animaux():
    if request.method == 'POST':
        terme = request.form['recherche']
        db = get_db()
        animaux_trouves = db.search_animal(terme)
        return render_template('recherche.html', animaux_trouves=animaux_trouves)
    else:
        return render_template('404.html'), 404

# Page Erreur 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
