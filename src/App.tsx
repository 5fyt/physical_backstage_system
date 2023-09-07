import React, { Suspense } from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import routes from '@/router/index'
function App() {
  return (
    <div className="App">
      <Suspense fallback="loading...">
        <div className="app"> {useRoutes(routes)}</div>
      </Suspense>
    </div>
  )
}

export default App
