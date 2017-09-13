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
    value: PropTypes.number,
    minLabel: PropTypes.string.isRequired,
    maxLabel: PropTypes.string.isRequired,
    gradingWidth: PropTypes.oneOf(range(1, 10).map(x => x / 10)),
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    numGrades: 7,
    gradingWidth: 4 / 10,
    value: null,
  }

  render() {
    const {
      numGrades,
      onChange,
      minLabel,
      gradingWidth,
      value,
      maxLabel,
    } = this.props

    return (
      <FieldWrapper>
        <Row>
          <Col size={(1 - gradingWidth) / 2}>
            <SpectrumEndLabel isMin>{minLabel}</SpectrumEndLabel>
          </Col>
          <Col size={gradingWidth}>
            <CheckboxRow>
              {range(0, numGrades).map(i => (
                <FlexedCheckbox
                  key={i}
                  isChecked={i === value}
                  onChange={() => onChange(i)}
                />
              ))}
            </CheckboxRow>
          </Col>
          <Col size={(1 - gradingWidth) / 2}>
            <SpectrumEndLabel>{maxLabel}</SpectrumEndLabel>
          </Col>
        </Row>
      </FieldWrapper>
    )
  }
}

export default GradingField
