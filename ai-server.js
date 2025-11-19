const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3049;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

app.use(cors());
app.use(express.json());

app.post('/generate-ai-trip', async (req, res) => {
  const {
    country = 'وجهة غير محددة',
    days = 4,
    interests = 'استكشاف عام',
    budget = 'متوسطة',
    notes = ''
  } = req.body || {};

  const systemPrompt = `
أنت مستشار سفر فاخر في منصة ArhGo. مهمتك تأليف خطة رحلة يومية فخمة، مليئة بالنشاطات، بنبرة عربية راقية، مع تقسيم اليوم إلى صباح / بعد الظهر / مساء، وإضافة تفاصيل حسية حول التجربة. تجنب ذكر أنك نموذج.
`.trim();

  const userPrompt = `
الوجهة: ${country}
عدد الأيام: ${days}
الاهتمامات: ${interests}
الميزانية: ${budget}
ملاحظات إضافية: ${notes}

أعطني خطة مفصلة لكل يوم:
- استخدم فقرات قصيرة.
- ركّز على الأنشطة، المطاعم، اللحظات الخاصة، وتجارب التفاعل مع السكان أو الطبيعة.
- اختتم الخطة بفقرة تلخص الجو العام والنصائح النهائية.
`.trim();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.85,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('AI error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'فشل توليد الخطة' });
    }

    const trip = data.choices?.[0]?.message?.content?.trim();
    if (!trip) {
      return res.status(500).json({ error: 'استجابة الذكاء فارغة' });
    }

    res.json({ trip });
  } catch (error) {
    console.error('AI request failed:', error);
    res.status(500).json({ error: 'تعذر الوصول إلى خدمة الذكاء الاصطناعي' });
  }
});

app.listen(PORT, () => {
  console.log(`ArhGo AI server listening on http://localhost:${PORT}`);
});

