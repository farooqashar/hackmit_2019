const algosdk = require('algosdk');

//Retrieve the token, server and port values for your installation in the algod.net
//and algod.token files within the data directory
const atoken = "yourapitoken";
const aserver = "http://127.0.0.1";
const aport = 8080;

//Recover the account 
var mnemonic = "you mnemonic string"; 
var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
console.log(recoveredAccount.addr);
//instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port); 
(async() => {
    //Get the relevant params from the algod
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    //create a transaction
    //note that the closeRemainderTo parameter is commented out
    //This parameter will clear the remaining funds in an account and 
    //send to the specified account if main transaction commits
    let txn = {
        "from": recoveredAccount.addr,
        "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
        "fee": 1000,
        "amount": 1000,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": new Uint8Array(0),
        //"closeRemainderTo": "IDUTJEUIEVSMXTU4LGTJWZ2UE2E6TIODUKU6UW3FU3UKIQQ77RLUBBBFLA"
    };
    //sign the transaction
    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    //submit the transaction
    let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);

})().catch(e => {
    console.log(e);
});