document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    renderInfor()
}
function renderInfor() {

    let avatar = user.name + ''
    avatar = avatar.substr(avatar.lastIndexOf(" ") + 1, 1)
    let infor = `
        <div class="row justify-content-center">
            <div class="bg-info avatar m-0 mt-2">${avatar}</div>
        </div>
        <p class="text-center mt-2 mb-5" style=" font-weight: bold; font-size: x-large">${user.name}</p>
        <div class="row px-3">
        <div class="col p-0 px-2">
                    <div class="mt-3 " style="height: 1px; width: 100%; background-color: #52495c;"></div>
            </div>
            <div class="col-auto p-0 font-weight-bold">Edit Information</div>
            <div class="col p-0 px-2">
                    <div class="mt-3 " style="height: 1px; width: 100%; background-color: #52495c;"></div>
            </div>
        </div>
        <div class="mt-3">
            <div class="form-group">
                <label>Name:</label>
                <input id="name" type="text" value="${user.name}" class="form-control text-dark border py-4">
            </div>
            <div class="form-group">
                <label>Address:</label>
                <input id="address" type="text" value="${user.address}" class="form-control text-dark border py-4">
            </div>
            <div class="form-group">
                <label>Telephone:</label>
                <input id="telephone" type="text" value="${user.telephone}" class="form-control text-dark border py-4">
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input id="email" type="text" value="${user.email}" class="form-control text-dark border py-4" disabled>
            </div>
            <div class="form-group">
                <label>Job:</label>
                <input id="job" type="text" value="${user.job}" class="form-control text-dark border py-4">
            </div>
        </div>
    `
    document.getElementById("infor").innerHTML = infor

}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}
function success() {
}
function editProfile() {
    let name = document.getElementById("name")
    let address = document.getElementById("address")
    let telephone = document.getElementById("telephone")
    let job = document.getElementById("job")
    let executeQuery = `UPDATE User SET  name = ?, address = ?, telephone = ?, job = ? where email = ?`;
    if (name.value.length == 0) {
        name.classList.add("border-danger");
        name.focus()
    } else if (address.value.length == 0) {
        address.classList.add("border-danger");
        address.focus()
    } else if (telephone.value.length == 0) {
        telephone.classList.add("border-danger");
        telephone.focus()
    } else {
        name.classList.remove("border-danger");
        address.classList.remove("border-danger");
        telephone.classList.remove("border-danger");
        console.log(user)
        var r = confirm("Want to change your account information?");
        if (r == true) {
            db.transaction(function (tx) {
                tx.executeSql(executeQuery, [name.value, address.value, telephone.value, job.value, user.email],
                    function (tx, result) {
                        alert("The account information has changed successfully");
                        localStorage.setItem('user', JSON.stringify({ address : address.value, email : user.email, id : 3, job : job.value, name : name.value, password : user.telephone, telephone : telephone.value }))
                        window.location.href = "Profile.html";
                    },
                    function (tx, error) {
                        console.log('ERROR:', error);
                    })
            })
        }
    }


}