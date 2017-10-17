import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { T, withTranslators } from 'lioness'
import styled from 'styled-components'
import { compose, withState, withHandlers } from 'recompose'
import { map } from 'lodash'

import { setQuestionnaireAnswer } from 'src/actions.js'
import { QuestionnaireField, QuestionnaireGroup } from 'src/constants.js'
import { mayOutputDebugInfo } from 'src/environment.js'
import getQuestionnaire from 'src/questionnaire.js'
import Button from 'src/components/Button.js'
import GradingField from 'src/components/GradingField.js'
import GradingRanking from 'src/components/GradingRanking.js'
import QuestionnaireSectionSeparator from 'src/components/QuestionnaireSectionSeparator.js'
import ResultsDownloadButton from 'src/containers/ResultsDownloadButton.js'
import { GRAY, WHITE } from 'src/styles/colors.js'
import { H2, P } from 'src/styles/elements.js'

const ContentWrap = styled.div`padding: 0 88px;`

const Subtitle = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  color: ${GRAY};
`

const ExampleGradingField = compose(
  withState('value', 'setValue', 1),
  withHandlers({
    onChange: ({ setValue }) => value => setValue(value),
  })
)(GradingField)

const GradingFieldQuestion = styled.div`margin: 40px 0;`

const GradingQuestionLabel = styled.div`
  font-weight: bold;
  color: ${WHITE};
`

const FormActions = styled.div`
  margin: 40px 0;
  text-align: center;
`

const QuestionsCountdown = styled(P)`
  margin-top: 24px;
  color: ${GRAY};
  font-size: 14px;
`

/**
 * Questionnaire Step
 */
class QuestionnaireStep extends PureComponent {
  static propTypes = {
    values: PropTypes.shape({}).isRequired,
    onValueChange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  render() {
    const { values, onValueChange, t } = this.props

    const questionnaire = getQuestionnaire(t)
    const recommendationQuestion =
      questionnaire[QuestionnaireGroup.THREE][
        QuestionnaireField.RECOMMENDATION_LIKELIHOOD
      ]

    const numAnswered = values.filter(answer => answer !== null).size

    return (
      <ContentWrap>
        <H2>
          <T>Evaluation questionnaire</T>
          <Subtitle>
            <T>Web hearing test</T>
          </Subtitle>
        </H2>
        <QuestionnaireSectionSeparator />
        <P>
          <T>
            We would now like to evaluate your experience using our web-based
            hearing test. For the assessment of the test, please fill out the
            following questionnaire. The questionnaire consists of pairs of
            contrasting attributes that may apply to the test. The checkboxs
            between the attributes represent gradations between the opposites.
            You can express your agreement with the attributes by ticking the
            checkbox that most closely reflects your impression.
          </T>
        </P>
        <P>
          <T>Example:</T>
        </P>
        <GradingRanking />
        <ExampleGradingField
          minLabel={t('attractive')}
          maxLabel={t('unattractive')}
        />
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
            tick a checkbox in every line.
          </T>
        </P>
        <P>
          <T>
            It is your personal opinion that counts. Please remember: there is
            no wrong or right answer!
          </T>
        </P>
        <QuestionnaireSectionSeparator />
        <P>
          <T>
            Please assess the hearing test now by ticking one checkbox per line.
          </T>
        </P>
        <GradingRanking />
        {map(questionnaire[QuestionnaireGroup.ONE], (field, key) => (
          <GradingField
            key={key}
            value={values.get(key)}
            onChange={val => onValueChange(key, val)}
            minLabel={field.minLabel}
            maxLabel={field.maxLabel}
          />
        ))}
        <QuestionnaireSectionSeparator />
        <P>
          <T>
            Finally here are some further questions to further evaluate your
            experience with the hearing test application.
          </T>
        </P>
        {map(questionnaire[QuestionnaireGroup.TWO], (field, key) => (
          <GradingFieldQuestion key={key}>
            <GradingQuestionLabel>{field.label}</GradingQuestionLabel>
            <GradingRanking />
            <GradingField
              value={values.get(key)}
              onChange={val => onValueChange(key, val)}
              minLabel={field.minLabel}
              maxLabel={field.maxLabel}
            />
          </GradingFieldQuestion>
        ))}
        <QuestionnaireSectionSeparator />
        <P>
          <T>
            Lastly, to what extent would you recommend this hearing test
            application to another adult with cystic fibrosis?
          </T>
        </P>
        <GradingRanking numGrades={10} gradingWidth={5 / 10} />
        <GradingField
          numGrades={10}
          value={values.get(QuestionnaireField.RECOMMENDATION_LIKELIHOOD)}
          onChange={val =>
            onValueChange(QuestionnaireField.RECOMMENDATION_LIKELIHOOD, val)}
          minLabel={recommendationQuestion.minLabel}
          maxLabel={recommendationQuestion.maxLabel}
          gradingWidth={5 / 10}
        />
        <QuestionnaireSectionSeparator />
        {mayOutputDebugInfo() && (
          <button
            onClick={() =>
              map(QuestionnaireField, field => onValueChange(field, 1))}
          >
            Fill all
          </button>
        )}
        <FormActions>
          <ResultsDownloadButton isEnabled={values.every(x => x !== null)}>
            <T>Download results & answers</T>
          </ResultsDownloadButton>

          {numAnswered !== values.size && (
            <QuestionsCountdown>
              <T
                message="You have {{ numQuestionsLeft }} to answer before you can download your results."
                numQuestionsLeft={values.size - numAnswered}
              />
            </QuestionsCountdown>
          )}
        </FormActions>
      </ContentWrap>
    )
  }
}

export default connect(
  state => ({
    values: state.getIn(['questionnaire', 'answers']),
  }),
  dispatch => ({
    onValueChange: (name, value) =>
      dispatch(setQuestionnaireAnswer(name, value)),
  })
)(withTranslators(QuestionnaireStep))
