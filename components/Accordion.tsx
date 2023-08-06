import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/20/solid"
import { PropsWithChildren } from "react"

interface Accordion {
  defaultOpen: boolean
  title: string
}

const Accordion: React.FC<PropsWithChildren<Accordion>> = ({
  defaultOpen,
  title,
  children
}) => {
  return (
    <div className="w-full">
      <div className="w-full bg-white">
        <Disclosure defaultOpen={defaultOpen}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className="flex w-full justify-between bg-black
              px-4 py-2 text-left text-sm
              font-medium text-white
              hover:bg-white hover:text-black focus:outline-none
              focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 transition-all"
              >
                <span>{title}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-inherit`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}

export default Accordion
