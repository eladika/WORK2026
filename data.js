// ============================================
// מצפן קריירה - DATABASE (data.js)
// ניתן לעדכן בקלות ללא שינוי קוד ראשי
// ============================================

const CAREER_DATA = {

  roles: [
    {
      id: "portfolio-manager",
      title: "מנהל תיקי השקעות",
      description: "ניהול עצמאי של תיקי לקוחות פרטיים ומוסדיים, קבלת החלטות השקעה ובניית אסטרטגיות. תפקיד יוקרתי עם אוטונומיה גבוהה.",
      salaryRange: "35,000 - 65,000 ₪",
      stressLevel: "גבוה",
      workLifeBalance: "בינוני",
      matchFactors: {
        investment_advisor: 0.95,
        pension_advisor: 0.6,
        analyst: 0.75,
        fintech: 0.5,
        bank: 0.85,
        investment_house: 0.95,
        consulting: 0.6,
        experience_6_plus: 1.2,
        p_salary: 1.0,
        p_growth: 1.0,
        p_prestige: 1.0
      }
    },
    {
      id: "private-banking",
      title: "יועץ פרייבט בנקינג",
      description: "ליווי לקוחות עשירים (HNW) עם שירות אישי ואינטגרטיבי: השקעות, מיסוי, פנסיה ועברת עושר בין דורית.",
      salaryRange: "28,000 - 52,000 ₪ + עמלות",
      stressLevel: "בינוני-גבוה",
      workLifeBalance: "בינוני",
      matchFactors: {
        investment_advisor: 1.0,
        pension_advisor: 0.8,
        bank: 1.0,
        investment_house: 0.75,
        experience_6_plus: 1.1,
        client_facing: 1.2,
        p_salary: 0.9,
        p_prestige: 1.1,
        p_balance: 0.6
      }
    },
    {
      id: "equity-analyst",
      title: "אנליסט מניות",
      description: "מחקר מעמיק של חברות ציבוריות, כתיבת דוחות ניתוחיים והמלצות קנייה/מכירה. אידיאלי לאוהבי ניתוח.",
      salaryRange: "22,000 - 42,000 ₪",
      stressLevel: "גבוה",
      workLifeBalance: "נמוך-בינוני",
      matchFactors: {
        analyst: 1.0,
        investment_advisor: 0.75,
        investment_house: 0.9,
        bank: 0.7,
        fintech: 0.5,
        analytical: 1.2,
        p_growth: 1.1,
        p_salary: 0.7,
        p_balance: 0.5
      }
    },
    {
      id: "fintech-product",
      title: "מנהל מוצר פינטק",
      description: "הגדרת מוצרים פיננסיים דיגיטליים, עבודה עם מפתחים ולקוחות. גשר בין עולם הפיננסים לטכנולוגיה. שוק חם.",
      salaryRange: "28,000 - 55,000 ₪",
      stressLevel: "בינוני",
      workLifeBalance: "טוב",
      matchFactors: {
        investment_advisor: 0.7,
        analyst: 0.8,
        fintech: 1.2,
        bank: 0.6,
        hybrid: 1.1,
        startup: 1.2,
        p_growth: 1.2,
        p_hybrid: 1.1,
        p_salary: 0.9,
        tradeoff_startup: 1.2
      }
    },
    {
      id: "data-analyst-finance",
      title: "אנליסט נתונים פיננסי",
      description: "ניתוח נתוני שוק, לקוחות ותפעול באמצעות Python, SQL וכלי BI. ביקוש גבוה, שכר עולה, אפשרות היברידי.",
      salaryRange: "22,000 - 42,000 ₪",
      stressLevel: "נמוך-בינוני",
      workLifeBalance: "טוב",
      matchFactors: {
        analyst: 1.0,
        fintech: 1.0,
        bank: 0.75,
        insurance: 0.8,
        analytical: 1.2,
        hybrid: 1.1,
        remote: 1.0,
        p_balance: 1.1,
        p_remote: 1.0,
        p_hybrid: 1.1,
        p_growth: 0.9
      }
    },
    {
      id: "risk-manager",
      title: "מנהל סיכונים",
      description: "ניתוח וניהול סיכוני שוק, אשראי ותפעול. תפקיד רגולטורי חשוב, יציבות גבוהה, תהליכים מובנים.",
      salaryRange: "25,000 - 48,000 ₪",
      stressLevel: "בינוני",
      workLifeBalance: "בינוני-טוב",
      matchFactors: {
        risk: 1.0,
        analyst: 0.8,
        investment_advisor: 0.6,
        bank: 1.0,
        insurance: 0.9,
        large_corp: 1.1,
        p_stability: 1.2,
        p_balance: 0.9,
        p_lowstress: 0.9
      }
    },
    {
      id: "financial-planner",
      title: "מתכנן פיננסי עצמאי",
      description: "עבודה עצמאית עם לקוחות פרטיים לתכנון פנסיה, ביטוח והשקעות. גמישות מלאה, הכנסה ללא תקרה.",
      salaryRange: "20,000 - 80,000 ₪ (תלוי לקוחות)",
      stressLevel: "בינוני",
      workLifeBalance: "גבוה",
      matchFactors: {
        investment_advisor: 0.9,
        pension_advisor: 1.0,
        bank: 0.5,
        remote: 1.0,
        hybrid: 0.9,
        client_facing: 1.1,
        p_remote: 1.2,
        p_balance: 1.1,
        p_growth: 1.0,
        tradeoff_startup: 1.0
      }
    },
    {
      id: "investment-manager-corp",
      title: "מנהל השקעות מוסדי",
      description: "ניהול נכסים של קרנות פנסיה, ביטוח ובנקים. תיקים גדולים, אחריות גבוהה, יוקרה מקצועית.",
      salaryRange: "40,000 - 90,000 ₪",
      stressLevel: "גבוה",
      workLifeBalance: "נמוך",
      matchFactors: {
        portfolio_manager: 1.0,
        investment_advisor: 0.85,
        investment_house: 1.0,
        insurance: 0.8,
        experience_6_plus: 1.3,
        p_salary: 1.2,
        p_prestige: 1.2,
        p_balance: 0.3,
        p_stability: 0.8
      }
    },
    {
      id: "compliance-officer",
      title: "קצין ציות ורגולציה",
      description: "אחריות על עמידה בחוקי ניירות ערך, כללי הפיקוח על הבנקים, ודיווחים. פחות לחץ, יציבות גבוהה.",
      salaryRange: "22,000 - 40,000 ₪",
      stressLevel: "נמוך-בינוני",
      workLifeBalance: "טוב",
      matchFactors: {
        investment_advisor: 0.7,
        risk: 0.8,
        bank: 1.0,
        insurance: 0.9,
        large_corp: 1.1,
        p_stability: 1.2,
        p_balance: 1.1,
        p_lowstress: 1.2,
        p_salary: 0.5
      }
    },
    {
      id: "wealth-tech-advisor",
      title: "יועץ WealthTech / רובו-אדוויזורי",
      description: "שילוב של ייעוץ השקעות עם פלטפורמות דיגיטליות, AI ואוטומציה. תפקיד עתידני עם ביקוש גובר.",
      salaryRange: "25,000 - 50,000 ₪",
      stressLevel: "בינוני",
      workLifeBalance: "טוב",
      matchFactors: {
        investment_advisor: 1.0,
        fintech: 1.1,
        bank: 0.6,
        hybrid: 1.1,
        analytical: 1.0,
        p_growth: 1.2,
        p_hybrid: 1.0,
        p_salary: 0.8,
        tradeoff_startup: 1.0
      }
    },
    {
      id: "insurance-investment-mgr",
      title: "מנהל השקעות בחברת ביטוח",
      description: "ניהול תיקי השקעות תחת אסטרטגיית ALM של חברות ביטוח. יציבות גבוהה, שכר טוב, שעות סבירות.",
      salaryRange: "28,000 - 55,000 ₪",
      stressLevel: "בינוני",
      workLifeBalance: "בינוני-טוב",
      matchFactors: {
        portfolio_manager: 0.9,
        investment_advisor: 0.7,
        insurance: 1.0,
        large_corp: 1.0,
        p_stability: 1.1,
        p_balance: 1.0,
        p_salary: 0.9,
        p_lowstress: 1.0
      }
    },
    {
      id: "freelance-consultant",
      title: "יועץ פיננסי עצמאי / פרילנסר",
      description: "מתן שירותי ייעוץ לעסקים וארגונים על בסיס פרויקטים. גמישות מרבית, פוטנציאל שכר גבוה, צורך ביזמות.",
      salaryRange: "20,000 - 70,000 ₪ (תלוי לקוחות)",
      stressLevel: "בינוני",
      workLifeBalance: "גבוה",
      matchFactors: {
        consulting: 1.0,
        investment_advisor: 0.8,
        remote: 1.1,
        p_remote: 1.2,
        p_balance: 1.1,
        p_growth: 1.0,
        tradeoff_startup: 1.1,
        p_stability: 0.4
      }
    }
  ],

  companies: [
    {
      id: "excellence",
      name: "אקסלנס נשואה",
      type: "בית השקעות",
      typeCategory: "investment_house",
      description: "אחד מבתי ההשקעות הגדולים בישראל עם מגוון רחב של מוצרים ואפשרויות קידום מעניינות.",
      salaryRange: "25,000 - 60,000 ₪",
      workModel: "היברידי",
      culture: "מקצועית ותחרותית",
      matchFactors: {
        investment_house: 1.0,
        bank: 0.7,
        investment_advisor: 1.0,
        portfolio_manager: 1.0,
        p_prestige: 0.9,
        p_growth: 1.0,
        p_salary: 1.0
      }
    },
    {
      id: "harel",
      name: "הראל ביטוח והשקעות",
      type: "חברת ביטוח ובית השקעות",
      typeCategory: "insurance",
      description: "קבוצה פיננסית מגוונת עם פעילות בביטוח, פנסיה והשקעות. יציבות גבוהה ואפשרויות מעבר בין מחלקות.",
      salaryRange: "22,000 - 55,000 ₪",
      workModel: "היברידי",
      culture: "יציבה ומקצועית",
      matchFactors: {
        insurance: 1.0,
        investment_house: 0.8,
        pension_advisor: 1.0,
        investment_advisor: 0.75,
        p_stability: 1.2,
        p_balance: 1.0,
        p_salary: 0.8,
        large_corp: 1.0
      }
    },
    {
      id: "discount",
      name: "בנק דיסקונט",
      type: "בנק",
      typeCategory: "bank",
      description: "אחד הבנקים הגדולים בישראל עם מחלקות ניהול עושר, פרייבט בנקינג ומוצרים מוסדיים. שכר יציב, קידום מוגדר.",
      salaryRange: "20,000 - 48,000 ₪",
      workModel: "מעורב",
      culture: "מסורתית-מקצועית",
      matchFactors: {
        bank: 1.0,
        investment_advisor: 0.9,
        pension_advisor: 0.8,
        large_corp: 1.1,
        p_stability: 1.2,
        p_prestige: 0.9,
        p_salary: 0.7,
        p_balance: 0.8
      }
    },
    {
      id: "migdal",
      name: "מגדל ביטוח",
      type: "חברת ביטוח",
      typeCategory: "insurance",
      description: "חברת הביטוח הגדולה בישראל, עם מחלקות ניהול השקעות ואקטואריה. שכר ותנאים טובים, אוירה רגועה יחסית.",
      salaryRange: "22,000 - 50,000 ₪",
      workModel: "היברידי",
      culture: "יציבה ומאורגנת",
      matchFactors: {
        insurance: 1.0,
        pension_advisor: 0.9,
        analyst: 0.75,
        large_corp: 1.0,
        p_stability: 1.2,
        p_lowstress: 1.0,
        p_balance: 1.0,
        p_salary: 0.75
      }
    },
    {
      id: "psagot",
      name: "פסגות השקעות",
      type: "בית השקעות",
      typeCategory: "investment_house",
      description: "בית השקעות בוטיק-מדיום עם תפקידי ניהול תיקים, מחקר ויעוץ. אווירה מקצועית, אפשרויות ייחודיות.",
      salaryRange: "26,000 - 58,000 ₪",
      workModel: "משרד בעיקר",
      culture: "מקצועית ומכוונת ביצועים",
      matchFactors: {
        investment_house: 1.0,
        portfolio_manager: 1.0,
        analyst: 0.9,
        boutique: 1.1,
        p_salary: 1.0,
        p_prestige: 1.0,
        p_growth: 0.9,
        p_balance: 0.6
      }
    },
    {
      id: "pepper-one-zero",
      name: "פינטק ישראלי (Pepper / One Zero)",
      type: "בנק דיגיטלי / פינטק",
      typeCategory: "fintech",
      description: "בנקים ופינטקים דיגיטליים ישראליים מובילים. אינובטיבי, היברידי, אוטונומיה גבוהה, אופציות.",
      salaryRange: "28,000 - 60,000 ₪ + אופציות",
      workModel: "היברידי-מרחוק",
      culture: "דינמית ואינובטיבית",
      matchFactors: {
        fintech: 1.2,
        bank: 0.5,
        startup: 1.2,
        hybrid: 1.1,
        remote: 1.0,
        p_hybrid: 1.2,
        p_growth: 1.2,
        p_salary: 1.0,
        p_stability: 0.5,
        tradeoff_startup: 1.2
      }
    },
    {
      id: "altshuler-shaham",
      name: "אלטשולר שחם",
      type: "בית השקעות",
      typeCategory: "investment_house",
      description: "אחד מבתי ההשקעות הצומחים בישראל עם ניהול קרנות, תיקים וחדשנות. מוניטין חזק, שכר תחרותי.",
      salaryRange: "28,000 - 65,000 ₪",
      workModel: "היברידי",
      culture: "דינמית ומכוונת צמיחה",
      matchFactors: {
        investment_house: 1.0,
        portfolio_manager: 1.0,
        investment_advisor: 0.9,
        analyst: 0.85,
        p_prestige: 1.0,
        p_salary: 1.1,
        p_growth: 1.1,
        p_balance: 0.7
      }
    },
    {
      id: "deloitte-finance",
      name: "דלויט / PwC ייעוץ פיננסי",
      type: "ייעוץ פיננסי",
      typeCategory: "consulting",
      description: "חברות ביג4 עם מחלקות ייעוץ פיננסי, ניהול סיכונים ורגולציה. חשיפה רחבה, למידה מהירה, שכר טוב.",
      salaryRange: "25,000 - 55,000 ₪",
      workModel: "היברידי",
      culture: "מקצועית ותחרותית",
      matchFactors: {
        consulting: 1.0,
        analyst: 0.9,
        risk: 0.8,
        investment_advisor: 0.6,
        hybrid: 1.0,
        p_growth: 1.2,
        p_prestige: 1.1,
        p_salary: 0.9,
        p_balance: 0.65
      }
    },
    {
      id: "leumi-private",
      name: "לאומי פרייבט בנקינג",
      type: "בנק - פרייבט",
      typeCategory: "bank",
      description: "מחלקת הפרייבט בנקינג של בנק לאומי. לקוחות HNW, שירות אינטגרטיבי, יוקרה מקצועית גבוהה.",
      salaryRange: "30,000 - 55,000 ₪",
      workModel: "משרד בעיקר",
      culture: "יוקרתית ומקצועית",
      matchFactors: {
        bank: 1.0,
        investment_advisor: 1.0,
        pension_advisor: 0.8,
        client_facing: 1.1,
        large_corp: 1.0,
        p_prestige: 1.2,
        p_salary: 0.9,
        p_stability: 1.1,
        p_balance: 0.7
      }
    },
    {
      id: "clal-insurance",
      name: "כלל ביטוח ופיננסים",
      type: "חברת ביטוח",
      typeCategory: "insurance",
      description: "אחת הקבוצות הפיננסיות הגדולות. ניהול נכסים, פנסיה וביטוח. תנאים טובים, שעות סבירות.",
      salaryRange: "22,000 - 48,000 ₪",
      workModel: "היברידי",
      culture: "יציבה ומוסדית",
      matchFactors: {
        insurance: 1.0,
        pension_advisor: 1.0,
        analyst: 0.7,
        large_corp: 1.0,
        p_stability: 1.1,
        p_balance: 1.0,
        p_lowstress: 0.9,
        p_salary: 0.7
      }
    }
  ]
};
