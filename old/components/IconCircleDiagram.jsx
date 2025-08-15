// components/IconCircleDiagram.js
import Image from "next/image"

export default function IconCircleDiagram() {
  return (
    <div className="relative w-[190px] h-[190px] mx-auto">
      {/* دایره نقطه‌چین زمینه (با استفاده از حلقه SVG یا تصویر پس‌زمینه) */}
      <div className="absolute inset-0 rounded-full border-5 border-dashed border-gray-300" />

      {/* آیکون بالا */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border-4 border-gray-300 shadow-md">
        <Image
          src="/images/wellness.svg"
          alt="Credits"
          width={82}
          height={82}
        />
      </div>

      {/* آیکون راست پایین */}
      <div className="absolute bottom-4 left-35 flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border-4 border-gray-300 shadow-md">
        <Image src="/images/camera.svg" alt="Camera" width={82} height={82} />
      </div>

      {/* آیکون چپ پایین */}
      <div className="absolute bottom-4 right-35 flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border-4 border-gray-300 shadow-md">
        <Image src="/images/laptop.svg" alt="Fitness" width={82} height={82} />
      </div>
    </div>
  )
}
