const BACKEND_URL = 'https://yourapp.up.railway.app';

async function generateCode() {

    const number = document.getElementById('number').value;

    const result = document.getElementById('result');
    const loading = document.getElementById('loading');
    const status = document.getElementById('status');

    result.innerHTML = '';
    status.innerHTML = '';

    if (!number) {
        alert('Enter Number');
        return;
    }

    loading.innerHTML = 'Generating Pair Code...';

    try {

        const res = await fetch(`${BACKEND_URL}/pair?number=${number}`);

        const data = await res.json();

        loading.innerHTML = '';

        if (!data.status) {
            result.innerHTML = 'ERROR';
            return;
        }

        result.innerHTML = data.code;

        checkStatus(data.id);

    } catch (e) {

        loading.innerHTML = '';
        result.innerHTML = 'SERVER ERROR';
    }
}

async function checkStatus(id) {

    const status = document.getElementById('status');

    const interval = setInterval(async () => {

        try {

            const res = await fetch(`${BACKEND_URL}/status/${id}`);
            const data = await res.json();

            if (data.connected) {

                status.innerHTML = `
}
