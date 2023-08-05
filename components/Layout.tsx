import { ViewColumnsIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { useStore } from "../lib/zustand/store"
import { useCallback } from "react"

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { columnCount, setColumnCount } = useStore()

  const handleChangeColumnCount = useCallback(() => {
    const number = (columnCount % 3) + 1

    setColumnCount(number)
  }, [columnCount])

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed z-50 w-full bg-white p-10 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl text-black font-semibold cursor-pointer transform transition hover:scale-105">
              Your Store
            </h1>
          </Link>

          <div
            onClick={handleChangeColumnCount}
            className="cursor-pointer transform transition hover:scale-105 flex flex-row"
          >
            <ViewColumnsIcon color="black" className="h-6" />
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  )
}
