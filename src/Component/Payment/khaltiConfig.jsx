import myKey from "./khaltikey";

let config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  productIdentity: "00001",
  productName: "Thifting",
  productUrl: "http://localhost:3000/",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
