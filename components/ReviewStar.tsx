import { useMemo } from "react"
import { StarsIcon } from "./icons/Stars"

interface ReviewStars {
  count: number
  rate: number
  size?: "xl" | "sm"
}

const ReviewStars: React.FC<ReviewStars> = ({ count, rate, size = "sm" }) => {
  const filledRate = useMemo(() => Math.floor(rate), [rate])
  const emptyRate = useMemo(() => 5 - filledRate, [filledRate])

  return (
    <div className="flex items-center mt-2.5 mb-5">
      <StarsIcon emptyRate={emptyRate} filledRate={filledRate} size={size} />
      <span
        className={`bg-brand-red-100 text-black text-${
          size === "xl" ? "md" : "sm"
        } font-semibold mr-2 px-2.5 py-0.5 rounded ml-3`}
      >
        {count}
      </span>
    </div>
  )
}

export default ReviewStars
