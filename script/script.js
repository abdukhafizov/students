let body = document.body
let inputname = document.querySelector('.named')
let inputage = document.querySelector('.aged')
console.log(inputage);
let form = document.forms.ips
let tbody = document.querySelector("tbody")
let show = document.querySelector(".show")
const dialog = document.querySelector('[data-modal]')
const editForm = document.forms.change_task
console.log(editForm);
let edit_id

// console.log(tbody);
let userIdCounter = 1;


let user = [
    {
        id: 0,
        name: "Rayan",
        age: 1997,

    },
]
function getYearOfBirth(age) {
    const currentYear = new Date().getFullYear();
    return currentYear - age;
}

form.onsubmit = (event) => {
    

    event.preventDefault();
    let taskName = inputname.value.trim();
    let taskAge = parseInt(inputage.value); 

    if (taskName === '') {
        show.style.backgroundColor = "red"
        return;
    } 
    else {
        show.style.backgroundColor = "rgb(54, 54, 247)"
    }
    // Получаем год рождения, используя функцию getYearOfBirth()
    let taskYearOfBirth = getYearOfBirth(taskAge);
    console.log(taskYearOfBirth);
    let users = {
        id: userIdCounter,
        name: taskName,
        age: taskYearOfBirth,
    }

    user.push(users)
    reload(user, tbody)
    userIdCounter++
}

editForm.onsubmit = (e) => {
    e.preventDefault()

    const val = new FormData(editForm).get('users')

    let finded = user.find(el => el.id === edit_id)
    finded.users = val
    reload(user, tbody)
}


function reload(arr, place) {
    tbody.innerHTML = "";

    for (let item of arr) {
        let row = document.createElement('tr');
        
        let idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.append(idCell);
        
        let nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.append(nameCell);
        
        let ageCell = document.createElement('td');
        ageCell.textContent = item.age;
        row.append(ageCell);

        
        let actionsCell = document.createElement('td');
        let editImg = document.createElement('img');
        editImg.className = 'edit_img';
        editImg.src = './img/edit-svgrepo-com.svg';
        actionsCell.appendChild(editImg);

        let rubbishImg = document.createElement('img');
        rubbishImg.className = 'rubbish';
        rubbishImg.src = './img/rubbish-bin-svgrepo-com.svg';
        rubbishImg.alt = '';
        actionsCell.append(rubbishImg);
        
        row.append(actionsCell);

        place.append(row);

        rubbishImg.onclick = () => {
            user = user.filter(el => el.id !== item.id)
            row.remove()
            console.log("clol");
            
        }
        editImg.onclick = () =>{
            dialog.showModal()

            edit_id = item.id
        }
    }
}

reload(user, tbody);

// Пример использования:
