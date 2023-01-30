$(document).ready(function(){
    fetchStudentsList()
    $('body').on('click', '.removeStudent', function(){
        const ra = $(this).data('ra');
        const confirmation = confirm("Você realmente deseja excluír esse usuário?");
        if(confirmation){
            deleteStudent(ra);
        }
    });
    $('#formSearchStudent').submit((event)=>{
        event.preventDefault();
        fetchStudentsList(event.target.searchInput.value);
    });
});

const deleteStudent = (ra) =>{
    fetch(`http://localhost:3006/students/delete/${ra}`, {
        method: 'DELETE'
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        // alert(data.message)
        fetchStudentsList()
    });
}

function fetchStudentsList(searchQuery = ''){

    $('.loader').show('fast');
    $('.content-page').hide();
    
    fetch(`http://localhost:3006/students/list/${searchQuery}`).then((response) => {
        return response.json();
    }).then((data) =>{
        const table = $('#studentList tbody');
        table.html('')
        data.map((student) =>{
            table.append
            (`
            <tr>
            <td>${student.ra}</td>
            <td>${student.nome}</td>
            <td>${student.cpf}</td>
            <td>
            <a href="studentsManager.html?ra=${student.ra}">Editar</a>
            <a class="removeStudent" data-ra="${student.ra}" href="#">Excluir</a>
            </td>
            </tr>
            `)
        })
            $('.loader').hide('fast');
            $('.content-page').show('fast');
    })
}