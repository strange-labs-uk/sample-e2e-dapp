# Sample E2E DAPP #

A sample DAPP that includes a front end UI component. The contract is simple, send a transaction to change the state of a storage variable (the message) and then retrieve the message and the address of the last sender.

The front end will be using the web3 instance provided by the private chain to "watch" for an event emitted from the contract "MessageWritten" and then will call "getMessage()" to update the front end with the new message written into the contract.

## Prerequisite
* Need MetaMask installed in browser

## Setup ##

Git Clone and then cd into the project

1. Install all the node package dependencies:
    * ` npm install`


2. Run the geth console:
    * `geth --datadir "./data" --rpc --rpccorsdomain="*" --networkid 100 console `
  
  
3. Retrieve the first account
   * ` personal.listAccounts `
   * Copy the address of the first account :
       * _0x8ac39e4cd6842d62bee41c9718161d5096d437c5_
       
4. Unlock the account
  * ` personal.unlockAccount("0x8ac39e4cd6842d62bee41c9718161d5096d437c5")
  * Passphrase: 4
        
5. Create a new terminal
  * ` cd truffle `
  
6. Compile and migrate contracts to private chain
  * `./tcm.sh`
  
7. Go back to the first terminal to start the miner, this will mine our contracts to the private chain
  * ` miner.start() `
  
8. Go back to the second terminal and copy the deployed address of the contract _Interact_
  * E.g Deploying Interact... _Interact: 0x9f6c95002db82022e2805d9b5c4b1f1c823d3197_
  
9. Go back to the first terminal
  * ` miner.stop()`
  
10. Open the project in an IDE of your choice
  * Go to _main.js_
  * paste the address of the deployed contract to the variable _var contract_addresss_
  * open a new terminal in the cli
  * Run:
    * ` gulp serve `
    
11. Make sure you are logged into MetaMask
  * If you don't have any accounts that are linked to this private chain on MetaMask with Ether, then create a new account  and start mining to get Ether.
  * Remember to use a memorable passphrase since we are going to export this account.
  
 12. Go to the geth console
  * Create a new account:
    * ``` personal.newAccount ```
  * Set the etherbase to this new account, copy the address of the new account:
    * ``` miner.setEtherbase("<address of new account>")  ```
  * To start mining, leave it running for 10 - 20 seconds
    * ``` miner.start() ```
    * ``` miner.stop() ```

13. You will to export the keystore of the account to MetaMask
  * Open MetaMask in your browser
  * Click on the icon of a person with circular arrows around them
  * Click _Import Account_
  * Click on _Select Type -> JSON File_
  * Click on _Choose File_ and go to _sample-dapp/data/keystore_ and choose the _last_ file
    * The last file should be the newest account created.
  * If all has gone well, your created account will be imported to meta mask with ether 
    
14. Go back to the terminal with the geth console
  * Unlock your new account:
    * ``` peronsal.unlockAccount("<account address>") ```
  * We need to start a miner, to mine the transactions we are sending to the private chain:
    * ``` miner.start() ```
    
15. Back to the web app, type in a message in the input field and send the message
  * The UI is using the web3 instance from the private chain to monitor for an event "MessageWritten"
  * Wait 5 - 10 seconds and the message written should appear on the front end



    
