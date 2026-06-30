(function () {
    'use strict';

    let userAddress = null;
    const connectBtn = document.querySelector('#wallet-connect');

    function truncateAddress(address) {
        return address.slice(0, 6) + '...' + address.slice(-4);
    }

    function setConnected(address) {
        userAddress = address;
        connectBtn.textContent = truncateAddress(address);
        connectBtn.classList.add('wallet-connected');
    }

    function setDisconnected() {
        userAddress = null;
        connectBtn.textContent = 'Connect Wallet';
        connectBtn.classList.remove('wallet-connected');
    }

    async function connectWallet() {
        if (!window.ethereum) {
            alert('MetaMask not detected. Please install the MetaMask browser extension.');
            return;
        }
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                setConnected(accounts[0]);
            }
        } catch (error) {
            console.error('Wallet connection failed:', error);
        }
    }

    async function checkExistingConnection() {
        if (!window.ethereum) return;
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setConnected(accounts[0]);
            }
        } catch (error) {
            console.error('Wallet check failed:', error);
        }
    }

    connectBtn.addEventListener('click', connectWallet);

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                setConnected(accounts[0]);
            } else {
                setDisconnected();
            }
        });
    }

    checkExistingConnection();

}());
