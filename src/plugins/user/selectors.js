// re-used between login and register
export const userAuthSelectors = (raw) => {
  const api = (state) => raw(state).api
  const form = (state) => raw(state).form
  return {
    raw,
    api,
    form,
    formdata: (state) => form(state).data,
    formmeta: (state) => form(state).meta
  }
}

export const userStatusSelectors = (raw) => {
  const api = (state) => raw(state).api
  const record = (state) => raw(state).record
  const data = (state) => record(state).meta || {}
  return {
    raw,
    api,
    record,
    data,
    meta: data,
    loggedIn: (state) => record(state).loggedIn,
    loaded: (state) => record(state).request_count > 0,
    currentInstallation: (state) => data(state).activeInstallation,
    activeInstallation: (state) => data(state).activeInstallation
  }
}

export const UserSelectors = (raw) => {
  return {
    status: userStatusSelectors(state => raw(state).status),
    login: userAuthSelectors(state => raw(state).login),
    register: userAuthSelectors(state => state.user.register)
  }
}

export default UserSelectors