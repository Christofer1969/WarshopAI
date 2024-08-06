
const API_KEY = 'AIzaSyBmlguu6AYBkupXgClW2GxPswC-MWktl_A'; // Ganti dengan API Key Anda
const SPREADSHEET_ID = '1ZkP_jYm9ia3DBaVmE1oQoKRTjgUFTqzQwnf6uMtuToQ'; // Ganti dengan ID Spreadsheet Anda
const RANGE = 'dataproduk!A2:s'; // Sesuaikan dengan range data di spreadsheet Anda

async function login() {
    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');

    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
        const data = await response.json();

        const rows = data.values;
        const userRows = rows.filter(row => row[6] === email);

        if (userRows.length > 0) {
            const user = userRows[0]; // Mengambil baris pertama yang sesuai dengan email
            messageElement.textContent = 'Login successful!';
            messageElement.style.color = 'green';

            // Filter produk yang kolom "visible"-nya kosong
            const products = userRows.map(row => {
                return {
                    product: row[1],
                    imageLink: row[15],
                    visible: row[10],
                    rowId: row[0],
                    imageback : row[20]
                };
            }).filter(product => product.visible === '');

            // Simpan data pengguna dan produk di localStorage
            localStorage.setItem('user', JSON.stringify({
                rowID : user[0],
                email: user[6],
                name: user[1],
                products: products,

            }));

            // Arahkan ke halaman baru
            window.location.href = 'Front.html';
        } else {
            messageElement.textContent = 'Email not found.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        messageElement.textContent = 'An error occurred. Please try again.';
        messageElement.style.color = 'red';
    }
}