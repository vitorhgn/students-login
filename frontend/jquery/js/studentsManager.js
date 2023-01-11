$(document).ready(function(){
    const urlSearch = new URLSearchParams(window.location.search);
    const ra = urlSearch.get('ra');
    if(ra){
        fetchStudent(ra);
    }else{
        $('.content-page').show()
        $('.loader').hide()
    }

    $('#studentForm').submit((event)=>{
        event.preventDefault();
        const body = {
            name:$(this).find('#name').val(),
            ra:$(this).find('#ra').val(),
            cpf:$(this).find('#cpf').val(),
            email:event.target.email.value,
        };
        fetch('http://localhost:3000/students/save', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            } 
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            alert(data.message),
            document.location.href = 'studentsList.html';
        })
    })
})
function fetchStudent(ra){
        fetch(`http://localhost:3000/students/find/${ra}`).then(function(response){
            return response.json();
        }).then(function(data){
            const studentForm = $('#studentForm');
            studentForm.find('#name').val(data.nome)
            studentForm.find('#email').val(data.email)
            studentForm.find('#ra').val(data.ra)
            studentForm.find('#cpf').val(data.cpf)
            console.log(data)
            $('.content-page').show('fast')
            $('.loader').hide('fast')
        })
    }