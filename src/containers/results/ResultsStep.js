import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'immutable-props'
import { T, withTranslators } from 'lioness'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { zip } from 'lodash'
import { Map } from 'immutable'
import { autobind } from 'core-decorators'

import { emailResults } from 'src/actions.js'
import { AppUrl, Ear, TEST_FREQUENCIES } from 'src/constants.js'
import { mayOutputDebugInfo } from 'src/environment.js'
import appHasQuestionnaire from 'src/questionnaire.js'
import Audiogram from 'src/components/Audiogram.js'
import Button, { LinkButton } from 'src/components/Button.js'
import QuestionnaireSectionSeparator from 'src/components/QuestionnaireSectionSeparator.js'
import StickyFooter from 'src/components/StickyFooter.js'
import { WHITE } from 'src/styles/colors.js'
import { A, H2, H3, H5, P, TextInput } from 'src/styles/elements.js'
import { Col, Row } from 'src/styles/grid.js'
import { FONT_MONO } from 'src/styles/type.js'

const ResultsWrapper = styled.div`margin-bottom: 80px;`

const ResultSection = styled.div`margin: 0 0 64px;`

const EarLabel = styled(H5)`margin-bottom: 0;`

const HearingLossCode = styled.div`
  color: ${WHITE};
  font-family: ${FONT_MONO};
  font-size: 48px;
`

const StyledAudiogram = styled(Audiogram)`margin-top: 16px;`

const EmailFormWrap = styled.div`display: flex;`

const EmailInput = styled(TextInput)`
  flex-grow: 1;
  margin-right: 20px;
`

/**
 * Results Step
 */
class ResultsStep extends Component {
  static propTypes = {
    results: IPropTypes.Map.isRequired,
    t: PropTypes.func.isRequired,
    onSendResults: PropTypes.func.isRequired,
    isSending: PropTypes.bool.isRequired,
  }

  state = {
    recipient: '',
  }

  @autobind
  handleEmailChange(evt) {
    this.setState({ recipient: evt.target.value })
  }

  render() {
    const { results, t, onSendResults, isSending } = this.props
    const { recipient } = this.state

    const leftAudiogram = results.getIn(['audiograms', Ear.LEFT])
    const rightAudiogram = results.getIn(['audiograms', Ear.RIGHT])

    const leftAudiogramData = new Map(
      zip(TEST_FREQUENCIES, leftAudiogram.toJS())
    )
    const rightAudiogramData = new Map(
      zip(TEST_FREQUENCIES, rightAudiogram.toJS())
    )

    return (
      <ResultsWrapper>
        <H2>
          <T>Hearing test results</T>
        </H2>

        <P>
          <T>These are your hearing test results.</T>{' '}
          <T
            message="{{ link:Click here }} for more information about the 3D Tune-In project and apps."
            link={<A href="http://3d-tune-in.eu/" target="_blank" />}
          />
        </P>

        <ResultSection>
          <H3>
            <T>Hearing loss severity score</T>
          </H3>
          <P>
            <T>
              You can use these codes to automatically calibrate any of the 3D
              Tune-In applications, so make a note of them.
            </T>
          </P>

          <Row>
            <Col size={1 / 2}>
              <EarLabel>
                <T>Left ear</T>
              </EarLabel>
              <HearingLossCode>
                {results.getIn(['codes', Ear.LEFT])}
              </HearingLossCode>
            </Col>

            <Col size={1 / 2}>
              <EarLabel>
                <T>Right ear</T>
              </EarLabel>
              <HearingLossCode>
                {results.getIn(['codes', Ear.RIGHT])}
              </HearingLossCode>
            </Col>
          </Row>
        </ResultSection>

        <ResultSection>
          <H3>
            <T>Audiograms</T>
          </H3>

          <P>
            <T>
              These are diagrams that describe your hearing threshold for
              different frequencies.
            </T>
          </P>

          <Row>
            <Col size={1 / 2}>
              <EarLabel>
                <T>Left ear</T>
              </EarLabel>
              {leftAudiogramData && (
                <StyledAudiogram
                  ear={Ear.LEFT}
                  data={leftAudiogramData}
                  isInteractive={false}
                />
              )}
              {mayOutputDebugInfo() && (
                <code>{leftAudiogram.toJS().join(', ')}</code>
              )}
            </Col>
            <Col size={1 / 2}>
              <EarLabel>
                <T>Right ear</T>
              </EarLabel>
              {rightAudiogram && (
                <StyledAudiogram
                  ear={Ear.RIGHT}
                  data={rightAudiogramData}
                  isInteractive={false}
                />
              )}
              {mayOutputDebugInfo() && (
                <code>{rightAudiogram.toJS().join(', ')}</code>
              )}
            </Col>
          </Row>
        </ResultSection>

        {appHasQuestionnaire() && (
          <ResultSection>
            <QuestionnaireSectionSeparator />
            <Row>
              <Col size={3 / 4}>
                <H3>
                  <T>Help us improve</T>
                </H3>
                <P>
                  <T>
                    We would like know about your experience taking this test.
                    Please take a few minutes to complete our questionnaire.
                  </T>
                </P>
                <LinkButton to={AppUrl.QUESTIONNAIRE}>
                  <T>Take the questionnaire</T>
                </LinkButton>
              </Col>
            </Row>
          </ResultSection>
        )}

        <StickyFooter>
          <EmailFormWrap>
            <EmailInput
              type="email"
              placeholder={t('name@example.com')}
              value={recipient}
              onChange={this.handleEmailChange}
              disabled={isSending}
            />
            <Button
              isLoading={isSending}
              onClick={() => onSendResults(recipient, results)}
            >
              {isSending === true ? (
                <T>Emailing results...</T>
              ) : (
                <T>Email me the results</T>
              )}
            </Button>
          </EmailFormWrap>
        </StickyFooter>
      </ResultsWrapper>
    )
  }
}

export default connect(
  state => ({
    results: state.get('results'),
    isSending: state.getIn(['results', 'isSending']),
  }),
  dispatch => ({
    onSendResults: (recipient, results) =>
      dispatch(emailResults({ recipient, results })),
  })
)(withTranslators(ResultsStep))
