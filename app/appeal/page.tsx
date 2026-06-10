"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function AppealPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    phone: "",
    admin_name: "",
    admin_display: "",
    admin_role: "",
    accused: "",
    reason: "",
    why_unappeal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));
    setImages((prev) => [...prev, ...selected]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result as string);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async () => {
    if (!form.name || !form.nickname || !form.phone || !form.admin_name || !form.admin_display || !form.admin_role || !form.accused || !form.reason || !form.why_unappeal) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);

    try {
      const webhook = "https://discord.com/api/webhooks/1513936668774891722/9AwYxrX2jpLjTHi9nbS55vHQom6011-FHR-wirYVo-ok4fu6LpGxbOKqRhb5veE6C_Ew";

      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "📋 استئناف جديد",
              color: 0xa855f7,
              fields: [
                { name: "اسم مقدم الاستئناف", value: form.name, inline: true },
                { name: "اللقب", value: form.nickname, inline: true },
                { name: "رقم الهاتف", value: form.phone, inline: false },
                { name: "الأدمن المتورط", value: `الاسم: ${form.admin_name} | المعروض: ${form.admin_display} | المنصب: ${form.admin_role}`, inline: false },
                { name: "سبب الاتهام", value: form.accused, inline: false },
                { name: "سبب الاستئناف", value: form.reason, inline: false },
                { name: "لماذا يجب رفع الاستئناف", value: form.why_unappeal, inline: false },
                { name: "الصور", value: images.length > 0 ? `تم إرفاق ${images.length} صورة` : "لا توجد صور", inline: false },
              ],
              footer: { text: "Phantom Crown • استئناف" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (images.length > 0) {
        for (const image of images) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("payload_json", JSON.stringify({ content: `📎 صورة مرفقة باستئناف: **${form.nickname}**` }));
          await fetch(webhook, { method: "POST", body: formData });
        }
      }

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
          <h2 className="text-2xl font-bold text-yellow-300 mb-3">تم إرسال الاستئناف</h2>
          <p className="text-gray-400 mb-8">سيتم مراجعة استئنافك من قبل الإدارة</p>
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

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">استئناف</h1>
        <p className="text-gray-400 text-sm mb-2">قدم استئنافك ضد قرار إداري داخل السيرفر</p>
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

          <div className="bg-[#0e111d] border border-white/10 rounded-xl p-4">
            <p className="text-sm text-yellow-300 mb-4">معلومات الأدمن المتورط <span className="text-red-400">*</span></p>
            <div className="flex flex-col gap-3">
              <input
                name="admin_name"
                value={form.admin_name}
                onChange={handleChange}
                placeholder="اسم الأدمن"
                className="w-full bg-[#0b0d14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition"
              />
              <input
                name="admin_display"
                value={form.admin_display}
                onChange={handleChange}
                placeholder="الاسم المعروض"
                className="w-full bg-[#0b0d14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition"
              />
              <input
                name="admin_role"
                value={form.admin_role}
                onChange={handleChange}
                placeholder="المنصب مثال: مشرف، مدير..."
                className="w-full bg-[#0b0d14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-2">
              سبب الاتهام <span className="text-red-400">*</span>
            </label>
            <textarea
              name="accused"
              value={form.accused}
              onChange={handleChange}
              placeholder="ما هو السبب الذي اتُّهمت به..."
              rows={3}
              className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-2">
              سبب الاستئناف <span className="text-red-400">*</span>
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="اشرح سبب استئنافك بالتفصيل..."
              rows={4}
              className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-2">
              لماذا يجب رفع الاستئناف <span className="text-red-400">*</span>
            </label>
            <textarea
              name="why_unappeal"
              value={form.why_unappeal}
              onChange={handleChange}
              placeholder="اذكر الأسباب التي تجعل الاستئناف مبرراً..."
              rows={4}
              className="w-full bg-[#0e111d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-300 mb-2">
              الأدلة والصور <span className="text-gray-500 text-xs">اختياري</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full bg-[#0e111d] border border-dashed border-white/20 rounded-xl px-4 py-6 text-center cursor-pointer hover:border-yellow-500/40 transition"
            >
              <p className="text-gray-400 text-sm">اضغط لرفع صور</p>
              <p className="text-gray-600 text-xs mt-1">PNG, JPG, WEBP فقط</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImages}
              className="hidden"
            />
            {images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-20 h-20 object-cover rounded-lg border border-white/10"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-700 hover:bg-yellow-600 active:scale-95 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جاري الإرسال..." : "إرسال الاستئناف"}
          </button>

        </div>
      </section>
    </main>
  );
}