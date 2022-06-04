import React from 'react'
// import './App.css'
import Button, { ButtonSize, ButtonType } from './components/Button/Button'

function App() {
  return (
    <div className="App">
      <Button style={{ color: 'red' }}>hello</Button>
      <Button size={ButtonSize.Small}>Small</Button>
      <Button size={ButtonSize.Radio}>Radio</Button>
      <Button disabled>disabled</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Primary
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
        Primary
      </Button>
      <Button disabled btnType={ButtonType.Link} href="https://www.baidu.com/">
        Link
      </Button>
      <Button btnType={ButtonType.Link} target="_blank" href="https://www.baidu.com/">
        Link
      </Button>
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
