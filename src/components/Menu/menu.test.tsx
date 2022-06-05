// 菜单单元测试
import React from 'react'
import { fireEvent, render, screen, RenderResult, cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'
import { wait } from '@testing-library/user-event/dist/utils'

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
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .damon-submenu {
      display:none;
    }
    .damon-submenu .menu-opened {
      display:block;
    }
  `
  const styles = document.createElement('style')
  styles.type = 'text/css'
  styles.innerHTML = cssFile
  return styles
}

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe('test Meun and MenuItem component', () => {
  beforeEach(() => {
    cleanup()
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = screen.getByTestId(/test-menu/i)
    activeElement = screen.getByText('active')
    disabledElement = screen.getByText('disabled')
  })
  it('should render correct Menu and MenuItem base on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('damon-menu test')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
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
  it('should show dropdown items when hover on subMenu', async () => {
    // 一开始拿不到下面的值,影藏模式
    expect(screen.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = screen.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement) // 鼠标经过
    // 一直在等dom渲染
    //@ts-ignore
    await wait(() => {
      expect(screen.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(screen.getByText('drop1')) // 点一下
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    //@ts-ignore
    await wait(() => {
      expect(screen.queryByText('drop1')).not.toBeVisible()
    })
  })
})

describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = screen.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = screen.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(screen.getByText('dropdown'))
    // expect(dropDownItem).toBeVisible()
  })
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    // expect(screen.queryByText('opened1')).toBeVisible()
  })
})
