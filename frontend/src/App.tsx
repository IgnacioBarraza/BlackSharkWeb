import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import request from './requests/handleBackendRequests'

function App() {
  const [backendData, setBackendData] = useState('')

  const getBackendData = async () => {
    const data = await request.getData()
    setBackendData(data)
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {
        backendData === '' ? <h1>React + Vite</h1> : <h1>{backendData}</h1>
      }
      <div className="card">
        <button onClick={getBackendData}>
          Get backend data
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
