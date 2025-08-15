import { useEffect, useState } from "react"

export default function ServiceListSection() {
  const [services, setservices] = useState([])
  const [q, setQ] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    const params = new URLSearchParams({ q, category })
    fetch(`/api/services?${params}`)
      .then((r) => r.json())
      .then((d) => setservices(d.services || []))
  }, [q, category])

  return (
    <section className="py-10 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">خدمات پیشنهادی</h2>

      {/* سرچ و فیلتر */}
      <div className="flex gap-4 mb-6">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="جستجو در عنوان خدمت..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">همه دسته‌ها</option>
          <option value="آموزش">آموزش</option>
          <option value="طراحی">طراحی</option>
          <option value="برنامه‌نویسی">برنامه‌نویسی</option>
          <option value="ترجمه">ترجمه</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>

      {/* لیست کارت‌ها */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((o) => (
          <div
            key={o.id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold mb-1">{o.title}</h3>
            <p className="text-sm text-gray-600 mb-1">{o.category}</p>
            <p className="text-sm text-gray-800 font-medium">
              {o.price?.toLocaleString()} تومان
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(o.created_at).toLocaleDateString("fa-IR")}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
