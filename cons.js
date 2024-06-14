// Initialize variables
let count = 0; // Counter for student IDs
let students = []; // Array to store student data
let global_id; // Global variable to store student ID for editing

// User authentication functions
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Signup successful! Please login.');
        showLoginPage();
    } else {
        alert('Please fill in all fields.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        showMainPage();
    } else {
        alert('Invalid username or password.');
    }
}

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    showLoginPage();
}

// Routing functions
function showSignupPage() {
    hideAllPages();
    document.getElementById('signup-page').style.display = 'block';
}

function showLoginPage() {
    hideAllPages();
    document.getElementById('login-page').style.display = 'block';
}

function showMainPage() {
    hideAllPages();
    document.getElementById('main-page').style.display = 'block';
    showTable();
}

function showTablePage() {
    hideAllPages();
    document.getElementById('table-page').style.display = 'block';
}

function hideAllPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
}

// Student management functions
function addStudent() {
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const ageValue = document.getElementById('age').value;
    const gradeValue = document.getElementById('grade').value;
    const degreeValue = document.getElementById('degree').value;

    if (document.querySelector("#submit").innerText == "Edit Student") {
        let index;
        for (let i = 0; i < students.length; i++) {
            if (students[i]['ID'] == global_id) {
                index = i;
                break;
            }
        }

        let studentobj = students[index];
        studentobj['name'] = nameValue;
        studentobj['email'] = emailValue;
        studentobj['grade'] = gradeValue;
        studentobj['age'] = ageValue;
        studentobj['degree'] = degreeValue;

        students[index] = studentobj;

        showTable();
        document.querySelector("#submit").innerHTML = "Add Student";
        resetForm();
        return;
    }

    if (nameValue == '' || emailValue == '' || ageValue == '' || gradeValue == '' || degreeValue == "") {
        alert("All fields are required!");
        return;
    }

    count++;
    students.push({
        ID: count,
        name: nameValue,
        email: emailValue,
        age: ageValue,
        grade: gradeValue,
        degree: degreeValue
    });

    resetForm();
    showTable();
}

function resetForm() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    document.getElementById('grade').value = "";
    document.getElementById('degree').value = "";
}

function showTable() {
    const table = document.getElementById('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    students.forEach((student) => {
        const row = document.createElement("tr");
        var keys = Object.keys(student);

        keys.forEach((key) => {
            if (key !== 'ID') { // Exclude ID from displaying in table cells
                const cell = document.createElement('td');
                cell.textContent = student[key];
                row.appendChild(cell);
            }
        });

        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<div class='actions'>
            <button class='action-btn' onclick="edit(${student['ID']})"><i class='fa fa-pencil'></i></button>
            <button class='action-btn' onclick="del(${student['ID']})"><i class='fa fa-trash'></i></button>
        </div>`;
        row.appendChild(actionCell);

        table.appendChild(row);
    });
}

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        let found = false;
        for (let j = 0; j < td.length; j++) {
            let cell = td[j];
            if (cell) {
                txtValue = cell.textContent || cell.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function edit(id) {
    let student = students.find(student => student.ID === id);

    if (student) {
        document.getElementById('name').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('grade').value = student.grade;
        document.getElementById('age').value = student.age;
        document.getElementById('degree').value = student.degree;

        document.getElementById('submit').innerText = "Edit Student";
        global_id = id;
    }
}

function del(id) {
    students = students.filter(student => student.ID !== id);
    showTable();
}

// Initial display setup
document.addEventListener('DOMContentLoaded', () => {
    showSignupPage(); // Initial page to show
});
