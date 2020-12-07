import React, { Suspense, useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useMount, usePrevious } from 'react-use'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'

const Dashboard = loadable(
  /* istanbul ignore next */ () => import('views/Partner/index')
)

export default function ProtectedComponent({
  fetchUser,
  logoutUser,
  isUserLoaded,
  user,
  token,
  // stashedToken
}) {
  const [hasError, setHasError] = useState(false)
  const prevToken = usePrevious(token)
  const prevMeId = usePrevious(user && user._id)

  useMount(async () => {
    if (!isUserLoaded) {
      const { error: fetchError /*, payload */ } = await fetchUser()

      if (fetchError) {
        logoutUser()
      }
    }
  })

  useEffect(() => {
    if (token && prevToken && token !== prevToken) {
      fetchMe()
    }
  }, [token, prevToken, fetchUser])

  useEffect(() => {
    if (me && me._id !== prevMeId) {
      // Me loaded initially
      if (prevMeId) {
        window.location.assign('/')
      }
    }
  }, [me, prevMeId, ldClient])

  useEffect(() => {
    const identifyLDUser = async () => {
      try {
        await ldClient.identify({
          key: me._id,
          firstName: me.firstName,
          lastName: me.lastName,
          email: me.email,
        })
        setLdInitialized(true)
      } catch (error) {
        Rollbar.error('LaunchDarkly identify Error', error)
        setHasError(true)
      }
    }

    if (me && ldClient && !ldInitialized) {
      identifyLDUser()
    }
  }, [me, ldClient, ldInitialized])

  useEffect(() => {
    if (me && prevMeId && me._id !== prevMeId) {
      window.location.assign('/')
    }
  }, [me, prevMeId])

  if (hasError) {
    return <ErrorCard onClick={logoutUser} />
  }

  if (!me || !ldInitialized)
    return (
      <LoadingView
        showSubText={false}
        showText={false}
        scale={0.4}
        fullscreen
      />
    )

  let component

  if (me.isAdmin()) {
    component = Admin
  } else {
    component = featureFlags.portalPartner3 ? PartnerV3 : Partner
  }

  return (
    <Suspense
      fallback={
        <LoadingView
          showSubText={false}
          showText={false}
          scale={0.4}
          fullscreen
        />
      }
    >
      <Switch>
        <Route path="/dashboard" component={component} />
      </Switch>
    </Suspense>
  )
}

ProtectedComponent.propTypes = {
  fetchMe: PropTypes.func,
  logoutUser: PropTypes.func,
  isMeLoaded: PropTypes.bool,
  me: PropTypes.instanceOf(User),
  token: PropTypes.string,
  stashedToken: PropTypes.string,
}
