import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import Freezable from 'src/components/Freezable.js'

const FadeWrapper = styled.div`position: relative;`

const MarginBreaker = styled.div`
  height: 1px;
  margin-bottom: -1px;
`

const FadeContent = styled.div`
  transition: opacity 0.5s;
  opacity: 0;
`

const transitionStyles = {
  entering: { opacity: 1, transitionDelay: '0.5s' },
  entered: { opacity: 1 },
  exiting: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
}

/**
 * Route Transition
 */
class RouteTransition extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    match: PropTypes.shape({}),
  }

  static defaultProps = {
    match: null,
  }

  render() {
    const { component, match, ...rest } = this.props

    return (
      <Transition in={!!match} timeout={1000}>
        {state => (
          <FadeWrapper>
            <MarginBreaker />
            <FadeContent style={transitionStyles[state]}>
              {(match || state !== 'exited') && (
                <Freezable
                  freeze={!match || state === 'exiting' || state === 'exited'}
                >
                  {React.createElement(component, {
                    match: match || {},
                    ...rest,
                  })}
                </Freezable>
              )}
            </FadeContent>
          </FadeWrapper>
        )}
      </Transition>
    )
  }
}

export default RouteTransition
