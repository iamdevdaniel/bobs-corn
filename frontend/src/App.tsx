import { useEffect } from "react"
import { useCornStore } from "./store"

function App() {

  const { apiGetUserInfo, cornQty } = useCornStore()

  useEffect(() => {
    apiGetUserInfo('client1')
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default App
