import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair } from '@nguyenphu27/sdk'
import { Button, CardBody, Text } from '../../uikit'
import CardNav from 'components/CardNav'
import Question from 'components/QuestionHelper'
import FullPositionCard from 'components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import Container from 'components/Container'

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { Dots } from 'components/swap/styleds'
import useI18n from 'hooks/useI18n'
import PageHeader from 'components/PageHeader'
import { Link, useHistory } from 'react-router-dom'
import AppBody from '../AppBody'
import NoLiquidity from './NoLiquidity'

const AddIcon = styled.img`
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
`

const NoLiquuidityNotice = styled.div`
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #ecfff5;
  color: #033a6e;
  padding: 20px 0;
`
const FindButton = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  height: 34px;
  background: #033a6e;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  cursor: pointer;
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const history = useHistory()
  const { account } = useActiveWeb3React()
  const TranslateString = useI18n()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  return (
    <Container>
      <CardNav activeIndex={1} />
      <AppBody>
        <PageHeader
          title={TranslateString(262, 'Liquidity')}
          description={TranslateString(1168, 'Add liquidity to receive LP tokens')}
        />
        <AutoColumn gap="lg" justify="center" style={{ width: '100%' }}>
          <CardBody style={{ width: '100%' }}>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>{TranslateString(107, 'Your Liquidity')}</Text>
                <Question
                  text={TranslateString(
                    1170,
                    'When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below.'
                  )}
                />
              </RowBetween>

              {!account ? (
                <LightCard padding="20px" style={{ border: `2px solid ${theme.colors.primary}`, borderRadius: '4px' }}>
                  <Text color="textDisabled" textAlign="center">
                    {TranslateString(156, 'Connect to a wallet to view your liquidity.')}
                  </Text>
                </LightCard>
              ) : v2IsLoading ? (
                <LightCard padding="20px" style={{ border: `2px solid ${theme.colors.primary}`, borderRadius: '4px' }}>
                  <Text color="textDisabled" textAlign="center">
                    <Dots>Loading</Dots>
                  </Text>
                </LightCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <LightCard padding="20px" style={{ border: `2px solid ${theme.colors.primary}`, borderRadius: '4px' }}>
                  {allV2PairsWithLiquidity.map((v2Pair) => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                  <NoLiquuidityNotice>
                    <Text width="auto" color="#033A6E" fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
                      {TranslateString(106, "Don't see a pool you joined?")}
                    </Text>
                    <FindButton
                      onClick={() => {
                        history.push('/add')
                      }}
                    >
                      {TranslateString(106, 'Find Other LP tokens')}
                    </FindButton>
                  </NoLiquuidityNotice>
                </LightCard>
              ) : (
                // no liquidity found
                <LightCard padding="40px">
                  <NoLiquidity TranslateString={TranslateString} />
                </LightCard>
              )}
            </AutoColumn>
          </CardBody>
        </AutoColumn>
        <Button
          id="join-pool-button"
          as={Link}
          to="/add/BNB"
          style={{ margin: '20px 5% 20px', borderRadius: '4px', width: '90%', height: '60px' }}
        >
          <AddIcon style={{ marginRight: '10px' }} src={require('../../assets/images/plus.svg').default} />
          {TranslateString(168, 'Add Liquidity')}
        </Button>
      </AppBody>
    </Container>
  )
}
