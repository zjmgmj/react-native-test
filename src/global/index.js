import local from './storage'

import XEUtils from 'xe-utils/methods/xe-utils'
import toDateString from 'xe-utils/methods/date/toDateString'
import clone from 'xe-utils/methods/base/clone'

XEUtils.mixin({
  toDateString,
  clone
})


global.XEUtils = XEUtils
global.local = local