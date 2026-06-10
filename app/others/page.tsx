"use client";

import { useState } from "react";
import Link from "next/link";

export default function OthersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.nickname || !form.phone || !form.message) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);

    try {
      await fetch("https://discord.com/api/webhooks/1514028591824896200/Y7JkTw1AbGcLEfeZCeEYGoeMl31q28e7BtmSYrtxaUaLsp7TWQTx9oIZlYLYYytWuzMW", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "📩 طلب آخر",
              color: 0xa855f7,
              fields: [
                { name: "الاسم الكامل", value: form.name, inline: true },
                { name: "اللقب", value: form.nickname, inline: true },
                { name: "رقم الهاتف", value: form.phone, inline: false },
                { name: "الرسالة", value: form.message, inline: false },
              ],
              footer: { text: "Phantom Crown • أخرى" },
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
          <h2 className="text-2xl font-bold text-yellow-300 mb-3">تم إرسال طلبك</h2>
          <p className="text-gray-400 mb-8">سيتم مراجعة طلبك من قبل الإدارة</p>
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

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">أخرى</h1>
        <p className="text-gray-400 text-sm mb-2">لأي طلب أو موضوع لم يجد مكانه في الأقسام الأخرى</p>
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
              كيف يمكننا مساعدتك <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="اكتب طلبك أو موضوعك هنا..."
              rows={6}
              className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-700 hover:bg-yellow-600 active:scale-95 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جاري الإرسال..." : "إرسال الطلب"}
          </button>

        </div>
      </section>
    </main>
  );
}