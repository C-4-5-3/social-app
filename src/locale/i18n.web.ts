import {useEffect} from 'react'
import {i18n} from '@lingui/core'

import {useLanguagePrefs} from '#/state/preferences'
import {sanitizeAppLanguageSetting} from '#/locale/helpers'
import {AppLanguage} from '#/locale/languages'

/**
 * We do a dynamic import of just the catalog that we need
 */
export async function dynamicActivate(locale: AppLanguage) {
  let mod: any

  switch (locale) {
    case AppLanguage.hi: {
      mod = await import(`./locales/hi/messages`)
      break
    }
    case AppLanguage.ja: {
      mod = await import(`./locales/ja/messages`)
      break
    }
    case AppLanguage.fr: {
      mod = await import(`./locales/fr/messages`)
      break
    }
    // DISABLED until this translation is fixed -prf
    // case AppLanguage.de: {
    //   mod = await import(`./locales/de/messages`)
    //   break
    // }
    // DISABLED until this translation is more thoroughly reviewed -prf
    // case AppLanguage.es: {
    //   mod = await import(`./locales/es/messages`)
    //   break
    // }
    default: {
      mod = await import(`./locales/en/messages`)
      break
    }
  }

  i18n.load(locale, mod.messages)
  i18n.activate(locale)
}

export async function useLocaleLanguage() {
  const {appLanguage} = useLanguagePrefs()
  useEffect(() => {
    dynamicActivate(sanitizeAppLanguageSetting(appLanguage))
  }, [appLanguage])
}
