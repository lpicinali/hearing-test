import styled from 'styled-components'
// import Grid from 'styled-components-grid'

// export const Container = Grid.extend`
//   width: 96%;
//   max-width: 840px;
//   margin: 0 auto;
// `

const GUTTER = 20

export const Container = styled.div`
  width: 96%;
  max-width: 800px;
  margin: 0 auto;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${GUTTER}px;
  margin-right: -${GUTTER}px;
`

export const Col = styled.div`
  flex-grow: ${props => (props.grow ? '1' : '0')};
  flex-shrink: ${props => (props.shrink ? '1' : '0')};
  width: ${({ size }) => (size ? size * 100 : 'auto')}%;
  padding: 0 ${GUTTER}px;
`
