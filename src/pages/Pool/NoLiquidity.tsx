import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Text } from '../../uikit'
import { withRouter, useHistory } from 'react-router-dom'

interface OwnProps {
  TranslateString: any
}

type Props = OwnProps

const NoLiquidityWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SwapIcon = styled.img`
  height: 110px;
  width: 60px;
  margin-right: 30px;
`
const TextWrap = styled.div`
  height: 100px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
`

const LinkButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 47px;
  padding: 0 10px;
  border-radius: 7px;
  border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  color: ${({ theme }) => `${theme.colors.primary}`};
`

const NoLiquidity: FunctionComponent<Props> = ({ TranslateString }) => {
  const history = useHistory()
  return (
    <NoLiquidityWrap>
      <SwapIcon src={require('../../assets/images/cup.svg').default} />
      <TextWrap>
        <Text color="textDisabled" textAlign="center">
          {TranslateString(104, 'No liquidity found.')}
        </Text>
        <Text color="textDisabled" fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
          {TranslateString(106, "Don't see a pool you joined?")}
        </Text>
        <LinkButton
          onClick={() => {
            history.push('/find')
          }}
        >
          {TranslateString(106, 'Find Other LP tokens')}
        </LinkButton>
      </TextWrap>
    </NoLiquidityWrap>
  )
}

export default withRouter<any, any>(NoLiquidity)
