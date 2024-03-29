import React from 'react'
import PropTypes from 'prop-types'
import { T } from 'lioness'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { setAcceptTerms } from 'src/actions.js'
import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'
import Checkbox from 'src/components/Checkbox.js'
import { BLACK, YELLOW } from 'src/styles/colors'
import { H1, H3, H5, P } from 'src/styles/elements.js'
import { Col, Container, Row } from 'src/styles/grid.js'

const ContentWrap = styled.div`padding: 0 88px;`

const Top = styled.div`margin: 64px 0;`

const TopLogo = styled.div`
  margin-bottom: 16px;
  text-align: center;

  & img {
    width: auto;
    height: 64px;
  }
`

const DisclaimerSection = styled.div`margin: 56px 0 72px;`

const DisclaimerHeading = H5.extend`
  padding-bottom: 8px;
  border-bottom: 1px solid ${YELLOW};
`

const AcceptFooter = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 24px 0;
  background: ${BLACK};
`

const AcceptLink = styled(LinkButton)`width: 100%;`

function HomeView({ hasAcceptedTerms, onChangeAccept }) {
  return (
    <div>
      <ContentWrap>
        <Top>
          <TopLogo>
            <img src="/img/3d-tune-in-logo-white.svg" alt="3D Tune-In" />
          </TopLogo>
          <H1>
            <T>Hearing Test</T>
          </H1>
        </Top>

        <H3>
          <T>Welcome to the 3D Tune-In hearing test.</T>
        </H3>
        <P>
          <T>
            Here you can take a hearing test to get an estimate of you level of
            hearing. The test takes about 5 minutes.
          </T>
        </P>

        <DisclaimerSection>
          <DisclaimerHeading>
            <T>Disclaimer</T>
          </DisclaimerHeading>

          <P>
            <T>
              This software nas been developed within the 3D Tune-In project
              (3D-games for TUNing and lEarniNg about hearing aids).
            </T>
          </P>
          <P>
            <T>
              3D Tune-In is a project ﬁnanced by the European Commission within
              the European Programme HORIZON 2020 — Research and Innovation
              Action — contract number 644051.
            </T>
          </P>
          <P>
            <T>
              For additional information and details on 3D Tune-In, please visit
              the project web site: www.3d-tune-in.eu
            </T>
          </P>
          <P>
            <T>
              The contents of this software are owned by the 3D Tune-In
              Consortium.
            </T>
          </P>
          <P>
            <T>
              This test allows you to estimate your hearing threshold. Please
              bear in mind that the software implements a demonstrative test,
              and in no case should it be considered as a medical diagnosis. Its
              results may not indicate any medical condition or have any medical
              purpose.
            </T>
          </P>
          <P>
            <T>
              Please follow the instructions carefully for correct usage of the
              test.
            </T>
          </P>
          <P>
            <T>
              You will initially be guided though a simple procedure for
              adjusting the volume on your device. High volumes can cause damage
              to your hearing. Please find your comfortable level and maintain
              it during the entire procedure.
            </T>
          </P>
          <P>
            <T>
              The 3D Tune-In Consortium will not be held responsible for any
              damage related to incorrect usage of the test by users.
            </T>
          </P>
        </DisclaimerSection>
      </ContentWrap>

      <AcceptFooter>
        <Container>
          <Row>
            <Col size={3 / 4}>
              <Checkbox isChecked={hasAcceptedTerms} onChange={onChangeAccept}>
                <T>
                  I understand all these conditions, and I confirm that I am
                  taking this test under my sole responsibility
                </T>
              </Checkbox>
            </Col>
            <Col size={1 / 4}>
              <AcceptLink to={AppUrl.CALIBRATION} isEnabled={hasAcceptedTerms}>
                <T>Take the test</T>
              </AcceptLink>
            </Col>
          </Row>
        </Container>
      </AcceptFooter>
    </div>
  )
}

HomeView.propTypes = {
  hasAcceptedTerms: PropTypes.bool.isRequired,
  onChangeAccept: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    hasAcceptedTerms: state.getIn(['terms', 'hasAccepted']),
  }),
  dispatch => ({
    onChangeAccept: isChecked => dispatch(setAcceptTerms(isChecked)),
  })
)(HomeView)
