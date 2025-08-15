"use client"

import React from "react"

export default function HeroBanner() {
  return (
    <section className="relative bg-[#009CDE] text-white py-16 text-center overflow-hidden">
      {/* زمینه نقطه‌ای */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-30" />

      <div className="relative z-10 max-w-xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          مشتریان بیشتری داشته باشید و نیازهایتان را بدون پول برآورده کنید
        </h1>
        <p className="italic text-white/90 mb-6">
          در جامعه تبادل کارا شما میتوانید هر خدماتی را که بخواهید استفاده کنید
          بدون دادن پول
        </p>
        <button className="bg-white text-[#009CDE] font-semibold px-6 py-2 rounded shadow hover:bg-gray-100 transition">
          همین حالا به ما بپیوندید
        </button>
      </div>
    </section>
  )
}
