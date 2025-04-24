import { FC } from "react"
import { Switch, Label } from "../components"

type ClientSwitchProps = {
  id: string
  label: string
  checked: boolean
  onCheckedChange: () => void
}

export const ClientSwitch: FC<ClientSwitchProps> = ({
  id,
  label,
  checked,
  onCheckedChange
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}
