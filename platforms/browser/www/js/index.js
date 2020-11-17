var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db.transaction(populateDB, errorCB, successCB);
    db.transaction(defaultData, errorCB, addSuccessCB);
    
}


function defaultData(tx) {
    var defaultData = [
        ["Grandpa", "Fast food", "22/10/2020", "432.223", 4, 5, 3, "Good service quality", "Trần trung hiếu"],
        ["Hidden Gem Coffee", "Fast food", "05/11/2020", "843,584", 4, 5, 5, "Fresh and delicious food", "Nguyễn thị anh anh"],
        ["Essence Restaurant", "Seafood", "13/10/2020", "834,342", 5, 5, 5, "Comfortable space, good service quality", "Lê hồng thư"]
    ]
    var executeQuery = "INSERT INTO iRate (RestaurantName,RestaurantType, VisitDate,AvarageMealPrice, " +
        " ServiceRating, CleanlinessRating, FoodQualityRating,Notes, ReporterName) VALUES (?,?,?,?,?,?,?,?,?)";
    console.log("add Datadefault")
    defaultData.forEach(element => {
        tx.executeSql(executeQuery, element)
    });
}

function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS iRate (id INTEGER PRIMARY KEY AUTOINCREMENT, RestaurantName text, ' +
        ' RestaurantType text, VisitDate text, AvarageMealPrice text, ServiceRating text, ' +
        ' CleanlinessRating text, FoodQualityRating text, Notes text, ReporterName text) ')
}

function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}
function addSuccessCB() {
    
}

function successCB() {
    setTimeout(function () { window.location.href = "home.html"}, 3000)
}