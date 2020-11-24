var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
document.addEventListener("deviceready", onDeviceReady, false);
var defaultFeedback = false
var defaultUser = false
function onDeviceReady() {
    dropTable()
    db.transaction(populate, error, success);
    createUser()
}
function dropTable() {
    db.transaction(tx => {
        tx.executeSql("DROP TABLE iRate", [],
            function (tx, result) {
            },
            function (tx, error) {
                console.log('drop iRate:', error);
            })
    })
    db.transaction(tx => {
        tx.executeSql("DROP TABLE User", [],
            function (tx, result) {
            },
            function (tx, error) {
                console.log('drop User:', error);
            })
    })
}
function defaultData(tx) {
    var defaultData = [
        ["Grandpa", "Fast food", "22/10/2020", "320.000", 4, 5, 3, "Good service quality", "Trinh Van Duy", "Duy@gmail.com"],
        ["Hidden Gem Coffee", "Fast food", "05/11/2020", "350.900", 4, 5, 5, "Fresh and delicious food", "Nguyen Thi Anh Anh", "Anh@gmail.com"],
        ["Essence Restaurant", "Seafood", "13/10/2020", "500.000", 5, 5, 5, "Comfortable space, good service quality", "Le Hong Thu", "Thu@gmail.com"]
    ]
    var executeQuery = `INSERT INTO iRate (RestaurantName, RestaurantType, VisitDate, AvarageMealPrice, 
         ServiceRating, CleanlinessRating, FoodQualityRating, Notes, ReporterName, Email) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    defaultData.forEach(element => {
        tx.executeSql(executeQuery, element)
    });
}
function populate(tx) {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS iRate (id INTEGER PRIMARY KEY AUTOINCREMENT, RestaurantName text,
        RestaurantType text, VisitDate text, AvarageMealPrice text, ServiceRating text,
        CleanlinessRating text, FoodQualityRating text, Notes text, ReporterName text, Email text)`)
}

function error(err) {
    alert("Error processing SQL: " + err.code);
}

function addSuccessCB() {
    defaultFeedback = true
    goToLogin()
}

function success() {
    db.transaction(defaultData, error, addSuccessCB);
}
function createUser() {
    db.transaction(function (tx) {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS User ( id INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(100) NOT NULL UNIQUE, 
            password VARCHAR(100) NOT NULL,
            name VARCHAR(100),
            address VARCHAR(100),
            telephone VARCHAR(15),
            job VARCHAR(50))`,
            [],
            function (tx, result) {
                existinUser()
            },
            function (tx, error) {
                console.log('ERROR:', error);
            })
    })
}
function existinUser() {
    let existingData = [
        ["Duy@gmail.com", "12345678", "Trinh Van Duy", "Ha Nam", "0369549798", "Student"],
        ["Hieu@gmail.com", "12345678", "Tran Trung Hieu", "Quang Ninh", "0395880888", "Student"],
        ["Anh@gmail.com", "12345678", "Nguyen Thi Anh Anh", "Ha Noi", "0979517820", "Student"],
        ["Thu@gmail.com", "12345678", "Le Hong Thu", "Ha Noi", "0877781573", "Student"],
    ]
    let executeQuery = "INSERT INTO User (email, password, name, address, telephone, job) VALUES (?,?,?,?,?,?)";
    db.transaction(function (tx) {
        existingData.forEach(element => {
            tx.executeSql(executeQuery, element,
                function (tx, result) {
                    defaultUser = true
                    goToLogin()
                },
                function (tx, error) {
                    console.log('ERROR:', error);
                })
        })
    })
}

function goToLogin() {
    if (defaultFeedback && defaultUser) {
        window.location.href = "SignInScreen.html";
    }
}