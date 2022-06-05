import React, { createContext, useState } from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void

export interface BaseMenuProps {
  defaultIndex: number
  className: string
  mode: MenuMode
  style: React.CSSProperties // react css类型
  children: React.ReactNode
  onSelect: SelectCallback
}

interface MyMenuContext {
  index: number
  onSelect?: SelectCallback
}

export type MenuProps = Partial<BaseMenuProps>

// 创建上下文
export const MenuContext = createContext<MyMenuContext>({
  index: 0,
})
const Menu = (props: MenuProps) => {
  const { children, defaultIndex, className, mode, style, onSelect, ...restProps } = props
  // 状态保存
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const classes = classNames('damon-menu', className, {
    'menu-vertical': mode === 'vertical',
  })
  // 点击事件
  const handleClick = (index: number) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: MyMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'vertical',
}

export default Menu
