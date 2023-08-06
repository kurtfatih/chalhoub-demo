import * as React from "react"

interface CheckboxPropsI {
  label: string
  value: any
  onChange: React.ChangeEventHandler<HTMLInputElement>
  defaultChecked?: boolean
}

export const Checkbox: React.FC<CheckboxPropsI> = ({
  label,
  value,
  onChange,
  defaultChecked
}) => {
  return (
    <div className="flex items-center mb-4">
      <input
        data-testid={`${label}-checkbox`}
        id={`${label}-checkbox`}
        type="checkbox"
        value={value}
        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={`${label}-checkbox`}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  )
}
