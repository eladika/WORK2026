// ============================================
// מצפן קריירה - MAIN SCRIPT (script.js)
// ============================================

// State
const userProfile = {
  age: null,
  experience: null,
  currentRole: null,
  industry: null,
  currentSalary: null,
  satisfaction: 3,
  stress: 3,
  promotion: null,
  commute: null,
  priorities: {
    salary: 4,
    balance: 3,
    hybrid: 3,
    remote: 2,
    commute: 3,
    prestige: 3,
    growth: 4,
    stability: 3,
    lowstress: 3
  },
  expectedSalary: null,
  minSalary: null,
  tradeoffs: {
    tradeoff1: null,
    tradeoff2: null,
    tradeoff3: null
  },
  workLocation: null,
  orgType: null,
  roleType: null,
  workNature: null
};

let currentStep = 1;
const TOTAL_STEPS = 5;

// ============================================
// NAVIGATION
// ============================================

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

function startAssessment() {
  showPage('questionnaire');
  updateProgress(1);
}

function goBack() {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  } else {
    showPage('landing');
  }
}

function retakeAssessment() {
  currentStep = 1;
  showPage('questionnaire');
  showStep(1);
  updateProgress(1);
  // reset pill selections
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('selected'));
  document.querySelectorAll('.trade-btn').forEach(b => b.classList.remove('selected'));
}

// ============================================
// QUESTIONNAIRE LOGIC
// ============================================

