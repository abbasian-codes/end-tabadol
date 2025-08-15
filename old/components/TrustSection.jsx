import Image from "next/image"
import Link from "next/link"
import IconCircleDiagram from "./IconCircleDiagram"

export default function TrustSection() {
  return (
    <div className="bg-[#f5f5f5]">
      <div className="bg-[#f5f5f5] relative md:w-2/3 mx-auto text-center md:text-left py-12 px-4 mt-4">
        {/* آیکون مثلث بالا چپ */}
        <div className="flex flex-col justify-between">
          <div className="absolute top-0 left-0 mt-16 ml-6 z-10">
            <IconCircleDiagram />
          </div>

          {/* بخش بالا */}
          <div className="w-1/2">
            <div className="flex flex-col max-w-2xl mx-auto mb-20">
              <div className="flex flex-col ">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 font-vazir">
                  با اطمینان با هم تبادل کنید
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 ">
                  روشهای معرفی اعضا و اعتبار سنجی اشان{" "}
                  <span className="text-blue-500"></span> اعضای دیگر با امتیاز
                  دهی و کامنتهای دقیق خودشان به اعضای دیگر آنها را معرفی می
                  کنند،
                  <span className="text-blue-500">
                    {" "}
                    هر کاری که تبادل میشود از صفر تا صد تعریف میشود و بر مبنای
                    آن امتیازات داده میشود و تا کار تمام نشود امتیاز بلوکه شده
                    آزاد نمیشود{" "}
                  </span>
                </p>
                <Link
                  href="#"
                  className="text-blue-500 hover:underline text-sm"
                >
                  ▶ Watch our “Hey, Simbi” video
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* بخش پایین */}
        <div className=" mx-auto flex flex-col md:flex-row items-center gap-8 mt-5">
          {/* تصویر پروفایل */}
          <div className="relative  mx-auto md:mx-0">
            <Image
              src="/images/community-trust-m1.jpg"
              alt="User"
              width={750}
              height={350}
              className="object-contain"
            />
          </div>

          {/* متن و آیکون‌ها */}
          <div className="text-center md:text-left">
            {/* <div className="flex justify-center md:justify-start items-center gap-2 mb-2">
            <span className="text-blue-500 text-xl">🛡️</span>
            <span className="text-gray-700">🌐</span>
            <span className="text-gray-700">🔗</span>
            <span className="text-yellow-500 text-lg">★★★★★</span>
          </div> */}
            <h3 className="text-xl font-semibold mb-2">
              جامعه‌ای که می‌توانید به آن اعتماد کنید
            </h3>
            <p className="text-gray-600 mb-2">
              همه اعضا با اتصال شبکه‌های اجتماعی خود و تأیید اطلاعات شخصی و
              حرفه‌ای خود، شناسه‌های خود را تأیید می‌کنند. بررسی‌ها و توصیه‌ها
              بیشتر تضمین می‌کنند که با کسی سروکار دارید که می‌توانید به او
              اعتماد کنید.
            </p>
            <Link href="#" className="text-blue-500 hover:underline text-sm">
              📘 Read member testimonials
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
