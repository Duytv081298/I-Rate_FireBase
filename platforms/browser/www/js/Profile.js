document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    renderInfor()
    fetchData()
}
function renderInfor() {
    let avatar = user.name + ''
    avatar = avatar.substr(avatar.lastIndexOf(" ") + 1, 1)
    let infor = `
        <div class="row justify-content-end text-center">
            <div class="align-self-center mt-3 mr-4 ">
                <div onclick="openEditProfile()" style="background-color: #646fcb; width: 30px;height: 30px; border-radius: 999px;">
                    <i class="fa fa-pencil text-white mt-2" style="font-size:18px"></i>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="bg-info avatar m-0 mt-2">${avatar}</div>
        </div>
        <p class="text-center mt-2 mb-5" style=" font-weight: bold; font-size: x-large">${user.name}</p>
        <div class="row px-3">
            <div class="col-auto p-0 font-weight-bold">Personal Infor</div>
            <div class="col p-0 px-2">
                    <div class="mt-3 " style="height: 1px; width: 100%; background-color: #52495c;"></div>
            </div>
        </div>
        <div class="mt-3">
            <table class="table table-borderless">
                <tbody>
                    <tr>
                        <th scope="row">Address :</th>
                        <td>${user.address}</td>
                    </tr>
                    <tr>
                        <th scope="row">Telephone :</th>
                        <td>${user.telephone}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email :</th>
                        <td >${user.email}</td>
                    </tr>
                    <tr>
                        <th scope="row">Job :</th>
                        <td >${user.job}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row px-3">
            <div class="col-auto p-0 font-weight-bold">My Feedback</div>
            <div class="col p-0 px-2">
                    <div class="mt-3 " style="height: 1px; width: 100%; background-color: #52495c;"></div>
            </div>
        </div>
    `
    document.getElementById("infor").innerHTML = infor

}
function fetchData() {
    db.transaction(function (tx) {
        tx.executeSql(`select * from iRate WHERE email='${user.email}'`, [], function (tx1, result) {
            var len = result.rows.length;
            var contentInner = ''
            for (var i = 0; i < len; i++) {
                var note = result.rows.item(i)
                contentInner += ` 
                <div class="card mt-2" style="width: 100%;">
                        <div class="card-body">
                            <div class="text-center mb-4">
                                <h5 class="card-title">`+ note.RestaurantName + ` </h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ note.RestaurantType + `</h6>
                                <div class="row justify-content-center">
                                    <i class="fa fa-edit mt-1" onclick="editFeedback(${note.id})" style="font-size:24px; color:#52495c"></i>
                                    <div class="col-1"></div>
                                    <i class="fa fa-trash" onclick="deleteFeedback(${note.id})" style="font-size:27px; color:#52495c"></i>
                                </div>
                            </div>
                            <p><span class="h6">Reporter: </span>${note.ReporterName}</p>
                            <p><span class="h6">Average meal price per person: </span>${note.AvarageMealPrice}</p>
                            <p><span class="h6">Notes: </span>${note.Notes}</p>
                            <table class="table text-center mt-2 table-bordered">
                                <thead>
                                    <tr class="table-info">
                                        <th class="p-0 py-1">Service Rating</th>
                                        <th class="p-0 py-1">Cleanliness Rating</th>
                                        <th class="p-0 py-1">Food Quality Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>`+ note.ServiceRating + `
                                            <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i>
                                        </td>
                                        <td>`+ note.CleanlinessRating + `
                                            <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i>
                                        </td>
                                        <td>`+ note.FoodQualityRating + `
                                            <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`
            }
            document.getElementById("content").innerHTML = contentInner
        }, errorCB);

    }, errorCB, success);
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}
function success() {
}
function editFeedback(id) {
    localStorage.setItem('idFeedback', id)
    window.location.href = "EditFeedback.html";
}
function logout() {
    window.localStorage.clear()
    window.location.href = "login.html";
}
function deleteFeedback(idFeedback) {
    var r = confirm("Do you want to delete this feedback?");
    if (r == true) {
        db.transaction(function (tx) {
            tx.executeSql(`DELETE FROM iRate WHERE id='${idFeedback}'`, [],
                function (tx, result) {
                    alert("The response has been successfully deleted");
                    fetchData();
                },
                function (tx, error) {
                    console.log('ERROR:', error);
                })
        })
    }

}

function openEditProfile(){
    window.location.href = "EditProfile.html";

}