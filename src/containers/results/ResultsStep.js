import React, { Component } from 'react'
import IPropTypes from 'immutable-props'
import { T } from 'lioness'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { map } from 'lodash'

import configs from 'src/configs.js'
import { AppUrl, Ear } from 'src/constants.js'
import { mayOutputDebugInfo } from 'src/environment.js'
import Audiogram from 'src/components/Audiogram.js'
import { LinkButton } from 'src/components/Button.js'
import StickyFooter from 'src/components/StickyFooter.js'
import ResultsDownloadButton from 'src/containers/ResultsDownloadButton.js'
import { WHITE } from 'src/styles/colors.js'
import { A, H2, H3, H5, P } from 'src/styles/elements.js'
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

const ActionLinkWrap = styled.div`text-align: center;`

/**
 * Results Step
 */
class ResultsStep extends Component {
  static propTypes = {
    results: IPropTypes.Map.isRequired,
  }

  render() {
    const { results } = this.props

    const leftAudiogram = results.getIn(['audiograms', Ear.LEFT])
    const rightAudiogram = results.getIn(['audiograms', Ear.RIGHT])

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

        {configs.HAS_CODES && (
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
        )}

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
              {leftAudiogram && (
                <StyledAudiogram
                  ear={Ear.LEFT}
                  data={leftAudiogram}
                  isInteractive={false}
                />
              )}
              {mayOutputDebugInfo() && (
                <code>
                  {map(
                    leftAudiogram.toJS(),
                    (value, frequency) => `${frequency}: ${value}`
                  ).join(', ')}
                </code>
              )}
            </Col>
            <Col size={1 / 2}>
              <EarLabel>
                <T>Right ear</T>
              </EarLabel>
              {rightAudiogram && (
                <StyledAudiogram
                  ear={Ear.RIGHT}
                  data={rightAudiogram}
                  isInteractive={false}
                />
              )}
              {mayOutputDebugInfo() && (
                <code>
                  {map(
                    rightAudiogram.toJS(),
                    (value, frequency) => `${frequency}: ${value}`
                  ).join(', ')}
                </code>
              )}
            </Col>
          </Row>
        </ResultSection>

        <StickyFooter>
          <ActionLinkWrap>
            {configs.HAS_QUESTIONNAIRE ? (
              <LinkButton to={AppUrl.QUESTIONNAIRE}>
                <T>Download results & Take the questionnaire</T>
              </LinkButton>
            ) : (
              <ResultsDownloadButton>
                <T>Download results</T>
              </ResultsDownloadButton>
            )}
          </ActionLinkWrap>
        </StickyFooter>
      </ResultsWrapper>
    )
  }
}

export default connect(state => ({
  results: state.get('results'),
}))(ResultsStep)
