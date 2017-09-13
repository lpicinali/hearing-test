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
    gradingWidth: PropTypes.oneOf(range(1, 10).map(x => x / 10)),
  }

  static defaultProps = {
    numGrades: 7,
    gradingWidth: 4 / 10,
  }

  render() {
    const { numGrades, gradingWidth } = this.props

    return (
      <RankingWrapper>
        <Row>
          <Col size={(1 - gradingWidth) / 2} />
          <Col size={gradingWidth}>
            <RankingRow>
              {range(0, numGrades).map(i => (
                <RankingDigit key={i} numGrades={numGrades}>
                  {i + 1}
                </RankingDigit>
              ))}
            </RankingRow>
          </Col>
          <Col size={(1 - gradingWidth) / 2} />
        </Row>
      </RankingWrapper>
    )
  }
}

export default GradingRanking
