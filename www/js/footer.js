function getLocation() {
    let location = window.location.href
    location = location.substr(location.lastIndexOf("/") + 1,)
    return location
}
function renderFooter(){
    let inner = ``
    switch (getLocation()) {
        case "Home.html":
        case "home.html":
            inner = `
            <div class="row pt-1 justify-content-center">
                <div class="col-3 align-self-center text-secondary" onclick="goToFeedback()">
                    <i class="fa fa-pencil" style="font-size:25px"></i>
                    <p class="m-0" style="font-size: xx-small; font-weight: bold;">Feedback</p>
                </div>
                <div class="col-3 align-self-center text-danger" onclick="goToHome()">
                    <i class="fa fa-home " style="font-size:35px"></i>
                    <p class="m-0" style="font-size: x-small; font-weight: bold;">Home</p>
                </div>
                <div class="col-3 align-self-center text-secondary" onclick="goToNotification()">
                    <i class="fa fa-calendar-check-o" style="font-size:25px"></i>
                    <p class="m-0" style="font-size: xx-small; font-weight: bold;">Notification</p>
                </div>
            </div>`
            break;
        case "FeedBack.html":
            inner = `
            <div class="row pt-1 justify-content-center" >
                <div class="col-3 align-self-center text-danger" onclick="goToFeedback()">
                    <i class="fa fa-pencil" style="font-size:35px"></i>
                    <p class="m-0" style="font-size: x-small; font-weight: bold;">Feedback</p>
                </div>
                <div class="col-3 align-self-center text-secondary" onclick="goToHome()">
                    <i class="fa fa-home " style="font-size:30px"></i>
                    <p class="m-0" style="font-size: xx-small; font-weight: bold;">Home</p>
                </div>
                <div class="col-3 align-self-center text-secondary" onclick="goToNotification()">
                    <i class="fa fa-calendar-check-o" style="font-size:25px"></i>
                    <p class="m-0" style="font-size: xx-small; font-weight: bold;">Notification</p>
                </div>
            </div>`
            break;
        case "Notification.html":
            inner = `
            <footer class="fixed-bottom  text-center bg-white">
                <div class="row pt-1 justify-content-center">
                    <div class="col-3 align-self-center text-secondary" onclick="goToFeedback()">
                        <i class="fa fa-pencil" style="font-size:25px"></i>
                        <p class="m-0" style="font-size: xx-small; font-weight: bold;">Feedback</p>
                    </div>
                    <div class="col-3 align-self-center text-secondary"onclick="goToHome()">
                        <i class="fa fa-home " style="font-size:30px"></i>
                        <p class="m-0" style="font-size: xx-small; font-weight: bold;">Home</p>
                    </div>
                    <div class="col-3 align-self-center text-danger"onclick="goToNotification()">
                        <i class="fa fa-calendar-check-o" style="font-size:35px"></i>
                        <p class="m-0" style="font-size: x-small; font-weight: bold;">Notification</p>
                    </div>
                </div>
            </footer>`
            break;
    }
    document.getElementById("footer").innerHTML = inner
}