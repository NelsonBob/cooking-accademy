import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "reactstrap";
import Swal from "sweetalert2";
import "./../../assets/scss/checkout.css";

export default function CheckoutForm({clearCartclick}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/out/order/return_url",
      },
      redirect: "if_required",
    });
    setIsLoading(false);

    // Display a message based on the payment result
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      clearCartclick();
      Swal.fire({
        position: "top-end",
        icon: "success",
        html: `
        <p>
        Payment succeeded
        </p>
      `,
        showConfirmButton: false,
        timer: 2000,
      });
      return navigate("/out/index");
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        html: `
        <p>
        Payment failed
        </p>
      `,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button
        color="warning"
        className="rounded-pill btn-block"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </Form>
  );
}
//4242424242424242
