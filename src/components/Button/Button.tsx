import React from 'react'
import classNames from 'classnames'
import { type } from 'os'

// 大小枚举
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
  Big = 'Bg',
  Radio = 'rd', // 胶囊模式
}

// 类型枚举
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  className: string // class
  disabled: boolean // 显示影藏
  size: ButtonSize
  btnType: ButtonType
  children: React.ReactNode
  href: string
}
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<BaseButtonProps & NativeButtonProps & AnchorButtonProps>

const Button = (props: ButtonProps) => {
  const { className, btnType, disabled, size, children, href, ...restProps } = props

  // 根据不同的模式拼接样式 采用库classnames
  // btn btn-lg btn-primary className(用户自定义)
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled, // link时候disabled
  })
  // button 切换 link模式 的时候必须提供href模式
  if (btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
  // return <div>Button</div>
}

// 默认Props
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
