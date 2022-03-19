// static data
let users = [
  {
    id: "123456789",
    createdDate: "2021-01-06T00:00:00.000Z",
    status: "En validation",
    firstName: "Mohamed",
    lastName: "Taha",
    userName: "mtaha",
    registrationNumber: "2584",
  },
  {
    id: "987654321",
    createdDate: "2021-07-25T00:00:00.000Z",
    status: "Validé",
    firstName: "Hamid",
    lastName: "Orrich",
    userName: "horrich",
    registrationNumber: "1594",
  },
  {
    id: "852963741",
    createdDate: "2021-09-15T00:00:00.000Z",
    status: "Rejeté",
    firstName: "Rachid",
    lastName: "Mahidi",
    userName: "rmahidi",
    registrationNumber: "3576",
  }
]
// pop up
const openForm = document.getElementById('showForm')
const closeForm = document.getElementById('hideForm')
const formContainer = document.getElementById('form-container')

openForm.addEventListener('click', () => {
  formContainer.classList.add('show')
})


//define UI vars
const form = document.getElementById("userForm");
const usersList = document.getElementById('dataTable')
const deleteBtn = document.querySelectorAll('.icon')

// adding events
// add user event
form.addEventListener("submit", addUser)
// remove user event
usersList.addEventListener("click",removeUser)

// add user function
function addUser(e) {

  let lastName = document.getElementById('lastNameInput')
  let firstName = document.getElementById('firstNameInput')
  let status = document.getElementById('statusInput')
  let userName = document.getElementById('userNameInput')
  let createdDate = document.getElementById('createdDateInput')
  let registrationNumber = document.getElementById('registrationNumberInput')

  if (
    lastName.value === "",
    firstName.value === "",
    status.value === "",
    userName.value === "",
    createdDate.value === "",
    registrationNumber.value === ""
  ) {
    alert('please fill in all fields')
    formContainer.classList.add('show')
  }else {
    // generat random number for the id
    let id = Math.floor(100000000 + Math.random() * 999999999)
    

  const dataTable = document.getElementById("dataTable")
  const tr = document.createElement('tr')
  tr.innerHTML =
    ` <td>${id}</td>
      <td>${reformatDate(createdDate.value)}</td>
      <td><div class="status">${status.value}</div></td>
      <td>${firstName.value}</td>
      <td>${lastName.value}</td>
      <td>${userName.value}</td>
      <td>${registrationNumber.value}</td>
      <td><a class="icon"></a></td>`
    dataTable.appendChild(tr)
    
    lastName.value = "",
    firstName.value = "",
    status.value = "",
    userName.value = "",
    createdDate.value = "",
    registrationNumber.value = ""
    const newUser = {
      id: id,
      createdDate: createdDate.value,
      status: status.value,
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      registrationNumber: registrationNumber.value,
    }

    users.push(newUser)
    changecolor(newUser.id)
    formContainer.classList.remove('show')
  }
  

  e.preventDefault()
}

// get user index and remove it from array function
function indexOf(userId) {
  const indexOfUser = users.findIndex(
    user => {
      return user.id === userId;
    }
  )
  users.splice(indexOfUser,1)
}


// remove user from table and array
function removeUser(e) {
  if (e.target.classList.contains('icon')) {
    if (confirm('are you sure ?')) {
      e.target.parentElement.parentElement.remove()
      const id = e.target.parentElement.parentElement.firstElementChild.innerHTML;
      indexOf(id)
    }
  }
}

// displaying data
users.forEach(user => {

  const dataTable = document.getElementById("dataTable")
  const tr = document.createElement('tr')
  
  tr.innerHTML =
    ` <td>${user.id}</td>
      <td>${reformatDate(user.createdDate)}</td>
      <td><div class ="status">${user.status}</div></td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.userName}</td>
      <td>${user.registrationNumber}</td>
      <td><a class="icon"></a></td>
    `
  dataTable.appendChild(tr)
  changecolor(user.id)

});


// reformat date fucntion
function reformatDate(selectedDate) {
  const oldDate = Date.parse(selectedDate)
  const date = new Date(oldDate)
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric'
  }
  const result = date.toLocaleDateString('en', options)
  return result
}



// stat color function
function changecolor(userId) {
  const indexOfUser = users.findIndex(
    user => {
      return user.id === userId;
    }
  )
  const s = document.querySelectorAll('.status')

  if (s[indexOfUser].innerHTML === 'Validé') {
    s[indexOfUser].classList.add('valide')
  } else if (s[indexOfUser].innerHTML === 'Rejeté') {
    s[indexOfUser].classList.add('rejected')
  } else {
    s[indexOfUser].classList.add('on-validation')
  }
  
  s[indexOfUser].classList.add('valide')
  console.log(s[indexOfUser].innerHTML);
}
