import React from 'react'
import ReactDom from 'react-dom'
import { ZeitProvider, CssBaseline } from '@cfxjs/react-ui'
import Home from './home'

const App = () => {
  return (
    <ZeitProvider>
      <CssBaseline />
      <Home />
    </ZeitProvider>
  )
}

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
)

export default App
