window.onload = () => {
  let basCroppeing = $('#bas-cropping').croppie({
    viewport: {
      width: 200,
      height: 200,
    },
    boundary: {
      width: 300,
      height: 300,
    },
    showZoomer: true,
  })

  function readableFile(file) {
    let reader = new FileReader()
    reader.onload = function (e) {
      basCroppeing.croppie('bind', {
        url: e.target.result
      }).then(() => {
        $('.cr-slider').attr({
          'min': 0.5000,
          'max': 1.5000,
        })
      })
    }
    reader.readAsDataURL(file)
  }

  $('#profilePicFile').on('change', function (e) {
    if (this.files[0]) {
      readableFile(this.files[0])
      $('#crop-modal').modal({
        backdrop: 'static',
        keyboard: false
      })
    }
  })

  $('#cancel-cropping').on('click', function () {
    $('#crop-modal').modal('hide')
    setTimeout(() => {
      basCroppeing.croppie('destroy')
    }, 1000)
  })
}