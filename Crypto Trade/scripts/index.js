const socket = new WebSocket('wss://ws.coinapi.io/v1/');
const loadingIndicator = document.getElementById('loadingIndicator');
const fiatAssetSelector = document.getElementById('fiatAsset');
const cryptoAssetSelector = document.getElementById('cryptoAsset');

let selectedCryptoAsset;
let selectedFiatAsset;

// This function opens the Socket Channel
socket.onopen = function (event) {
    if (loadingIndicator) {
        loadingIndicator.classList.add('hidden');
    }

    socket.send(JSON.stringify({
        "type": "hello",
        "apikey": "61310500-A174-47AB-95CF-35227A09B89D", // Set here your own API key. This one is generated temporarily.
        "subscribe_data_type": ["trade"],
        "subscribe_filter_asset_id": [`BITSTAMP_SPOT_BTC_USD$`, "BITFINEX_SPOT_BTC_LTC$"]
    }));
};

// This function help us to generate a formated timestamp
function formatTimestamp(timestamp) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
    }).format(new Date(timestamp));
}

// This function is executed once you click 'Exchange now' button
function updateExchangeRate() {
    const cryptoAssetSelect = document.getElementById('cryptoAsset');
    const fiatAssetSelect = document.getElementById('fiatAsset');

    selectedCryptoAsset = cryptoAssetSelect.value;
    selectedFiatAsset = fiatAssetSelect.value;

    if (loadingIndicator) {
        loadingIndicator.classList.remove('hidden');
    }

    socket.send(JSON.stringify({
        "type": "hello",
        "apikey": "61310500-A174-47AB-95CF-35227A09B89D", // Set here your own API key. This one is generated temporarily.
        "subscribe_data_type": ["trade"],
        "subscribe_filter_symbol_id": [`BITSTAMP_SPOT_${selectedCryptoAsset}_${selectedFiatAsset}$`],
    }));
}

// Once executed updateExchangeRate function here the data is parsed in JSON format and printed inside a div container.
socket.onmessage = function (event) {
    try {
        const realTimeTrade = JSON.parse(event.data);
        console.log(realTimeTrade);

        const contentDiv = document.getElementById('content');

        if (realTimeTrade.message) {
            contentDiv.innerHTML = `
                <div class="w-full flex flex-col justify-center items-center">
                    <div class="flex flex-col bg-red-400 text-white py-5 w-full justify-center items-center shadow-md">
                        <h2 class="text-md text-black text-center mt-3">${realTimeTrade.message}</h2>
                    </div>
                </div>
            `;
        } else {
            contentDiv.innerHTML = `
                <div class="w-full flex flex-col justify-center items-center">
                    <div class="flex flex-col bg-green-400 text-white py-5 w-full justify-center items-center shadow-md">
                        <span class="text-sm">ID: ${realTimeTrade.uuid}</span>
                        <h2 class="text-5xl text-black mt-3 font-bold">$${realTimeTrade.price}</h2>
                        <h2 class="text-center text-3xl text-black mb-3 font-bold">${selectedCryptoAsset} - ${selectedFiatAsset}</h2>
                        <span class="uppercase">${realTimeTrade.type}</span>
                        <span>Last update: ${formatTimestamp(realTimeTrade.time_exchange)}</span>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.log(error);
    } finally {
        loadingIndicator.classList.add('hidden');
    }
};

// This function help us to handle errors from the websocket connection
socket.onerror = function (error) {
    console.log(`WebSocket error: ${error}`);
    loadingIndicator.style.display = 'none';
};

// In this function you can toggle the mobile menu.
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}
