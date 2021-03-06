import { lngFromReq, redirectWithoutCache } from 'utils'

export default (req, res) => {
  if (req.i18n) {
    const language = lngFromReq(req)
    const { allLanguages, defaultLanguage } = req.i18n.options
    let languageChanged = false
    /*
      If a user has hit a subpath which does not
      match their language, give preference to
      the path, and change user language.
    */
    allLanguages.forEach((lng) => {
      if (req.url.startsWith(`/${lng}/`) && language !== lng) {
        req.i18n.changeLanguage(lng)
        languageChanged = true
      }
    })
    /*
      If a user has hit the root path and their
      language is not set to default, give
      preference to the language and redirect
      their path.
    */
    if (!languageChanged && language !== defaultLanguage && !req.url.startsWith(`/${language}/`)) {
      allLanguages.forEach((lng) => {
        if (req.url.startsWith(`/${lng}/`)) {
          req.url = req.url.replace(`/${lng}/`, '/')
        }
      })
      redirectWithoutCache(res, req.url.replace('/', `/${language}/`))
    }
    /*
      If a user has a default language prefix
      in their URL, strip it.
    */
    // if (language === defaultLanguage && req.url.startsWith(`/${defaultLanguage}/`)) {
    //   redirectWithoutCache(res, req.url.replace(`/${defaultLanguage}/`, '/'))
    // }
  }
}
