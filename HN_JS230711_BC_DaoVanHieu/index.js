
let renderSeleter = document.querySelector('tbody');
let btnSelecter = document.querySelector('.save_data')
let nameSelector = document.querySelector('#name');
let phoneSelector = document.querySelector('#phone');
let emailSelector = document.querySelector('#email');
let addressSelector = document.querySelector('#address');
let sortName= document.querySelector('.sort_name')
let searchName= document.querySelector('.btn_search')
let searchValue =document.querySelector('.searchValue')
let error=document.querySelector('.error')
let students = [
    {
        id: crypto.randomUUID(),
        name: 'a',
        email: 'daovanhieuu204@gmail.com',
        phone: '0987654321',
        address: 'Hải Dương',
        sex: 'Nam'

    },
    {
        id: crypto.randomUUID(),
        name: 'b',
        email: 'daovanhieuu204@gmail.com',
        phone: '0987654321',
        address: 'Hải Dương',
        sex: 'Nam'

    },
    {
        id: crypto.randomUUID(),
        name: 'c',
        email: 'daovanhieuu204@gmail.com',
        phone: '0987654321',
        address: 'Hải Dương',
        sex: 'Nam'

    }
];

function showStudent() {
    let result = '';
    for (let i = 0; i < students.length; i++) {
        result += `
    <tr> 
    <td> ${i + 1}</td>
    <td> ${students[i].name} </td>
    <td> ${students[i].email} </td>
    <td> ${students[i].phone} </td>
    <td> ${students[i].address} </td>
    <td> ${students[i].sex} </td>
   <td> 
   <button type="button" data-id="${students[i].id}" class="btn btn-edit">Edit  </button>
   <button type="button" data-id="${students[i].id}" class="btn btn-delete">Delete </button>
   </td>
    </tr>
    `
    }
    renderSeleter.innerHTML = result

}

function handleAddStudent(event) {

    let name = nameSelector.value;
    let email = emailSelector.value;
    let phone = phoneSelector.value;
    let address = addressSelector.value;
    let sex = document.querySelector('.sex_choose:checked').value;

    // if (sex) {
    //     if (sex == 1) {
    //         sex = 'Nam'
    //     } else if (sex == 0) {
    //         sex = 'Nữ'
    //     }
    // }


    let emailVal = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let phoneVal = /((09|03|07|08|05)+([0-9]{8})\b)/g;

  // validate Name
  if (!name) {
    alert("Tên không được để trống");
    return;
  }

  // validate Email
  if (!emailVal.test(email)) {
    alert("Email không đúng định dạng");
    return;
  }
  // validate phone
  if (!phoneVal.test(phone)) {
    alert("Số điện thoại không đúng định dạng(phải có 10 số)");
    return;
  }

  // validate địa chỉ
  if (!address) {
    alert("Địa chỉ không được để trống");
    return;
  }

    if (event.target.classList.contains('update')) {
        let idUpdate = event.target.getAttribute('data-id');
        let indexEdit;
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === idUpdate) {
                indexEdit = i;
                break ;
            }
        }
        students[indexEdit].name = name;
        students[indexEdit].email = email;
        students[indexEdit].address = address;
        students[indexEdit].phone = phone;
        students[indexEdit].sex = sex;
       
        document.querySelector('form').reset();
        // 7. reset button update to add
        btnSelecter.classList.remove('update');
        btnSelecter.removeAttribute('data-id');
        btnSelecter.innerText = 'Lưu Lại';
         showStudent();
    } else{
         let objStudentAdd = {
        id: crypto.randomUUID(),
        name: name,
        email: email,
        phone: phone,
        address: address,
        sex: sex

    }
    students.push(objStudentAdd);
    nameSelector.value = ''
    emailSelector.value = ''
    phoneSelector.value = ''
    addressSelector.value = ''
    showStudent()
    }

   

}

function handleProcet(event) {
    let clicked = event.target;
    if (clicked.classList.contains('btn-delete')) {
        let confirmDelete = confirm('Bạn có muốn xóa không');
        if (confirmDelete) {
            let idDelete = clicked.getAttribute('data-id');
            let indexDelete;
            for (let i = 0; i < students.length; i++) {
                if (students[i] === idDelete) {
                    indexDelete = i
                    break;
                }
            }
            students.splice(idDelete, 1)
            if (students.length === 0) {
                document.querySelector('.styled-table').classList.add('hide');
                document.querySelector('.list_header').innerText = 'Danh Sách Sinh Viên'
            }
            showStudent();
            // chỉnh sửa btn chuẩn cfm 
            document.querySelector('form').reset();
            btnSelecter.classList.remove('update');
            btnSelecter.removeAttribute('data-id');
            btnSelecter.innerText = 'Lưu Lại'
        }
    } else if (clicked.classList.contains('btn-edit')) {
        let idEdit = clicked.getAttribute('data-id');
        let indexUpdate;
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === idEdit) {
                indexUpdate = i;
                break;  
            }
        }
        let objEdit=students[indexUpdate]
        nameSelector.value = objEdit.name;
        emailSelector.value = objEdit.email;
        phoneSelector.value = objEdit.phone;
        addressSelector.value = objEdit.address;
      document.querySelector(`input[value=${objEdit.sex}]`).checked = true;

        btnSelecter.classList.add('update');
        btnSelecter.setAttribute('data-id', idEdit);
        btnSelecter.innerText = 'Update'
       
    } showStudent()
}

function handleSortStudent() {
    students.sort(
        function(a, b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if(nameA < nameB) {
                return -1;
            }
            if(nameA > nameB) {
                return 1;
            }
            return 0;
        }
    )
    showStudent();
}

function handleSearch() {
    let valueSearch = searchValue.value.toLowerCase();
    console.log(valueSearch);
    // 1. Tìm ra item filter thỏa mãn
    let studentFilter = students.filter(
        function(studentItem) {
            return studentItem.name.toLowerCase().indexOf(valueSearch) !== -1;
        }
    );
    // 2. render data
    let resultHtml = '';
    for (let i = 0; i < studentFilter.length; i++) {
        let student = studentFilter[i];
        resultHtml = resultHtml + ` <tr>
                <td>${i + 1}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.address}</td>
                <td>${student.sex}</td>
                <td>
                    <button type="button" data-id="${student.id}" class="btn btn-edit">Edit</button>
                    <button type="button" data-id="${student.id}" class="btn btn-delete">Delete</button>
                </td>
            </tr>`
    }
    // 2. Đưa html vào trong tbody
    renderSeleter.innerHTML = resultHtml;
}

btnSelecter.addEventListener('click', handleAddStudent);
renderSeleter.addEventListener('click', handleProcet)
sortName.addEventListener('click', handleSortStudent)
searchName.addEventListener('click',handleSearch)
showStudent();

