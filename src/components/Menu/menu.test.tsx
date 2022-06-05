// 菜单单元测试
import React from 'react'
import { fireEvent, render, screen, RenderResult, cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'

// 测试Menu
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

// vertical
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe('test Meun and MenuItem component', () => {
  beforeEach(() => {
    cleanup()
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = render(generateMenu(testProps))
    menuElement = screen.getByTestId(/test-menu/i)
    activeElement = screen.getByText('active')
    disabledElement = screen.getByText('disabled')
  })
  it('should render correct Menu and MenuItem base on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('damon-menu test')
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    /**
     * 1. 点击第三个元素
     * "2". 存在is-active 原先不存在is-active
     * 3. 函数被调用"2"次,第一次在初始化的时候
     */
    const thirdElement = screen.getByText('xyz')
    fireEvent.click(thirdElement)
    expect(thirdElement).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
  })
  it('test Menu and MenuItem component in vertical mode', () => {
    // 生成垂直模式的
    cleanup()
    wrapper = render(generateMenu(testVerProps))
    menuElement = screen.getByTestId(/test-menu/i)
    expect(menuElement).toHaveClass('menu-vertical')
  })
})
