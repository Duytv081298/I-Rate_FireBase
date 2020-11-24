var idFeedback = localStorage.getItem('idFeedback')
var idFeedback
var service_Rating, cleanliness_Rating, food_Quality_Rating

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    renderDefaultFeedBack()
}
function renderStar(rating, service) {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            star += `<i onclick="set` + service + `(` + i + `)" class="fa fa-star" style="font-size:20px;color:#0099FF"></i>`
        } else {
            star += `<i onclick="set` + service + `(` + i + `)" class="fa fa-star-o" style="font-size:20px;color:#0099FF"></i>`
        }
    }
    return star
}
function renderServiceStar(rating) {
    return renderStar(rating, "ServiceRating")
}
function renderCleanlinessStar(rating) {
    return renderStar(rating, "CleanlinessRating")
}
function renderFoodQualityStar(rating) {
    return renderStar(rating, "FoodQualityRating")
}
function setServiceRating(i) {
    service_Rating = i
    renderRating()
}
function setCleanlinessRating(i) {
    cleanliness_Rating = i
    renderRating()
}
function setFoodQualityRating(i) {
    food_Quality_Rating = i
    renderRating()
}
function renderRating() {
    document.getElementById("renderStar").innerHTML = `
    <table class="table table-borderless">
        <tbody>
            <tr>
                <th scope="row">Food Quality Rating</th>
                <td>`+ renderFoodQualityStar(food_Quality_Rating) + `</td>
            </tr>
            <tr>
                <th scope="row">Cleanliness Rating</th>
                <td>`+ renderCleanlinessStar(cleanliness_Rating) + `</td>
            </tr>
            <tr>
                <th scope="row">Service Rating</th>
                <td>`+ renderServiceStar(service_Rating) + `</td>
            </tr>
        </tbody>
    </table>
                `
}
function validation() {
    let date = format(document.getElementById("time_visit").value)
    if (validateString("ReporterName") == false || validateString("restaurant_Name") == false ||
        validateString("restaurant_Type") == false || validatedate(date) == false || validateMoney("price") == false) {
        alert("Invalid input fields!")
        return false
    } else return true
}
function validatedate(date) {
    var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if (date.match(dateformat)) {
        var opera = date.split('/');
        lopera1 = opera.length;
        if (lopera1 > 1) {
            var pdate = date.split('/');
        }
        var mm = parseInt(pdate[0]);
        var dd = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                return false;
            }
            if ((lyear == true) && (dd > 29)) {
                return false;
            }
        }
    }
    else {
        document.getElementById("time_visit").classList.add("border-danger");
        return false;
    }
}
function format(inputDate) {
    if (inputDate.length == 0) return ""
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
}
function validateString(id) {
    let str = document.getElementById(id).value
    if (str.length == 0) {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
    var letters = /[A-Za-z ]/;
    if (str.match(letters)) {
        document.getElementById(id).classList.remove("border-danger");
        return true
    }
    else {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
}
function validateMoney(id) {
    var money = document.getElementById(id).value
    var moneyformat = /[0-9]./
    if (money.length == 0) {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
    if (money.match(moneyformat)) {
        document.getElementById(id).classList.remove("border-danger");
        return true
    }
    else {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
}

function renderDefaultFeedBack() {
    db.transaction(function (tx) {
        tx.executeSql(`select * from iRate WHERE id='${idFeedback}'`, [], function (tx1, result) {
            var contentInner = ''
            var feedBack = result.rows[0]
            service_Rating = feedBack.ServiceRating
            cleanliness_Rating = feedBack.CleanlinessRating
            food_Quality_Rating = feedBack.FoodQualityRating
            contentInner = ` 
                <p class="h5 text-center"> Edit feedback</p> <p class="h5 text-center">for restaurant ` + feedBack.RestaurantName + `</p>
                <div class="form-group">
                    <label class="mt-3">Reporter:</label>
                    <input id="ReporterName" type="text" class="form-control text-dark border py-4" value="` + feedBack.ReporterName + `" required>
                </div>
                <div class="form-group">
                    <label>Restaurant Name:</label>
                    <input id="restaurant_Name" type="text" value="` + feedBack.RestaurantName + `" class="form-control text-dark border py-4" disabled>
                </div>
                <div class="form-group">
                    <label for="restaurant_Type">Restaurant type:</label>
                    <select class="form-control borderSelect" id="restaurant_Type">
                        <option>Grill</option>
                        <option>Fast food</option>
                        <option>Seafood</option>
                    </select>
                </div>
                <div  class="form-group">
                    <label>Date and time of the visit:</label>
                    <input id="time_visit" type="date"  value="${feedBack.VisitDate.split("/").reverse().join("-")}" class="form-control text-dark border py-4" required>
                </div>
                <div class="form-group">
                    <label>Average meal price per person:</label>
                    <input id="price" type="number" value="` + feedBack.AvarageMealPrice + `" class="form-control text-dark border py-4" required>
                </div>
                <div  class="form-group">
                    <label>Notes:</label>
                    <textarea id="note" class="form-control text-dark border py-4" rows="3">` + feedBack.Notes + `</textarea>
                </div>
                <div id="renderStar">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <th scope="row">Food Quality Rating</th>
                                <td>`+ renderFoodQualityStar(feedBack.FoodQualityRating) + `</td>
                            </tr>
                            <tr>
                                <th scope="row">Cleanliness Rating</th>
                                <td>`+ renderCleanlinessStar(feedBack.CleanlinessRating) + `</td>
                            </tr>
                            <tr>
                                <th scope="row">Service Rating</th>
                                <td>`+ renderServiceStar(feedBack.ServiceRating) + `</td>
                            </tr>
                        </tbody>
                    </table>
                </div>`
            document.getElementById("content").innerHTML = contentInner
        }, errorCB);

    }, errorCB, successCB);
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}
function successCB() {
}
function editFeedback(){
    var ReporterName = document.getElementById("ReporterName").value
    var RestaurantName = document.getElementById("restaurant_Name").value
    var RestaurantType = document.getElementById("restaurant_Type").value
    var VisitDate = document.getElementById("time_visit").value
    var AvarageMealPrice = document.getElementById("price").value
    var Notes = document.getElementById("note").value

    var executeQuery = `UPDATE iRate SET ReporterName = ?, RestaurantName = ?, RestaurantType = ?, VisitDate = ?, AvarageMealPrice = ?, 
    ServiceRating = ?, CleanlinessRating = ?, FoodQualityRating = ?, Notes = ?, Email = ? where id=?`;
    if (validation()) {
        var r = confirm("Would you like to modify this feedback?");
        if (r == true) {
            db.transaction(function (tx) {
                tx.executeSql(executeQuery, [ReporterName, RestaurantName, RestaurantType, VisitDate,
                    AvarageMealPrice, service_Rating, cleanliness_Rating, food_Quality_Rating, Notes, user.email, idFeedback],
                    function (tx, result) {
                        alert("The response has been successfully edited");
                        window.location.href = "Profile.html";
                    },
                    function (tx, error) {
                        console.log('ERROR:', error);
                    })
            })
        }
    }
}