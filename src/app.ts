import axios from 'axios'
import { API_KEY } from '../config'

// declare let google: any

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
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: coordinates,
        zoom: 16
      })
      const marker = new google.maps.Marker({
        position: coordinates,
        map
      })
    })
    .catch(err => {
      alert(err.message)
      console.log(err)
    })
}

if (form != null) {
  form.addEventListener('submit', searchAddressHandler)
}

window.addEventListener('load', function () {
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY as string}`
  document.head.appendChild(script)
})
