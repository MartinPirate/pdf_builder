var move = {
  methods: {
    initmovement (e) {
      var target = this.$vpd.state.activeElement

      // Set the initial value of the mobile state
      this.$vpd.commit('initmove', {
        startX: e.pageX,
        startY: e.pageY,
        originX: target.left,
        originY: target.top
      })

      // Bind mouse move event
      document.addEventListener('mousemove', this.handlemousemove, true)

      // Cancel mouse move event
      document.addEventListener('mouseup', this.handlemouseup, true)
    },

    handlemousemove (e) {
      e.stopPropagation()
      e.preventDefault()

      this.$vpd.commit('move', {
        x: e.pageX,
        y: e.pageY
      })
    },

    handlemouseup () {
      document.removeEventListener('mousemove', this.handlemousemove, true)
      document.removeEventListener('mouseup', this.handlemouseup, true)
      this.$vpd.commit('stopmove')
    }
  }
}

export { move }
