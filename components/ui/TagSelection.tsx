import { useState } from "react"
import Selection from "../Selection"
import { useStore } from "../../lib/zustand/store"

export const TagSelection: React.FC = () => {
  const [selected, setSelected] = useState(tags[0])
  const { setTag } = useStore()

  const handleOnTagChange = ({
    value,
    label
  }: {
    value: string
    label: string
  }) => {
    setSelected({ value, label })
    setTag(value)
  }

  return (
    <Selection
      onChange={handleOnTagChange}
      selected={selected}
      options={tags}
    />
  )
}

const tags = [
  { label: "No tag selected...", value: "" },
  { label: "Recommended", value: "Recommended" },
  { label: "New", value: "New" },
  { label: "Cheapest", value: "Cheapest" }
]
