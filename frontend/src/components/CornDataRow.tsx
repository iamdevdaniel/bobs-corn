import { FC } from "react"

type CornDataRowProps = {
  label: string
  value: string | number
  iconSrc: string
}

export const CornDataRow: FC<CornDataRowProps> = ({ label, value, iconSrc }) => {
  return (
    <div className="grid grid-cols-[40px_auto_auto] items-center w-full">
      <img src={iconSrc} alt={`${label} icon`} className="h-[30px]" />
      <p className="pl-5 font-medium text-lg tracking-wide text-gray-500">{label}</p>
      <p className="text-right">{value}</p>
    </div>
  )
}
