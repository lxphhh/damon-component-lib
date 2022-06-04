import React from 'react'
import classNames from 'classnames'
// 大小枚举
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
  Big = 'Bg',
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

type Props = Partial<BaseButtonProps>

const Button = (props: Props) => {
  const { btnType, disabled, size, children, href } = props

  // TODO: 根据不同的模式拼接样式 采用库classnames
  // btn btn-lg btn-primary
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled, // link时候disabled
  })
  // button 切换 link模式 的时候必须提供href模式
  if (btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    )
  }
  // return <div>Button</div>
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
