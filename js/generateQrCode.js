// QR code generator is using the code from https://github.com/zhiyuan-l/qrcodejs
const metamaskMobileBaseUrl = "https://metamask.app.link/dapp/nagakei05.github.io/JPYCHackathon2nd/?address=";

let qrcode;

window.onload = function () {
    qrcode = new QRCode(document.getElementById("qrcode"),
    {colorDark : "#eb0673",
     colorLight : "#fafafa",
     border: 4,
     correctLevel : QRCode.CorrectLevel.L});
}
