// ============================================
// מצפן קריירה - SCRIPT.JS
// ============================================

const profile = {
  age: null,
  currentRole: null,
  currentRoleLabel: '',
  currentSalary: null,
  experience: null,
  priorities: { p_salary:3, p_balance:3, p_growth:3, p_stability:3, p_flexibility:3, p_lowstress:3 },
  leaveReason: null,
  workNature: null,
  orgType: null,
  minSalary: null
};

let currentStep = 1;
const TOTAL_STEPS = 3;

// ============================================
// PAGE + STEP MANAGEMENT
// ============================================
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function startAssessment() {
  showPage('questionnaire');
  initRoleSearch();
  initStars();
  initPills();
  updateProgress(1);
}

function goBack() {
  if (currentStep > 1) showStep(currentStep - 1);
  else showPage('landing');
}

function showStep(n) {
  document.querySelectorAll('.q-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${n}`).classList.add('active');
  currentStep = n;
  updateProgress(n);
  document.getElementById('step-label').textContent = `שלב ${n} מתוך ${TOTAL_STEPS}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress(n) {
  document.getElementById('progress-fill').style.width = `${(n / TOTAL_STEPS) * 100}%`;
}

function nextStep(from) {
  if (!validateStep(from)) return;
  showStep(from + 1);
}

function validateStep(step) {
  if (step === 1) {
    const age = parseInt(document.getElementById('input-age').value);
    const sal = parseInt(document.getElementById('input-salary').value);
    const exp = parseInt(document.getElementById('input-exp').value);
    if (!age || age < 18 || age > 70) { alert('אנא הזן גיל תקין (18-70)'); return false; }
    if (!sal || sal < 0) { alert('אנא הזן שכר נוכחי'); return false; }
    if (exp === undefined || exp === null || isNaN(exp)) { alert('אנא הזן שנות ניסיון'); return false; }
    if (!profile.currentRole) { alert('אנא בחר תפקיד נוכחי'); return false; }
    profile.age = age;
    profile.currentSalary = sal;
    profile.experience = exp;
  }
  if (step === 2) {
    if (!profile.leaveReason) { alert('אנא בחר סיבה לשינוי'); return false; }
  }
  return true;
}

function retakeAssessment() {
  Object.assign(profile, { age:null, currentRole:null, currentRoleLabel:'', currentSalary:null, experience:null, leaveReason:null, workNature:null, orgType:null, minSalary:null });
  profile.priorities = { p_salary:3, p_balance:3, p_growth:3, p_stability:3, p_flexibility:3, p_lowstress:3 };
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('selected'));
  document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.free-input').forEach(i => i.value = '');
  document.getElementById('role-search').value = '';
  document.getElementById('selected-role-display').textContent = '';
  currentStep = 1;
  showPage('questionnaire');
  showStep(1);
}

// ============================================
// ROLE SEARCH
// ============================================
function initRoleSearch() {
  const input = document.getElementById('role-search');
  const dropdown = document.getElementById('role-dropdown');

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 1) { dropdown.classList.add('hidden'); return; }
    filterRoles(q);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length > 0) filterRoles(input.value.trim());
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.searchable-wrap')) dropdown.classList.add('hidden');
  });
}

function filterRoles(query) {
  const dropdown = document.getElementById('role-dropdown');
  const filtered = ALL_ROLES.filter(r => r.includes(query) || r.toLowerCase().includes(query.toLowerCase()));
  if (filtered.length === 0) { dropdown.classList.add('hidden'); return; }
  dropdown.innerHTML = filtered.slice(0, 12).map(r =>
    `<div class="role-option" onclick="selectRole('${r.replace(/'/g, "\\'")}')">${r}</div>`
  ).join('');
  dropdown.classList.remove('hidden');
}

function selectRole(role) {
  document.getElementById('role-search').value = role;
  document.getElementById('role-dropdown').classList.add('hidden');
  document.getElementById('selected-role-display').textContent = '✓ ' + role;
  profile.currentRole = role;
  profile.currentRoleLabel = role;
}

// ============================================
// STARS
// ============================================
function initStars() {
  document.querySelectorAll('.pr-stars').forEach(group => {
    const field = group.dataset.field;
    const stars = group.querySelectorAll('.star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const val = parseInt(star.dataset.val);
        profile.priorities[field] = val;
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.val) <= val);
        });
      });
      star.addEventListener('mouseover', () => {
        const val = parseInt(star.dataset.val);
        stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= val));
      });
      star.addEventListener('mouseout', () => {
        const current = profile.priorities[field] || 0;
        stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= current));
      });
    });
  });
}

// ============================================
// PILLS
// ============================================
function initPills() {
  document.querySelectorAll('.option-pills').forEach(group => {
    group.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        group.querySelectorAll('.pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        const field = group.dataset.field;
        profile[field] = pill.dataset.value;
      });
    });
  });
}

