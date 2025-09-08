import { useEffect } from 'react'
import axios from './util/axios.customize'


function App() {

  useEffect(() => {
    const helloWorld = async () => {
      const res = await axios.get(`/`);
      console.log(">>> check res:", res)
    }
    helloWorld()
  }, [])

  return (
    <>Hello Word</>
  )
}

export default App
