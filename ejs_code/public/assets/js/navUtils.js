

$(document).ready(function () {
    var path = window.location.pathname.substring(1);
    var btnContainer = document.getElementById("topnav");
    var navItems = btnContainer.getElementsByClassName("nav-item");
    for (var i = 0; i < navItems.length; i++) {
        if (navItems[i].getElementsByTagName('a')[0].getAttribute('href') == '/' + path) {
            navItems[i].classList.add('active'); 
        }else{
            navItems[i].classList.remove('active');
        }
    }



});