function showStep(step) {
  document.querySelectorAll('.q-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${step}`).classList.add('active');
  currentStep = step;
  updateProgress(step);
  document.getElementById('step-label').textContent = `שלב ${step} מתוך ${TOTAL_STEPS}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress(step) {
  const pct = (step / TOTAL_STEPS) * 100;
  document.getElementById('progress-fill').style.width = `${pct}%`;
}

function nextStep(fromStep) {
  if (fromStep < TOTAL_STEPS) {
    showStep(fromStep + 1);
  }
}

// Pill selection
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.option-pills').forEach(group => {
    group.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        group.querySelectorAll('.pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        const field = group.dataset.field;
        const value = pill.dataset.value;
        saveField(field, value);
      });
    });
  });

  // Slider labels init
  document.querySelectorAll('.custom-slider[data-field]').forEach(slider => {
    updateSliderLabel(slider);
    slider.addEventListener('input', () => {
      const field = slider.dataset.field;
      saveField(field, parseInt(slider.value));
    });
  });
});

function saveField(field, value) {
  const priorityFields = ['p-salary','p-balance','p-hybrid','p-remote','p-commute','p-prestige','p-growth','p-stability','p-lowstress'];
  if (field === 'satisfaction') userProfile.satisfaction = value;
  else if (field === 'stress') userProfile.stress = value;
  else if (priorityFields.includes(field)) {
    const key = field.replace('p-', '');
    const keyMap = { 'salary':'salary','balance':'balance','hybrid':'hybrid','remote':'remote','commute':'commute','prestige':'prestige','growth':'growth','stability':'stability','lowstress':'lowstress' };
    userProfile.priorities[keyMap[key]] = value;
  }
  else {
    userProfile[field] = value;
  }
}

function updateSliderLabel(slider) {
  const field = slider.dataset.field;
  const val = slider.value;
  const labelId = `${field}-val`;
  const label = document.getElementById(labelId);
  if (label) label.textContent = val;
}

function setTradeoff(btn) {
  const card = btn.closest('.tradeoff-card');
  card.querySelectorAll('.trade-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const field = card.dataset.field;
  userProfile.tradeoffs[field] = btn.dataset.value;
}

// ============================================
// RESULTS GENERATION
// ============================================

function generateResults() {
  showPage('loading');
  runLoadingAnimation().then(() => {
    const results = calculateMatches();
    renderResults(results);
    showPage('results');
  });
}

function runLoadingAnimation() {
  return new Promise(resolve => {
    const steps = ['ls1','ls2','ls3','ls4'];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        document.getElementById(steps[i]).classList.add('visible');
        i++;
      } else {
        clearInterval(interval);
        setTimeout(resolve, 400);
      }
    }, 500);
  });
}

// ============================================
// SCORING ALGORITHM
// ============================================

function calculateMatches() {
  const roleScores = CAREER_DATA.roles.map(role => {
    let score = 100;
    const mf = role.matchFactors;
    const p = userProfile.priorities;

    // Role match
    const roleMap = {
      'investment-advisor': 'investment_advisor',
      'pension-advisor': 'pension_advisor',
      'portfolio-manager': 'portfolio_manager',
      'analyst': 'analyst',
      'risk': 'risk',
      'other-finance': 'other_finance'
    };
    const userRoleKey = roleMap[userProfile.currentRole];
    if (userRoleKey && mf[userRoleKey]) score *= mf[userRoleKey];

    // Industry match
    const industryMap = {
      'bank': 'bank',
      'fintech': 'fintech',
      'insurance': 'insurance',
      'investment-house': 'investment_house',
      'consulting': 'consulting',
      'other': 'other'
    };
    const userIndustryKey = industryMap[userProfile.industry];
    if (userIndustryKey && mf[userIndustryKey]) score *= mf[userIndustryKey];

    // Experience boost
    const expPlus = ['6-10','11-15','15+'].includes(userProfile.experience);
    if (expPlus && mf.experience_6_plus) score *= mf.experience_6_plus;

    // Priority weights
    score += (p.salary - 3) * (mf.p_salary || 0) * 8;
    score += (p.balance - 3) * (mf.p_balance || 0) * 8;
    score += (p.hybrid - 3) * (mf.p_hybrid || 0) * 6;
    score += (p.remote - 3) * (mf.p_remote || 0) * 6;
    score += (p.prestige - 3) * (mf.p_prestige || 0) * 7;
    score += (p.growth - 3) * (mf.p_growth || 0) * 8;
    score += (p.stability - 3) * (mf.p_stability || 0) * 7;
    score += (p.lowstress - 3) * (mf.p_lowstress || 0) * 6;

    // Work nature match
    if (userProfile.workNature === 'analytical' && mf.analytical) score *= mf.analytical;
    if (userProfile.workNature === 'client-facing' && mf.client_facing) score *= mf.client_facing;

    // Org type
    if (userProfile.orgType === 'startup' && mf.startup) score *= mf.startup;
    if (userProfile.orgType === 'large-corp' && mf.large_corp) score *= mf.large_corp;
    if (userProfile.orgType === 'boutique' && mf.boutique) score *= mf.boutique;

    // Work location
    if (userProfile.workLocation === 'hybrid' && mf.hybrid) score *= mf.hybrid;
    if (userProfile.workLocation === 'remote' && mf.remote) score *= mf.remote;

    // Startup tradeoff
    if (userProfile.tradeoffs.tradeoff3 === 'yes' && mf.tradeoff_startup) score *= mf.tradeoff_startup;

    // Stress: if user is highly stressed now, boost low-stress roles
    if (userProfile.stress >= 4 && p.lowstress >= 3) {
      if (role.stressLevel === 'נמוך-בינוני' || role.stressLevel === 'נמוך') score *= 1.15;
    }

    // Satisfaction penalty: if very unsatisfied, add change score
    if (userProfile.satisfaction <= 2) score *= 1.1;

    return { ...role, score: Math.round(score) };
  });

  const companyScores = CAREER_DATA.companies.map(company => {
    let score = 100;
    const mf = company.matchFactors;
    const p = userProfile.priorities;

    const industryMap = { 'bank':'bank','fintech':'fintech','insurance':'insurance','investment-house':'investment_house','consulting':'consulting' };
    const userIndustryKey = industryMap[userProfile.industry];
    if (userIndustryKey && mf[userIndustryKey]) score *= mf[userIndustryKey];

    const roleMap = { 'investment-advisor':'investment_advisor','pension-advisor':'pension_advisor','portfolio-manager':'portfolio_manager','analyst':'analyst' };
    const userRoleKey = roleMap[userProfile.currentRole];
    if (userRoleKey && mf[userRoleKey]) score *= mf[userRoleKey];

    score += (p.salary - 3) * (mf.p_salary || 0) * 7;
    score += (p.balance - 3) * (mf.p_balance || 0) * 7;
    score += (p.prestige - 3) * (mf.p_prestige || 0) * 7;
    score += (p.stability - 3) * (mf.p_stability || 0) * 7;
    score += (p.growth - 3) * (mf.p_growth || 0) * 7;
    score += (p.hybrid - 3) * (mf.p_hybrid || 0) * 5;
    score += (p.remote - 3) * (mf.p_remote || 0) * 5;

    if (userProfile.orgType === 'startup' && company.typeCategory === 'fintech') score *= 1.15;
    if (userProfile.orgType === 'large-corp' && mf.large_corp) score *= mf.large_corp;
    if (userProfile.workLocation === 'hybrid' && company.workModel.includes('היברידי')) score *= 1.1;
    if (userProfile.tradeoffs.tradeoff3 === 'yes' && company.typeCategory === 'fintech') score *= 1.1;

    return { ...company, score: Math.round(score) };
  });

  const topRoles = roleScores.sort((a, b) => b.score - a.score).slice(0, 3);
  const topCompanies = companyScores.sort((a, b) => b.score - a.score).slice(0, 3);

  return { topRoles, topCompanies };
}

// ============================================
// RENDER RESULTS
// ============================================

function renderResults({ topRoles, topCompanies }) {
  renderScores(topRoles, topCompanies);
  renderRoles(topRoles);
  renderCompanies(topCompanies);
  updateSimulator();
}

function renderScores(topRoles, topCompanies) {
  const maxScore = topRoles[0]?.score || 100;
  const fitPct = Math.min(Math.round((maxScore / 200) * 100), 98);

  const salaryScore = calculateSalaryMatch();
  const growthScore = calculateGrowthPotential();
  const balanceScore = calculateLifestyleFit();

  const container = document.getElementById('scores-row');
  container.innerHTML = `
    <div class="score-card" style="animation-delay:0.1s">
      <div class="score-icon">🎯</div>
      <div class="score-label">התאמה כללית</div>
      <div class="score-value gold">${fitPct}%</div>
    </div>
    <div class="score-card" style="animation-delay:0.2s">
      <div class="score-icon">💰</div>
      <div class="score-label">פוטנציאל שכר</div>
      <div class="score-value gold">${salaryScore}</div>
    </div>
    <div class="score-card" style="animation-delay:0.3s">
      <div class="score-icon">📈</div>
      <div class="score-label">פוטנציאל צמיחה</div>
      <div class="score-value teal">${growthScore}/5</div>
    </div>
    <div class="score-card" style="animation-delay:0.4s">
      <div class="score-icon">⚖️</div>
      <div class="score-label">התאמת אורח חיים</div>
      <div class="score-value teal">${balanceScore}/5</div>
    </div>
    <div class="score-card" style="animation-delay:0.5s">
      <div class="score-icon">🏆</div>
      <div class="score-label">תפקיד מוביל</div>
      <div class="score-value" style="font-size:1rem;color:var(--text-primary)">${topRoles[0]?.title || '-'}</div>
    </div>
  `;
}

function calculateSalaryMatch() {
  const expected = userProfile.expectedSalary;
  const salaryMap = {
    '15-20': '15K-20K ₪',
    '20-28': '20K-28K ₪',
    '28-38': '28K-38K ₪',
    '38-50': '38K-50K ₪',
    '50+': '50K+ ₪'
  };
  return salaryMap[expected] || 'לפי פרופיל';
}

function calculateGrowthPotential() {
  const g = userProfile.priorities.growth;
  const startupBonus = userProfile.tradeoffs.tradeoff3 === 'yes' ? 0.5 : 0;
  return Math.min(5, Math.round(g * 0.7 + 1.5 + startupBonus));
}

function calculateLifestyleFit() {
  const b = userProfile.priorities.balance;
  const ls = userProfile.priorities.lowstress;
  return Math.min(5, Math.round((b + ls) / 2 * 0.7 + 1.5));
}

function renderRoles(roles) {
  const ranks = ['🥇 הכי מתאים', '🥈 מאוד מתאים', '🥉 מתאים'];
  const stressClass = { 'גבוה': 'high', 'בינוני-גבוה': 'medium', 'בינוני': 'medium', 'נמוך-בינוני': 'good', 'נמוך': 'good' };
  const balanceClass = { 'גבוה': 'good', 'בינוני-טוב': 'good', 'בינוני': 'medium', 'נמוך-בינוני': 'high', 'נמוך': 'high' };

  const container = document.getElementById('roles-grid');
  container.innerHTML = roles.map((role, i) => {
    const fitPct = Math.min(99, Math.round(role.score / 2.2));
    return `
    <div class="role-card" style="animation-delay:${0.1 * (i+1)}s">
      <div class="card-rank">${ranks[i]}</div>
      <div class="card-title">${role.title}</div>
      <div class="card-description">${role.description}</div>
      <div class="card-meta">
        <div class="meta-item">
          <span class="meta-label">💰 שכר:</span>
          <span class="meta-value salary">${role.salaryRange}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">🔥 לחץ:</span>
          <span class="meta-value ${stressClass[role.stressLevel] || 'medium'}">${role.stressLevel}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">⚖️ איזון:</span>
          <span class="meta-value ${balanceClass[role.workLifeBalance] || 'medium'}">${role.workLifeBalance}</span>
        </div>
      </div>
      <div class="fit-bar-wrap">
        <div class="fit-label"><span>התאמה אישית</span><span>${fitPct}%</span></div>
        <div class="fit-bar"><div class="fit-fill" style="width:${fitPct}%"></div></div>
      </div>
    </div>`;
  }).join('');
}

function renderCompanies(companies) {
  const ranks = ['🥇 מומלצת ביותר', '🥈 מומלצת מאוד', '🥉 מומלצת'];
  const container = document.getElementById('companies-grid');
  container.innerHTML = companies.map((company, i) => {
    const fitPct = Math.min(99, Math.round(company.score / 2.2));
    return `
    <div class="company-card" style="animation-delay:${0.1 * (i+1)}s">
      <div class="card-rank">${ranks[i]}</div>
      <div class="company-type-badge">${company.type}</div>
      <div class="card-title">${company.name}</div>
      <div class="card-description">${company.description}</div>
      <div class="card-meta">
        <div class="meta-item">
          <span class="meta-label">💰 שכר:</span>
          <span class="meta-value salary">${company.salaryRange}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">🏢 מיקום:</span>
          <span class="meta-value">${company.workModel}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">🌟 תרבות:</span>
          <span class="meta-value">${company.culture}</span>
        </div>
      </div>
      <div class="fit-bar-wrap">
        <div class="fit-label"><span>התאמה כללית</span><span>${fitPct}%</span></div>
        <div class="fit-bar"><div class="fit-fill" style="width:${fitPct}%"></div></div>
      </div>
    </div>`;
  }).join('');
}

// ============================================
// SIMULATOR
// ============================================

function updateSimulator() {
  const s1 = parseInt(document.getElementById('sim1')?.value || 60);
  const s2 = parseInt(document.getElementById('sim2')?.value || 40);
  const s3 = parseInt(document.getElementById('sim3')?.value || 50);

  const v1 = document.getElementById('sim1-v');
  const v2 = document.getElementById('sim2-v');
  const v3 = document.getElementById('sim3-v');
  if (v1) v1.textContent = s1 + '%';
  if (v2) v2.textContent = s2 + '%';
  if (v3) v3.textContent = s3 + '%';

  let insight = '';
  if (s1 > 70 && s2 < 40 && s3 > 60) {
    insight = '💡 פרופיל שכר-צמיחה: מתאים לבתי השקעות ופינטק תחרותי. שכר גבוה אבל לחץ גבוה.';
  } else if (s1 < 40 && s2 > 60 && s3 < 40) {
    insight = '💡 פרופיל איזון-יציבות: מתאים לחברות ביטוח גדולות, בנקים ומסלולים רגולטוריים.';
  } else if (s3 > 65) {
    insight = '💡 פרופיל צמיחה: מתאים לסטארטאפים ופינטק עם פוטנציאל אופציות ועלייה מהירה.';
  } else if (s2 > 65) {
    insight = '💡 פרופיל מרחוק/היברידי: מתאים לפינטק, ייעוץ עצמאי, ומנהלי מוצר דיגיטליים.';
  } else {
    insight = '💡 פרופיל מאוזן: מתאים לרוב התפקידים. ניתן לכוון לפי עדיפות ספציפית.';
  }

  const insightEl = document.getElementById('sim-insight');
  if (insightEl) insightEl.textContent = insight;
}

// ============================================
// ACTIONS
// ============================================

function printReport() {
  window.print();
}

function shareResults() {
  const topRole = document.querySelector('.role-card .card-title')?.textContent || 'תפקיד פיננסי';
  const text = `סיימתי הערכת קריירה ב"מצפן קריירה" - התפקיד המומלץ לי הוא: ${topRole}. נסה גם אתה!`;
  if (navigator.share) {
    navigator.share({ title: 'מצפן קריירה', text });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => alert('הטקסט הועתק ללוח!'));
  }
}
