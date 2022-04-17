import messages from './messages'
import Inter from './inter'
import Vue from 'vue'

Vue.use(Inter)

export default new Inter({
  locale: ' en', // setup locale
  messages: messages
})
