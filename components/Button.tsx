import Link from "next/link"

interface LinkButton {
  href: string
  title: string
}

export const LinkButton: React.FC<LinkButton> = ({ href, title }) => {
  return (
    <Link passHref className="w-full" href={href}>
      <button
        className="w-full text-white bg-black transition-all
      hover:bg-brand-red focus:ring-4
      focus:outline-none focus:ring-blue-300
      font-medium text-sm px-5 py-2.5
      text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {title}
      </button>
    </Link>
  )
}
