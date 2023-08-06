import { useState } from "react"
import Selection from "../Selection"
import { useStore } from "../../lib/zustand/store"
import { tags } from "../../constants"

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