// ============================================
// GENERATE
// ============================================
function generateResults() {
  // Save step 3 inputs
  const minSal = parseInt(document.getElementById('input-minsalary').value);
  profile.minSalary = isNaN(minSal) ? 0 : minSal;

  if (!validateStep(3)) {}

  showPage('loading');
  runLoading().then(() => {
    const results = calcMatches();
    renderResults(results);
    showPage('results');
  });
}

function runLoading() {
  return new Promise(resolve => {
    const ids = ['ls1','ls2','ls3','ls4'];
    let i = 0;
    const iv = setInterval(() => {
      if (i < ids.length) {
        const el = document.getElementById(ids[i]);
        el.textContent = el.textContent.replace('⬜','✅');
        el.classList.add('visible');
        i++;
      } else { clearInterval(iv); setTimeout(resolve, 400); }
    }, 550);
  });
}

// ============================================
// SCORING
// ============================================
function calcMatches() {
  const roleScores = CAREER_DATA.roles.map(role => {
    let score = 100;
    const p = profile.priorities;

    // Match current role to role candidates
    let roleMatch = 0.7; // default
    if (profile.currentRole && role.matchRoles) {
      if (role.matchRoles.some(r => profile.currentRole.includes(r) || r.includes(profile.currentRole.split(' ')[0]))) {
        roleMatch = 1.2;
      }
    }
    score *= roleMatch;

    // Org type match
    if (profile.orgType && profile.orgType !== 'no_pref' && role.matchOrg) {
      if (role.matchOrg.includes(profile.orgType)) score *= 1.2;
      else if (!role.matchOrg.includes('no_pref')) score *= 0.75;
    }

    // Work nature match
    if (profile.workNature && role.matchNature) {
      if (profile.workNature === 'mix' || role.matchNature.includes(profile.workNature)) score *= 1.15;
      else score *= 0.8;
    }

    // Priority boosts
    const pb = role.pBoost || {};
    Object.keys(pb).forEach(key => {
      const userPriority = p[key] || 3;
      const boost = pb[key];
      // If priority is high (4-5), boost good matches, penalize bad ones
      score += (userPriority - 3) * (boost - 1) * 20;
    });

    // Experience factor
    const exp = profile.experience || 0;
    if (exp >= 10 && (role.id === 'institutional-investment-manager' || role.id === 'trader' || role.id === 'investment-banking')) {
      score *= 1.15;
    }
    if (exp < 3 && role.id === 'institutional-investment-manager') score *= 0.5;
    if (exp >= 5 && role.id === 'independent-financial-advisor') score *= 1.1;

    // Leave reason alignment
    const lr = profile.leaveReason;
    if (lr === 'salary' && role.salaryMin > (profile.currentSalary || 0) * 1.1) score *= 1.2;
    if (lr === 'stress' && role.stressScore <= 3) score *= 1.2;
    if (lr === 'balance' && role.balanceScore >= 3.5) score *= 1.15;
    if (lr === 'growth' && role.growthPotential >= 4) score *= 1.15;
    if (lr === 'boredom' && (role.id === 'fintech-product' || role.id === 'data-analyst' || role.id === 'equity-analyst')) score *= 1.1;

    // Salary minimum filter - soft penalty
    if (profile.minSalary > 0 && role.salaryMax < profile.minSalary * 0.9) score *= 0.4;

    // Age factor
    const age = profile.age || 35;
    if (age > 40 && role.id === 'investment-banking') score *= 0.5;
    if (age > 35 && role.id === 'independent-financial-advisor' && exp >= 7) score *= 1.1;

    return { ...role, score: Math.round(score) };
  });

  const companyScores = CAREER_DATA.companies.map(company => {
    let score = 100;
    const p = profile.priorities;

    // Org type match
    if (profile.orgType && profile.orgType !== 'no_pref') {
      if (company.matchOrg.includes(profile.orgType)) score *= 1.3;
      else if (!company.matchOrg.includes('no_pref')) score *= 0.65;
    }

    // Work nature
    if (profile.workNature && company.matchNature) {
      if (profile.workNature === 'mix' || company.matchNature.includes(profile.workNature)) score *= 1.1;
    }

    // Priority boosts
    const pb = company.pBoost || {};
    Object.keys(pb).forEach(key => {
      const userPriority = p[key] || 3;
      const boost = pb[key];
      score += (userPriority - 3) * (boost - 1) * 20;
    });

    // Salary min filter
    if (profile.minSalary > 0 && company.salaryMax < profile.minSalary * 0.9) score *= 0.4;

    // Leave reason
    const lr = profile.leaveReason;
    if (lr === 'stress' && (company.typeCategory === 'insurance' || company.typeCategory === 'bank')) score *= 1.1;
    if (lr === 'growth' && company.typeCategory === 'fintech') score *= 1.15;
    if (lr === 'balance' && company.typeCategory !== 'investment_house') score *= 1.05;

    // Flexibility
    if (p.p_flexibility >= 4 && (company.workModel.includes('היברידי') || company.workModel.includes('מרחוק'))) score *= 1.15;

    return { ...company, score: Math.round(score) };
  });

  const topRoles = roleScores.sort((a, b) => b.score - a.score).slice(0, 3);
  const topCompanies = companyScores.sort((a, b) => b.score - a.score).slice(0, 3);

  return { topRoles, topCompanies };
}

