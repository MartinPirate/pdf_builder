<template>
  <input
    id="uploader"
    :multiple="multiple ? 'multiple' : false"
    type="file"
    accept="image/png, image/jpeg, image/gif"
    style="display: none"
    @change="handleUpload">
</template>

<script>
import vpd from '../mixins/vpd'
export default {
  name: 'VpdUploader',
  mixins: [vpd],
  props: {
    upload: Function,
    uploadOption: Object
  },
  data () {
    return {
      multiple: false, // Whether to allow multiple uploads
      uploader: null, // input file
      cb: null // Callback
    }
  },

  computed: {
    // The ordinate of the initial position of the picture
    top () {
      return this.$vpd.state.top
    }
  },

  mounted () {
    this.uploader = document.getElementById('uploader')

    /**
     * Register for upload image custom event on global communication mediation
     * All places that need to upload pictures can be called
     *
     * call method：
     * this.$vpd.$emit('upload', function (payload) {/.../})
     * @param payload { Array } An array containing all image objects after image upload and download is complete
     * @param multiple { Boolean }Whether to upload multiple sheets, the default is false
     */
    this.$vpd.$on('upload', (cb, multiple) => {
      this.multiple = !!multiple
      this.cb = cb
      setTimeout(() => {
        this.uploader.click()
      }, 0)
    })
  },

  methods: {
    // Handle the operation of adding pictures and trigger events：change
    handleUpload () {
      var files = this.uploader.files

      if (!files || files.length === 0) return

      files = Array.prototype.slice.call(this.uploader.files)

      let uploadFn = this.upload || this.defaultUpload

      uploadFn(files).then(res => {
        console.log('status: ', res.status)
        // Execute the callback after the image download queue is complete
        new Promise(resolve => {
          this.handleLoadQueue(resolve, res.files)()
        }).then(payload => {
          this.cb(payload)
        })
      })
    },

    defaultUpload (files) {
      if (this.uploadOption.url) {
        var data = new FormData()
        files.forEach(file => data.append('file[]', file))

        return fetch(this.uploadOption.url, {
          method: 'POST',
          body: data
        })
      } else {
        alert(this.$t('messages.alerts.imageUploadApiConfigurator'))
      }
    },

    /**
     * Handling download queues
     * The pictures are downloaded in order and then the next one is downloaded to ensure that the picture array is in the order of upload
     */
    handleLoadQueue (resolve, files) {
      var i = 0
      var len = files.length
      var payload = []

      var download = () => {
        // After connecting to the backend, files should be changed to callback parameters
        // url = files[i]
        var url = window.URL.createObjectURL(files[i])

        new Promise(resolve => {
          this.getImageWidth(url, resolve)
        }).then(size => {
          payload.push({
            width: size.w,
            height: size.h,
            top: this.top,
            url: url, // Image preview address
            src: 'images/' + files[i].name // The actual address of the picture
          })

          // After all images are downloaded, skip to the next step, otherwise continue to download
          if (++i === len) {
            resolve(payload)
          } else {
            download()
          }
        })
      }

      return download
    },

    /**
     * Use the new Image preload method to get the image width and height
     * This is an asynchronous operation and must use a promise
     *
     * @param url { URL | base64 } image url
     * @param res { Promise resolve }
     *
     * @return { Object } An object containing the width and height of the image
     */
    getImageWidth (url, res) {
      var img = new Image()
      img.src = url
      img.onload = function () {
        res({
          w: Math.round(img.width),
          h: Math.round(img.height)
        })
      }
    }
  }
}
</script>
