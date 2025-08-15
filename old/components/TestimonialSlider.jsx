"use client"
import { useState } from "react"
import Image from "next/image"

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      title: "اقتصادی برای افرادی مثل من",
      content: [
        "با سیمبی می‌توانم به خدماتی دسترسی پیدا کنم که در شرایط عادی توانایی پرداخت آن‌ها را نداشتم. به همه خدماتی فکر کنید که دوست دارید دریافت کنید.",
        "بیشتر درآمد من صرف اجاره خانه و هزینه‌های ضروری زندگی می‌شود، اما با سیمبی می‌توانم از توانایی‌هایم برای دریافت خدمات ویژه استفاده کنم.",
      ],
      author: "دانیالا، مربی کسب‌وکار و مشاور سفر",
      image: "/images/daniela.jpg",
    },
    {
      id: 2,
      title: "تجربه ای فوق العاده",
      content: [
        "سیمبی زندگی من را متحول کرده است. حالا می‌توانم مهارت‌هایم را با دیگران به اشتراک بگذارم و در عوض خدمات مورد نیازم را دریافت کنم.",
        "این سیستم به من کمک کرده کسب‌وکار کوچکم را رشد دهم و در عین حال زندگی بهتری داشته باشم.",
      ],
      author: "محمد، طراح گرافیک",
      image: "/images/frank.jpg",
    },
    {
      id: 3,
      title: "نظرات کوتاه کاربران",
      content: [
        {
          message:
            "سیمبی بهم کمک کرد که بدون خرج پول، کار گرافیکی برای پیجم انجام بدم!",
          author: "سارا",
          avatar: "/images/daniela.jpg",
        },
        {
          message:
            "با مهارت ترجمه‌م تونستم خدمات روان‌شناسی بگیرم، باورم نمیشه!",
          author: "مریم",
          avatar: "/images/greta.jpg",
        },
        {
          message: "خیلی تجربه انسانی و زیباییه، حس می‌کنی واقعا ارزشمندی.",
          author: "لیلا",
          avatar: "/images/avatar2.jpg",
        },
      ],
      isMultiple: true,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const current = testimonials[currentSlide]

  return (
    <div className="relative max-w-4xl mx-auto my-8 mb-30 min-h-[420px]">
      <div
        className={`flex flex-col md:flex-row mt-20 ${
          currentSlide === 1 ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* تصویر برای حالت تک‌نفره */}
        {!current.isMultiple && (
          <div className="md:w-2/5 relative h-64 md:h-auto">
            <Image
              src={current.image}
              alt={current.author}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              width={420}
              height={487}
            />
            {/* مثلث سفید در کنار تصویر */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                currentSlide === 0
                  ? "left-0"
                  : currentSlide === 1
                  ? "right-0 rotate-180"
                  : "hidden"
              }`}
              style={{
                width: 0,
                height: 0,
                borderTop: "20px solid transparent",
                borderBottom: "20px solid transparent",
                borderLeft: "20px solid white",
                zIndex: 50,
              }}
            />
          </div>
        )}

        {/* بخش متنی */}
        <div
          className={`p-6 md:p-8 text-right ${
            current.isMultiple ? "w-full" : "md:w-3/5"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {current.title}
          </h2>
          {current.isMultiple ? (
            <div className="space-y-6">
              {current.content.map((item, i) => (
                <div key={i} className="flex items-start gap-4 border-t pt-4">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      fill
                      className="rounded-full object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-1">
                      {item.message}
                    </p>
                    <p className="text-sm text-gray-500">{item.author}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            current.content.map((para, i) => (
              <p key={i} className="text-gray-600 mb-4 leading-relaxed">
                {para}
              </p>
            ))
          )}
          {!current.isMultiple && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="font-medium text-gray-700">{current.author}</p>
            </div>
          )}
        </div>
      </div>

      {/* دکمه قبلی */}
      <button
        onClick={prevSlide}
        className="absolute -right-20 top-1/2 transform -translate-y-1/2 text-gray-300 text-3xl font-bold rounded-full w-21 h-60 z-50"
        aria-label="قبلی"
      >
        ❮
      </button>

      {/* دکمه بعدی */}
      <button
        onClick={nextSlide}
        className="absolute -left-20 top-1/2 transform -translate-y-1/2 text-gray-300 text-3xl font-bold rounded-full w-21 h-60 z-50"
        aria-label="بعدی"
      >
        ❯
      </button>
    </div>
  )
}

export default TestimonialSlider
