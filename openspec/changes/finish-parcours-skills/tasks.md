# Tasks

## Acquis observés (lecture du code, pas acceptation fonctionnelle)

- Les deux pages branchent déjà la frise, les domaines, les certifications et leurs fallbacks.
- `FilterPills` est déjà partagé entre projets, parcours et certifications ; les traductions et styles sont présents dans le working tree.
- Les tests existants couvrent les projets mais ceux des anciennes tabs ne prouvent pas le fonctionnement des nouveaux composants.
- Ne pas reconstruire ces acquis. Les tâches suivantes portent sur leur vérification et les seuls écarts démontrés.
- Pas de `design.md` : aucune nouvelle décision technique ; reprendre les décisions résolues du 29 octobre dans la story BMAD 5 référencée par `proposal.md`.

## 1. Parcours

- [x] 1.1 Ajouter un test d'intégration de `TimelineFilterBar` avec la frise réelle : Tous/Professionnel/Académique, entrées visibles, compte et sélection accessible ; corriger uniquement les échecs démontrés et vérifier le passage de la suite ciblée.
- [x] 1.2 Couvrir dates FR/EN, badge sans date de fin, liste vide, CV configuré et fallback Sanity de la page ; vérifier les tests correspondants et consigner les résultats dans ce fichier. Résultat : `parcours-page.test.tsx`, 4 tests réussis.

## 2. Compétences et primitive partagée

- [x] 2.1 Tester `DomainGrid` et `CertificationsSection` dans le parcours de la page : cinq domaines, catégorie vide, tags issus des données, filtrage avec compteur, certification sans slug ou description et états vides ; vérifier les suites ciblées et corriger les seuls écarts établis. Résultat : `skills-page.test.tsx`, 4 tests réussis.
- [x] 2.2 Vérifier FR/EN, fallback français, liens de détail et `?tab=certifications` ; couvrir le fallback Sanity et consigner les preuves de test ou de navigateur dans ce fichier. Résultat : `skills-page.test.tsx`, 4 tests réussis, dont lien hérité et fallback.
- [ ] 2.3 Vérifier les usages des anciennes tabs et contrôles remplacés avant de supprimer uniquement le code devenu inutilisé ; conserver ou déplacer leurs assertions pertinentes et vérifier les tests Compétences et Projets après tout ajustement de `FilterPills`.

## 3. Acceptation intégrée

- [ ] 3.1 Comparer les deux pages aux maquettes Parcours/Compétences en FR/EN, clair/sombre, mobile et desktop ; vérifier clavier, focus, contraste renforcé et mouvement réduit, puis consigner les résultats et corriger uniquement les écarts du périmètre.
- [ ] 3.2 Exécuter `npm test -- --runInBand`, `npm run typecheck`, `npx eslint src`, `npm run format:check` et `npm run build` ; consigner les résultats exacts, distinguer les éventuels blocages préexistants et obtenir les quatre contrôles requis avant tout commit.
- [ ] 3.3 Effectuer la revue croisée du diff de cette finalisation avant merge, traiter ses constats et inscrire l'acceptation et les éventuels reports dans ce fichier sans modifier les documents BMAD.

## Workflow follow-up

- Archiver ce changement après vérification et acceptation ; ne pas convertir les stories BMAD terminées.
- Contact/Mentions légales reste un changement ultérieur distinct.
