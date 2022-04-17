<template>
  <div
    v-if="tab === 3"
    class="panel-wrap">
    <p>Format Section</p>
  </div>
</template>

<script>
import { getAnimateCss } from '../../utils/css-generate.js'
import vpd from '../../mixins/vpd'
export default {
  name: 'PanelAnimation',
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  data () {
    return {
      currentName: '',
      currentAnimation: null
    }
  },

  computed: {
    animationNames () {
      var arr = []
      this.$vpd.state.animation.map(val => arr.push(val.name))

      return arr
    }
  },

  watch: {
    currentName: function (val) {
      if (this.activeElement.animationName !== undefined) {
        this.activeElement.animationName = val
      }
      this.getCurrentAnimation(val)
    },

    activeElement: function (val) {
      if (val.animationName !== undefined) {
        this.currentName = val.animationName
      } else {
        this.currentName = ''
      }
    }
  },

  methods: {
    addAnimation () {
      if (this.$vpd.state.animation.some(val => val.name === '')) {
        this.$vpd.$emit('notify', {
          info: this.$t('messages.alerts.unnamedanimations')
        })
        return
      }
      this.$vpd.commit('addAnimation')
      this.currentName = ''
      this.getCurrentAnimation('')
    },

    getCurrentAnimation (name) {
      var result = this.$vpd.state.animation.filter(val => val.name === name)
      this.currentAnimation = result[0]
    },

    addkeyframe () {
      var name = this.currentAnimation.name
      if (name === '') {
        this.$vpd.$emit('notify', {
          info: this.$t('messages.alerts.animation_name_required')
        })
        return
      }
      this.$vpd.commit('addkeyframe', name)
    },

    validateName (e) {
      var value = e.target.value
      if (value === '') return
      if (!/^[a-zA-Z]/.test(value)) {
        this.$nextTick(() => {
          this.currentAnimation.name = ''
        })
        this.$vpd.$emit('notify', {
          info: this.$t('messages.alerts.animation_name_validate')
        })
      }

      if (/\W/g.test(value)) {
        this.$nextTick(() => {
          this.currentAnimation.name = value.replace(/\W/g, '')
        })
        this.$vpd.$emit('notify', {
          info: this.$t('messages.alerts.animation_name_validate')
        })
      }
    },

    play () {
      // stop animation if any
      this.$vpd.commit('setAnimation', false)

      setTimeout(() => {
        var animations = this.$vpd.state.animation
        if (animations.length === 0) return

        animations.map(val => {
          // build style code and insert into document
          var id = 'anm-' + val.name
          var styleNode = document.getElementById(id)

          if (styleNode) {
            styleNode.innerHTML = getAnimateCss(
              val.name,
              val,
              val.keyframes,
              false
            )
          } else {
            var style = document.createElement('style')
            style.id = id
            style.innerHTML = getAnimateCss(
              val.name,
              val,
              val.keyframes,
              false
            )
            document.head.append(style)
          }
        })

        this.$vpd.commit('setAnimation', true)
      }, 200)
    }
  }
}
</script>

<style scoped>
textarea {
  width: 290px;
  height: 100px;
  resize: none;
  border-radius: 4px;
  padding: 4px 6px;
  margin-left: 20px;
  border-color: #ccc;
}
</style>
