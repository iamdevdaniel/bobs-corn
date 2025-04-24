import { useEffect } from "react"
import { useCornStore } from "./store"
import { Button } from "./components"

function App() {

  const { apiGetUserInfo, cornQty } = useCornStore()

  useEffect(() => {
    apiGetUserInfo('client1')
  }, [])

  return (
    <div className="bg-transparent">
      <div className="bg-red-500">BRMC</div>
      <Button>QOTSA</Button>
    </div>
  )
}

export default App
