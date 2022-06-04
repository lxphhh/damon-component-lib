// 按钮单元测试
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './Button'

const defaultProps = {
  onClick: jest.fn(),
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass',
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Button Component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Nice</Button>)
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument() // 成为dom元素
    // 判断是否为Button
    expect(element.tagName).toEqual('BUTTON')
    expect(element.disabled).toBeFalsy()
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Nice</Button>)
    const element = screen.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass') // css
  })
  it('should render a link when btnType equals link and href is provided', () => {
    render(
      <Button btnType="link" href="https://www.baidu.com/">
        Nice
      </Button>
    )
    const element = screen.getByText('Nice')
    expect(element.tagName).toEqual('A')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-link') // css
  })
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Nice</Button>)
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy() // 有这个属性
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled() // 这个函数没有被你触发
  })
})
