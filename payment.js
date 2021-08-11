const token = "ef920ed2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
const server = "http://hacathon.algodev.network";
const port = 9100;
const client = new algosdk.Algod(token, server, port);

(async () => {
    console.log(await client.status());
})().catch(e => {
    console.log(e);
});
