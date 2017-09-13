import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'immutable-props'
import { connect } from 'react-redux'
import { clamp, last, values } from 'lodash'
import { autobind } from 'core-decorators'
import { T } from 'lioness'
import styled from 'styled-components'

import { setFrequencyLevel } from 'src/actions.js'
import configs from 'src/configs.js'
import {
  Ear,
  FrequencyStartVolume,
  TestDirection,
  TestFrequencies,
} from 'src/constants.js'
import { mayOutputDebugInfo } from 'src/environment.js'
import Audio from 'src/components/Audio.js'
import Button, { ButtonStyle } from 'src/components/Button.js'
import Icon from 'src/components/Icon.js'
import StepProgress from 'src/components/StepProgress.js'
import { BLACK, BLUE, GRAY, WHITE } from 'src/styles/colors.js'
import { H3, H4, P } from 'src/styles/elements.js'
import { Col, Row, StatefulCol } from 'src/styles/grid.js'
import { FONT_NORMAL } from 'src/styles/type.js'

const TEST_FREQUENCIES = TestFrequencies[configs.EXTENT]

const StepProgressSummary = styled.div`
  margin: 8px 0;
  color: ${GRAY};
  font-size: 12px;
  line-height: 16px;
`

const ButtonGroup = styled.div`margin-top: 48px;`

const NarrowButton = styled(Button)`
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
`

const VolumeChangeButton = styled(NarrowButton)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const VolumeChangeIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  margin-left: -4px;
`

const ResetIcon = styled(Icon)`
  width: 16px;
  height: 16px;
`

const ResetButton = styled.button`
  appearance: none;
  display: flex;
  align-items: center;
  margin: 16px 0 0;
  padding: 8px;
  background: none;
  border: none;
  outline: none;
  font-family: ${FONT_NORMAL};
  font-size: 16px;
  color: ${WHITE};
  line-height: 24px;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.1s;

  &:hover {
    opacity: 1;
  }

  &:active {
    opacity: 0.4;
  }

  svg {
    display: inline-block;
    margin-right: 8px;
  }
`

const DebugArea = styled.pre`
  margin: 80px 0 40px;
  padding: 16px;
  background-color: ${BLACK};
  color: ${WHITE};
