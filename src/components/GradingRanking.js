/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { range } from 'lodash'

import { DARK_BLUE } from 'src/styles/colors.js'
import { Col, Row } from 'src/styles/grid.js'

const RankingWrapper = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${DARK_BLUE};
`

const RankingRow = styled.div`display: flex;`

const RankingDigit = styled.div`
  flex-grow: 1;
  width: ${props => 100 / props.numGrades}%;
  text-align: center;
`

/**
 * Grading Ranking
 */
class GradingRanking extends Component {
  static propTypes = {
    numGrades: PropTypes.number.isRequired,
  }

  static defaultProps = {
    numGrades: 7,
  }

  render() {
    const { numGrades } = this.props

    return (
      <RankingWrapper>
        <Row>
          <Col size={3 / 10} />
          <Col size={4 / 10}>
            <RankingRow>
              {range(0, numGrades).map(i => (
                <RankingDigit key={i} numGrades={numGrades}>
                  {i + 1}
                </RankingDigit>
              ))}
            </RankingRow>
          </Col>
          <Col size={3 / 10} />
        </Row>
      </RankingWrapper>
    )
  }
}

export default GradingRanking
