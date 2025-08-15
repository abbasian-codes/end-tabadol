import Image from "next/image"
import Link from "next/link"
import { Star, StarHalf } from "lucide-react"

export default function Cart() {
  return (
    <div className="relative group w-[230px] h-[230px] rounded-md overflow-hidden shadow-lg bg-white">
      <div className="relative w-full h-[173px] overflow-hidden">
        <Image
          src="/images/medium2.jpg"
          alt="تصویر زمینه خدمات"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-2 left-2 z-20 flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full border-2 border-white bg-cover bg-center"
            style={{ backgroundImage: "url('/images/avatar2.jpg')" }}
          />
        </div>
        <div className="absolute bottom-4 right-2 z-20 flex gap-1">
          <Image src="/images/badge1.svg" alt="badge" width={24} height={24} />
          <Image src="/images/badge2.svg" alt="badge" width={24} height={24} />
          <Image src="/images/badge3.svg" alt="badge" width={24} height={24} />
          <Image src="/images/badge4.svg" alt="badge" width={24} height={24} />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity z-30 p-3 flex flex-col justify-end">
          <p className="text-white text-xl italic mb-3 h-[6rem]">
            من عاشق کمک به دیگران و اشتراک‌گذاری دانشم هستم...
          </p>
          <p className="text-white font-bold">مهسا کریمی</p>
          <div className="flex items-center text-yellow-400 text-xs mt-1">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400" />
            ))}
            <StarHalf className="w-4 h-4 fill-yellow-400" />
            <span className="mr-3 bg-white text-black rounded-full px-1.5 text-xs ">
              48
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-2 z-10">
        <h4 className="text-sm font-semibold truncate">طراح سایت</h4>
        <p className="text-xs text-gray-600 truncate">
          مجازی ● 75 TK جلسه‌ای ● 18 کامنت
        </p>
      </div>

      <Link
        href="/mahsa-karimi/web-designer"
        className="absolute inset-0 z-40"
      />
    </div>
  )
}
