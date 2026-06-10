"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Particles from "@/components/Particles";

const categories = [
  { name: "ابلاغ عن اشخاص", tag: "Report", href: "/report" },
  { name: "اقتراحات", tag: "Ideas", href: "/suggestions" },
  { name: "طلب ترقيه", tag: "Rank Up", href: "/promotion" },
  { name: "استئناف", tag: "Appeal", href: "/appeal" },
  { name: "إساءة عنصرية أو تنمر", tag: "Racial Abuse / Bullying", href: "/abuse" },
  { name: "أخرى", tag: "Others", href: "/others" },
];

const rules = `
​٭-⋅• ┗╼╃✦⊰⚖️⊱✦╄╾┛
​↓『 الـدُّسْـتُـورُ الـسِّـيَـادِيُّ لِـلْـنَّـقَـابَـةِ 』↓
​⎔⋅• ┗━━━╼╃✦⊰⟦⚖️⟧⊱✦╄╾━━━┛ •⋅⎔
​‏ ‏‏‏‏『 14 مُخَالَفَةً تَسْتَوْجِبُ الإنـ⛔ـذَارَاتِ 』
​⎔⋅• ┗━━━╼╃✦⊰⟦⚖️⟧⊱✦╄╾━━━┛ •⋅⎔
​① يُمنع مَنعاً باتّاً إرسال مُلصقات مُخلّة بالآداب أو خادشة للحياء ٭
② يُمنع السبام بإرسال 4 ملصقات مُتتالية لتخريب الشات ٭
③ يُمنع إرسال 9 رسائل مُتتالية بقصد الهبد أو إثارة الفوضى بدون فائدة ٭
④ يُمنع السبام (+4 رسائل ورى بعض) أو استخدام تشفير الكلام للهروب من الرقابة ٭
⑤ التحدث في مواضيع الهينتاي والإيتشي يُعرضك للعقوبة الفورية ٭
⑥ تُمنع العنصرية بكل أشكالها (العرق، الجنسية، أو القبيلة) فكلنا تحت راية واحدة ٭
⑦ التّحدث في الأمور السياسية والنزاعات الدولية ونحوها مَحظور تماماً ٭
⑧ يُمنع التكلم بِلغة غير العربية أو استخدام أي نوع من رموز التشفير غير المفهومة ٭
⑨ يُمنع التنمر على الأعضاء، أو التقليل من شأنهم، أو أي نوع من أنواع المضايقة ٭
⓪① طلب الرتب والإلحاح فيها وإزعاج المشرفين يُنقص من قدرك ويجلب لك إنذاراً ٭
①① يُمنع إرسال القلوب والرموز العاطفية بين الشباب والبنات منعاً لإثارة الفتن ٭
②① يُمنع اللعن بشتى أنواعه أو إطلاق الدعاوى المسيئة على المحاربين ٭
③① يُمنع الشتم بالكلمات البذيئة (مثل: كل زق – كل تبن . . الخ) هيبتك من هيبة المكان ٭
④① يُمنع التحرش بأي شكل من الأشكال بين الجنسين في الشات العام ٭
​⎔⋅• ┗╼╃✦⊰⟦⚖️⟧⊱✦╄━┛ •⋅⎔
​‏ ‏‏‏‏『 3 قَوَانِـين تَسْتَوْجِبُ الطـ⌛️ـرْدَ الْمُؤَقَّتَ 』
​① يُمنع أي احتكاك أو خضوع غير لائق بين الجنسين في الخاص أو العام وتجاوز الحدود ٭
② الاعتراض العلني على قرارات المشرفين والتدخل في شؤون الإدارة (ناقش المشرف بأدب في الخاص) ٭
③ استعمال أي من الإيموجيات الممنوعة سيادياً: 《🥵 - 💩 - 🖕🏻 - 🍆 - 🍑 - 🇮🇱 - 🥚》 ٭
​⚠️ تنويه: الطرد المؤقت يُحتسب (تأديبي) .. و 2 تأديبي = طرد مؤبد فوراً 😈
​⎔⋅• ┗╼╃✦⊰⟦⚖️⟧⊱✦╄━┛ •⋅⎔
​‏ ‏‏‏‏『 10 قَوَانِـين تَسْتَوْجِبُ الطـ🚯ـرْدَ الْمُؤَبَّدَ 』
​① التحدث في الأمور الدينية بأي شكل من الأشكال لإثارة الطوائف (لكم دينكم ولي دين) ٭
② النَشر والدعاية لقروبات أخرى، أو إرسال روابط خارجية دون إذن القيادة العليا ٭
③ إرسال أي صـورة، أو مـقطع، أو مـلصق إباحي (هينتاي) يُنهي وجودك هنا فوراً ٭
④ الدخول بنّـية التخريب، أو التجسس، أو سرقة أعضاء النقابة لصالح جهات أخرى ٭
⑤ تهديد الأعضاء بالباند، أو استخدام النفوذ الوهمي لإرهاب المحاربين ٭
⑥ السب والقذف الصريح، والطعن في الأعراض والشرف ٭
⑦ افتعال أي نوع من الواسطة لتخطي القوانين أو كسب رتب لا تستحقها ٭
⑧ إدخال أي عضو للجروب الأساسي دون المرور ببوابة الاستقبال والقبول الرسمية ٭
⑨ افتعال المشاكل المُتعمدة، وإثارة الفتن، وتحريض الأعضاء داخل النقابة ٭
⓪① سب وشتم أي شخص في الخاص، أو ابتزازه وتشويه سمعته، إذا قام بالإبلاغ عنك بالدليل ٭
​❌ يُمنع منعاً باتّاً الدخول والخروج المُتكرر من النقابة لعدم تشتيت النظام
​⎔⋅• ┗━━━╼╃✦⊰⟦⚖️⟧⊱✦╄╾━━━┛ •⋅⎔
​⚖️ آلِـيَّـةُ الْـحِـسَـابِ وَالْـعَـدَالَةِ:
↜ 3 إنذارات = طرد مؤقت (تأديبي)
↜ 2 تأديبي = طرد مؤبـد ونفي من المملكة
↜ يُحذف الإنذار تلقائياً بعد مرور 3 أيام من تاريخ أخذه كفرصة لإصلاح مسارك.
​⎔⋅• ┗╼╃✦⊰⟧⊱✦╄━┛ •⋅⎔
​🚨 تَحْذِيرٌ صَارِمٌ مِنْ صَاحِبِ الْعَرْشِ « Yuuichi »:
↜ تكرار نفس المخالفات والإنذارات يدل على استهتارك بنظامنا، ومصيرك سيكون الطرد المؤبد.
↜ إذا لزم الأمر.. يملك المشرف بكامل الصلاحيات أن يطبق قانوناً غير مذكور هنا بناءً على تطبيق المنطق ومصلحة الإمبراطورية المظلمة 😈🔥.
​⎔⋅• ┗━━━╼╃✦⊰⟧⊱✦╄╾━━━┛ •⋅⎔
𝕿𝖍𝖊 𝕾𝖿𝖛𝖊𝖗𝖊𝖎𝖌𝖓 𝕾𝖞𝖓𝔡𝖎𝔠𝖆𝖙𝖊
`.trim();

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [copied, setCopied] = useState(false);
  const [boot, setBoot] = useState(false);

  useEffect(() => {
    setBoot(true);
    const t = setTimeout(() => setBoot(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://chat.whatsapp.com/IHGbY7vX3uqItUwifxxpER");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {boot && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.22),transparent_60%)] animate-pulse" />
          <div className="text-center">
            <p className="text-yellow-300 tracking-[0.5em] text-xs mb-6 animate-pulse">
              INITIALIZING
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-widest animate-fadeIn">
              <span className="text-white">⚜️『𝑷𝒉𝒂𝒏𝒕𝒐𝒎✧𝑪𝒓𝒐𝒘𝒏』⚜️</span>
            </h1>
            <div className="mt-6 w-52 sm:w-64 h-px bg-white/20 mx-auto overflow-hidden">
              <div className="h-full w-full bg-yellow-400 animate-loadingBar" />
            </div>
          </div>
        </div>
      )}

      <main className="relative min-h-screen bg-[#0b0d14] text-white" dir="rtl">
        <Particles />

        <nav className="relative z-10 flex justify-between items-center px-4 sm:px-6 py-4 border-b border-white/10 bg-[#0c0f1a]">
          <div className="font-bold">
            <span className="text-white">『𝑷𝒉𝒂𝒏𝒕𝒐𝒎 ✧ 𝑪𝒓𝒐𝒘𝒏』</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowRules(true)}
              className="bg-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
            >
              القوانين
            </button>
            <button
              onClick={() => setShowContact(true)}
              className="bg-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
            >
              تواصل
            </button>
          </div>
        </nav>

        <section className="relative z-10 px-4 sm:px-6 md:px-16 py-10 sm:py-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-right">
          <img
            src="/logo.jpeg"
            className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[150px] md:h-[150px] rounded-lg border border-white/10"
          />
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-wide">
              أهلاً بكم في 『𝑷𝒉𝒂𝒏𝒕𝒐𝒎✧𝑪𝒓𝒐𝒘𝒏』
            </h1>
            <p className="text-gray-400 mt-3 max-w-xl text-sm sm:text-base">
              نظام دعم مجتمع الأنمي
            </p>
          </div>
        </section>

        <section className="relative z-10 px-4 sm:px-6 md:px-16 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative p-6 sm:p-8 border border-white/10 bg-[#0e111d] rounded-2xl hover:bg-[#141a2e] hover:border-yellow-500/40 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,215,0,0.15)]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)] rounded-2xl" />
                <div className="relative text-right">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-yellow-300 mt-3 tracking-wider">
                    {item.tag}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {showContact && (
          <div
            className="fixed inset-0 z-[998] flex items-center justify-center px-4"
            onClick={() => setShowContact(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              className="relative z-10 bg-[#0e111d] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-right"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold text-white mb-1">تواصل معنا</h2>
              <p className="text-gray-400 text-sm mb-5">
                انضم إلى مجموعة الواتساب الخاصة بالسيرفر
              </p>
              <div className="flex items-center gap-3 bg-[#0b0d14] border border-white/10 rounded-xl px-4 py-3 mb-4">
                <span className="text-2xl">💬</span>
                <a href="https://chat.whatsapp.com/Fy08EY6tTZTH9oIJabxybt" target="_blank" rel="noopener noreferrer" className="text-yellow-300 text-sm hover:text-yellow-200 transition truncate">
                  مجموعة واتساب السيرفر
                </a>
              </div>
              <button
                onClick={handleCopy}
                className="w-full bg-gray-700 hover:bg-gray-600 py-2.5 rounded-xl text-sm font-bold transition mb-3"
              >
                {copied ? "تم النسخ ✓" : "نسخ الرابط"}
              </button>
              <button
                onClick={() => setShowContact(false)}
                className="w-full text-gray-500 hover:text-gray-300 text-sm transition"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

        {showRules && (
          <div
            className="fixed inset-0 z-[998] flex items-center justify-center px-4"
            onClick={() => setShowRules(false)}
          >
<div
  dir="ltr"
  className="relative z-10 bg-[#0e111d] border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-yellow-500/40 [&::-webkit-scrollbar-thumb]:rounded-full"
  onClick={(e) => e.stopPropagation()}
>
  <div dir="rtl" className="text-right">
    <h2 className="text-lg font-bold text-white mb-4">قوانين السيرفر</h2>
    <p className="text-gray-300 text-sm leading-8 whitespace-pre-line">{rules}</p>
    <button
      onClick={() => setShowRules(false)}
      className="mt-6 w-full text-gray-500 hover:text-gray-300 text-sm transition"
    >
      إغلاق
    </button>
  </div>
</div>
          </div>
        )}

      </main>
    </>
  );
}