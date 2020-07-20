$(document).ready(function () {
    $.getJSON("/api/project", data => {
        var newRow = true;
        var domStr = '<div class="container">'
        data.forEach(currentProject => {
            if (newRow) {
                domStr += '<div class="row">';
            }
            domStr += '<div class="col-sm-6">';
            domStr += '<div class="card">';
            domStr += '<h5 class="centered"> ' + currentProject.name + '</h5>';
            domStr += '</div>';
            domStr += '<div class="card-body">';
            domStr += '<p class="card-text">';
            domStr += createRadioButtonString(currentProject)
            domStr += '</p>';
            domStr += '</div></div>';
            if (!newRow) {
                domStr += '</div>';
            }
            newRow = !newRow;
        });
        domStr += '</div>'
        $("div#secondContainer").html(domStr);

    })
})
function createRadioButtonString(currentProject) {
    var formStr = '<form action="/api/project/' + currentProject.id + '"  method="POST">'
    formStr += '<p>Wählen Sie die Bilder für das Projektshowcase aus</p>'
    formStr += '<fieldset>'
    formStr += '<ul style="list-style-type:none;">'
    for (var i = 0; i < 5; i++) {
        formStr += '<li>'
        formStr += '<label>'
        formStr += '<input type="checkbox" name="choosenImages" value=' + i + ' ' + getCheckedStatus(currentProject.imageJSON, i) + '>'
        formStr += ' Bild ' + (i + 1)
        formStr += '</label>'
        formStr += '</li>'
    }
    formStr += '</ul>'
    formStr += '</fieldset>'
    formStr += '<button type="submit">Bestätigen</button>'
    formStr += '</form><br/>'
    formStr += '<form action="/api/project/' + currentProject.id + '?_method=DELETE" method="POST">'
    formStr += '<input type="checkbox" name="confirmed" required="">'
    formStr += '<button type="submit">  Löschen</button>'
    formStr += '</form>'
    return formStr
}

function getCheckedStatus(array, index) {
    if (array.includes(index)) {
        return 'checked'
    } else {
        return ''
    }

}