
var arrType = []
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    fetchData();
}
function searchType(element) {
    arrType.push(element.innerHTML)
    element.disabled = true;
    searchRestaurantType()
    renderSelectSearch();
}

function closeSelectSearch(id) {
    id.disabled = false;
    arrType.splice(arrType.indexOf(id.innerHTML), 1)
    searchRestaurantType()
    renderSelectSearch();
    if (arrType.length == 0){
        fetchData();
    }
}
function renderSelectSearch() {
    var innerHTMLSearch = ''

    arrType.forEach(element => {
        let id = element.replace(" ", "_");
        innerHTMLSearch += `
        <div class="col-auto py-2 m-2" style="border-radius: 99px; background-color: #9C9C9C; width: 30%;">
            <div class="row justify-content-between">
                <p class="col-auto text-white m-0 p-0 pl-2">`+ element + `</p>
                <div class=" col-3 p-0 bg-light rounded-circle text-center mr-2">
                    <i  onclick="closeSelectSearch(`+ id + `)" class="fa fa-close  p-0 " style="color:#9C9C9C"></i>
                </div>
            </div>
        </div>`
    });
    document.getElementById("selectSearch").innerHTML = innerHTMLSearch
}

function fetchData() {
    db.transaction(function (tx) {
        tx.executeSql("select * from iRate", [], function (tx1, result) {
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
                document.getElementById("content").innerHTML = contentInner
            }
        }, errorCB);

    }, errorCB, successCB);
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function successCB() {
}

function searchRestaurantType() {
    let executeQuery = `SELECT * FROM iRate WHERE RestaurantType IN (`
    for(let i=0; i<arrType.length; i++){
        if(i == arrType.length-1){
            executeQuery += `'${arrType[i]}'`
        }else{
            executeQuery += `'${arrType[i]}'`
            executeQuery += ', '
        }
    }
    executeQuery += ` )`
    console.log(executeQuery)
    db.transaction(function (tx) {
        tx.executeSql(executeQuery, [], function (tx, result) {
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
            }
            document.getElementById("content").innerHTML = contentInner
        }, function (tx, error) {
            console.log('ERROR:', error);
        });
    });
}

