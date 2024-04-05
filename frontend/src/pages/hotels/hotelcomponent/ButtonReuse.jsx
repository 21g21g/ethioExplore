import React from 'react'

const ButtonReuse = ({text,onClick,className,type}) => {
  return (
    <button className={className} type={type} onClick={onClick}>{text}</button>
  )
}

export default ButtonReuse
