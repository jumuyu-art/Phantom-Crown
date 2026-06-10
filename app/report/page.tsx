"use client";

import { useState } from "react";
import Link from "next/link";

interface Member {
  name: string;
  display: string;
  number: string;
}

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([{ name: "", display: "", number: "" }]);
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    phone: "",
    what_happened: "",
    media: null as boolean | null,
    cursing: null as boolean | null,
    bad_manners: null as boolean | null,
    religious: null as boolean | null,
    severity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index: number, field: keyof Member, value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    setMembers([...members, { name: "", display: "", number: "" }]);
  };

  const removeMember = (index: number) => {
    if (members.length === 1) return;
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.nickname || !form.phone || !form.what_happened || !form.severity) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);

    const membersText = members
      .map((m, i) => `${i + 1}. الاسم: ${m.name || "—"} | المعروض: ${m.display || "—"} | الرقم: ${m.number || "—"}`)
      .join("\n");

    const severityMap: Record<string, string> = {
      low: "🟢 خفيف",
      medium: "🟡 متوسط",
      high: "🔴 شديد",
    };

    const boolText = (val: boolean | null) =>
      val === null ? "لم يتم الاختيار" : val ? "نعم" : "لا";

    try {
      await fetch("https://discord.com/api/webhooks/1513863160560357458/fnlVhNwN4nTNDCLtp8cOa2NEx4pQHmg_CxNaXRsYrDDOTUfhQwQt9YOwT0CJniU1tsbA", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🚨 بلاغ جديد",
              color: 0xe11d48,
              fields: [
                { name: "اسم المبلِّغ", value: form.name, inline: true },
                { name: "اللقب", value: form.nickname, inline: true },
                { name: "رقم الهاتف", value: form.phone, inline: false },
                { name: "ماذا حدث", value: form.what_happened, inline: false },
                { name: "الأعضاء المتورطون", value: membersText, inline: false },
                {
                  name: "تفاصيل إضافية",
                  value: [
                    `وسائط: ${boolText(form.media)}`,
                    `شتايم: ${boolText(form.cursing)}`,
                    `سوء ادب: ${boolText(form.bad_manners)}`,
                    `اساءة دينية: ${boolText(form.religious)}`,
                  ].join("\n"),
                  inline: false,
                },
                { name: "مستوى الخطورة", value: severityMap[form.severity] || "—", inline: false },
              ],
              footer: { text: "Phantom Crown • بلاغ" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      setSubmitted(true);
    } catch {
      alert("حدث خطأ أثناء الإرسال، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#0b0d14] text-white flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-5xl mb-6">✦</div>
          <h2 className="text-2xl font-bold  text-yellow-300 mb-3">تم إرسال البلاغ</h2>
          <p className="text-gray-400 mb-8">سيتم مراجعة بلاغك من قبل الإدارة</p>
          <Link href="/" className="bg-yellow-700 hover:bg-yellow-600 px-6 py-3 rounded-xl text-sm transition">
            العودة للرئيسية
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d14] text-white" dir="rtl">

      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-white/10 bg-[#0c0f1a]">
        <div className="font-bold text-white">『𝑷𝒉𝒂𝒏𝒕𝒐𝒎 ✧ 𝑪𝒓𝒐𝒘𝒏』</div>
        <Link href="/" className="bg-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
          رجوع
        </Link>
      </nav>

      <section className="px-4 sm:px-6 md:px-16 py-12 max-w-2xl mx-auto">

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">ابلاغ عن اشخاص</h1>
        <p className="text-gray-400 text-sm mb-2">أبلغ عن أي مخالفة أو سلوك غير لائق داخل السيرفر</p>
        <p className="text-xs text-red-400 mb-10">* جميع الحقول مطلوبة</p>

        <div className="flex flex-col gap-6">

          <div>
            <label className="block text-sm text-yellow-300 mb-2">
              الاسم الكامل <span className="text-red-400">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="أدخل اسمك الكامل"
              className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-2">
              اللقب أو الاسم المعروض <span className="text-red-400">*</span>
            </label>
            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              placeholder="اسمك في السيرفر"
              className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-2">
              رقم الهاتف <span className="text-red-400">*</span>
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="مثال: +201234567890"
              className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition"
              dir="ltr"
            />
            <p className="text-xs text-gray-500 mt-1">يمكنك إدخال أي رمز دولي مثل +20 لمصر أو +966 للسعودية</p>
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-2">
              ماذا حدث <span className="text-red-400">*</span>
            </label>
            <textarea
              name="what_happened"
              value={form.what_happened}
              onChange={handleChange}
              placeholder="اشرح ما حدث بالتفصيل..."
              rows={4}
              className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-3">
              الأعضاء المتورطون <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-col gap-3">
              {members.map((member, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                      placeholder={`اسم العضو ${index + 1}`}
                      className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition"
                    />
                    <input
                      value={member.display}
                      onChange={(e) => handleMemberChange(index, "display", e.target.value)}
                      placeholder="الاسم المعروض"
                      className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition"
                    />
                    <input
                      value={member.number}
                      onChange={(e) => handleMemberChange(index, "number", e.target.value)}
                      placeholder="رقم الهاتف"
                      className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition"
                      dir="ltr"
                    />
                  </div>
                  {members.length > 1 && (
                    <button
                      onClick={() => removeMember(index)}
                      className="mt-1 text-red-400 hover:text-red-300 text-xl px-2 transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addMember}
              className="mt-3 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm transition"
            >
              <span className="text-lg">+</span> إضافة عضو آخر
            </button>
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-3">تفاصيل إضافية</label>
            <div className="flex flex-col gap-3">
              {[
                { key: "media", label: "هل تضمن الامر صور او مقاطع فيديو" },
                { key: "cursing", label: "هل كان هناك شتايم" },
                { key: "bad_manners", label: "هل كان هناك سوء ادب" },
                { key: "religious", label: "هل كان هناك اساءة دينية" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-sm text-white">{label}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setForm({ ...form, [key]: true })}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                        form[key as keyof typeof form] === true
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      نعم
                    </button>
                    <button
                      onClick={() => setForm({ ...form, [key]: false })}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                        form[key as keyof typeof form] === false
                          ? "bg-gray-500 text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      لا
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-3">
              مستوى الخطورة <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3">
              {[
                { value: "low", label: "خفيف", color: "hover:border-green-500/60 data-[active=true]:border-green-500 data-[active=true]:bg-green-500/10" },
                { value: "medium", label: "متوسط", color: "hover:border-yellow-500/60 data-[active=true]:border-yellow-500 data-[active=true]:bg-yellow-500/10" },
                { value: "high", label: "شديد", color: "hover:border-red-500/60 data-[active=true]:border-red-500 data-[active=true]:bg-red-500/10" },
              ].map((s) => (
                <button
                  key={s.value}
                  data-active={form.severity === s.value}
                  onClick={() => setForm({ ...form, severity: s.value })}
                  className={`flex-1 py-3 rounded-xl border border-white/10 bg-[#0e111d] text-sm font-bold transition-all duration-200 text-white ${s.color}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-700 hover:bg-yellow-600 active:scale-95 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جاري الإرسال..." : "إرسال البلاغ"}
          </button>

        </div>
      </section>
    </main>
  );
}