import { useEffect, useState } from "react"
import { useCornStore } from "./store"
import {
  Button,
  ClientSwitch,
  Card,
  CornDataRow,
  Toaster,
  useToast,
} from "./components"

const CLIENTS = {
  client1: { id: 'client1', label: 'Client 1' },
  client2: { id: 'client2', label: 'Client 2' },
  client3: { id: 'client3', label: 'Client 3' },
}

function App() {

  const {
    apiGetUserInfo,
    apiMakePurchase,
    apiMakePurchaseStatus,
    cornQty
  } = useCornStore()
  const { toast } = useToast()
  const [switchStates, setSwitchStates] = useState<boolean[]>([true, false, false])
  const [selectedClientId, setSelectedClientId] = useState<string>(CLIENTS.client1.id)
  const selectedClient = Object.values(CLIENTS).find(client => client.id === selectedClientId)

  const handleSwitchChange = (index: number, clientId: string) => {
    setSwitchStates(prev => {
      const newStates = prev.map((_, i) => i === index)
      return newStates
    })
    setSelectedClientId(clientId)
  }

  useEffect(() => {
    apiGetUserInfo(CLIENTS.client1.id)
  }, [])

  useEffect(() => {
    apiGetUserInfo(selectedClientId)
  }, [selectedClientId])

  useEffect(() => {
    if (apiMakePurchaseStatus.ERROR) {
      toast({
        variant: "destructive",
        title: `${selectedClient?.label} you're buying too quickly`,
      })
    }
  }, [apiMakePurchaseStatus.ERROR])

  useEffect(() => {
    if (apiMakePurchaseStatus.SUCCESS) {
      toast({
        variant: "success",
        title: `Thank you ${selectedClient?.label} for your purchase`,
      })
    }
  }, [apiMakePurchaseStatus.SUCCESS])

  return (
    <div className="w-full h-full p-10">
      <section className="flex gap-5 min-h-[160px]">
        <Toaster />
        <Card className="p-7 basis-1/3 flex flex-col items-center justify-between">
          {
            Object.values(CLIENTS).map((client, index) => (
              <ClientSwitch
                key={client.id}
                id={client.id}
                label={client.label}
                checked={switchStates[index]}
                onCheckedChange={() => handleSwitchChange(index, client.id)}
              />
            ))
          }
        </Card>
        <Card className="py-7 px-20 basis-2/3 flex flex-col items-start justify-between gap-2">
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
          <Button
            onClick={() => apiMakePurchase(selectedClientId)}
            className="w-full mt-2"
          >
            Buy
          </Button>
        </Card>
      </section>
    </div>
  )
}

export default App
