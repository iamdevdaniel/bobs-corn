import { useEffect, useState } from "react"
import { useCornStore } from "./store"
import { Button, ClientSwitch, Card } from "./components"

const CLIENT_ID_1 = 'client1'
const CLIENT_ID_2 = 'client2'
const CLIENT_ID_3 = 'client3'

function App() {

  const { apiGetUserInfo } = useCornStore()
  const [switchStates, setSwitchStates] = useState<boolean[]>([true, false, false])
  const [selectedClientId, setSelectedClientId] = useState<string>(CLIENT_ID_1)

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
      <Card className="p-5 inline-block">
        <ClientSwitch
            id={CLIENT_ID_1}
            label="Client 1"
            checked={switchStates[0]}
            onCheckedChange={() => handleSwitchChange(0, CLIENT_ID_1)}
          />
          <ClientSwitch
            id={CLIENT_ID_2}
            label="Client 2"
            checked={switchStates[1]}
            onCheckedChange={() => handleSwitchChange(1, CLIENT_ID_2)}
          />
          <ClientSwitch
            id={CLIENT_ID_3}
            label="Client 3"
            checked={switchStates[2]}
            onCheckedChange={() => handleSwitchChange(2, CLIENT_ID_3)}
          />
      </Card>
    </div>
  )
}

export default App
