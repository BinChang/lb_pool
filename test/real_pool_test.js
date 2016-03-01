var LB_Pool = require("../index.js").Pool;

var servers = [
    "216.58.192.14:1234",
    "216.58.192.14:80",
];

var authPool = new LB_Pool(require("http"), servers, {
    max_pending: 300,
    ping: "/ping",
    timeout: 1000,
    max_sockets: 2,
    name: "auth"
});

function sendRequest() {
    authPool.get("/index.html", function(err, res, body) {
        console.log("result==", {
            err: err,
            body: body
        });
        scheduleReq();
    })
}

function scheduleReq() {
    setTimeout(sendRequest, 5000);
}

sendRequest();
