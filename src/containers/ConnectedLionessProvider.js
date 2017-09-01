import { LionessProvider } from 'lioness'
import { connect } from 'react-redux'

export default connect(state => ({ locale: state.getIn(['l10n', 'locale']) }))(
  LionessProvider
)
