# Proposal

## Why

La refonte Parcours + Compétences est déjà en cours dans le working tree, mais ses critères d'acceptation ne sont pas encore vérifiés. OpenSpec reprend uniquement sa finalisation, sans recréer les fonctionnalités livrées.

## What Changes

- Compléter les écarts constatés et les tests d'intégration des nouveaux parcours de filtrage.
- Vérifier FR/EN, états vides, fallbacks Sanity, lien CV et deep-link hérité des certifications.
- Valider le rendu face aux maquettes, les contrôles du dépôt et la revue croisée.
- Hors périmètre : Contact/Mentions légales, chatbot, drawer mobile, tilt du bento, schémas CMS et refonte des pages de détail.

## Capabilities

### New Capabilities

- `parcours-skills`: contrat de finalisation de la refonte en cours des pages Parcours et Compétences. Nouvelle entrée dans OpenSpec, pas une nouvelle fonctionnalité à réimplémenter.

### Modified Capabilities

Aucune : aucune spec principale OpenSpec n'existe encore.

## Impact

Périmètre : pages `[locale]/parcours` et `[locale]/skills`, composants `parcours`, `competences`, primitive `FilterPills`, traductions et styles associés. Vérifier la non-régression des filtres projets qui partagent cette primitive. Aucun changement de dépendance ou d'architecture prévu.

Sources conservées : `_bmad-output/specs/spec-refonte-design/stories/5-parcours-competences.md` (décisions validées), `design-reference.md` du même dossier parent, `_bmad-output/maquettes-portfolio/{parcours,competences}.html` et `AGENTS.md`.

Point de reprise : HEAD `25104a9` lors de l'audit ; modifications locales préexistantes à préserver. Aucun test ni build exécuté pendant l'audit ; les checkpoints BMAD contradictoires ne constituent pas une preuve d'acceptation.