`

/**
 * Ear Test Container
 */
class EarTestContainer extends Component {
  static propTypes = {
    ear: PropTypes.oneOf(values(Ear)).isRequired,
    earVolumes: IPropTypes.Map.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
  }

  state = {
    frequency: TEST_FREQUENCIES[0],
    maxVolume: 0,
    minVolume: FrequencyStartVolume[TEST_FREQUENCIES[0]],
    direction: TestDirection.UP,
  }

  @autobind
  next() {
    const { ear, earVolumes, onVolumeChange, onFinish } = this.props
    const { frequency, minVolume, direction } = this.state

    if (
      frequency === last(TEST_FREQUENCIES) &&
      direction === TestDirection.DOWN
    ) {
      onFinish()
    } else if (direction === TestDirection.DOWN) {
      this.setState(() => {
        const nextFrequency = TEST_FREQUENCIES.find(
          x => parseInt(x) > parseInt(frequency)
        )

        return {
          frequency: nextFrequency,
          minVolume: FrequencyStartVolume[nextFrequency],
          maxVolume: 0,
          direction: TestDirection.UP,
        }
      })
    } else {
      const maxVolume = earVolumes.getIn([frequency, TestDirection.UP]) + 10
      this.setState(
        () => ({
          direction: TestDirection.DOWN,
          maxVolume,
        }),
        () => {
          // The start volume of the DOWN bit is +10 dB to the final
          // UP volume.
          onVolumeChange(
            ear,
            frequency,
            TestDirection.DOWN,
            clamp(maxVolume, minVolume, 0)
          )
        }
      )
    }
  }

  render() {
    const { ear, earVolumes, onVolumeChange } = this.props
    const { frequency, maxVolume, minVolume, direction } = this.state

    const currentVolume = earVolumes.getIn([frequency, direction])

    const currentStep =
      TEST_FREQUENCIES.indexOf(frequency) * 2 +
      (direction === TestDirection.DOWN ? 1 : 0) +
      1

    return (
      <div className="EarTestContainer">
        <H3>{ear === Ear.LEFT ? <T>Left ear</T> : <T>Right ear</T>}</H3>
        <StepProgressSummary>
          <T
            message="Step {{ step }} of {{ numSteps }}"
            step={currentStep}
            numSteps={TEST_FREQUENCIES.length * 2}
          />
        </StepProgressSummary>
        <StepProgress
          numSteps={TEST_FREQUENCIES.length * 2}
          step={currentStep}
        />
        <Row>
          <StatefulCol size={1 / 2} isActive={direction === TestDirection.UP}>
            <H4>
              <T>Increase</T>
            </H4>
            <P>
              <T>
                {`Press "Increase volume" until you can hear the tone. When you
                do, press the "I can hear it" button. Press the "Reset" button
                to bring the level back down.`}
              </T>
            </P>

            <ButtonGroup>
              <Row>
                <Col size={1 / 2}>
                  <VolumeChangeButton
                    buttonStyle={ButtonStyle.FRIENDLY}
                    onClick={() =>
                      onVolumeChange(
                        ear,
                        frequency,
                        direction,
                        clamp(currentVolume + 2, minVolume, 0)
                      )}
                  >
                    <VolumeChangeIcon name="plus" color={BLUE} />{' '}
                    <T>Increase volume</T>
                  </VolumeChangeButton>
                </Col>
                <Col size={1 / 2}>
                  <NarrowButton
                    buttonStyle={ButtonStyle.ALLURING}
                    onClick={this.next}
                  >
                    <T>I can hear it</T>
                  </NarrowButton>
                </Col>
              </Row>

              <ResetButton
                onClick={() =>
                  onVolumeChange(
                    Ear.LEFT,
                    frequency,
                    direction,
                    FrequencyStartVolume[frequency]
                  )}
              >
                <ResetIcon name="rotate-ccw" /> <T>Reset</T>
              </ResetButton>
            </ButtonGroup>
          </StatefulCol>

          <StatefulCol size={1 / 2} isActive={direction === TestDirection.DOWN}>
            <H4>
              <T>Decrease</T>
            </H4>
            <P>
              <T>
                {`Press the "Decrease volume" button until you can't hear the tone anymore,
                then press "I can’t hear it". Press the "Reset" button to bring the level back up.`}
              </T>
            </P>

            <ButtonGroup>
              <Row>
                <Col size={1 / 2}>
                  <VolumeChangeButton
                    buttonStyle={ButtonStyle.FRIENDLY}
                    onClick={() =>
                      onVolumeChange(
                        ear,
                        frequency,
                        direction,
                        clamp(currentVolume - 2, minVolume, 0)
                      )}
                  >
                    <VolumeChangeIcon name="minus" color={BLUE} />{' '}
                    <T>Decrease volume</T>
                  </VolumeChangeButton>
                </Col>
                <Col size={1 / 2}>
                  <NarrowButton
                    buttonStyle={ButtonStyle.ALLURING}
                    onClick={this.next}
                  >
                    <T>{`I can't hear it`}</T>
                  </NarrowButton>
                </Col>
              </Row>

              <ResetButton
                onClick={() =>
                  onVolumeChange(Ear.LEFT, frequency, direction, maxVolume)}
              >
                <ResetIcon name="rotate-ccw" /> <T>Reset</T>
              </ResetButton>
            </ButtonGroup>
          </StatefulCol>
        </Row>

        {mayOutputDebugInfo() && (
          <DebugArea>
            Ear: {ear} | Frequency: {frequency} | Direction: {direction} |
            Current volume: {currentVolume} |
          </DebugArea>
        )}

        <Audio ear={ear} name={frequency} volume={currentVolume} />
      </div>
    )
  }
}

export default connect(
  (state, { ear }) => ({
    earVolumes: state.getIn(['test', ear]),
  }),
  dispatch => ({
    onVolumeChange: (ear, frequency, direction, volume) =>
      dispatch(setFrequencyLevel(ear, frequency, direction, volume)),
  })
)(EarTestContainer)
