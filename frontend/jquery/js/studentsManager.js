$(document).ready(function(){
    if(isEditindMode()){
        setReadOnlyFields();
        fetchStudent();
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

        let methodEndPoint;
        let urlEndPoint;
        if(isEditindMode()){
            methodEndPoint = 'PUT';
            urlEndPoint = `http://localhost:3000/students/edit/${getRaFromURL()}`
        }else{
            methodEndPoint = 'POST';
            urlEndPoint = 'http://localhost:3000/students/save'
        }
console.log(urlEndPoint, methodEndPoint)
        fetch(urlEndPoint, {
            method: methodEndPoint,
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            } 
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            alert(data.message);
            if(data.result == true){
                document.location.href = 'studentsList.html';
            }
        })
    })
})



function setReadOnlyFields(){
    const studentForm = $('#studentForm')
    studentForm.find('#ra').attr('readonly', true);
    studentForm.find('#cpf').attr('readonly', true);
}

function fetchStudent(){
        fetch(`http://localhost:3000/students/find/${getRaFromURL()}`).then(function(response){
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
    function isEditindMode(){
        const urlSearch = new URLSearchParams(window.location.search);
        return urlSearch.has('ra');
    }
    function getRaFromURL(){
        const urlSearch = new URLSearchParams(window.location.search);
        return urlSearch.get('ra');
    }