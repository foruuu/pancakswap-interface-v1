import React from 'react'
import { Currency, Percent, Price } from '@nguyenphu27/sdk'
import { Text } from '../../uikit'
import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { ONE_BIPS } from '../../constants'
import { Field } from '../../state/mint/actions'
import styled, { useTheme } from 'styled-components'

const Line = styled.div`
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  width: 1px;
`

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const theme = useTheme()

  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <Text fontSize="28px" fontWeight={800} color={theme.colors.primary}>
            {price?.toSignificant(6) ?? '-'}
          </Text>
          <Text fontSize="16px" fontWeight={400} color="text" pt={1}>
            {currencies[Field.CURRENCY_B]?.symbol} per {currencies[Field.CURRENCY_A]?.symbol}
          </Text>
        </AutoColumn>
        <Line />
        <AutoColumn justify="center">
          <Text fontSize="28px" fontWeight={800} color={theme.colors.primary}>
            {price?.invert()?.toSignificant(6) ?? '-'}
          </Text>
          <Text fontSize="16px" fontWeight={400} color="text" pt={1}>
            {currencies[Field.CURRENCY_A]?.symbol} per {currencies[Field.CURRENCY_B]?.symbol}
          </Text>
        </AutoColumn>
        <Line />
        <AutoColumn justify="center">
          <Text fontSize="28px" fontWeight={800} color={theme.colors.primary}>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </Text>
          <Text fontSize="16px" fontWeight={400} color="text" pt={1}>
            Share of Pool
          </Text>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}

export default PoolPriceBar
