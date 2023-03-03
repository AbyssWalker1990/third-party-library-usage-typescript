import axios from 'axios'
import { API_KEY } from '../config'

interface Results {
  results: Array<{ geometry: { location: { lat: number, lng: number } } }>
  status: 'OK' | 'ZERO_RESULTS'
}

const form = document.querySelector('form')
const addressInput = document.getElementById('address') as HTMLInputElement

function searchAddressHandler (event: Event): void {
  event.preventDefault()
  let enteredAddress = ''
  if (addressInput != null) {
    enteredAddress = addressInput.value
  }

  // send to google api
  axios
    .get<Results>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${API_KEY as string}`)
    .then(response => {
      if (response.data.status !== 'OK') {
        throw new Error('Couldnt fetch location')
      }
      const coordinates = response.data.results[0].geometry.location
    })
    .catch(err => {
      alert(err.message)
      console.log(err)
    })
}

if (form != null) {
  form.addEventListener('submit', searchAddressHandler)
}
