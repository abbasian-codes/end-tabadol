"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function ServiceList({ onRequest, searchTerm, category }) {
  const [services, setServices] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const itemsPerPage = 6

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)
      setError(null)

      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      let query = supabase.from("services").select("*", { count: "exact" })

      if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`)
      }

      if (category && category !== "همه") {
        query = query.eq("category", category)
      }

      query = query.order("created_at", { ascending: false }).range(from, to)

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        setError(fetchError.message)
        setServices([])
        setTotalCount(0)
      } else {
        setServices(data ?? [])
        setTotalCount(count ?? 0)
      }

      setLoading(false)
    }

    fetchServices()
  }, [searchTerm, category, currentPage])

  // ریست صفحه به 1 هنگام تغییر فیلتر یا جستجو
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, category])

  // اسکرول به بالا هنگام تغییر صفحه
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <section className="p-4 pt-20 max-w-5xl mx-auto">
      {/* لینک ثبت پیشنهاد جدید */}
      <div className="mb-6 text-right">
        <Link href="/create-service" className="btn btn-primary">
          ثبت پیشنهاد جدید
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        {searchTerm
          ? `نتایج جستجوی شما برای "${searchTerm}"`
          : "آخرین پیشنهادها"}
      </h2>

      {loading && (
        <p className="text-center mt-10 text-gray-500">در حال بارگذاری...</p>
      )}

      {error && (
        <p className="text-center mt-10 text-red-500">
          خطا در دریافت داده‌ها: {error}
        </p>
      )}

      {!loading && !error && services.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          هیچ نتیجه‌ای یافت نشد.
        </p>
      )}

      {!loading && !error && services.length > 0 && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="border rounded p-4 shadow hover:shadow-md transition cursor-pointer"
                onClick={() => onRequest(service.id)}
              >
                <h3 className="font-bold text-lg">{service.title}</h3>
                <p className="text-sm my-2">{service.description}</p>
                <p className="text-sky-600 font-semibold">
                  {service.price} تومان
                </p>
                <button
                  className="text-xs underline mt-2 cursor-pointer hover:text-sky-800"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRequest(service.id)
                  }}
                >
                  درخواست
                </button>
              </div>
            ))}
          </div>

          {/* صفحه‌بندی */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                قبلی
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={
                  currentPage === totalPages || services.length < itemsPerPage
                }
                className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                بعدی
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
