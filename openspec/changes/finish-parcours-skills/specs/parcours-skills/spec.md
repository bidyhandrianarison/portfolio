# Spec Delta

## Purpose

Définir l'acceptation de la refonte en cours de Parcours et Compétences, sans convertir les stories déjà terminées ni remplacer leurs références BMAD.

## ADDED Requirements

### Requirement: Filtrage du parcours
La page Parcours MUST afficher la frise chronologique filtrable Tous/Professionnel/Académique, avec un compteur correspondant aux entrées visibles et un état de sélection accessible.

#### Scenario: Sélection d'une catégorie
- **WHEN** le visiteur sélectionne Académique puis Tous
- **THEN** seules les entrées académiques puis toutes les entrées sont affichées et les compteurs suivent la sélection.

#### Scenario: Entrée actuelle et liste vide
- **WHEN** une entrée n'a pas de date de fin, ou aucune entrée n'est disponible
- **THEN** l'entrée porte le badge localisé En cours, ou la page présente un état vide localisé sans erreur.

### Requirement: Domaines issus du contenu
La page Compétences MUST présenter cinq domaines numérotés 01–05 avec les compétences issues du CMS, puis les certifications dans une section distincte sans onglets.

#### Scenario: Domaine sans compétence
- **WHEN** un domaine ne contient aucune compétence
- **THEN** sa carte et son numéro restent affichés sans inventer de tags.

### Requirement: Certifications filtrables
La section Certifications MUST filtrer par catégorie, compter les cartes affichables, gérer les états vides et conserver l'accès au détail existant. Une certification sans description MUST être affichable.

#### Scenario: Filtre et ouverture du détail
- **WHEN** le visiteur filtre une liste contenant des certifications avec et sans slug puis ouvre une carte
- **THEN** le compteur reflète les cartes affichables de la catégorie et le lien mène au détail dans la locale active.

#### Scenario: Résultat vide
- **WHEN** aucune certification affichable ne correspond à la sélection
- **THEN** un message vide localisé est affiché.

### Requirement: Compatibilité bilingue
Les deux pages MUST conserver les textes FR/EN, les dates localisées et le fallback français du contenu CMS. Le bouton CV MUST rester disponible selon les réglages existants et le deep-link historique des certifications MUST rester utilisable.

#### Scenario: Liens hérités
- **WHEN** le visiteur ouvre /en/skills?tab=certifications
- **THEN** la section Certifications est atteinte sans restaurer les anciens onglets.

#### Scenario: CV et traduction
- **WHEN** le visiteur consulte Parcours en FR puis EN avec un CV configuré
- **THEN** les libellés et dates suivent la langue et le bouton conserve le téléchargement prévu.

### Requirement: Résilience et rendu accessible
Les pages MUST proposer un fallback de fonctionnalité si Sanity échoue et rester utilisables sur mobile, au clavier, en thème clair et sombre, conformément aux maquettes validées.

#### Scenario: Échec Sanity
- **WHEN** une requête nécessaire à Parcours ou Compétences échoue
- **THEN** la page concernée présente son fallback localisé sans crash global.

#### Scenario: Utilisation mobile et clavier
- **WHEN** le visiteur utilise les filtres au clavier ou consulte les pages sur mobile dans chaque thème
- **THEN** la sélection est perceptible, le focus reste visible et la disposition conserve l'accès aux cartes et actions.
