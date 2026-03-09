# מצפן קריירה - Career Advisor

כלי חכם ואינטראקטיבי לייעוץ קריירה לאנשי פיננסים.

## תכונות
- שאלון אינטראקטיבי ב-5 שלבים
- מנגנון ניקוד חכם (JavaScript)
- המלצות על 3 תפקידים ו-3 חברות
- סימולטור פשרות קריירה
- עיצוב מודרני ומגיב (RTL עברית)
- מותאם לנייד

## פריסה על GitHub Pages

1. צור repository חדש ב-GitHub (למשל: `career-advisor`)
2. העלה את הקבצים הבאים:
   - `index.html`
   - `style.css`
   - `script.js`
   - `data.js`
3. לך ל-Settings → Pages
4. תחת "Source" בחר `Deploy from a branch`
5. בחר ענף `main` ותיקייה `/ (root)`
6. לחץ Save
7. האתר יהיה זמין בכתובת: `https://USERNAME.github.io/career-advisor`

## עדכון נתונים

כל הנתונים (חברות, תפקידים, שכר) נמצאים בקובץ `data.js`.
לעדכון שכר, הוספת חברה או תפקיד - ערוך רק את הקובץ הזה.

## מבנה הקבצים
```
career-advisor/
├── index.html    - מבנה האתר
├── style.css     - עיצוב
├── script.js     - לוגיקה ואלגוריתם המלצה
└── data.js       - מאגר חברות ותפקידים (ניתן לעריכה)
```
