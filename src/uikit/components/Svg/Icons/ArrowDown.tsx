import React from 'react'
import { SvgProps } from '../types'
import styled from 'styled-components'

const swapIconSource = require('../../../../assets/images/menu/swap.svg').default

const SwapIcon = styled.img`
  width: 35px;
  height: 35px;
`

const Icon: React.FC<SvgProps> = (props) => {
  return <SwapIcon src={swapIconSource} />
}

export default Icon
