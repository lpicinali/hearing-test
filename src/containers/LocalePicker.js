import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import { values } from 'lodash'
import styled from 'styled-components'

import { setLocale } from 'src/actions.js'
import { Locale } from 'src/constants.js'
import { SILVER } from 'src/styles/colors.js'

function getLocaleName(locale) {
  if (locale === Locale.EN) {
    return 'English'
  } else if (locale === Locale.ES) {
    return 'Español'
  } else if (locale === Locale.IT) {
    return 'Italiano'
  } else {
    return null
  }
}

const FlagButton = styled.button`
  appearance: none;
  position: relative;
  width: 24px;
  height: 16px;
  margin: 0 0 0 16px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background-color: ${props => (props.isActive ? SILVER : 'transparent')};
    border-radius: 50%;
    transition: background-color 0.3s;
  }
`

const Flag = styled.span`
  display: inline-block;
  border-radius: 3px;
  overflow: hidden;
`

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
          <FlagButton
            key={locale}
            isActive={currentLocale === locale}
            onClick={() => onSelectLocale(locale)}
          >
            <Flag>
              <img
                src={`/img/locale-${locale}.png`}
                alt={getLocaleName(locale)}
              />
            </Flag>
          </FlagButton>
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
