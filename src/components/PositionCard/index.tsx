import React, { useState } from 'react'
import { JSBI, Pair, Percent } from '@nguyenphu27/sdk'
import { Button, Card as UIKitCard, CardBody, Text } from '../../uikit'
import { darken } from 'polished'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { useTotalSupply } from '../../data/TotalSupply'

import { useActiveWeb3React } from '../../hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import Card from '../Card'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
import { Dots } from '../swap/styleds'
import { SwapButton } from '../Button'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 4px;
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.colors.invertedContrast)};
  }
`

interface PositionCardProps {
  pair: Pair
  // eslint-disable-next-line react/no-unused-prop-types
  showUnwrapped?: boolean
  // eslint-disable-next-line react/no-unused-prop-types
  removeOnly?: boolean
}

export function MinimalPositionCard({ pair, showUnwrapped = false }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const theme = useTheme()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && (
        <UIKitCard style={{ border: `2px solid ${theme.colors.primary}`, background: 'transparent' }}>
          <Text
            style={{
              padding: 0,
              width: '100%',
              height: '50px',
              lineHeight: '50px',
              textTransform: 'uppercase',
              fontWeight: 600,
              textAlign: 'center',
              color: `${theme.colors.text}`,
              borderBottom: `2px solid ${theme.colors.primary}`,
            }}
            fontSize="16px"
            color="textSubtle"
          >
            LP Tokens in your Wallet
          </Text>

          <CardBody style={{ width: '450px' }}>
            <AutoColumn gap="12px" style={{ width: '100%', padding: '20px' }}>
              <FixedHeightRow onClick={() => setShowMore(!showMore)}>
                <RowFixed>
                  <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={36} />
                  <Text fontSize="18px" fontWeight={600}>
                    {currency0.symbol}/{currency1.symbol}
                  </Text>
                </RowFixed>
                <RowFixed>
                  <Text fontSize="20px" color={theme.colors.text} fontWeight={800}>
                    {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}
                  </Text>
                </RowFixed>
              </FixedHeightRow>
              <AutoColumn gap="4px">
                <FixedHeightRow>
                  <Text fontSize="16px" fontWeight={600}>
                    {currency0.symbol}:
                  </Text>
                  {token0Deposited ? (
                    <RowFixed>
                      <Text ml="6px" color="#6F8FA8" fontSize="18px" fontWeight={800}>
                        {token0Deposited?.toSignificant(6)}
                      </Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text fontSize="16px" fontWeight={600}>
                    {currency1.symbol}:
                  </Text>
                  {token1Deposited ? (
                    <RowFixed>
                      <Text ml="6px" fontSize="18px" color="#6F8FA8" fontWeight={800}>
                        {token1Deposited?.toSignificant(6)}
                      </Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
              </AutoColumn>
            </AutoColumn>
          </CardBody>
        </UIKitCard>
      )}
    </>
  )
}

export default function FullPositionCard({ pair, removeOnly }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const history = useHistory()

  const theme = useTheme()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <HoverCard style={{ width: '100%' }}>
      <AutoColumn gap="12px" style={{ width: '100%' }}>
        <FixedHeightRow onClick={() => setShowMore(!showMore)} style={{ cursor: 'pointer' }}>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={40} />
            <Text fontSize="24px" style={{ color: `${theme.colors.primary}`, fontWeight: 800 }}>
              {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
            </Text>
          </RowFixed>
          <RowFixed style={{ justifySelf: 'flex-end' }}>
            {showMore ? (
              <ChevronUp size="20" style={{ marginLeft: '10px' }} />
            ) : (
              <ChevronDown size="20" style={{ marginLeft: '10px' }} />
            )}
          </RowFixed>
        </FixedHeightRow>
        {showMore && (
          <>
            <FixedHeightRow style={{ margin: '25px 0' }}>
              <Text color={theme.colors.primary} fontSize="36px" style={{ fontWeight: 800 }}>
                {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}
              </Text>
            </FixedHeightRow>
            <AutoColumn gap="8px" style={{ paddingTop: '15px', borderTop: `2px solid ${theme.colors.disabled}` }}>
              <FixedHeightRow>
                <RowFixed>
                  <Text style={{ fontWeight: 600 }}>Pooled {currency0.symbol}:</Text>
                </RowFixed>
                {token0Deposited ? (
                  <RowFixed>
                    <Text color={theme.colors.primary} style={{ fontWeight: 800 }} ml="6px">
                      {token0Deposited?.toSignificant(6)}
                    </Text>
                  </RowFixed>
                ) : (
                  '-'
                )}
              </FixedHeightRow>

              <FixedHeightRow>
                <RowFixed>
                  <Text style={{ fontWeight: 600 }}>Pooled {currency1.symbol}:</Text>
                </RowFixed>
                {token1Deposited ? (
                  <RowFixed>
                    <Text color={theme.colors.primary} style={{ fontWeight: 800 }} ml="6px">
                      {token1Deposited?.toSignificant(6)}
                    </Text>
                  </RowFixed>
                ) : (
                  '-'
                )}
              </FixedHeightRow>
              <FixedHeightRow>
                <Text style={{ fontWeight: 600 }}>Your pool share:</Text>
                <Text color={theme.colors.primary} style={{ fontWeight: 800 }}>
                  {poolTokenPercentage ? `${poolTokenPercentage.toFixed(2)}%` : '-'}
                </Text>
              </FixedHeightRow>

              <RowBetween marginTop="10px">
                {removeOnly && (
                  <Button
                    as={Link}
                    to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                    style={{ width: '100%', background: `${theme.colors.primary}`, borderRadius: '4px' }}
                  >
                    Add
                  </Button>
                )}
                <Button
                  as={Link}
                  style={{ width: '100%', background: `${theme.colors.primary}`, borderRadius: '4px' }}
                  to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
                >
                  Remove
                </Button>
              </RowBetween>
            </AutoColumn>
            <AutoColumn justify="center" style={{ cursor: 'pointer', marginTop: '10px' }}>
              <Text
                fontSize="16px"
                color={theme.colors.primary}
                onClick={() => {
                  history.push(`/add/${pair.token0.address}/${pair.token1.address}`)
                }}
              >
                + Add liquidity instead
              </Text>
            </AutoColumn>
          </>
        )}
      </AutoColumn>
    </HoverCard>
  )
}