// ============================================
// RENDER
// ============================================
function renderResults({ topRoles, topCompanies }) {
  renderProfileSummary();
  renderInsight(topRoles, topCompanies);
  renderScores(topRoles);
  renderRoles(topRoles);
  renderCompanies(topCompanies);
  renderSalaryBenchmark(topRoles);
}

function renderProfileSummary() {
  const el = document.getElementById('profile-summary');
  const parts = [];
  if (profile.currentRoleLabel) parts.push(profile.currentRoleLabel);
  if (profile.experience !== null) parts.push(`${profile.experience} שנות ניסיון`);
  if (profile.currentSalary) parts.push(`שכר נוכחי: ${profile.currentSalary.toLocaleString()} ₪`);
  el.textContent = parts.join(' · ');
}

function renderInsight(topRoles, topCompanies) {
  const el = document.getElementById('insight-card');
  const role = topRoles[0];
  const company = topCompanies[0];
  const salaryBoost = role && profile.currentSalary ? Math.round(((role.salaryMin + role.salaryMax) / 2 - profile.currentSalary) / profile.currentSalary * 100) : 0;

  let text = '';
  if (role) {
    text += `💡 על בסיס הפרופיל שלך, התפקיד שהכי מתאים לך הוא <strong>${role.title}</strong>`;
    if (salaryBoost > 5) text += ` עם פוטנציאל לעלייה של כ-${salaryBoost}% בשכר`;
    else if (salaryBoost < -5) text += ` (שים לב: טווח השכר דומה לשכר הנוכחי)`;
    text += '.';
  }
  if (company) text += ` החברה המומלצת ביותר עבורך היא <strong>${company.name}</strong> בשל ההתאמה לסוג הארגון ולסדרי העדיפויות שלך.`;

  const lr = profile.leaveReason;
  if (lr === 'salary') text += ' <span style="color:var(--gold-light)">כיוון שהשכר הנוכחי אינו מספק - הכוונה לתפקידים עם פוטנציאל הכנסה גבוה יותר.</span>';
  if (lr === 'stress') text += ' <span style="color:var(--success)">הדגש על תפקידים עם לחץ נמוך יותר ואיכות חיים טובה.</span>';
  if (lr === 'growth') text += ' <span style="color:var(--success)">הכוונה לתפקידים עם מסלול צמיחה ברור.</span>';
  if (lr === 'balance') text += ' <span style="color:var(--success)">מיקוד בתפקידים עם שעות סבירות וגמישות.</span>';

  el.innerHTML = text;
}

function renderScores(topRoles) {
  const role = topRoles[0];
  const salAvg = role ? Math.round((role.salaryMin + role.salaryMax) / 2) : 0;
  const growthStars = role ? '⭐'.repeat(role.growthPotential) : '';
  const balanceLabel = role ? role.workLifeBalance : '-';

  const container = document.getElementById('scores-row');
  container.innerHTML = `
    <div class="score-card" style="animation-delay:.1s">
      <div class="score-icon">🎯</div>
      <div class="score-label">תפקיד מומלץ מוביל</div>
      <div class="score-value sm">${role?.title || '-'}</div>
    </div>
    <div class="score-card" style="animation-delay:.2s">
      <div class="score-icon">💰</div>
      <div class="score-label">שכר ממוצע צפוי</div>
      <div class="score-value gold">${salAvg ? salAvg.toLocaleString() + ' ₪' : '-'}</div>
    </div>
    <div class="score-card" style="animation-delay:.3s">
      <div class="score-icon">📈</div>
      <div class="score-label">פוטנציאל צמיחה</div>
      <div class="score-value sm" style="font-size:1.1rem">${growthStars}</div>
    </div>
    <div class="score-card" style="animation-delay:.4s">
      <div class="score-icon">⚖️</div>
      <div class="score-label">איזון חיים</div>
      <div class="score-value sm">${balanceLabel}</div>
    </div>
  `;
}

