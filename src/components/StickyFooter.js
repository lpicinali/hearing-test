import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { DARK_BLUE } from 'src/styles/colors.js'
import { Container } from 'src/styles/grid.js'

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 24px 0;
  background: ${DARK_BLUE};
`

/**
 * Sticky Footer
 */
class StickyFooter extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props

    return (
      <StyledFooter>
        <Container>
          {children}
        </Container>
      </StyledFooter>
    )
  }
}

export default StickyFooter
