import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { T, withTranslators } from 'lioness'
import styled from 'styled-components'
import { compose, withState, withHandlers } from 'recompose'

import { setQuestionnaireAnswer, submitQuestionnaire } from 'src/actions.js'
import Button from 'src/components/Button.js'
import GradingField from 'src/components/GradingField.js'
import GradingRanking from 'src/components/GradingRanking.js'
import Icon from 'src/components/Icon.js'
import { QuestionnaireField } from 'src/constants.js'
import { GRAY, RED, WHITE } from 'src/styles/colors.js'
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

const SectionSeparatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1px;
  margin: 63px 0 64px;
  opacity: 0.2;
`

const SectionSeparatorLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background: ${WHITE};

  &:first-child {
    margin-right: 24px;
  }

  &:last-child {
    margin-left: 24px;
  }
`

const SectionSeparatorIcon = styled(Icon)`
  display: inline-block;
  margin: 0 12px;
`

const SectionSeparator = () =>
  <SectionSeparatorWrapper>
    <SectionSeparatorLine />
    <SectionSeparatorIcon name="thumbs-down" />
    <SectionSeparatorIcon name="thumbs-up" />
    <SectionSeparatorLine />
  </SectionSeparatorWrapper>

const GradingFieldQuestion = styled.div`margin: 40px 0;`

const GradingQuestionLabel = styled.div`
  font-weight: bold;
  color: ${WHITE};
`

const FormActions = styled.div`
  margin: 40px 0;
  text-align: center;
`

const ErrorMessage = P.extend`
  margin: 24px 0;
  padding: 16px 24px;
  border: 1px solid ${RED};
  border-radius: 2px;
  color: ${RED};
`

/**
 * Questionnaire Step
 */
class QuestionnaireStep extends PureComponent {
  static propTypes = {
    values: PropTypes.shape({}).isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    hasSubmitted: PropTypes.bool.isRequired,
    submissionError: PropTypes.instanceOf(Error),
    onValueChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    submissionError: null,
  }

