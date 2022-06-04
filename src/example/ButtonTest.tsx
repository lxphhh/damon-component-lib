import React from 'react'
import Button from '../components/Button/Button'

type Props = {}

const ButtonTest = (props: Props) => {
  return (
    <div>
      <Button style={{ color: 'red' }}>hello</Button>
      <Button size="sm">Small</Button>
      <Button size="radio">Radio</Button>
      <Button disabled>disabled</Button>
      <Button btnType="primary" size="lg">
        Primary
      </Button>
      <Button btnType="danger" size="lg">
        Primary
      </Button>
      <Button disabled btnType="link" href="https://www.baidu.com/">
        Link
      </Button>
      <Button btnType="link" target="_blank" href="https://www.baidu.com/">
        Link
      </Button>
    </div>
  )
}

export default ButtonTest
