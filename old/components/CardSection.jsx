import Cart from "./Cart"
import MoreLink from "./MoreLink"

export default function CardsSection() {
  return (
    <div className="w-full flex flex-col bg-[#f5f5f5] justify-center py-6">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="text-3xl font-bold mb-5 text-center mt-8">
          متخصصین پیشنهادی
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1200px] px-4">
          {[...Array(8)].map((_, i) => (
            <Cart key={i} />
          ))}
        </div>
      </div>
      <MoreLink />
    </div>
  )
}
