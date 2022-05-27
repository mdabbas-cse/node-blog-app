class Flash {
  constructor(req) {
    this.req = req
    this.success = this.extractFlashMessage('success')
    this.fail = this.extractFlashMessage('fail')
  }

  extractFlashMessage(status) {
    const flashMessage = this.req.flash(status)
    return flashMessage.length > 0 ? flashMessage[0] : false
  }

  hasMessage() {
    return !this.success && !this.fail ? false : true
  }

  static getMessage(req) {
    const flash = new Flash(req)
    return {
      success: flash.success,
      fail: flash.fail,
      hasMessage: flash.hasMessage()
    }
  }
}

export default Flash