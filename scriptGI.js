// -----------contact form--------
const scriptURL = 'https://script.google.com/macros/s/AKfycbx8_5XvUprTs06dkiTlgoH4LrAll1KjZUINSZZVW_uZOhA6RhK2vXzPAapketvluwCP/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        }, 5000)
        form.reset()
    })
      .catch(error => console.error('Error!', error.message))
  })