  render() {
    const {
      values,
      isSubmitting,
      hasSubmitted,
      submissionError,
      onValueChange,
      onSubmit,
      t,
    } = this.props

    return (
      <ContentWrap>
        <H2>
          <T>Evaluation questionnaire</T>
          <Subtitle>
            <T>Web hearing test</T>
          </Subtitle>
        </H2>
        <SectionSeparator />
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
            tick a circle in every line.
          </T>
        </P>
        <P>
          <T>
            It is your personal opinion that counts. Please remember: there is
            no wrong or right answer!
          </T>
        </P>
        <SectionSeparator />
        <P>
          <T>
            Please assess the hearing test now by ticking one circle per line.
          </T>
        </P>
        <GradingRanking />
        <GradingField
          value={values.get(QuestionnaireField.ENJOYABLE)}
          onChange={val => onValueChange(QuestionnaireField.ENJOYABLE, val)}
          minLabel={t('agree')}
          maxLabel={t('disagree')}
        />
        <GradingField
          value={values.get(QuestionnaireField.UNDERSTANDABLE)}
          onChange={val =>
            onValueChange(QuestionnaireField.UNDERSTANDABLE, val)}
          minLabel={t('not understandable')}
          maxLabel={t('understandable')}
        />
        <GradingField
          value={values.get(QuestionnaireField.DULL)}
          onChange={val => onValueChange(QuestionnaireField.DULL, val)}
          minLabel={t('creative')}
          maxLabel={t('dull')}
        />
        <GradingField
          value={values.get(QuestionnaireField.DIFFICULT_TO_LEARN)}
          onChange={val =>
            onValueChange(QuestionnaireField.DIFFICULT_TO_LEARN, val)}
          minLabel={t('easy to learn')}
          maxLabel={t('difficult to learn')}
        />
        <GradingField
          value={values.get(QuestionnaireField.INFERIOR)}
          onChange={val => onValueChange(QuestionnaireField.INFERIOR, val)}
          minLabel={t('valuable')}
          maxLabel={t('inferior')}
        />
        <GradingField
          value={values.get(QuestionnaireField.EXCITING)}
          onChange={val => onValueChange(QuestionnaireField.EXCITING, val)}
          minLabel={t('boring')}
          maxLabel={t('exciting')}
        />
        <GradingField
          value={values.get(QuestionnaireField.INTERESTING)}
          onChange={val => onValueChange(QuestionnaireField.INTERESTING, val)}
          minLabel={t('not interesting')}
          maxLabel={t('interesting')}
        />
        <GradingField
          value={values.get(QuestionnaireField.PREDICTABLE)}
          onChange={val => onValueChange(QuestionnaireField.PREDICTABLE, val)}
          minLabel={t('unpredictable')}
          maxLabel={t('predictable')}
        />
        <GradingField
          value={values.get(QuestionnaireField.SLOW)}
          onChange={val => onValueChange(QuestionnaireField.SLOW, val)}
          minLabel={t('fast')}
          maxLabel={t('slow')}
        />
        <GradingField
          value={values.get(QuestionnaireField.CONVENTIONAL)}
          onChange={val => onValueChange(QuestionnaireField.CONVENTIONAL, val)}
          minLabel={t('inventive')}
          maxLabel={t('conventional')}
        />
        <GradingField
          value={values.get(QuestionnaireField.SUPPORTIVE)}
          onChange={val => onValueChange(QuestionnaireField.SUPPORTIVE, val)}
          minLabel={t('obstructive')}
          maxLabel={t('supportive')}
        />
        <GradingField
          value={values.get(QuestionnaireField.BAD)}
          onChange={val => onValueChange(QuestionnaireField.BAD, val)}
          minLabel={t('good')}
          maxLabel={t('bad')}
        />
        <GradingField
          value={values.get(QuestionnaireField.EASY)}
          onChange={val => onValueChange(QuestionnaireField.EASY, val)}
          minLabel={t('complicated')}
          maxLabel={t('easy')}
        />
        <GradingField
          value={values.get(QuestionnaireField.PLEASING)}
          onChange={val => onValueChange(QuestionnaireField.PLEASING, val)}
          minLabel={t('unlikable')}
          maxLabel={t('pleasing')}
        />
        <GradingField
          value={values.get(QuestionnaireField.LEADING_EDGE)}
          onChange={val => onValueChange(QuestionnaireField.LEADING_EDGE, val)}
          minLabel={t('usual')}
          maxLabel={t('leading edge')}
        />
        <GradingField
          value={values.get(QuestionnaireField.PLEASANT)}
          onChange={val => onValueChange(QuestionnaireField.PLEASANT, val)}
          minLabel={t('unpleasant')}
          maxLabel={t('pleasant')}
        />
        <GradingField
          value={values.get(QuestionnaireField.NOT_SECURE)}
          onChange={val => onValueChange(QuestionnaireField.NOT_SECURE, val)}
          minLabel={t('secure')}
          maxLabel={t('not secure')}
        />
        <GradingField
          value={values.get(QuestionnaireField.DEMOTIVATING)}
          onChange={val => onValueChange(QuestionnaireField.DEMOTIVATING, val)}
          minLabel={t('motivating')}
          maxLabel={t('demotivating')}
        />
        <GradingField
          value={values.get(QuestionnaireField.DOES_NOT_MEET_EXPECTATIONS)}
          onChange={val =>
            onValueChange(QuestionnaireField.DOES_NOT_MEET_EXPECTATIONS, val)}
          minLabel={t('meets expectations')}
          maxLabel={t('does not meet expectations')}
        />
        <GradingField
          value={values.get(QuestionnaireField.EFFICIENT)}
          onChange={val => onValueChange(QuestionnaireField.EFFICIENT, val)}
          minLabel={t('inefficient')}
          maxLabel={t('efficient')}
        />
        <GradingField
          value={values.get(QuestionnaireField.CONFUSING)}
          onChange={val => onValueChange(QuestionnaireField.CONFUSING, val)}
          minLabel={t('clear')}
          maxLabel={t('confusing')}
        />
        <GradingField
          value={values.get(QuestionnaireField.PRACTICAL)}
          onChange={val => onValueChange(QuestionnaireField.PRACTICAL, val)}
          minLabel={t('impractical')}
          maxLabel={t('practical')}
        />
        <GradingField
          value={values.get(QuestionnaireField.CLUTTERED)}
          onChange={val => onValueChange(QuestionnaireField.CLUTTERED, val)}
          minLabel={t('organized')}
          maxLabel={t('cluttered')}
        />
        <GradingField
          value={values.get(QuestionnaireField.UNATTRACTIVE)}
          onChange={val => onValueChange(QuestionnaireField.UNATTRACTIVE, val)}
          minLabel={t('attractive')}
          maxLabel={t('unattractive')}
        />
        <GradingField
          value={values.get(QuestionnaireField.UNFRIENDLY)}
          onChange={val => onValueChange(QuestionnaireField.UNFRIENDLY, val)}
          minLabel={t('friendly')}
          maxLabel={t('unfriendly')}
        />
        <GradingField
          value={values.get(QuestionnaireField.INNOVATIVE)}
          onChange={val => onValueChange(QuestionnaireField.INNOVATIVE, val)}
          minLabel={t('conservative')}
          maxLabel={t('innovative')}
        />
        <SectionSeparator />
        <P>
          <T>
            Finally here are some further questions to further evaluate your
            experience with the hearing test application. Please circle a number
            between 1 (strongly disagree) and 7 (strongly agree).
          </T>
        </P>
        <GradingFieldQuestion>
          <GradingQuestionLabel>
            <T>1. The hearing test application meets my requirements</T>
          </GradingQuestionLabel>
          <GradingRanking />
          <GradingField
            value={values.get(QuestionnaireField.MEETS_REQUIREMENTS)}
            onChange={val =>
              onValueChange(QuestionnaireField.MEETS_REQUIREMENTS, val)}
            minLabel={t('strongly agree')}
            maxLabel={t('strongly disagree')}
          />
        </GradingFieldQuestion>
        <GradingFieldQuestion>
          <GradingQuestionLabel>
            <T>
              2. Using this hearing test application is a frustrating experience
            </T>
          </GradingQuestionLabel>
          <GradingRanking />
          <GradingField
            value={values.get(QuestionnaireField.FRUSTRATING_EXPERIENCE)}
            onChange={val =>
              onValueChange(QuestionnaireField.FRUSTRATING_EXPERIENCE, val)}
            minLabel={t('strongly agree')}
            maxLabel={t('strongly disagree')}
          />
        </GradingFieldQuestion>
        <GradingFieldQuestion>
          <GradingQuestionLabel>
            <T>3. This hearing test application is easy to use</T>
          </GradingQuestionLabel>
          <GradingRanking />
          <GradingField
            value={values.get(QuestionnaireField.EASY_TO_USE)}
            onChange={val => onValueChange(QuestionnaireField.EASY_TO_USE, val)}
            minLabel={t('strongly agree')}
            maxLabel={t('strongly disagree')}
          />
        </GradingFieldQuestion>
        <GradingFieldQuestion>
          <GradingQuestionLabel>
            <T>
              4. I have to spend too much time correcting things with this
              hearing test application.
            </T>
          </GradingQuestionLabel>
          <GradingRanking />
          <GradingField
            value={values.get(QuestionnaireField.TIME_WASTED_CORRECTING)}
            onChange={val =>
              onValueChange(QuestionnaireField.TIME_WASTED_CORRECTING, val)}
            minLabel={t('strongly agree')}
            maxLabel={t('strongly disagree')}
          />
        </GradingFieldQuestion>
        <SectionSeparator />
        <P>
          <T>
            Lastly, to what extent would you recommend this hearing test
            application to another adult with cystic fibrosis?
          </T>
        </P>
        <GradingRanking />
        <GradingField
          value={values.get(QuestionnaireField.RECOMMENDATION_LIKELIHOOD)}
          onChange={val =>
            onValueChange(QuestionnaireField.RECOMMENDATION_LIKELIHOOD, val)}
          minLabel={t('not at all likely')}
          maxLabel={t('extremely likely')}
        />
        <SectionSeparator />
        <FormActions>
          {hasSubmitted === true
            ? <T>Many thanks for your time completing this questionnaire.</T>
            : <Button
                isEnabled={values.every(x => x !== null)}
                onClick={() => onSubmit(values)}
              >
                {isSubmitting ? <T>Submitting...</T> : <T>Submit answers</T>}
              </Button>}

          {submissionError &&
            <ErrorMessage>
              <T>
                We could not submit the questionnaire at this time. Please wait
                a minute or two and try submitting the form again.
              </T>
            </ErrorMessage>}
        </FormActions>
      </ContentWrap>
    )
  }
}

export default connect(
  state => ({
    values: state.getIn(['questionnaire', 'answers']),
    isSubmitting: state.getIn(['questionnaire', 'isSubmitting']),
    hasSubmitted: state.getIn(['questionnaire', 'hasSubmitted']),
    submissionError: state.getIn(['questionnaire', 'error']),
  }),
  dispatch => ({
    onValueChange: (name, value) =>
      dispatch(setQuestionnaireAnswer(name, value)),
    onSubmit: values => dispatch(submitQuestionnaire(values)),
  })
)(withTranslators(QuestionnaireStep))
