import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { T } from 'lioness'
import styled from 'styled-components'

import { submitQuestionnaire } from 'src/actions.js'
import Button from 'src/components/Button.js'
import { H2, P } from 'src/styles/elements.js'

const ContentWrap = styled.div`padding: 0 88px;`

/**
 * Questionnaire Step
 */
class QuestionnaireStep extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { onSubmit } = this.props

    return (
      <ContentWrap>
        <H2>
          <T>Evaluation questionnaire</T>
        </H2>
        <P>
          <T>
            We would now like to evaluate your experience using our web-based
            hearing test. For the assessment of the test, please fill out the
            following questionnaire. The questionnaire consists of pairs of
            contrasting attributes that may apply to the test. The circles
            between the attributes represent gradations between the opposites.
            You can express your agreement with the attributes by ticking the
            circle that most closely reflects your impression.
          </T>
        </P>
        <P>
          <T>Example:</T>
        </P>
        <P>
          <T>
            This response would mean that you rate the application as more
            attractive than unattractive.
          </T>
        </P>
        <P>
          <T>
            Please decide spontaneously. Don’t think too long about your
            decision to make sure that you convey your original impression.
          </T>
        </P>
        <P>
          <T>
            Sometimes you may not be completely sure about your agreement with a
            particular attribute or you may find that the attribute does not
            apply completely to the particular product. Nevertheless, please
            tick a circle in every line.
          </T>
        </P>
        <P>
          <T>
            It is your personal opinion that counts. Please remember: there is
            no wrong or right answer!
          </T>
        </P>
        <P>
          <T>
            Please assess the hearing test now by ticking one circle per line.
          </T>
        </P>
        {/* Form here */}
        <P>
          <T>
            Finally here are some further questions to further evaluate your
            experience with the hearing test application. Please circle a number
            between 1 (strongly disagree) and 7 (strongly agree).
          </T>
        </P>
        {/* Form here */}
        <P>
          <T>
            Lastly, to what extent would you recommend this hearing test
            application to another adult with cystic fibrosis?
          </T>
        </P>
        <P>
          <Button onClick={onSubmit}>Submit answers</Button>
        </P>
      </ContentWrap>
    )
  }
}

export default connect(null, dispatch => ({
  onSubmit: values => dispatch(submitQuestionnaire(values)),
}))(QuestionnaireStep)
