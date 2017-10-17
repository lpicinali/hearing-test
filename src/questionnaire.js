import { QuestionnaireField, QuestionnaireGroup } from 'src/constants.js'

export default function getQuestionnaire(t) {
  return {
    [QuestionnaireGroup.ONE]: {
      [QuestionnaireField.ENJOYABLE]: {
        minLabel: t('annoying'),
        maxLabel: t('enjoyable'),
      },
      [QuestionnaireField.UNDERSTANDABLE]: {
        minLabel: t('not understandable'),
        maxLabel: t('understandable'),
      },
      [QuestionnaireField.DULL]: {
        minLabel: t('creative'),
        maxLabel: t('dull'),
      },
      [QuestionnaireField.DIFFICULT_TO_LEARN]: {
        minLabel: t('easy to learn'),
        maxLabel: t('difficult to learn'),
      },
      [QuestionnaireField.INFERIOR]: {
        minLabel: t('valuable'),
        maxLabel: t('inferior'),
      },
      [QuestionnaireField.EXCITING]: {
        minLabel: t('boring'),
        maxLabel: t('exciting'),
      },
      [QuestionnaireField.INTERESTING]: {
        minLabel: t('not interesting'),
        maxLabel: t('interesting'),
      },
      [QuestionnaireField.PREDICTABLE]: {
        minLabel: t('unpredictable'),
        maxLabel: t('predictable'),
      },
      [QuestionnaireField.SLOW]: {
        minLabel: t('fast'),
        maxLabel: t('slow'),
      },
      [QuestionnaireField.CONVENTIONAL]: {
        minLabel: t('inventive'),
        maxLabel: t('conventional'),
      },
      [QuestionnaireField.SUPPORTIVE]: {
        minLabel: t('obstructive'),
        maxLabel: t('supportive'),
      },
      [QuestionnaireField.BAD]: {
        minLabel: t('good'),
        maxLabel: t('bad'),
      },
      [QuestionnaireField.EASY]: {
        minLabel: t('complicated'),
        maxLabel: t('easy'),
      },
      [QuestionnaireField.PLEASING]: {
        minLabel: t('unlikable'),
        maxLabel: t('pleasing'),
      },
      [QuestionnaireField.LEADING_EDGE]: {
        minLabel: t('usual'),
        maxLabel: t('leading edge'),
      },
      [QuestionnaireField.PLEASANT]: {
        minLabel: t('unpleasant'),
        maxLabel: t('pleasant'),
      },
      [QuestionnaireField.NOT_SECURE]: {
        minLabel: t('secure'),
        maxLabel: t('not secure'),
      },
      [QuestionnaireField.DEMOTIVATING]: {
        minLabel: t('motivating'),
        maxLabel: t('demotivating'),
      },
      [QuestionnaireField.DOES_NOT_MEET_EXPECTATIONS]: {
        minLabel: t('meets expectations'),
        maxLabel: t('does not meet expectations'),
      },
      [QuestionnaireField.EFFICIENT]: {
        minLabel: t('inefficient'),
        maxLabel: t('efficient'),
      },
      [QuestionnaireField.CONFUSING]: {
        minLabel: t('clear'),
        maxLabel: t('confusing'),
      },
      [QuestionnaireField.PRACTICAL]: {
        minLabel: t('impractical'),
        maxLabel: t('practical'),
      },
      [QuestionnaireField.CLUTTERED]: {
        minLabel: t('organized'),
        maxLabel: t('cluttered'),
      },
      [QuestionnaireField.UNATTRACTIVE]: {
        minLabel: t('attractive'),
        maxLabel: t('unattractive'),
      },
      [QuestionnaireField.UNFRIENDLY]: {
        minLabel: t('friendly'),
        maxLabel: t('unfriendly'),
      },
      [QuestionnaireField.INNOVATIVE]: {
        minLabel: t('conservative'),
        maxLabel: t('innovative'),
      },
    },
    [QuestionnaireGroup.TWO]: {
      [QuestionnaireField.MEETS_REQUIREMENTS]: {
        label: t('1. The hearing test application meets my requirements'),
        minLabel: t('strongly agree'),
        maxLabel: t('strongly disagree'),
      },
      [QuestionnaireField.FRUSTRATING_EXPERIENCE]: {
        label: t(
          '2. Using this hearing test application is a frustrating experience'
        ),
        minLabel: t('strongly agree'),
        maxLabel: t('strongly disagree'),
      },
      [QuestionnaireField.EASY_TO_USE]: {
        label: t('3. This hearing test application is easy to use'),
        minLabel: t('strongly agree'),
        maxLabel: t('strongly disagree'),
      },
      [QuestionnaireField.TIME_WASTED_CORRECTING]: {
        label: t(
          '4. I have to spend too much time correcting things with this hearing test application.'
        ),
        minLabel: t('strongly agree'),
        maxLabel: t('strongly disagree'),
      },
    },
    [QuestionnaireGroup.THREE]: {
      [QuestionnaireField.RECOMMENDATION_LIKELIHOOD]: {
        minLabel: t('not at all likely'),
        maxLabel: t('extremely likely'),
      },
    },
  }
}
