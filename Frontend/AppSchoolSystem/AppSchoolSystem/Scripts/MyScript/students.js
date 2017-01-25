$(document).ready(function () {
   
    LoadStudents();

    $("#detailsId").click(function () {
        var id = $(this).$('myform').$('details').val();
        console.log(id);
        alert(id);
        alert(buttonValue);
    });

    //Save Students
    $("body").on('submit', '#saveForm', function (e) {
        e.preventDefault();
        SaveStudents();    
    });

    //Delete Students
    $('body').on('submit', '#deleteForm', function (e) {
        e.preventDefault();
        DeleteStudents();
    });

    function redirect() {
        window.location.href = '/Students/index';
    }
});


function LoadStudents() {
    $('#update_panel').html('Loading Data...');
    $('#example1').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });

    $.ajax({
        url: 'http://localhost:8383/api/students',
        type: 'GET',
        dataType: 'json',
        success: function (d, success) {
            console.log(" success " + JSON.stringify(success));
            console.log(" data " + JSON.stringify(d));
            var key, count = 0;
            for (key in d.students) {
                if (d.students[0]._id) {
                    count++;
                }
            }
            
            if (count > 0) {                
                var $data = $("<table id='example1'></table>").addClass("table table-bordered table-striped");
                var header = "<thead><tr><th>NIS</th><th>Nama</th><th>Kelas</th><th>Jenis Kelamin</th><th></th></tr></thead>";
                $data.append(header);
                console.log(" data " + count);
                
                $.each(d, function (data, row) {
                    for (var i = 0; i < count; i++) {
                        var $row = $('<tr/>');
                        $row.append($('<td/>').html(d.students[i].nis));
                        $row.append($('<td/>').html(d.students[i].nama));
                        $row.append($('<td/>').html(d.students[i].kelas));
                        $row.append($('<td/>').html(d.students[i].jenisKelamin));
                        //$row.append($('<td/>').html("<a href='/Students/Edit/" + d.students[i]._id + "' class='popup'>Edit</a>&nbsp;|&nbsp;<a href='http://localhost:8383/api/students/delete/" + d.students[i]._id + "'>Delete</a>"));
                        $row.append($('<td/>').html("<form name='myform' id='detailsId' action='students/details' method='get'><button id='detailsId' name='details' type='submit' value='" + d.students[i]._id + "'>Detail</button></form>"));
                        $data.append($row);
                    }
                    
                });
                $('#update_panel').html($data);
            }
            else {
                var $noData = $('<div/>').html('No Data Found!');
                $('#update_panel').html($noData);
            }
        },
        error: function () {
            alert('Error! Please try again.');
        }
    });
}

//Save Contact
function SaveStudents() {
    //Validation
    if ($('#nis').val().trim()==='' ||
        $('#nama').val().trim()=== '' ||
        $('#kelas').val().trim() === '' ||
        $('#jk').val().trim() === '') {
        return false;
    }

    var students = {
        nis: $('#nis').val()==='' ? '0' : $('#nis').val(),
        nama: $('#nama').val().trim(),
        kelas: $('#kelas').val().trim(),
        jk: $('#jk').val().trim()
    };

    students.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    //Save Contact
    $.ajax({
        url: 'http://localhost:8383/api/students/create',
        type: 'POST',
        data: students,
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                $('#nis').val('');
                $('#nama').val('');
                $('#kelas').val('');
                $('#jk').val('');
            }
            window.location.href = '/Students/index';
        }
    });
}

function DeleteStudents() {
    $.ajax({
        url: 'http://localhost:8383/api/students/delete',
        type: 'POST',
        dataType: 'json',
        data: {
            'id': $('#id').val(),
            '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').val()
        },
        success: function (data) {
            alert(data.message);
            if (data.status) {
                $dialog.dialog('close');
            }
        },
        error: function () {
            $('#msg').html('<div class="failed">Error ! Please try again.</div>');
        }
    });
}

function SearchStudents(id) {
    $.ajax({
        url: 'http://localhost:8383/api/students/delete/'+id,
        type: 'POST',
        dataType: 'json',
        data: {
            'id': $('#id').val(),
            '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').val()
        },
        success: function (data) {
            alert(data.message);
            if (data.status) {
                $dialog.dialog('close');
                LoadContacts();
            }
        },
        error: function () {
            $('#msg').html('<div class="failed">Error ! Please try again.</div>');
        }
    });
}

$(function () {
    $.getJSON('/api/rest/abc', function (data) {
        console.log(data);
    });
});