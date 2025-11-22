import { CaseImage } from "@/components/case/CaseImage";

export default function WttjCaseStudyFR() {
  // Discovery Insights
  const discoveryLevels = [
    {
      level: 0,
      label: "Vue d'ensemble",
      threshold: 0,
      content: (
        <div className="p-6">
          <p className="text-base">
            <b>8 entretiens utilisateurs</b> ont révélé des besoins critiques de transparence et de filtrage pour les profils seniors.
          </p>
        </div>
      ),
    },
    {
      level: 1,
      label: "Insights clés",
      threshold: 0.4,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">3 Insights majeurs</h4>
          
          <div className="space-y-3">
            <div className="p-4 border-l-4 border-accent bg-muted rounded">
              <h5 className="font-semibold mb-1">💰 Transparence salariale</h5>
              <p className="text-sm text-muted-foreground">
                "Je veux voir le salaire avant de postuler, pas après 3 entretiens"
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
              <h5 className="font-semibold mb-1">🎯 Filtres pertinents</h5>
              <p className="text-sm text-muted-foreground">
                "Les critères tech (stack, remote, séniorité) doivent être au premier plan"
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 rounded">
              <h5 className="font-semibold mb-1">🤝 Accompagnement</h5>
              <p className="text-sm text-muted-foreground">
                "J'ai besoin d'aide pour vendre mon expérience, pas juste mes compétences"
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg text-sm">
            <p><b>CTR seniors : 11%</b> vs <b>juniors : 20%</b> → Gap d'engagement significatif</p>
          </div>
        </div>
      ),
    },
    {
      level: 2,
      label: "Méthodologie complète",
      threshold: 0.7,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Processus Discovery détaillé</h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">📋 Protocole d'entretien</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>8 participants (6 tech, 2 autres secteurs)</li>
                <li>Mix : 5-8 ans d'XP (4), 8-12 ans (3), 12+ ans (1)</li>
                <li>Durée : 45-60min par entretien</li>
                <li>Format : semi-directif avec Jobs-to-be-Done</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">🔍 Framework JTBD</h5>
              <p className="text-sm text-muted-foreground mb-2">
                <i>"Quand [situation], je veux [motivation], pour [outcome attendu]"</i>
              </p>
              <p className="text-sm">
                Exemple : "Quand je cherche un nouveau poste, je veux comprendre rapidement 
                l'environnement tech et le niveau d'autonomie, pour éviter de perdre du temps 
                sur des offres inadaptées à mon niveau."
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">📊 Synthèse & Affinity Mapping</h5>
              <p className="text-sm">
                120+ verbatims regroupés en 12 thèmes → 3 insights prioritaires validés 
                par l'équipe. Priorisation basée sur fréquence (6+ mentions) et intensité 
                émotionnelle (frustration exprimée).
              </p>
            </div>
            
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p><b>Résultat clé :</b> Les seniors ne cherchent pas plus d'offres, 
              ils cherchent des offres <i>mieux qualifiées</i>. Transparence + guidance = conversion.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // RICE Prioritization
  const riceLevels = [
    {
      level: 0,
      label: "Vue d'ensemble",
      threshold: 0,
      content: (
        <div className="p-6">
          <p className="text-base">
            Features MVP priorisées avec le <b>framework RICE</b> pour maximiser l'impact avec des ressources limitées.
          </p>
        </div>
      ),
    },
    {
      level: 1,
      label: "Top 3 Features",
      threshold: 0.4,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Framework RICE</h4>
          <p className="text-sm text-muted-foreground mb-4">
            <b>Reach × Impact × Confidence ÷ Effort</b>
          </p>

          <div className="space-y-3">
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">1. Standardisation offres d'emploi</h5>
                <span className="text-xl font-bold text-green-700">27</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Imposer salaire, remote, missions claires, stack technique dans toutes les annonces
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">2. Assistant IA (LLM)</h5>
                <span className="text-xl font-bold text-blue-700">13.5</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Optimisation CV, aide au storytelling, préparation entretien personnalisée
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">3. Filtres avancés tech</h5>
                <span className="text-xl font-bold text-purple-700">12</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Stack, séniorité requise, mode de travail (remote/hybrid/on-site)
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      level: 2,
      label: "Matrice complète",
      threshold: 0.7,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Matrice RICE complète (9 features)</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-center p-2">Reach</th>
                  <th className="text-center p-2">Impact</th>
                  <th className="text-center p-2">Conf.</th>
                  <th className="text-center p-2">Effort</th>
                  <th className="text-center p-2 font-bold">Score</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b bg-green-50/50 dark:bg-green-950/10">
                  <td className="p-2">Standardisation offres</td>
                  <td className="text-center">900</td>
                  <td className="text-center">3</td>
                  <td className="text-center">100%</td>
                  <td className="text-center">1</td>
                  <td className="text-center font-bold">27</td>
                </tr>
                <tr className="border-b bg-blue-50/50 dark:bg-blue-950/10">
                  <td className="p-2">Assistant IA</td>
                  <td className="text-center">450</td>
                  <td className="text-center">3</td>
                  <td className="text-center">80%</td>
                  <td className="text-center">8</td>
                  <td className="text-center font-bold">13.5</td>
                </tr>
                <tr className="border-b bg-purple-50/50 dark:bg-purple-950/10">
                  <td className="p-2">Filtres avancés</td>
                  <td className="text-center">800</td>
                  <td className="text-center">2</td>
                  <td className="text-center">90%</td>
                  <td className="text-center">3</td>
                  <td className="text-center font-bold">12</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Recommandations AI</td>
                  <td className="text-center">600</td>
                  <td className="text-center">2</td>
                  <td className="text-center">70%</td>
                  <td className="text-center">5</td>
                  <td className="text-center">8.4</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">CTA onboarding</td>
                  <td className="text-center">700</td>
                  <td className="text-center">1</td>
                  <td className="text-center">95%</td>
                  <td className="text-center">2</td>
                  <td className="text-center">6.7</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Badges "senior-friendly"</td>
                  <td className="text-center">900</td>
                  <td className="text-center">1</td>
                  <td className="text-center">80%</td>
                  <td className="text-center">2</td>
                  <td className="text-center">3.6</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Success stories</td>
                  <td className="text-center">400</td>
                  <td className="text-center">1</td>
                  <td className="text-center">60%</td>
                  <td className="text-center">4</td>
                  <td className="text-center">0.6</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Forum communauté</td>
                  <td className="text-center">200</td>
                  <td className="text-center">2</td>
                  <td className="text-center">50%</td>
                  <td className="text-center">10</td>
                  <td className="text-center">0.2</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Événements networking</td>
                  <td className="text-center">100</td>
                  <td className="text-center">2</td>
                  <td className="text-center">40%</td>
                  <td className="text-center">12</td>
                  <td className="text-center">0.07</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <p className="font-medium">Rationale des décisions :</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><b>Standardisation (27)</b> : Quick win, impact immédiat, faible effort côté tech (template enforcement)</li>
              <li><b>Assistant IA (13.5)</b> : Différenciateur fort mais nécessite R&D et tests itératifs</li>
              <li><b>Filtres (12)</b> : Demande existant, effort modéré, impact direct sur CTR</li>
              <li><b>Forum (0.2)</b> : Forte maintenance, faible reach initial, dépriorisé pour MVP</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  // KPIs & Success Metrics
  const kpiLevels = [
    {
      level: 0,
      label: "KPI principal",
      threshold: 0,
      content: (
        <div className="p-6">
          <p className="text-base">
            <b>Objectif : CTR seniors 11% → 13%</b> dans les 3 mois post-lancement MVP
          </p>
        </div>
      ),
    },
    {
      level: 1,
      label: "4 KPIs de suivi",
      threshold: 0.4,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Métriques de succès</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="text-xs text-muted-foreground mb-1">CTR seniors (tech)</div>
              <div className="text-2xl font-bold">11% → 13%</div>
              <div className="text-xs mt-1">+18% d'engagement</div>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="text-xs text-muted-foreground mb-1">Taux de complétion profil</div>
              <div className="text-2xl font-bold">65% → 75%</div>
              <div className="text-xs mt-1">+15% de profils qualifiés</div>
            </div>
            
            <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <div className="text-xs text-muted-foreground mb-1">Utilisation assistant IA</div>
              <div className="text-2xl font-bold">0% → 30%</div>
              <div className="text-xs mt-1">Sur candidats actifs</div>
            </div>
            
            <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
              <div className="text-xs text-muted-foreground mb-1">Taux de candidature</div>
              <div className="text-2xl font-bold">5% → 7%</div>
              <div className="text-xs mt-1">+40% de conversions</div>
            </div>
          </div>
          
          <div className="p-3 bg-muted rounded-lg text-sm">
            <p><b>Timeline :</b> Mesure à T+1 mois, T+2 mois, T+3 mois post-MVP</p>
          </div>
        </div>
      ),
    },
    {
      level: 2,
      label: "Méthodologie & calculs",
      threshold: 0.7,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Méthodologie de mesure détaillée</h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">📐 Calcul CTR seniors</h5>
              <div className="p-3 bg-muted rounded font-mono text-sm">
                CTR = (Clics offres / Impressions offres) × 100
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Segmentation : profils 5-15 ans d'XP, secteur tech, actifs (connexion &lt; 30j)
              </p>
              <p className="text-sm text-muted-foreground">
                Baseline : 11% (moyenne T-3 mois avant MVP)
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">🎯 Assumptions critiques</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Standardisation offres adoptée par 80% des recruteurs dans le mois 1</li>
                <li>Assistant IA lancé en beta avec 500 early adopters (10% seniors actifs)</li>
                <li>Pas de changement majeur dans l'algorithme de recommandation pendant test</li>
                <li>Volume d'offres tech stable (±10%)</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">⚠️ Risques de mesure</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li><b>Saisonnalité :</b> T4 = pic recrutement tech → potentiel biais à la hausse</li>
                <li><b>Adoption recruteurs :</b> Si &lt;60% n'utilisent pas templates → impact dilué</li>
                <li><b>Cannibalisation :</b> Les seniors peuvent cliquer plus mais candidater ailleurs</li>
              </ul>
            </div>
            
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-sm">
              <p className="font-medium mb-1">Plan de mitigation :</p>
              <p>Suivi hebdomadaire avec alertes si CTR &lt; 11.5% à T+1 mois → 
              analyse qualitative rapide (5 entretiens) pour identifier blocages.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Strategic Pivot
  const pivotLevels = [
    {
      level: 0,
      label: "Décision",
      threshold: 0,
      content: (
        <div className="p-6">
          <p className="text-base">
            <b>Recentrage stratégique :</b> Focus tech, profils 5-8 ans d'expérience, plutôt que tous secteurs/séniorités.
          </p>
        </div>
      ),
    },
    {
      level: 1,
      label: "Rationale",
      threshold: 0.4,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Pourquoi ce pivot ?</h4>
          
          <div className="space-y-3">
            <div className="p-4 border-l-4 border-accent rounded bg-muted">
              <h5 className="font-semibold mb-1">💡 Impact maximal</h5>
              <p className="text-sm text-muted-foreground">
                Tech = 60% du trafic seniors, gap CTR le plus fort (11% vs 20%), 
                marché compétitif avec forte valeur per-hire.
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-blue-500 rounded bg-blue-50 dark:bg-blue-950/20">
              <h5 className="font-semibold mb-1">⚡ Effort concentré</h5>
              <p className="text-sm text-muted-foreground">
                MVP limité = impossible de tout traiter. Mieux vaut exceller sur un segment 
                que décevoir sur tous.
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-purple-500 rounded bg-purple-50 dark:bg-purple-950/20">
              <h5 className="font-semibold mb-1">🎯 Différenciation</h5>
              <p className="text-sm text-muted-foreground">
                Les plateformes généralistes ignorent les besoins tech spécifiques 
                (stack, remote, équipe engineering). Opportunité de niche.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      level: 2,
      label: "Alternatives considérées",
      threshold: 0.7,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">3 scénarios évalués</h4>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">A. Tous secteurs, focus 10-15 ans XP</h5>
                <span className="px-2 py-1 bg-red-100 dark:bg-red-950/20 text-red-700 text-xs rounded">Rejeté</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Reach large mais besoins trop hétérogènes (finance ≠ retail ≠ tech). 
                Impossible de personnaliser l'expérience MVP.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Impact projeté : +0.5% CTR global (dilué)
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">B. Tech uniquement, tous niveaux</h5>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-950/20 text-yellow-700 text-xs rounded">Considéré</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Cohérent sectoriellement mais juniors (0-3 ans) ont des besoins opposés 
                aux seniors (volume vs qualité). Risque de tout moyenniser.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Impact projeté : +1% CTR tech global
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">C. Tech, 5-8 ans XP (choix final)</h5>
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">✓ Sélectionné</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Segment homogène (mid-senior cherchant évolution), besoins clairs 
                (transparence + guidance), reach suffisant (30% seniors tech).
              </p>
              <p className="text-xs text-muted-foreground italic">
                Impact projeté : +2% CTR sur segment (11% → 13%)
              </p>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-sm">
            <p className="font-medium mb-1">Données de validation :</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-xs">
              <li>6/8 interviews = profils tech 5-8 ans (échantillon naturellement concentré)</li>
              <li>Analyse cohortes : 5-8 ans = meilleur conversion rate post-clic (+12% vs global)</li>
              <li>Benchmark : LinkedIn Tech jobs, Indeed, Hired → tous segmentent par séniorité</li>
            </ul>
          </div>
          
          <div className="mt-3 text-sm text-muted-foreground italic">
            <b>Stratégie d'expansion future :</b> Si succès MVP (CTR &gt; 13% maintenu 3 mois), 
            élargir à 3-12 ans XP tech, puis autres secteurs (finance, product).
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-12">
      {/* HERO */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Acquisition de profils seniors sur Welcome to the Jungle
        </h1>
        <p className="text-lg text-muted-foreground">
          Comment augmenter l'engagement des candidats expérimentés (5-15 ans) dans la tech 
          grâce à la transparence, des filtres pertinents et un accompagnement IA.
        </p>
      </header>

      {/* TL;DR */}
      <aside className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
        <h2 className="font-semibold mb-3">TL;DR</h2>
        <ul className="space-y-2 text-sm">
          <li><b>Contexte :</b> Projet formation Product Management Maestro (12 jours, équipe de 4 PMs)</li>
          <li><b>Challenge :</b> CTR seniors tech = 11% vs 20% juniors. Pourquoi ?</li>
          <li><b>Mon rôle :</b> PM — Discovery (2 entretiens), prototypage, synthèse insights</li>
          <li><b>Pivot stratégique :</b> Focus tech 5-8 ans XP (segment homogène, impact max)</li>
          <li><b>MVP :</b> Standardisation offres + Assistant IA + Filtres avancés (RICE)</li>
          <li><b>Impact visé :</b> CTR 11% → 13% en 3 mois</li>
        </ul>
      </aside>

      {/* 1. CONTEXT & CHALLENGE */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">1. Contexte & Challenge</h2>
        
        <div className="space-y-4">
          <p>
            Welcome to the Jungle (WTTJ) est une plateforme d'emploi moderne qui se démarque 
            par sa mise en avant de la culture d'entreprise. Malgré son succès auprès des jeunes 
            talents, la plateforme peine à convertir les <b>profils seniors tech (5-15 ans d'expérience)</b>.
          </p>
          
          <p>
            Le problème : <b>CTR seniors = 11%</b> contre <b>20% pour les juniors</b>. 
            Les seniors visitent les offres mais cliquent moins, signe d'un manque de pertinence 
            ou de confiance dans le contenu des annonces.
          </p>
        </div>

        <CaseImage
          alt="Statistiques et contexte marché"
          desktopSrc="/WTTJ/contexte-desktop.png"
          mobileSrc="/WTTJ/contexte-desktop.png"
          caption="Données marché et signaux utilisateurs"
        />

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border bg-card shadow-sm">
            <h3 className="font-medium mb-2">🎯 Acquisition seniors tech</h3>
            <p className="text-sm text-muted-foreground">
              Augmenter le CTR et la conversion des profils expérimentés
            </p>
          </div>
          
          <div className="p-4 rounded-xl border bg-card shadow-sm">
            <h3 className="font-medium mb-2">💡 Engagement & conversion</h3>
            <p className="text-sm text-muted-foreground">
              Réduire le taux de rebond sur les fiches emploi
            </p>
          </div>
          
          <div className="p-4 rounded-xl border bg-card shadow-sm">
            <h3 className="font-medium mb-2">🔄 Rétention long terme</h3>
            <p className="text-sm text-muted-foreground">
              Créer une expérience adaptée qui fidélise les seniors
            </p>
          </div>
        </div>
      </section>

      {/* 2. MY ROLE & APPROACH */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">2. Mon rôle & Approche</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">🧑‍💼 Mon rôle</h3>
              <p className="text-sm text-muted-foreground">
                <b>Product Manager</b> dans le cadre d'un projet de formation intensive 
                (Product Management Maestro, 12 jours).
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Discovery : réalisation de 2 entretiens utilisateurs sur 8 au total</li>
                <li>Prototypage : création de maquettes et itérations</li>
                <li>Synthèse : participation à l'analyse collective des insights</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">👥 Équipe</h3>
              <p className="text-sm text-muted-foreground">
                4 Product Managers travaillant en sprint intensif (méthode agile)
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium mb-2">📋 Méthodologie</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li><b>Discovery</b> (jours 1-4) : 8 entretiens JTBD, affinity mapping</li>
              <li><b>Pivot stratégique</b> (jour 5) : Opportunity tree, choix segment</li>
              <li><b>Priorisation MVP</b> (jours 6-7) : Framework RICE, arbitrages</li>
              <li><b>Prototypage</b> (jours 8-10) : Maquettes Figma → Lovable</li>
              <li><b>Tests utilisateurs</b> (jours 11-12) : 4 tests, itérations finales</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 3. PROCESS & KEY DECISIONS */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold">3. Processus & Décisions clés</h2>

        {/* Discovery Insights */}
        <div className="space-y-6">
          <h3 className="font-medium">Insights Discovery</h3>
          <div className="space-y-6">
            {discoveryLevels.map((level, index) => (
              <div key={level.level} className={index > 0 ? "pt-6 border-t border-border/50" : ""}>
                {level.content}
              </div>
            ))}
          </div>
        </div>

        <CaseImage
          alt="JTBD & verbatims"
          desktopSrc="/WTTJ/jtbd-desktop.png"
          mobileSrc="/WTTJ/jtbd-desktop.png"
          caption="Framework JTBD & verbatims clés des entretiens"
        />

        {/* Strategic Pivot */}
        <div className="space-y-6">
          <h3 className="font-medium">Pivot stratégique</h3>
          <div className="space-y-6">
            {pivotLevels.map((level, index) => (
              <div key={level.level} className={index > 0 ? "pt-6 border-t border-border/50" : ""}>
                {level.content}
              </div>
            ))}
          </div>
        </div>

        <CaseImage
          alt="Opportunity tree"
          desktopSrc="/WTTJ/pivot-desktop.png"
          mobileSrc="/WTTJ/pivot-desktop.png"
          caption="Arbre d'opportunités - Recentrage stratégique tech 5-8 ans"
        />

        {/* MVP Prioritization */}
        <div className="space-y-6">
          <h3 className="font-medium">Priorisation MVP</h3>
          <div className="space-y-6">
            {riceLevels.map((level, index) => (
              <div key={level.level} className={index > 0 ? "pt-6 border-t border-border/50" : ""}>
                {level.content}
              </div>
            ))}
          </div>
        </div>

        <CaseImage
          alt="Matrice RICE"
          desktopSrc="/WTTJ/rice-desktop.png"
          mobileSrc="/WTTJ/rice-desktop.png"
          caption="Matrice RICE complète - Priorisation des 9 features envisagées"
        />
      </section>

      {/* 4. SOLUTION & DELIVERABLES */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">4. Solution & Livrables</h2>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">🎨 Prototype & Tests</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Maquette Figma → Prototype interactif sur Lovable → 2 sessions de tests utilisateurs 
                avec participants de la phase discovery.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Temps moyen de complétion profil : -30%</li>
                <li>Compréhension critères filtrage : 100% des testeurs</li>
                <li>Satisfaction assistant IA : 4.2/5</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">📅 Roadmap (Now / Next / Later)</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border-l-4 border-green-500">
                  <p className="font-medium">Now (M0-M3)</p>
                  <p className="text-muted-foreground text-xs">Standardisation offres + Filtres avancés</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border-l-4 border-blue-500">
                  <p className="font-medium">Next (M3-M6)</p>
                  <p className="text-muted-foreground text-xs">Assistant IA (beta) + CTA onboarding optimisé</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded border-l-4 border-purple-500">
                  <p className="font-medium">Later (M6+)</p>
                  <p className="text-muted-foreground text-xs">Recommandations IA + Expansion autres secteurs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <CaseImage
              alt="Prototype screens"
              desktopSrc="/WTTJ/proto-onboarding-desktop.png"
              mobileSrc="/WTTJ/proto-onboarding-desktop.png"
              caption="Écrans clés du prototype Lovable"
            />
            
            <a 
              href="https://prototype-wttj.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 border rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors text-center"
            >
              <span className="font-medium">→ Voir le prototype interactif</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. IMPACT & LEARNINGS */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">5. Impact & Learnings</h2>

        {/* KPIs */}
        <div className="space-y-6">
          <h3 className="font-medium">Métriques de succès</h3>
          <div className="space-y-6">
            {kpiLevels.map((level, index) => (
              <div key={level.level} className={index > 0 ? "pt-6 border-t border-border/50" : ""}>
                {level.content}
              </div>
            ))}
          </div>
        </div>

        {/* Key Learnings */}
        <div className="space-y-4">
          <h3 className="font-medium">3 Apprentissages clés</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border bg-card shadow-sm">
              <h4 className="font-medium mb-2">🎯 Segmentation &gt; Volume</h4>
              <p className="text-sm text-muted-foreground">
                Mieux vaut exceller sur un segment homogène que décevoir sur un public large. 
                Le pivot tech 5-8 ans a clarifié toutes les décisions produit.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border bg-card shadow-sm">
              <h4 className="font-medium mb-2">⚡ Transparence = Trust</h4>
              <p className="text-sm text-muted-foreground">
                La standardisation des offres (salaire, stack, remote) a été le levier #1 
                selon les tests. Les seniors veulent de la clarté, pas du marketing.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border bg-card shadow-sm">
              <h4 className="font-medium mb-2">🤖 IA = Différenciation</h4>
              <p className="text-sm text-muted-foreground">
                L'assistant IA n'était pas prévu initialement. C'est la discovery qui a révélé 
                le besoin d'accompagnement ("vendre mon expérience, pas mes skills").
              </p>
            </div>
          </div>
        </div>

        {/* Risks mitigation */}
        <div className="p-6 rounded-xl bg-muted">
          <h3 className="font-medium mb-3">⚠️ Risques & Mitigation</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">⚠️</span>
              <div>
                <b>Adoption recruteurs faible :</b> Plan B = incentive (réduction frais pour annonces complètes) 
                + nudge lors de la publication d'offre
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">⚠️</span>
              <div>
                <b>IA sous-performe :</b> Beta limitée à 500 users + feedback loop rapide (2 semaines) 
                → pivot vers templates pré-écrits si nécessaire
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">⚠️</span>
              <div>
                <b>CTR stagne :</b> Tests A/B placement filtres + analyse quali express 
                (5 entretiens) pour identifier friction
              </div>
            </li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="p-6 rounded-xl border-l-4 border-accent bg-accent/5">
          <p className="text-sm">
            Ce projet a démontré l'importance d'une <b>discovery rigoureuse</b> et d'un 
            <b> pivot stratégique assumé</b>. Plutôt que de vouloir tout faire, nous avons 
            choisi un segment, cerné ses besoins, et construit une solution focalisée. 
            Prochaines étapes : déployer le MVP, mesurer l'impact, itérer sur le CTA onboarding 
            et le placement IA, puis étendre au-delà de la tech si les résultats valident l'approche.
          </p>
        </div>
      </section>

      {/* LINKS */}
      <footer className="pt-6 border-t">
        <h3 className="font-medium mb-3">Ressources & Liens</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a 
              className="text-accent hover:underline font-medium" 
              href="https://prototype-wttj.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              → Prototype interactif Lovable
            </a>
          </li>
          <li className="text-muted-foreground">
            Backlog Notion / Research Miro (documentation interne formation)
          </li>
        </ul>
      </footer>
    </main>
  );
}
