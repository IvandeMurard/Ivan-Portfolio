

## Plan : Mise a jour du contenu FB Agent Case Study

### Objectif
Mettre a jour le case study avec un contenu plus direct, oriente produit, refletant l'etat actuel du projet (multi-agent + RAG, API live) et le nouveau roadmap (Phase 1-5 avec Before/Now/Next/Later).

---

### Vue d'ensemble des modifications

| Section | Action |
|---------|--------|
| TL;DR (lignes 108-143) | Remplacer contenu complet |
| Section 1 - Problem (lignes 147-268) | Simplifier, restructurer |
| Section 2 - Role (lignes 271-303) | Remplacer contenu |
| Section 3 - Solution (lignes 307-424) | Rendre agent-centric |
| Section 4 - Roadmap (lignes 427-585) | Nouvelle structure 5 phases |
| Section 5 - Architecture (lignes 588-658) | Mettre a jour texte |
| Section 6 - Challenges (lignes 662-709) | Garder, ajuster labels |
| Section 7 - FAQ (lignes 712-738) | Reduire a 3 questions |
| Section 8 - Go Further (lignes 742-784) | Raccourcir descriptions |

---

### Details techniques

#### 1. TL;DR (lignes 108-143)

Remplacer le contenu des 5 paragraphes par :

- **Context**: Hotel F&B managers still rely on manual pattern matching (PMS + events + weather) to plan staffing. It takes 5-8 hours per week and often stays around ~70% accuracy.
- **Problem**: This leads to over/under-staffing, operational stress, food waste, and missed revenue. Existing tools don't bridge external context (events, weather) with internal PMS data for F&B operations.
- **Solution**: A PMS-agnostic AI agent that uses RAG (Qdrant + Claude) over 495 historical F&B patterns to predict covers, recommend staffing, and explain each decision in natural language.
- **My role**: End-to-end ownership - market research, problem framing, data modelling, RAG architecture (Mistral + Qdrant), FastAPI backend, deployment, and roadmap design (Before/Now/Next/Later) with PMS integrations in mind.
- **What's now/next**: Solidifying the manager-in-the-loop workflow and metrics (Now), then building a dashboard and PMS integrations (Next), and evolving towards an operations copilot for hospitality (Later).

#### 2. Section Problem (lignes 147-268)

Simplifier la structure :

1. Supprimer le bloc "Industry Evolution" avec les 5 cartes (lignes 150-188)
2. Remplacer par un paragraphe contextuel sur les donnees
3. Simplifier les pain points en liste
4. Garder une courte section "Industry shift"
5. Conserver la citation de Toni Stoeckl (actuellement dans la section Roadmap - la deplacer ici)
6. Supprimer ou reduire les statistiques d'impact

Nouveau contenu :
```
Hotels and restaurants generate lots of data: bookings, occupancy, historical covers. 
Yet most Property Management Systems (PMS) are still reactive: they show what happened, 
not what will happen.

To plan staffing, F&B managers manually correlate:
- PMS occupancy and reservations
- city event calendars
- weather apps
- past "similar weekends" from memory

It takes 5-8 hours per week and often leads to rough, ~70% accurate forecasts. 
The cost shows up as:
- overstaffed services and margin erosion
- understaffed services and guest experience issues
- food waste from over-preparation
```

#### 3. Section Role (lignes 271-303)

Remplacer le contenu par une structure Product/Technical :

**Product**
- Framed the problem with a focus on real F&B pains (stress, waste, labor cost)
- Designed the data model and agent behavior around "augment, not replace" managers
- Defined an incremental roadmap: Phase 1-5 with clear Before/Now/Next/Later

**Technical**
- Processed a hotel booking dataset into 495 F&B patterns
- Designed and implemented a RAG pipeline (Mistral embeddings + Qdrant)
- Built and deployed a FastAPI backend that exposes a simple /predict endpoint
- Set up validation scenarios and observability for predictions

#### 4. Section Solution (lignes 307-424)

Rendre la narrative agent-centric :

Remplacer le bloc "Ambient Agentic Experience" par :

