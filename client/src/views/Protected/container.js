import { connect } from 'react-redux'
import { withLDProvider } from 'launchdarkly-react-client-sdk'

import Config from 'config'
import ProtectedComponent from './component'
import { fetchMe, isMeLoaded, selectMe } from 'store/me/duck'
import { logoutUser, selectToken, selectStashedToken } from 'store/session/duck'

const ProtectedContainer = connect(
  // Map state to props
  state => ({
    isMeLoaded: isMeLoaded(state),
    me: selectMe(state),
    token: selectToken(state),
    stashedToken: selectStashedToken(state)
  }),
  // Map actions to dispatch and props
  { fetchMe, logoutUser }
)(ProtectedComponent)

export default withLDProvider({
  clientSideID: Config.get('/LaunchDarklyClientId')
})(ProtectedContainer)
