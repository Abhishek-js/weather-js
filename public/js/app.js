
console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msgOne')
const msgTwo = document.querySelector('#msgTwo')

weatherForm.addEventListener('submit' , (e) => {
e.preventDefault()
const location = search.value
fetch('http://localhost:3000/address?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msgOne.textContent = data.error
        } else {
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }
    })
})
})