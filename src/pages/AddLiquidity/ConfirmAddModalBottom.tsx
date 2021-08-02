import { Currency, CurrencyAmount, Fraction, Percent } from '@nguyenphu27/sdk'
import React from 'react'
import { Button, Text } from '../../uikit'
import { TranslateString } from 'utils/translateTextHelpers'
import { RowBetween, RowFixed } from '../../components/Row'
import CurrencyLogo from '../../components/CurrencyLogo'
import { Field } from '../../state/mint/actions'
import { SwapButton } from '../../components/Button'
import { ThroughLine } from '../Swap'

export function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  return (
    <>
      <RowBetween align="center">
        <Text>{currencies[Field.CURRENCY_A]?.symbol} Deposited</Text>
        <RowFixed style={{ alignItems: 'center' }}>
          <CurrencyLogo size="36px" currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <Text fontWeight={500} fontSize="18px">
            {parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}
          </Text>
        </RowFixed>
      </RowBetween>
      <ThroughLine style={{ position: 'relative', padding: 0, width: '100%', left: 0, margin: '5px 0' }} />
      <RowBetween>
        <Text>{currencies[Field.CURRENCY_B]?.symbol} Deposited</Text>
        <RowFixed>
          <CurrencyLogo size="36px" currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <Text fontWeight={500} fontSize="18px">
            {parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>Rates</Text>
        <Text color="#979797">
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Text color="#979797">
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween>
        <Text>Share of Pool:</Text>
        <Text fontWeight={500}>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Text>
      </RowBetween>
      <SwapButton mt="20px" onClick={onAdd}>
        {noLiquidity ? 'Create Pool & Supply' : 'Confirm Supply'}
      </SwapButton>
    </>
  )
}

export default ConfirmAddModalBottom
