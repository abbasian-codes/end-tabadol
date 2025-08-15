import Link from "next/link"

export default function ServiceCTA() {
  return (
    <section className="text-center py-10 bg-gray-50">
      <h2 className="text-xl font-bold mb-2">بیش از ۵۰ خدمت متنوع</h2>
      <p className="mb-4">همین حالا جستجو کن و سریع سفارش بده!</p>
      <Link
        href="/services"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        مشاهده همه خدمات
      </Link>
    </section>
  )
}
