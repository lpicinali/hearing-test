import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { T } from 'lioness'

import { downloadResults } from 'src/actions.js'
import Button from 'src/components/Button.js'

/**
 * Results Download Button
 */
class ResultsDownloadButton extends PureComponent {
  static propTypes = {
    isDownloading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { isDownloading, children, onClick, ...props } = this.props

    return (
      <Button {...props} onClick={onClick} isLoading={isDownloading}>
        {isDownloading ? <T>Downloading...</T> : children}
      </Button>
    )
  }
}

export default connect(
  state => ({
    isDownloading: state.getIn(['results', 'download', 'isPending']),
  }),
  dispatch => ({
    onClick: () => dispatch(downloadResults()),
  })
)(ResultsDownloadButton)
