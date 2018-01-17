
// var utils = './utils/js';

/**
 * Bytescode / Interface generated through build of contract
 * 
 * 
 * 
 * 
 */
var contract_abidefinition = [{"constant":false,"inputs":[{"name":"sentMessage","type":"string"}],"name":"setMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getLastAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getMessage","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"initMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"MessageWritten","type":"event"}];

var contract_bytecode = '0x6060604052341561000f57600080fd5b6103b88061001e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063368b87721461005c57806371a2ee52146100b9578063ce6d41de1461010e575b600080fd5b341561006757600080fd5b6100b7600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061019c565b005b34156100c457600080fd5b6100cc6101be565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011957600080fd5b6101216101e8565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610161578082015181840152602081019050610146565b50505050905090810190601f16801561018e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b80600090805190602001906101b29291906102d3565b506101bb610290565b50565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6101f0610353565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102865780601f1061025b57610100808354040283529160200191610286565b820191906000526020600020905b81548152906001019060200180831161026957829003601f168201915b5050505050905090565b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061031457805160ff1916838001178555610342565b82800160010185558215610342579182015b82811115610341578251825591602001919060010190610326565b5b50905061034f9190610367565b5090565b602060405190810160405280600081525090565b61038991905b8082111561038557600081600090555060010161036d565b5090565b905600a165627a7a723058201654084eb29c7bd7dfb2af0af716064014a036a42e256c97a2a5307b4d85b9290029';
var contract_address = '0x6ddf41083d83b04a790a1f4c5e0686e21bf0baf0';
var contract;
var filterWatch;


/**
 * Web page load listener
 */
window.addEventListener('load', function() {
    //Is web3 injected by meta mask?
    if (typeof web3 !== 'undefined') {
        //Use web3 provided by metamask
        window.web3 = new Web3(web3.currentProvider);
        console.log("Web 3 provided by metamask");
    } else {
        console.log("Web 3 NOT injected by metamask");

        //Use web3 from local node
        //Only if a geth or testrpc node is running?
        //CURRENTLY ONLY WORKS WITH METAMASK
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    // Star the app using web3
    //CURRENTLY ONLY WORKS WITH METAMASK
    startApp();
});


/**
 * Function that kicks off the app
 */
function startApp() {

    if (web3 && web3.isConnected()) {
        //Testing if we can log print
        console.log("Web 3 is connected");

        //Testing if we can use utils.js
        callMe();

        //Testing if we can update the UI
        updateUI('connect_status', 'Connected', false);
    }

    getNodeVersion();
    retrieveDeployedContract();
    startFilter();
    getMessageFromContract(contract);
    getLastSentAddress();
}

/**
 * Function to understand web3 api
 */

function getNodeVersion() {
    web3.version.getNode(function(error, result) {
        if (error) console.log("There was an error: " + error);
        else {
            console.log("There was a result: " + result);
        }
    });
}



/**
 * Functions to interact with deployed contract
 */
function retrieveDeployedContract() {
    // Retrieved the contract from the local geth node
    contract = web3.eth.contract(contract_abidefinition).at(contract_address);
}

function getMessageFromContract(contract) {
    console.log("Getting message from contract");
    contract.getMessage.call(function(error, result) {
        if (error) {
            console.log("There was an error");
            updateUI('message_set', "There was an error", true);
        } else {
            updateUI('message_set', result, false);
            console.log("Updated UI message successfully"); 
            console.log(result);

            getLastSentAddress();
        }
    });
}

function setMessageInContract(message) {
    contract.setMessage.sendTransaction(message, function(error, result) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Now printing the reuslt')
            console.log(result);
            startFilter();
        }
    });
}

function getLastSentAddress() {
    console.log("Calling get last sent address")
    contract.getLastAddress.call(function(error, result) {
        if (error) {
            console.log("There was an error");
            updateUI('last_address', "There was an error", false);
        }
        else {
            updateUI('last_address', result, false);
        }
    });
}

/**
 * Filters for monitoring change in deployed contract state
 */
function startFilter() {
    stopFilter();

    //Get the latest block number
    var block = web3.eth.getBlock('latest', function(error, result) {
 
        if (error) {}
        else {
            
            // Watch for event from latest block - 1 to latest block
            filterWatch = contract.MessageWritten({target: 'MessageWritten'}, {fromBlock:block - 1, toBlock:'latest'});
            console.log(filterWatch);

            console.log("Setting the filterWatch");

            if(error) {
                console.error('Filter Watch Error: ',error);
            }
            else {
                console.log("Filter result: ");
                console.log(result);
                getMessageFromContract(contract);
            }
        }

    })

    
}

function stopFilter() {
    if (filterWatch) {
        filterWatch.stopWatching();
        filterWatch = undefined;
    }
}

