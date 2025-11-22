import { CaseImage } from "@/components/case/CaseImage";

export default function WttjCaseStudyEN() {
  // Discovery Insights
  const discoveryLevels = [
    {
      level: 0,
      label: "Overview",
      threshold: 0,
      content: (
        <div className="p-6">
          <p className="text-base">
            <b>8 user interviews</b> revealed critical needs for transparency and filtering among senior profiles.
          </p>
        </div>
      ),
    },
    {
      level: 1,
      label: "Key Insights",
      threshold: 0.4,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">3 Major Insights</h4>
          
          <div className="space-y-3">
            <div className="p-4 border-l-4 border-accent bg-muted rounded">
              <h5 className="font-semibold mb-1">💰 Salary Transparency</h5>
              <p className="text-sm text-muted-foreground">
                "I want to see the salary before applying, not after 3 interviews"
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
              <h5 className="font-semibold mb-1">🎯 Relevant Filters</h5>
              <p className="text-sm text-muted-foreground">
                "Tech criteria (stack, remote, seniority) must be front and center"
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 rounded">
              <h5 className="font-semibold mb-1">🤝 Guidance</h5>
              <p className="text-sm text-muted-foreground">
                "I need help selling my experience, not just my skills"
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg text-sm">
            <p><b>Senior CTR: 11%</b> vs <b>Junior: 20%</b> → Significant engagement gap</p>
          </div>
        </div>
      ),
    },
    {
      level: 2,
      label: "Full Methodology",
      threshold: 0.7,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Detailed Discovery Process</h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">📋 Interview Protocol</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>8 participants (6 tech, 2 other sectors)</li>
                <li>Mix: 5-8 years XP (4), 8-12 years (3), 12+ years (1)</li>
                <li>Duration: 45-60min per interview</li>
                <li>Format: Semi-structured with Jobs-to-be-Done</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">🔍 JTBD Framework</h5>
              <p className="text-sm text-muted-foreground mb-2">
                <i>"When [situation], I want [motivation], so I can [desired outcome]"</i>
              </p>
              <p className="text-sm">
                Example: "When I'm looking for a new position, I want to quickly understand 
                the tech environment and level of autonomy, so I can avoid wasting time 
                on opportunities not suited to my level."
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">📊 Synthesis & Affinity Mapping</h5>
              <p className="text-sm">
                120+ verbatims grouped into 12 themes → 3 priority insights validated 
                by the team. Prioritization based on frequency (6+ mentions) and emotional 
                intensity (expressed frustration).
              </p>
            </div>
            
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p><b>Key takeaway:</b> Seniors aren't looking for more job listings, 
              they're looking for <i>better qualified</i> listings. Transparency + guidance = conversion.</p>
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
      label: "Overview",
      threshold: 0,
      content: (
        <div className="p-6">
          <p className="text-base">
            MVP features prioritized using the <b>RICE framework</b> to maximize impact with limited resources.
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
          <h4 className="font-semibold text-lg mb-3">RICE Framework</h4>
          <p className="text-sm text-muted-foreground mb-4">
            <b>Reach × Impact × Confidence ÷ Effort</b>
          </p>

          <div className="space-y-3">
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">1. Job Posting Standardization</h5>
                <span className="text-xl font-bold text-green-700">27</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Enforce salary, remote policy, clear missions, tech stack in all postings
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">2. AI Assistant (LLM)</h5>
                <span className="text-xl font-bold text-blue-700">13.5</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Resume optimization, storytelling support, personalized interview prep
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">3. Advanced Tech Filters</h5>
                <span className="text-xl font-bold text-purple-700">12</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Stack, required seniority, work mode (remote/hybrid/on-site)
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      level: 2,
      label: "Complete Matrix",
      threshold: 0.7,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Complete RICE Matrix (9 features)</h4>
          
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
                  <td className="p-2">Job Standardization</td>
                  <td className="text-center">900</td>
                  <td className="text-center">3</td>
                  <td className="text-center">100%</td>
                  <td className="text-center">1</td>
                  <td className="text-center font-bold">27</td>
                </tr>
                <tr className="border-b bg-blue-50/50 dark:bg-blue-950/10">
                  <td className="p-2">AI Assistant</td>
                  <td className="text-center">450</td>
                  <td className="text-center">3</td>
                  <td className="text-center">80%</td>
                  <td className="text-center">8</td>
                  <td className="text-center font-bold">13.5</td>
                </tr>
                <tr className="border-b bg-purple-50/50 dark:bg-purple-950/10">
                  <td className="p-2">Advanced Filters</td>
                  <td className="text-center">800</td>
                  <td className="text-center">2</td>
                  <td className="text-center">90%</td>
                  <td className="text-center">3</td>
                  <td className="text-center font-bold">12</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">AI Recommendations</td>
                  <td className="text-center">600</td>
                  <td className="text-center">2</td>
                  <td className="text-center">70%</td>
                  <td className="text-center">5</td>
                  <td className="text-center">8.4</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Onboarding CTA</td>
                  <td className="text-center">700</td>
                  <td className="text-center">1</td>
                  <td className="text-center">95%</td>
                  <td className="text-center">2</td>
                  <td className="text-center">6.7</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Senior-friendly Badges</td>
                  <td className="text-center">900</td>
                  <td className="text-center">1</td>
                  <td className="text-center">80%</td>
                  <td className="text-center">2</td>
                  <td className="text-center">3.6</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Success Stories</td>
                  <td className="text-center">400</td>
                  <td className="text-center">1</td>
                  <td className="text-center">60%</td>
                  <td className="text-center">4</td>
                  <td className="text-center">0.6</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Community Forum</td>
                  <td className="text-center">200</td>
                  <td className="text-center">2</td>
                  <td className="text-center">50%</td>
                  <td className="text-center">10</td>
                  <td className="text-center">0.2</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Networking Events</td>
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
            <p className="font-medium">Decision Rationale:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><b>Standardization (27)</b>: Quick win, immediate impact, low tech effort (template enforcement)</li>
              <li><b>AI Assistant (13.5)</b>: Strong differentiator but requires R&D and iterative testing</li>
              <li><b>Filters (12)</b>: Existing demand, moderate effort, direct CTR impact</li>
              <li><b>Forum (0.2)</b>: High maintenance, low initial reach, deprioritized for MVP</li>
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
      label: "Main KPI",
      threshold: 0,
      content: (
        <div className="p-6">
          <p className="text-base">
            <b>Target: Senior CTR 11% → 13%</b> within 3 months post-MVP launch
          </p>
        </div>
      ),
    },
    {
      level: 1,
      label: "4 Tracking KPIs",
      threshold: 0.4,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Success Metrics</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="text-xs text-muted-foreground mb-1">Senior CTR (tech)</div>
              <div className="text-2xl font-bold">11% → 13%</div>
              <div className="text-xs mt-1">+18% engagement</div>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="text-xs text-muted-foreground mb-1">Profile Completion Rate</div>
              <div className="text-2xl font-bold">65% → 75%</div>
              <div className="text-xs mt-1">+15% qualified profiles</div>
            </div>
            
            <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <div className="text-xs text-muted-foreground mb-1">AI Assistant Usage</div>
              <div className="text-2xl font-bold">0% → 30%</div>
              <div className="text-xs mt-1">Of active candidates</div>
            </div>
            
            <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
              <div className="text-xs text-muted-foreground mb-1">Application Rate</div>
              <div className="text-2xl font-bold">5% → 7%</div>
              <div className="text-xs mt-1">+40% conversions</div>
            </div>
          </div>
          
          <div className="p-3 bg-muted rounded-lg text-sm">
            <p><b>Timeline:</b> Measured at T+1 month, T+2 months, T+3 months post-MVP</p>
          </div>
        </div>
      ),
    },
    {
      level: 2,
      label: "Methodology & Calculations",
      threshold: 0.7,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">Detailed Measurement Methodology</h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">📐 Senior CTR Calculation</h5>
              <div className="p-3 bg-muted rounded font-mono text-sm">
                CTR = (Job Clicks / Job Impressions) × 100
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Segmentation: 5-15 years XP profiles, tech sector, active (login &lt; 30d)
              </p>
              <p className="text-sm text-muted-foreground">
                Baseline: 11% (average T-3 months before MVP)
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">🎯 Critical Assumptions</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Job standardization adopted by 80% of recruiters within month 1</li>
                <li>AI assistant launched in beta with 500 early adopters (10% active seniors)</li>
                <li>No major changes to recommendation algorithm during test period</li>
                <li>Stable tech job volume (±10%)</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">⚠️ Measurement Risks</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li><b>Seasonality:</b> Q4 = tech hiring peak → potential upward bias</li>
                <li><b>Recruiter adoption:</b> If &lt;60% don't use templates → diluted impact</li>
                <li><b>Cannibalization:</b> Seniors may click more but apply elsewhere</li>
              </ul>
            </div>
            
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-sm">
              <p className="font-medium mb-1">Mitigation Plan:</p>
              <p>Weekly tracking with alerts if CTR &lt; 11.5% at T+1 month → 
              quick qualitative analysis (5 interviews) to identify blockers.</p>
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
      label: "Decision",
      threshold: 0,
      content: (
        <div className="p-6">
          <p className="text-base">
            <b>Strategic refocus:</b> Focus on tech, 5-8 years experience profiles, rather than all sectors/seniorities.
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
          <h4 className="font-semibold text-lg mb-3">Why This Pivot?</h4>
          
          <div className="space-y-3">
            <div className="p-4 border-l-4 border-accent rounded bg-muted">
              <h5 className="font-semibold mb-1">💡 Maximum Impact</h5>
              <p className="text-sm text-muted-foreground">
                Tech = 60% of senior traffic, largest CTR gap (11% vs 20%), 
                competitive market with high per-hire value.
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-blue-500 rounded bg-blue-50 dark:bg-blue-950/20">
              <h5 className="font-semibold mb-1">⚡ Focused Effort</h5>
              <p className="text-sm text-muted-foreground">
                Limited MVP = can't address everything. Better to excel in one segment 
                than disappoint across all.
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-purple-500 rounded bg-purple-50 dark:bg-purple-950/20">
              <h5 className="font-semibold mb-1">🎯 Differentiation</h5>
              <p className="text-sm text-muted-foreground">
                Generalist platforms ignore tech-specific needs 
                (stack, remote, engineering team). Niche opportunity.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      level: 2,
      label: "Alternatives Considered",
      threshold: 0.7,
      content: (
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg mb-3">3 Scenarios Evaluated</h4>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">A. All Sectors, Focus 10-15 Years XP</h5>
                <span className="px-2 py-1 bg-red-100 dark:bg-red-950/20 text-red-700 text-xs rounded">Rejected</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Large reach but needs too heterogeneous (finance ≠ retail ≠ tech). 
                Impossible to personalize MVP experience.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Projected impact: +0.5% global CTR (diluted)
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">B. Tech Only, All Levels</h5>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-950/20 text-yellow-700 text-xs rounded">Considered</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Sector-coherent but juniors (0-3 years) have opposite needs 
                from seniors (volume vs quality). Risk of averaging everything.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Projected impact: +1% global tech CTR
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold">C. Tech, 5-8 Years XP (Final Choice)</h5>
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">✓ Selected</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Homogeneous segment (mid-senior seeking growth), clear needs 
                (transparency + guidance), sufficient reach (30% tech seniors).
              </p>
              <p className="text-xs text-muted-foreground italic">
                Projected impact: +2% CTR on segment (11% → 13%)
              </p>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-sm">
            <p className="font-medium mb-1">Validation Data:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-xs">
              <li>6/8 interviews = tech 5-8 years profiles (naturally concentrated sample)</li>
              <li>Cohort analysis: 5-8 years = best post-click conversion rate (+12% vs global)</li>
              <li>Benchmark: LinkedIn Tech Jobs, Indeed, Hired → all segment by seniority</li>
            </ul>
          </div>
          
          <div className="mt-3 text-sm text-muted-foreground italic">
            <b>Future Expansion Strategy:</b> If MVP succeeds (CTR &gt; 13% sustained 3 months), 
            expand to 3-12 years tech XP, then other sectors (finance, product).
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
          Acquiring Senior Profiles on Welcome to the Jungle
        </h1>
        <p className="text-lg text-muted-foreground">
          How to increase engagement of experienced candidates (5-15 years) in tech 
          through transparency, relevant filters, and AI guidance.
        </p>
      </header>

      {/* TL;DR */}
      <aside className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
        <h2 className="font-semibold mb-3">TL;DR</h2>
        <ul className="space-y-2 text-sm">
          <li><b>Context:</b> Product Management Maestro training project (12 days, team of 4 PMs)</li>
          <li><b>Challenge:</b> Tech senior CTR = 11% vs 20% juniors. Why?</li>
          <li><b>My role:</b> PM — Discovery (2 interviews), prototyping, insights synthesis</li>
          <li><b>Strategic pivot:</b> Focus tech 5-8 years XP (homogeneous segment, max impact)</li>
          <li><b>MVP:</b> Job standardization + AI Assistant + Advanced filters (RICE)</li>
          <li><b>Target impact:</b> CTR 11% → 13% in 3 months</li>
        </ul>
      </aside>

      {/* 1. CONTEXT & CHALLENGE */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">1. Context & Challenge</h2>
        
        <div className="space-y-4">
          <p>
            Welcome to the Jungle (WTTJ) is a modern job platform that stands out 
            through its emphasis on company culture. Despite its success with young 
            talent, the platform struggles to convert <b>senior tech profiles (5-15 years experience)</b>.
          </p>
          
          <p>
            The problem: <b>Senior CTR = 11%</b> against <b>20% for juniors</b>. 
            Seniors visit job postings but click less, signaling a lack of relevance 
            or trust in the content.
          </p>
        </div>

        <CaseImage
          alt="Statistics and market context"
          desktopSrc="/WTTJ/contexte-desktop.png"
          mobileSrc="/WTTJ/contexte-desktop.png"
          caption="Market data and user signals"
        />

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border bg-card shadow-sm">
            <h3 className="font-medium mb-2">🎯 Acquire Tech Seniors</h3>
            <p className="text-sm text-muted-foreground">
              Increase CTR and conversion of experienced profiles
            </p>
          </div>
          
          <div className="p-4 rounded-xl border bg-card shadow-sm">
            <h3 className="font-medium mb-2">💡 Engagement & Conversion</h3>
            <p className="text-sm text-muted-foreground">
              Reduce bounce rate on job listings
            </p>
          </div>
          
          <div className="p-4 rounded-xl border bg-card shadow-sm">
            <h3 className="font-medium mb-2">🔄 Long-term Retention</h3>
            <p className="text-sm text-muted-foreground">
              Create an adapted experience that retains seniors
            </p>
          </div>
        </div>
      </section>

      {/* 2. MY ROLE & APPROACH */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">2. My Role & Approach</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">🧑‍💼 My Role</h3>
              <p className="text-sm text-muted-foreground">
                <b>Product Manager</b> within an intensive training project 
                (Product Management Maestro, 12 days).
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Discovery: Conducted 2 out of 8 total user interviews</li>
                <li>Prototyping: Created mockups and iterations</li>
                <li>Synthesis: Participated in collective insights analysis</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">👥 Team</h3>
              <p className="text-sm text-muted-foreground">
                4 Product Managers working in intensive sprint (agile method)
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium mb-2">📋 Methodology</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li><b>Discovery</b> (days 1-4): 8 JTBD interviews, affinity mapping</li>
              <li><b>Strategic pivot</b> (day 5): Opportunity tree, segment choice</li>
              <li><b>MVP prioritization</b> (days 6-7): RICE framework, trade-offs</li>
              <li><b>Prototyping</b> (days 8-10): Figma mockups → Lovable</li>
              <li><b>User testing</b> (days 11-12): 4 tests, final iterations</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 3. PROCESS & KEY DECISIONS */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold">3. Process & Key Decisions</h2>

        {/* Discovery Insights */}
        <div className="space-y-6">
          <h3 className="font-medium">Discovery Insights</h3>
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
          caption="JTBD framework & key interview verbatims"
        />

        {/* Strategic Pivot */}
        <div className="space-y-6">
          <h3 className="font-medium">Strategic Pivot</h3>
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
          caption="Opportunity tree - Strategic refocus on tech 5-8 years"
        />

        {/* MVP Prioritization */}
        <div className="space-y-6">
          <h3 className="font-medium">MVP Prioritization</h3>
          <div className="space-y-6">
            {riceLevels.map((level, index) => (
              <div key={level.level} className={index > 0 ? "pt-6 border-t border-border/50" : ""}>
                {level.content}
              </div>
            ))}
          </div>
        </div>

        <CaseImage
          alt="RICE matrix"
          desktopSrc="/WTTJ/rice-desktop.png"
          mobileSrc="/WTTJ/rice-desktop.png"
          caption="Complete RICE matrix - Prioritization of 9 considered features"
        />
      </section>

      {/* 4. SOLUTION & DELIVERABLES */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">4. Solution & Deliverables</h2>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">🎨 Prototype & Testing</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Figma mockup → Interactive Lovable prototype → 2 user testing sessions 
                with discovery phase participants.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Average profile completion time: -30%</li>
                <li>Understanding of filtering criteria: 100% of testers</li>
                <li>AI assistant satisfaction: 4.2/5</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">📅 Roadmap (Now / Next / Later)</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border-l-4 border-green-500">
                  <p className="font-medium">Now (M0-M3)</p>
                  <p className="text-muted-foreground text-xs">Job standardization + Advanced filters</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border-l-4 border-blue-500">
                  <p className="font-medium">Next (M3-M6)</p>
                  <p className="text-muted-foreground text-xs">AI assistant (beta) + Optimized onboarding CTA</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded border-l-4 border-purple-500">
                  <p className="font-medium">Later (M6+)</p>
                  <p className="text-muted-foreground text-xs">AI recommendations + Other sectors expansion</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <CaseImage
              alt="Prototype screens"
              desktopSrc="/WTTJ/proto-onboarding-desktop.png"
              mobileSrc="/WTTJ/proto-onboarding-desktop.png"
              caption="Key screens from Lovable prototype"
            />
            
            <a 
              href="https://prototype-wttj.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 border rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors text-center"
            >
              <span className="font-medium">→ View interactive prototype</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. IMPACT & LEARNINGS */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">5. Impact & Learnings</h2>

        {/* KPIs */}
        <div className="space-y-6">
          <h3 className="font-medium">Success Metrics</h3>
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
          <h3 className="font-medium">3 Key Learnings</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border bg-card shadow-sm">
              <h4 className="font-medium mb-2">🎯 Segmentation &gt; Volume</h4>
              <p className="text-sm text-muted-foreground">
                Better to excel on a homogeneous segment than disappoint across a broad audience. 
                The tech 5-8 years pivot clarified all product decisions.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border bg-card shadow-sm">
              <h4 className="font-medium mb-2">⚡ Transparency = Trust</h4>
              <p className="text-sm text-muted-foreground">
                Job standardization (salary, stack, remote) was the #1 lever 
                according to testing. Seniors want clarity, not marketing.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border bg-card shadow-sm">
              <h4 className="font-medium mb-2">🤖 AI = Differentiation</h4>
              <p className="text-sm text-muted-foreground">
                The AI assistant wasn't initially planned. Discovery revealed 
                the need for guidance ("sell my experience, not my skills").
              </p>
            </div>
          </div>
        </div>

        {/* Risks mitigation */}
        <div className="p-6 rounded-xl bg-muted">
          <h3 className="font-medium mb-3">⚠️ Risks & Mitigation</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">⚠️</span>
              <div>
                <b>Low recruiter adoption:</b> Plan B = incentive (fee reduction for complete postings) 
                + nudge when publishing job
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">⚠️</span>
              <div>
                <b>AI underperforms:</b> Beta limited to 500 users + fast feedback loop (2 weeks) 
                → pivot to pre-written templates if needed
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">⚠️</span>
              <div>
                <b>CTR stagnates:</b> A/B tests on filter placement + express qualitative analysis 
                (5 interviews) to identify friction
              </div>
            </li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="p-6 rounded-xl border-l-4 border-accent bg-accent/5">
          <p className="text-sm">
            This project demonstrated the importance of <b>rigorous discovery</b> and an 
            <b> assumed strategic pivot</b>. Rather than trying to do everything, we 
            chose a segment, identified its needs, and built a focused solution. 
            Next steps: deploy MVP, measure impact, iterate on onboarding CTA 
            and AI placement, then expand beyond tech if results validate the approach.
          </p>
        </div>
      </section>

      {/* LINKS */}
      <footer className="pt-6 border-t">
        <h3 className="font-medium mb-3">Resources & Links</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a 
              className="text-accent hover:underline font-medium" 
              href="https://prototype-wttj.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              → Interactive Lovable prototype
            </a>
          </li>
          <li className="text-muted-foreground">
            Notion backlog / Miro research (internal training documentation)
          </li>
        </ul>
      </footer>
    </main>
  );
}

