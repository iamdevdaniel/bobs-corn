import { useEffect } from "react"
import { useCornStore } from "./store"

function App() {

  const { apiGetUserInfo, cornQty } = useCornStore()

  useEffect(() => {
    apiGetUserInfo('client1')
  }, [])

  return (
    <div>
      <div className="bg-red-500">BRMC</div>
    </div>
  )
}

export default App
