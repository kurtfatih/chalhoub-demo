import React from "react"
import { PriceAccordion } from "./ui/PriceAccordion"
import { ColorAccordion } from "./ui/ColorAccordion"
import { TagSelection } from "./ui/TagSelection"

const Sidebar = () => {
  return (
    <aside className="w-full mr-8 top-36 mb-48">
      <div className="bg-white shadow-md ">
        <div className="flex flex-col w-full">
          <ColorAccordion />
          <hr />
          <PriceAccordion />
          <hr />
          <div>
            <TagSelection />
          </div>
          <hr />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
