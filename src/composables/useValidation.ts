import { type ZodTypeAny, z } from 'zod'
import { get, groupBy } from 'lodash-es'
import { ref, watch, toValue, type MaybeRefOrGetter } from 'vue'

export default function <T extends ZodTypeAny>(schema: T, data: MaybeRefOrGetter<Record<string, unknown>>, options?: { mode: 'eager' | 'lazy' }) {
  const opts = Object.assign({}, { mode : 'lazy'}, options)

  const isValid = ref(true)

  let unwatch: null | (() => void) = null

  const errors = ref<Record<string, z.ZodIssue[]> | null>(null)

  const clearErrors = () => {
    errors.value = null
  }

  const validationWatch = () => {
    if (unwatch !== null) {
      return
    }

    unwatch = watch(
      () => toValue(data),
      async () => {
        await validate()
      },
      { deep: true }
    )
  }

  const validate = async () => {
    clearErrors()

    const result = await schema.safeParseAsync(toValue(data))

    isValid.value = result.success

    if (!result.success) {
      errors.value = groupBy(result.error.issues, 'path')
      validationWatch()
    }

    return errors
  }

  const scrolltoError = (selector = '.is-error', options = { offset: 0 }) => {
    const element = document.querySelector(selector)

    if (element) {
      const topOffset = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - options.offset

      window.scrollTo({
        behavior: 'smooth',
        top: topOffset
      })
    }
  }

  const getError = (path: string) => get(errors.value, `${path?.split('.').join(',')}.0.message`)
  const isInValid =  (path: string) => !!get(errors.value,path)
  if (opts.mode === 'eager') {
    validationWatch()
  }

  return { validate, errors, isValid, clearErrors, getError, scrolltoError, isInValid }
}
