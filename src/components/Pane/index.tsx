import styled from 'styled-components'

const Pane = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 4px;
  padding: 16px;
`

export default Pane
