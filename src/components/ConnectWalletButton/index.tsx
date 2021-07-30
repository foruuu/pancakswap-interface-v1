import React from 'react'
import {Button, ButtonProps, useWalletModal} from '../../uikit'
import useI18n from 'hooks/useI18n'
import useAuth from 'hooks/useAuth'
import styled from "styled-components";


const MojitoButton = styled(Button)`
  border-radius: 5px;
  height: 60px;
  font-size: 18px;
  font-family: alibaba-puhuiti, sans-serif;
  color: #fff;

`

const UnlockButton: React.FC<ButtonProps> = (props) => {
    const TranslateString = useI18n()
    const {login, logout} = useAuth()
    const {onPresentConnectModal} = useWalletModal(login, logout)

    return (
        <MojitoButton onClick={onPresentConnectModal} {...props}>
            {TranslateString(292, 'Unlock Wallet')}
        </MojitoButton>
    )
}

export default UnlockButton