```
At its core, this project is an AI F&B Operations Agent.

The agent's job is to:
- understand the context of an upcoming service (property, date, service type, occupancy, events, weather)
- find similar historical services
- predict covers and recommend staffing
- explain its reasoning in a way a F&B manager can trust

The experience is:
- API-first, so it can live inside a PMS, a staff planning tool, or a custom dashboard
- transparent, so managers see not only a number, but also the "why" behind it
- human-in-the-loop, so managers can approve, adjust, or override recommendations
```

Conserver :
- Le bloc "Core Design Principles" (lignes 318-414)
- La citation d'Avi Brosh (lignes 417-424)

#### 5. Section Roadmap (lignes 427-585)

Restructurer en 5 phases avec mapping Before/Now/Next/Later :

| Phase | Titre | Status | Mapping |
|-------|-------|--------|---------|
| 1 | Foundations | Completed | Before |
| 2 | RAG with real patterns | Completed | Before |
| 3 | Productisation & observability | In progress | Now |
| 4 | Dashboard & PMS integrations | Planned | Next |
| 5 | Operations copilot | Vision | Later |

Contenu pour chaque phase :

**Phase 1 - Foundations (Before, completed)**
Goal: Validate core architecture
- Set up FastAPI backend with /predict endpoint
- Configured Qdrant vector database
- Integrated Claude API for reasoning
- Proof-of-concept: RAG works for hospitality

**Phase 2 - RAG with real patterns (Before, completed)**
Goal: Build pattern library from real data
- Processed hotel dataset into 495 F&B patterns
- Implemented Mistral embeddings
- Optimized similarity search
- Validated pattern quality

**Phase 3 - Productisation & observability (Now)**
Goal: Production-ready API
- Manager-in-the-loop workflow
- Prediction confidence scoring
- Error handling and logging
- API documentation

**Phase 4 - Dashboard & PMS integrations (Next)**
Goal: Real-world deployment
- Visual dashboard for managers
- PMS API integration (Mews, Opera, etc.)
- Event & weather data connectors
- Staff calendar sync

**Phase 5 - Operations copilot (Later)**
Goal: Expand to full F&B operations
- F&B demand prediction
- Inventory optimization
- Menu recommendations
- Waste reduction tracking

Garder le bloc "Strategic Decisions" (lignes 546-583)
Deplacer la citation Toni Stoeckl vers Section 1

#### 6. Section Architecture (lignes 588-658)

Mettre a jour le texte pour refleter :
- Context enrichment (external + internal signals)
- 495 F&B patterns, Mistral embeddings, Qdrant
- Claude as reasoning agent
- FastAPI /predict endpoint

Garder le diagramme ASCII mais mettre a jour les labels :
- Remplacer "Phase 2: Conversational (voice/text) - Planned" par "Text input"
- Ajouter reference a "495 patterns" dans le bloc Qdrant

#### 7. Section Challenges (lignes 662-709)

Garder la structure actuelle (3 challenges) - deja conforme aux specs.
Ajuster les labels "Phase 2 fix" vers "Fix" (sans reference de phase)

#### 8. Section FAQ (lignes 712-738)

Reduire de 6 a 3 questions :

1. **How is this different from a classic dashboard?**
   (Combiner FAQ 1 et 2 actuelles)

2. **Why start with staff instead of full F&B demand?**
   (Garder FAQ 6)

3. **How did you validate the approach without live PMS data?**
   (Adapter FAQ 3)

Supprimer :
- FAQ sur data privacy (4)
- FAQ sur Dashboard + Conversational (5)
- FAQ sur existing forecasting tools (1)

#### 9. Section Go Further (lignes 742-784)

Raccourcir les descriptions a 1 phrase chacune :
- Mews: "Leading PMS provider's vision for agentic AI in hospitality."
- Roadbook: "Industry insights on hospitality innovation trends."

---

### Fichiers modifies

| Fichier | Action |
|---------|--------|
| `src/pages/cases/FBAgentCaseStudy.tsx` | Mise a jour contenu textuel |

---

### Composants preserves (aucune modification)

- `CaseStudyHero`
- `CaseStudySidebar`
- `Section`
- `QuoteBlock`
- `FAQItem`
- `Tooltip`
- Navigation et Footer
- Structure generale du layout

---

### Estimation

- Lignes modifiees : ~300 lignes sur 832
- Complexite : Moyenne (mise a jour textuelle, pas de changement structurel)

