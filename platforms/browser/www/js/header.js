var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
let user = JSON.parse(localStorage.getItem('user'))
function renderHeader() {
    let avatar = user.name + ''
    avatar = avatar.substr(avatar.lastIndexOf(" ") + 1, 1)
    let inner = ``
    switch (getLocation()) {
        case "Home.html":
        case "home.html":
        case "FeedBack.html":
        case "Notification.html":
            inner = `
            <div class="row">
                <div class="col-3">
                    <img onclick="goToHome()" src="./img//icon/logo.png" alt="" width="50" height="50" class="ml-4">
                </div>
                <div class="col-7">
                    <div class= "row " style="height:100%">
                        <div class="align-self-center">
                            <input class="form-control mr-sm-2" tyle="width: 100%" type="text" placeholder="Search" aria-label="Search..."  id="inputSearch" style="border: none;" onkeyup="search()">
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <div class= "row " style="height:100%">
                        <div class="align-self-center">
                            <p onclick="goToProfile()" class="rounded-circle text-center m-0 text-white" style="width: 30px ;height:30px; line-height:27px;  background-color: #646fcb;">${avatar}</p>
                        </div>
                    </div>
                </div>
            </div>`
            break;
        default:
            inner = `
            <div class="row m-0">
                <div class="col-2 ">
                    <div class="row justify-content-center" style="height:100%">
                        <div class="align-self-center ">
                            <i onclick="goBack()" class="fa fa-chevron-left" style="font-size:20px"></i>
                        </div>
                    </div>
                </div>
                <div class="col-8 text-center">
                    <img onclick="goToHome()" src="./img//icon/logo.png" alt="" width="50" height="50">
                </div>
                <div class="col-2">
                    <div class="row " style="height:100%">
                        <div class="align-self-center">
                            <p onclick="goToProfile()" class="rounded-circle text-center m-0 text-white"
                                style="width: 30px ;height:30px; line-height:27px;  background-color: #646fcb;">${avatar}</p>
                        </div>
                    </div>
                </div>
            </div>`
    }
    document.getElementById("header").innerHTML = inner
}

function search() {
    key = document.getElementById("inputSearch").value
    if (key.length == 0) {
        fetchData();
    } else {
        db.transaction(function (tx) {
            tx.executeSql(`SELECT * FROM iRate WHERE RestaurantName LIKE '%${key}%'`, [], function (tx, result) {
                var len = result.rows.length;
                var contentInner = ''
                for (var i = 0; i < len; i++) {
                    var note = result.rows.item(i)
                    contentInner += ` 
                    <div class="card mt-2" style="width: 100%;">
                        <div class="card-body">
                            <div class="text-center">
                                <h5 class="card-title">`+ note.RestaurantName + ` </h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ note.RestaurantType + `</h6>
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
                } document.getElementById("content").innerHTML = contentInner
            }, function (tx, error) {
                console.log('ERROR:', error);
            });
        });
    }
}
