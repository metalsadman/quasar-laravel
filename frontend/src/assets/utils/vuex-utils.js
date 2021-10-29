// edited from vuex-mapfields lib
export default function arrayToObject (fields = []) {
  return fields.reduce((prev, path) => {
    const key = path.split(`.`).slice(-1)[0]

    if (prev[key]) {
      throw new Error(`The key \`${key}\` is already in use.`)
    }

    // eslint-disable-next-line no-param-reassign
    prev[key] = path

    return prev
  }, {})
}

function normalizeNamespace (fn) {
  return (...params) => {
    // eslint-disable-next-line prefer-const
    let [namespace, map, getterType, mutationType] =
      typeof params[0] === `string` ? [...params] : [``, ...params]

    if (namespace.length && namespace.charAt(namespace.length - 1) !== `/`) {
      namespace += `/`
    }

    getterType = `${namespace}${getterType || `getField`}`
    mutationType = `${namespace}${mutationType || `updateField`}`

    return fn(namespace, map, getterType, mutationType)
  }
}

export function getField (state) {
  return path => path.split(/[.[\]]+/).reduce((prev, key) => prev[key], state)
}

export function updateField (state, { path, value }) {
  path.split(/[.[\]]+/).reduce((prev, key, index, array) => {
    if (array.length === index + 1) {
      // eslint-disable-next-line no-param-reassign
      prev[key] = value
    }

    return prev[key]
  }, state)
}

export const mapFields = normalizeNamespace(
  (namespace, fields, getterType, mutationType) => {
    const fieldsObject = Array.isArray(fields) ? arrayToObject(fields) : fields

    return Object.keys(fieldsObject).reduce((prev, key) => {
      const path = fieldsObject[key]
      const field = {
        get () {
          return this.$store.getters[getterType](path)
        },
        set (value) {
          this.$store.commit(mutationType, { path, value })
        }
      }

      // eslint-disable-next-line no-param-reassign
      prev[key] = field

      return prev
    }, {})
  }
)

// still not working as it suppose to
// use mapFields for the meantime
export const mapObjectFields = normalizeNamespace(
  (namespace, paths, getterType, mutationType) => {
    const pathsObject = paths

    return Object.keys(pathsObject).reduce((entries, key) => {
      const path = pathsObject[key].replace(/\.?\*/g, ``)
      // eslint-disable-next-line no-param-reassign
      entries[key] = {
        get () {
          const store = this.$store

          const fieldsObject = store.getters[getterType](path)
          if (!fieldsObject) {
            // return {}
            return fieldsObject
          }

          return Object.keys(fieldsObject).reduce((prev, fieldKey) => {
            const fieldPath = path ? `${path}.${fieldKey}` : fieldKey

            return Object.defineProperty(prev, fieldKey, {
              enumerable: true,
              get () {
                return store.getters[getterType](fieldPath)
              },
              set (value) {
                store.commit(mutationType, { path: fieldPath, value })
              }
            })
          }, {})
        },
        set (value) {
          this.$store.commit(mutationType, { path, value })
        }
      }

      return entries
    }, {})
  }
)

export const mapMultiRowFields = normalizeNamespace(
  (namespace, paths, getterType, mutationType) => {
    const pathsObject = Array.isArray(paths) ? arrayToObject(paths) : paths
    return Object.keys(pathsObject).reduce((entries, key) => {
      const path = pathsObject[key]

      // eslint-disable-next-line no-param-reassign
      entries[key] = {
        get () {
          const store = this.$store
          const rows = store.getters[getterType](path)
          // added check
          if (!rows) {
            return rows
          }
          return rows.map((fieldsObject, index) =>
            Object.keys(fieldsObject).reduce((prev, fieldKey) => {
              const fieldPath = `${path}[${index}].${fieldKey}`

              return Object.defineProperty(prev, fieldKey, {
                get () {
                  return store.getters[getterType](fieldPath)
                },
                set (value) {
                  store.commit(mutationType, { path: fieldPath, value })
                }
              })
            }, {})
          )
        },
        set (value) {
          this.$store.commit(mutationType, { path, value })
        }
      }
      return entries
    }, {})
  }
)

export const createHelpers = ({ getterType, mutationType }) => ({
  [getterType]: getField,
  [mutationType]: updateField,
  mapFields: normalizeNamespace((namespace, fields) =>
    mapFields(namespace, fields, getterType, mutationType)
  ),
  mapMultiRowFields: normalizeNamespace((namespace, paths) =>
    mapMultiRowFields(namespace, paths, getterType, mutationType)
  ),
  mapObjectFields: normalizeNamespace((namespace, paths) =>
    mapObjectFields(namespace, paths, getterType, mutationType)
  )
})
