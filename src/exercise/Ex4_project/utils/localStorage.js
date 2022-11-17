const get = async (key) => {
  try {
    const token = await localStorage.getItem(key)
    return token
  } catch (err) {
    return null
  }
}

const set = async (key, token) => {
  await localStorage.setItem(key, JSON.stringify(token))
}

const remove = async (key) => {
  await localStorage.removeItem(key)
}

export const LocalStorage = { get, set, remove }