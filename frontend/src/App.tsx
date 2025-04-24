import { useEffect, useState } from "react"
import { useCornStore } from "./store"
import { Button, ClientSwitch, Card, CornDataRow } from "./components"

const CLIENT_1 = { id: 'client1', label: 'Client 1' }
const CLIENT_2 = { id: 'client2', label: 'Client 2' }
const CLIENT_3 = { id: 'client3', label: 'Client 3' }

function App() {

  const { apiGetUserInfo, cornQty } = useCornStore()
  const [switchStates, setSwitchStates] = useState<boolean[]>([true, false, false])
  const [selectedClientId, setSelectedClientId] = useState<string>(CLIENT_1.id)

  const handleSwitchChange = (index: number, clientId: string) => {
    setSwitchStates(prev => {
      const newStates = prev.map((_, i) => i === index)
      return newStates
    })
    setSelectedClientId(clientId)
  }

  useEffect(() => {
    apiGetUserInfo('client1')
  }, [])

  console.log(selectedClientId)

  return (
    <div className="w-full h-full p-10">
      <section className="flex gap-5 min-h-[160px]">
        <Card className="p-7 basis-1/3 flex flex-col items-center justify-between">
          <ClientSwitch
            id={CLIENT_1.id}
            label={CLIENT_1.label}
            checked={switchStates[0]}
            onCheckedChange
            ={() => handleSwitchChange(0, CLIENT_1.id)}
          />
          <ClientSwitch
            id={CLIENT_2.id}
            label={CLIENT_2.label}
            checked={switchStates[1]}
            onCheckedChange={() => handleSwitchChange(1, CLIENT_2.id)}
          />
          <ClientSwitch
            id={CLIENT_3.id}
            label={CLIENT_3.label}
            checked={switchStates[2]}
            onCheckedChange={() => handleSwitchChange(2, CLIENT_3.id)}
          />
        </Card>
        <Card className="py-7 px-20  basis-2/3 flex flex-col items-start justify-between gap-2">
          <CornDataRow
            label="Available corn"
            value={cornQty.availableCorn}
            iconSrc="/corn_bank.png"
          />
          <CornDataRow
            label="Bought corn"
            value={cornQty.userTotalCorn}
            iconSrc="/single_corn.png"
          />
          <Button className="w-full mt-2">Buy</Button>
        </Card>
      </section>
    </div>
  )
}

export default App
