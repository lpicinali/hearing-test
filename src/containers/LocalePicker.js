import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import { values } from 'lodash'

import { setLocale } from 'src/actions.js'
import { Locale } from 'src/constants.js'

/**
 * Locale Picker
 */
class LocalePicker extends Component {
  static propTypes = {
    locales: PropTypes.arrayOf(PropTypes.oneOf(values(Locale))).isRequired,
    currentLocale: PropTypes.oneOf(values(Locale)).isRequired,
    onSelectLocale: PropTypes.func.isRequired,
  }

  render() {
    const { locales, currentLocale, onSelectLocale } = this.props

    return (
      <div className="LocalePicker">
        {locales.map(locale =>
          <button
            key={locale}
            onClick={() => onSelectLocale(locale)}
            style={{ fontWeight: locale === currentLocale ? 'bold' : 'normal' }}
          >
            {locale}
          </button>
        )}
      </div>
    )
  }
}

export default compose(
  connect(
    state => ({
      currentLocale: state.getIn(['l10n', 'locale']),
    }),
    dispatch => ({
      onSelectLocale: locale => dispatch(setLocale(locale)),
    })
  ),
  withProps({
    locales: values(Locale),
  })
)(LocalePicker)
