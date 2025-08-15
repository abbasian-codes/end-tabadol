import Link from "next/link"

export default function MoreLink() {
  return (
    <div className="text-center mt-8">
      <Link
        href="/services"
        className="inline-block text-lg text-[#666] px-5 py-2  hover:text-[#33a9dd] transition"
      >
        دیدن خدمات بیشتر »
      </Link>
    </div>
  )
}
