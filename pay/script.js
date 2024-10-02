// Get the current year and update the copyright
const currentYear = new Date().getFullYear();
document.getElementById("copyrightYear").textContent = currentYear;

// Toggle mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Function to get the amount from the URL
function getAmountFromURL() {
    const queryString = window.location.search;

    // If there's no query string, return null
    if (!queryString) return null;

    // Extract the amount after the '?'
    const amountStr = decodeURIComponent(queryString.substring(1)).trim();

    // Validate the amount
    return !isNaN(amountStr) && amountStr !== '' ? amountStr : null;
}

// Function to generate the UPI URL
function generateUpiUrl(amount) {
    const baseUrl = 'upi://pay?pa=Q625192146@ybl&pn=SagarawatElectricals&mam=1';
    return amount ? `${baseUrl}&am=${encodeURIComponent(amount)}` : baseUrl;
}

// Function to generate the QR code
function generateQrCode(upiUrl) {
    // Clear any existing QR code
    document.getElementById('qrcode').innerHTML = '';

    // Generate new QR code
    new QRCode(document.getElementById('qrcode'), {
        text: upiUrl,
        width: 350,
        height: 350,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Main Execution Function
(function () {
    const amount = getAmountFromURL();
    const upiUrl = generateUpiUrl(amount);

    // Set the href attributes
    document.getElementById('upiPayLink').setAttribute('href', upiUrl);
    document.getElementById('upiAppsLink').setAttribute('href', upiUrl);

    // Generate the QR code
    generateQrCode(upiUrl);
})();