function renderRoles(roles) {
  const ranks = ['🥇 הכי מתאים','🥈 מאוד מתאים','🥉 מתאים'];
  const stressClass = { 'גבוה מאוד':'high','גבוה':'high','בינוני-גבוה':'medium','בינוני':'medium','נמוך-בינוני':'good','נמוך':'good' };
  const balClass = { 'נמוך מאוד':'high','נמוך':'high','נמוך-בינוני':'medium','בינוני':'medium','בינוני-טוב':'good','טוב':'good','גבוה':'good' };

  const maxScore = roles[0]?.score || 1;
  document.getElementById('roles-grid').innerHTML = roles.map((role, i) => {
    const fitPct = Math.min(97, Math.round((role.score / maxScore) * 92) + (i === 0 ? 5 : 0));
    return `
    <div class="role-card" style="animation-delay:${0.1*(i+1)}s">
      <div class="card-rank">${ranks[i]}</div>
      <div class="card-title">${role.title}</div>
      <div class="card-description">${role.description}</div>
      <div class="card-meta">
        <div class="meta-item"><span class="meta-label">💰 שכר:</span><span class="meta-value salary">${role.salaryRange}</span></div>
        <div class="meta-item"><span class="meta-label">🔥 לחץ:</span><span class="meta-value ${stressClass[role.stressLevel]||'medium'}">${role.stressLevel}</span></div>
        <div class="meta-item"><span class="meta-label">⚖️ איזון:</span><span class="meta-value ${balClass[role.workLifeBalance]||'medium'}">${role.workLifeBalance}</span></div>
        <div class="meta-item"><span class="meta-label">🏠 גמישות:</span><span class="meta-value">${role.flexibility}</span></div>
      </div>
      <div class="fit-bar-wrap">
        <div class="fit-label"><span>התאמה אישית</span><span>${fitPct}%</span></div>
        <div class="fit-bar"><div class="fit-fill" style="width:${fitPct}%"></div></div>
      </div>
    </div>`;
  }).join('');
}

function renderCompanies(companies) {
  const ranks = ['🥇 מומלצת ביותר','🥈 מומלצת מאוד','🥉 מומלצת'];
  const maxScore = companies[0]?.score || 1;

  document.getElementById('companies-grid').innerHTML = companies.map((co, i) => {
    const fitPct = Math.min(97, Math.round((co.score / maxScore) * 92) + (i === 0 ? 5 : 0));
    return `
    <div class="company-card" style="animation-delay:${0.1*(i+1)}s">
      <div class="card-rank">${ranks[i]}</div>
      <div class="company-type-badge">${co.type}</div>
      <div class="card-title">${co.name}</div>
      <div class="card-description">${co.description}</div>
      <div class="card-meta">
        <div class="meta-item"><span class="meta-label">💰 שכר:</span><span class="meta-value salary">${co.salaryRange}</span></div>
        <div class="meta-item"><span class="meta-label">🏢 עבודה:</span><span class="meta-value">${co.workModel}</span></div>
        <div class="meta-item"><span class="meta-label">🌟 תרבות:</span><span class="meta-value">${co.culture}</span></div>
        <div class="meta-item"><span class="meta-label">📏 גודל:</span><span class="meta-value">${co.size}</span></div>
      </div>
      <div class="fit-bar-wrap">
        <div class="fit-label"><span>התאמה כללית</span><span>${fitPct}%</span></div>
        <div class="fit-bar"><div class="fit-fill" style="width:${fitPct}%"></div></div>
      </div>
    </div>`;
  }).join('');
}

function renderSalaryBenchmark(topRoles) {
  const el = document.getElementById('salary-benchmark');
  const currentSal = profile.currentSalary || 0;

  const rows = topRoles.map((r, i) => {
    const avg = Math.round((r.salaryMin + r.salaryMax) / 2);
    const diff = avg - currentSal;
    const pct = currentSal > 0 ? Math.round((diff / currentSal) * 100) : 0;
    let tag = '';
    if (i === 0) tag = `<span class="bench-tag top">מומלץ מוביל</span>`;
    else if (diff > 0) tag = `<span class="bench-tag better">+${pct}% פוטנציאל</span>`;
    else tag = `<span class="bench-tag current">דומה לנוכחי</span>`;
    return `<div class="benchmark-row"><span class="bench-role">${r.title}</span><span class="bench-salary">${r.salaryRange}</span>${tag}</div>`;
  });

  // Add current role row
  const currentRow = currentSal > 0 ? `<div class="benchmark-row"><span class="bench-role">📍 שכר נוכחי שלך</span><span class="bench-salary">${currentSal.toLocaleString()} ₪</span><span class="bench-tag current">בסיס</span></div>` : '';

  el.innerHTML = `
    <div class="benchmark-title">📊 השוואת שכר - שוק ההון הישראלי 2024-2025</div>
    ${currentRow}
    ${rows.join('')}
  `;
}

function printReport() { window.print(); }
