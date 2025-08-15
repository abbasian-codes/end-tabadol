// import Image from "next/image"
// import Link from "next/link"
// import { Star, StarHalf } from "lucide-react"

// export default function ServiceCard({ offer, profile }) {
//   return (
//     <div className="relative group w-[230px] h-[230px] rounded-md overflow-hidden shadow-lg bg-white">
//       {/* تصویر سرویس */}
//       <div className="relative w-full h-[173px] overflow-hidden">
//         <Image
//           src={offer.image_url || "/images/medium2.jpg"}
//           alt={offer.title}
//           fill
//           className="object-cover"
//         />

//         {/* آواتار کاربر */}
//         <div
//           className="absolute bottom-2 left-2 w-10 h-10 rounded-full border-2 border-white bg-cover bg-center"
//           style={{
//             backgroundImage: `url(${
//               profile?.avatar_url || "/images/avatar2.jpg"
//             })`,
//           }}
//         />

//         {/* بَج‌ها (موقتاً ثابت) */}
//         <div className="absolute bottom-4 right-2 flex gap-1">
//           <Image src="/images/badge1.svg" alt="badge" width={24} height={24} />
//         </div>

//         {/* Overlay هاور */}
//         <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity z-30 p-3 flex flex-col justify-end">
//           <p className="text-white text-sm italic mb-2 line-clamp-3">
//             {profile?.bio || "من عاشق کمک به دیگران هستم..."}
//           </p>
//           <p className="text-white font-bold">
//             {profile?.full_name || "کاربر"}
//           </p>
//           <div className="flex items-center text-yellow-400 text-xs mt-1">
//             {[...Array(4)].map((_, i) => (
//               <Star key={i} className="w-4 h-4 fill-current" />
//             ))}
//             <StarHalf className="w-4 h-4 fill-current" />
//             <span className="mr-2 bg-white text-black rounded-full px-1.5 text-xs">
//               48
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* عنوان و قیمت */}
//       <div className="absolute bottom-0 left-0 w-full bg-white/90 p-2">
//         <h4 className="text-sm font-semibold truncate">{offer.title}</h4>
//         <p className="text-xs text-gray-600 truncate">
//           {offer.category} ● {offer.price?.toLocaleString()} تومان
//         </p>
//       </div>

//       {/* لینک به پروفایل کاربر */}
//       <Link
//         className="absolute inset-0 z-40"
//         href={`/profile/${offer.user_id}`}
//         passHref
//       ></Link>
//     </div>
//   )
// }

import Image from "next/image"
import Link from "next/link"
import { Star, StarHalf } from "lucide-react"

export default function ServiceCard({ offer, profile }) {
  //   if (!profile) return null

  return (
    <Link
      className="block w-[230px] h-[230px] rounded-md overflow-hidden shadow-lg bg-white group relative"
      href={`/profile/${offer.user_id}`}
      passHref
    >
      {/* تصویر سرویس */}
      <div className="relative w-full h-[173px]">
        <Image
          src={offer.image_url || "/images/medium2.jpg"}
          alt={offer.title}
          fill
          className="object-cover"
        />

        {/* آواتار واقعی */}
        {/* <div className="absolute bottom-2 left-2 w-10 h-10 rounded-full border-2 border-white overflow-hidden">
            <Image
              src={profile.avatar_url}
              alt={profile.full_name}
              fill
              className="object-cover"
            />
          </div> */}
        {/* آواتار کاربر */}
        <div
          className="absolute bottom-2 left-2 w-10 h-10 rounded-full border-2 border-white bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              profile?.avatar_url || "/images/avatar2.jpg"
            })`,
          }}
        />

        {/* بَج‌ها */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          {/* {profile.badges?.slice(0, 3)?.map((b, i) => */}
          {profile?.badges?.length > 0 &&
            profile.badges
              .slice(0, 3)
              .map((b, i) => (
                <img
                  key={i}
                  src={`/images/badge${i + 1}.svg`}
                  alt={b}
                  width={24}
                  height={24}
                />
              ))}
        </div>

        {/* Overlay هاور */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity z-10 p-3 flex flex-col justify-end">
          <p className="text-white text-sm italic mb-1 line-clamp-3">
            {/* {profile.slogan} */}
            {profile?.slogan || "توضیحاتی ثبت نشده..."}
          </p>
          <p className="text-white font-bold">
            {profile?.full_name || "کاربر"}
          </p>
          <div className="flex items-center text-yellow-400 text-xs mt-1">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <StarHalf className="w-4 h-4 fill-current" />
            <span className="mr-2 bg-white text-black rounded-full px-1.5 text-xs">
              {profile?.review_count || 0}
            </span>
          </div>
        </div>
      </div>

      {/* عنوان و قیمت */}
      <div className="absolute bottom-0 left-0 w-full bg-white/90 p-2">
        <h4 className="text-sm font-semibold truncate">{offer.title}</h4>
        <p className="text-xs text-gray-600 truncate">
          {offer.category} ● {offer.price?.toLocaleString()} تومان
        </p>
      </div>
    </Link>
  )
}
