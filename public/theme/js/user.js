/**
 *  load year, months ,days for user birthday form
 */
for (i = new Date().getFullYear(); i > 1900; i--){
    $('#years-birthday').append($('<option />').val(i).html(i));
}

for (i = 1; i < 13; i++){
    $('#months-birthday').append($('<option />').val(i).html(i));
}
updateNumberOfDays();

$('#years-birthday, #months-birthday').on("change", function(){
    updateNumberOfDays();
});

function updateNumberOfDays(){
    $('#days-birthday').html('');
    month=$('#months-birthday').val();
    year=$('#years-birthday').val();
    days=daysInMonth(month, year);

    for(i=1; i < days+1 ; i++){
        $('#days-birthday').append($('<option />').val(i).html(i));
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

