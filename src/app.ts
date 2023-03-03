import axios from 'axios'
import { API_KEY } from '../config'

const form = document.querySelector('form')
const addressInput = document.getElementById('address') as HTMLInputElement

function searchAddressHandler (event: Event): void {
  event.preventDefault()
  let enteredAddress = ''
  if (addressInput != null) {
    enteredAddress = addressInput.value
  }

  // send to google api
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${API_KEY as string}`)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
}

if (form != null) {
  form.addEventListener('submit', searchAddressHandler)
}
