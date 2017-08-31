/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { range } from 'lodash'

import Checkbox from 'src/components/Checkbox.js'
import { DARK_BLUE } from 'src/styles/colors.js'
import { Col, Row } from 'src/styles/grid.js'

const FieldWrapper = styled.div`
  padding: 12px 0;

  & + & {
    border-top: 1px solid ${DARK_BLUE};
  }
`

const SpectrumEndLabel = styled.div`
  text-align: ${props => (props.isMin ? 'right' : 'left')};
`

const CheckboxRow = styled.div`display: flex;`

const FlexedCheckbox = styled(Checkbox)`
  flex-grow: 1;
  justify-content: center;
`

/**
 * Grading Field
 */
class GradingField extends Component {
  static propTypes = {
    numGrades: PropTypes.number,
    minLabel: PropTypes.string.isRequired,
    maxLabel: PropTypes.string.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    numGrades: 7,
    value: null,
  }

  render() {
    const { numGrades, onChange, minLabel, value, maxLabel } = this.props

    return (
      <FieldWrapper>
        <Row>
          <Col size={3 / 10}>
            <SpectrumEndLabel isMin>
              {minLabel}
            </SpectrumEndLabel>
          </Col>
          <Col size={4 / 10}>
            <CheckboxRow>
              {range(0, numGrades).map(i =>
                <FlexedCheckbox
                  key={i}
                  isChecked={i === value}
                  onChange={() => onChange(i)}
                />
              )}
            </CheckboxRow>
          </Col>
          <Col size={3 / 10}>
            <SpectrumEndLabel>
              {maxLabel}
            </SpectrumEndLabel>
          </Col>
        </Row>
      </FieldWrapper>
    )
  }
}

export default GradingField
