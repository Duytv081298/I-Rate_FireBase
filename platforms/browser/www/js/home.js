var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    fetchData();
}
function fetchData() {
    db.transaction(function (tx) {

        tx.executeSql("select * from iRate", [], function (tx1, result) {
            var len = result.rows.length;
            var contentInner = ''

            for (var i = 0; i < len; i++) {
                var note = result.rows.item(i)
                contentInner += ` <div class="card mt-2" style="width: 90%;">
                <div class="card-body">
                    <div class="text-center">
                        <h5 class="card-title">`+ note.RestaurantName+` </h5>
                        <h6 class="card-subtitle mb-2 text-muted">`+ note.RestaurantType+`</h6>
                    </div>
                    <span class="h6">Reporter: </span> <span>`+ note.ReporterName+`</span> <br>
                    <div class="mt-2">
                        <span class="h6">Notes: </span>
                        <span>`+ note.Notes+`</span>
                    </div>
    
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
                                <td>`+ note.ServiceRating+`
                                    <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i>
                                </td>
                                <td>`+ note.CleanlinessRating+`
                                    <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i>
                                </td>
                                <td>`+ note.FoodQualityRating+`
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

