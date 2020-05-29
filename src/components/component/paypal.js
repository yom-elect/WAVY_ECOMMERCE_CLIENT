import React, { useEffect } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

const Paypal = (props) => {
  const total = Number(props.toPay);

  const onSuccess = (payment) => {
    /*
      {"paid":true,"cancelled":false,
      "payerID":"MBPFVHAE9V8PY",
      "paymentID":"PAYID-L3HQ2KY007294263A673472C",
      "paymentToken":"EC-7DB61607SF4984435",
      "returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L3HQ2KY007294263A673472C&token=EC-7DB61607SF4984435&PayerID=MBPFVHAE9V8PY",
      "address":{"recipient_name":"John Doe","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},
      "email":"sb-waf7n1928289@personal.example.com"}
      */
    props.onSuccess(payment);
  };
  const onCancel = (data) => {
    console.log(JSON.stringify(data));
  };
  const onError = (err) => {
    console.log(JSON.stringify(err));
  };
  let env = "sandbox";
  let currency = "USD";

  const client = {
    sandbox:
      "AS1ceWuQbymyI95gTZrxyLXTdb6OHypek7oQib_qfp0br7yEtkJ8c25V2taC3NLGbA_DsC1XhhCFBy_v",
    production: "",
  };
  return (
    <div>
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={{
          size: "large",
          color: "blue",
          shape: "rect",
          label: "checkout",
        }}
      />
    </div>
  );
};

export default Paypal;
