import { useQuery } from "@apollo/client"
import { GET_PRODUCTS_COLORS } from "../../lib/apollo-client/operations"
import Accordion from "../Accordion"
import { Checkbox } from "../Checkbox"
import { useStore } from "../../lib/zustand/store"

export const ColorAccordion = () => {
  const { colors, setColors } = useStore()
  const { loading, data } = useQuery(GET_PRODUCTS_COLORS)

  const handleColors = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setColors([...colors, e.currentTarget.value])
    } else {
      setColors(colors.filter((color) => color !== e.currentTarget.value))
    }
  }

  return (
    <Accordion defaultOpen title="Color">
      <div className="flex flex-col">
        {!loading &&
          data?.getProductsColors.map((color, index) => (
            <Checkbox
              value={color}
              onChange={handleColors}
              key={index}
              label={color}
              checked={colors.includes(color)}
            />
          ))}
      </div>
    </Accordion>
  )
}
