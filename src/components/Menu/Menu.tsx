import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { BaseMenuItem } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface BaseMenuProps {
  defaultIndex: string
  className: string
  mode: MenuMode
  style: React.CSSProperties // react css类型
  children: React.ReactNode
  onSelect: SelectCallback
  defaultOpenSubMenu?: string[] // 默认展开项
}

interface MyMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenu?: string[] // 默认展开项
}

export type MenuProps = Partial<BaseMenuProps>

// 创建上下文
export const MenuContext = createContext<MyMenuContext>({
  index: '0',
})
const Menu = (props: MenuProps) => {
  const {
    children,
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    defaultOpenSubMenu,
    ...restProps
  } = props
  // 状态保存
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const classes = classNames('damon-menu', className, {
    'menu-vertical': mode === 'vertical',
  })
  // 点击事件
  const handleClick = (index: string) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: MyMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenu, // 默认展开项
  }
  // 对子元素类型加以限制
  const renderChirdremInMenuItem = () => {
    return React.Children.map(children, (child, index) => {
      // 子元素类型收窄
      const chirdElement = child as React.FunctionComponentElement<BaseMenuItem>
      const { displayName } = chirdElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // react给后面的子元素追加属性
        return React.cloneElement(chirdElement, { index: `${index}` })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChirdremInMenuItem()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenu: [],
}

export default Menu
