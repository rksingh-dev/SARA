// Store configuration
const config = {
   
    storeWalletAddress: '0x5465a3e733e4cedd883f3c7167082655754b784c',
    
    ethToUsdRate: 2000,
    
    // Network configuration
    network: {
        chainId: '1', // Ethereum Mainnet
        chainName: 'Ethereum Mainnet',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        }
    }
};

// Export the configuration
window.storeConfig = config; 
