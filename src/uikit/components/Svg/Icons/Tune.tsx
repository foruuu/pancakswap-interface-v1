import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'
import styled from 'styled-components'

const swapIconSource = require('../../../../assets/images/menu/set.svg').default

const SwapIcon = styled.img`
  width: 35px;
  height: 35px;
`

const Icon: React.FC<SvgProps> = (props) => {
  return <SwapIcon src={swapIconSource} />
}

export default Icon
