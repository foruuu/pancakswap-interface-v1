import styled from 'styled-components'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SwapBg = require('../assets/images/background.png').default


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  

  width: 100%;
  padding: 32px 16px;

  background: url(${SwapBg}) top center no-repeat;
  background-size: cover;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    // background-image: url('/images/arch-${({ theme }) => (theme.isDark ? 'dark' : 'light')}.svg'),
    //   url('/images/left-pancake.svg'), url('/images/right-pancake.svg');
    background: url(${SwapBg}) top center repeat-y;
    background-size: cover;
    min-height: 90vh;
  }
`

export default Container
