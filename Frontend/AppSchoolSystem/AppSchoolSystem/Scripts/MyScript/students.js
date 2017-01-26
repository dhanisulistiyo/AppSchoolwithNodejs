$(document).ready(function () {
    var studentId = studentId;
    LoadStudents();
    fDelete(studentId);

    //Save Students
    $("body").on('submit', '#saveForm', function (e) {
        e.preventDefault();
        console.log(id);
        SaveStudents();
    });


    function SearchStudents(id) {
        console.log(id);
        window.location.href = '/Students/Details';
        var studentI = {
            id: id
        };

        $.ajax({
            url: 'http://localhost:8383/api/students/search',
            type: 'put',
            dataType: 'json',
            data: {
                id: $('#id').val(),
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
                var header = "<thead><tr><th>NIS</th><th>Nama</th><th>Kelas</th><th>Jenis Kelamin</th><th>Action</th></tr></thead>";
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
                        $row.append($('<td/>').html("<button type='submit' class='btn btn-default' class='detail' onclick=SearchStudents('" + d.students[i]._id + "'>Detail</button><button onclick=fDelete('" + d.students[i]._id + "') class='btn btn-default'>Delete </button> "));
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


    var students = {
        nis: $('#nis').val()=='' ? '0' : $('#nis').val(),
        nama: $('#nama').val().trim(),
        kelas: $('#kelas').val().trim(),
        jk: $('#jk').val().trim()
    };
    console.log(students);

    students.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    //Save Contact
    $.ajax({
        url: 'http://localhost:8383/api/students/create',
        type: 'POST',
        data: students,
        dataType: 'json',
        success: function (data) {
            console.log('Saved');
            window.location.href = '/Students/index';
        }
    });
}


//Delete Students
function fDelete(deleteId) {
    //event.preventDefault();
    console.log("Deletting record");
    console.log(deleteId);
    var studentId = {
        id: deleteId
    };

    var form = $(this);

    console.log(studentId);
    $.ajax({
        //url: 'http://192.168.1.29:3000/delete',
        url: 'http://localhost:8383/api/students/delete',
        data: studentId,
        type: 'post',
        dataType: 'json',
        crossDomain: true

    })
    .always(function (result) {
        console.log("From server...");

    })
    .done(function (result) {
        console.log("Successfuly delete...");
        LoadStudents();
    })
    .fail(function (xhr, result, error) {
        console.log(error);

    })
}


