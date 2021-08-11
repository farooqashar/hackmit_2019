const algosdk = require('algosdk');

//Retrieve the token, server and port values for your installation in the kmd.net
//and kmd.token files within the kmd directory
const kmdtoken = "33ddbaa45869ef169cfb572af0752016f6577efc2e30bbd8c6383d3b344a41e5";
const kmdserver = "http://127.0.0.1";
const kmdport = 7833;

const kmdclient = new algosdk.Kmd(kmdtoken, kmdserver, kmdport);


var walletid = null;
var wallethandle = null;


(async () => {
    let walletid = (await kmdclient.createWallet("MyTestWallet", "testpassword", "", "sqlite")).wallet.id;
    console.log("Created wallet.", walletid);

    let wallethandle = (await kmdclient.initWalletHandle(walletid, "testpassword")).wallet_handle_token;
    console.log("Got wallet handle.", wallethandle);

    let address = (await kmdclient.generateKey(wallethandle)).address;
    console.log("Created new account.", address);
})().catch(e => {
    console.log(e);
});