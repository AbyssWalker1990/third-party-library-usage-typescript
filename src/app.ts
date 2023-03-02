import dotenv from 'dotenv'
dotenv.config()

const form = document.querySelector('form')
const addressInput = document.getElementById('address') as HTMLInputElement

function searchAddressHandler (event: Event): void {
  event.preventDefault()
  if (addressInput != null) {
    const enteredAddress = addressInput.value
  }

  // send to google api
}

if (form != null) {
  form.addEventListener('submit')
}
