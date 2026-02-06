# دليل نشر موقع اختبار منصف - خطوة بخطوة

## الطريقة الأسهل: استخدام GitHub Desktop

### الخطوة 1: تحميل GitHub Desktop
1. اذهب إلى: https://desktop.github.com
2. حمل البرنامج وثبته

### الخطوة 2: إنشاء حساب GitHub
1. اذهب إلى: https://github.com
2. اضغط "Sign up" وأنشئ حساب جديد

### الخطوة 3: رفع المشروع
1. افتح GitHub Desktop
2. سجل دخول بحسابك
3. اضغط "Create a New Repository on your hard drive"
4. اسم المستودع: `mansaf-quiz`
5. اختر مجلد المشروع
6. اضغط "Create Repository"
7. اضغط "Publish repository"

### الخطوة 4: النشر على Vercel
1. اذهب إلى: https://vercel.com
2. اضغط "Continue with GitHub"
3. اضغط "New Project"
4. اختر `mansaf-quiz`
5. اضغط "Deploy"

### الخطوة 5: إضافة متغيرات البيئة
1. في Vercel، اذهب إلى Settings > Environment Variables
2. أضف هذه المتغيرات من ملف `.env.local`:
   - `CONVEX_DEPLOYMENT`
   - `VITE_CONVEX_URL`

## معلومات مهمة:
- **كلمة مرور الإدارة**: `mansaf2024`
- **رابط الموقع**: سيظهر في Vercel بعد النشر
- **الوصول للإدارة**: اضغط النقاط الثلاث (•••) في الزاوية اليسرى العلوية

## إذا واجهت مشاكل:
1. تأكد من أن جميع الملفات موجودة
2. تأكد من إضافة متغيرات البيئة بشكل صحيح
3. انتظر بضع دقائق بعد النشر

## بدائل أخرى للنشر:
- **Netlify**: https://netlify.com
- **GitHub Pages**: مجاني لكن يحتاج إعداد إضافي
- **Railway**: https://railway.app

---
**ملاحظة**: الموقع سيكون متاحاً للجميع على الإنترنت بمجرد النشر!
