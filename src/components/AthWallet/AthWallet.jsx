import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { toast } from "react-toastify";
import Gpay from "../../assets/Images/GPay.png";
import Iphonepay from "../../assets/Images/IphonePay.png";
import Paypal from "../../assets/Images/Paypal.png";
import playerImage from "../../assets/Images/Rectangle 27.png";
import AthHeader from "../../Pages/AthPage/AthHeader/AthHeader";
import "./AthWallet.css";

function AthWallet() {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    paymentMethod: "",
  });

  const [transactionDetails] = useState({
    amount: 1500,
    transactionId: "IOBA012333",
    date: "07.02.2024",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentMethod = (method) => {
    setFormData((prevState) => ({
      ...prevState,
      paymentMethod: method,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      toast.error("Please select a payment method!");
      return;
    }

    if (formData.cardNumber.length < 16) {
      toast.error("Card number must be at least 16 digits!");
      return;
    }

    toast.success("Payment submitted successfully!");

    // Reset the form fields to their initial values
    setFormData({
      cardholderName: "",
      cardNumber: "",
      paymentMethod: "",
    });
  };

  return (
    <>
      <AthHeader />
      <Container fluid className="p-4 payment-page">
        {/* Breadcrumb Navigation */}
        <Row>
          <Col>
            <div className="d-flex align-items-center mb-4">
              <FaAngleRight className="me-2" style={{ color: "#000" }} />
              <Button variant="primary" size="sm" className="me-2">
                Wallet
              </Button>
              <FaAngleRight className="me-2" style={{ color: "#0000FF" }} />
              <span className="ms-2 text-white">Coaching for Tennis</span>
            </div>
          </Col>
        </Row>

        {/* Main Layout */}
        <Row className="g-4 wallet-wrapper">
          {/* Profile and Athlete Details Section */}
          <Col lg={4} md={12} className=" wallet-p-section text-center ">
            <div className="game-image-container ">
              <img
                src={playerImage}
                alt="Player"
                className="img-fluid player-profile-image"
              />
            </div>
            <Card className="user-card  mx-auto text-center">
              <Card.Body>
                <Card.Title>Anika John</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <h6>Tennis Player</h6>
                </Card.Subtitle>
                <Card.Text>
                  <p>English, Hindi </p>
                  <p> Good team player for tennis and football</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Transaction and Payment Section */}
          <Col lg={8} md={12} className="transaction-card-container">
            <Card className="transaction-card p-4">
              <h4>Transaction Details</h4>
              <Col>
                <div className="d-flex flex-wrap gap-5">
                  <span>
                    <strong>Amount:</strong> {transactionDetails.amount}
                  </span>
                  <span>
                    <strong>Transaction ID:</strong>{" "}
                    {transactionDetails.transactionId}
                  </span>
                  <span>
                    <strong>Date:</strong> {transactionDetails.date}
                  </span>
                </div>
              </Col>

              <h4 className="mt-4">Payment Details</h4>
              <p>Choose one of the payment methods below:</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center mb-3">
                <Button
                  variant="outline-dark"
                  onClick={() => handlePaymentMethod("GPay")}
                  className="p-2"
                >
                  <img src={Gpay} alt="G-Pay" className="img-fluid" />
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => handlePaymentMethod("Apple Pay")}
                  className="p-2"
                >
                  <img src={Iphonepay} alt="Apple Pay" className="img-fluid" />
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => handlePaymentMethod("PayPal")}
                  className="p-2"
                >
                  <img src={Paypal} alt="PayPal" className="img-fluid" />
                </Button>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Cardholder Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardholderName"
                    placeholder="Enter cardholder name"
                    value={formData.cardholderName}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Accept only letters and spaces
                      if (/^[A-Za-z\s]*$/.test(value)) {
                        handleInputChange(e);
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    placeholder="Enter card number"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Accept only numeric values
                      if (/^\d*$/.test(value)) {
                        handleInputChange(e);
                      }
                    }}
                  />
                  <Form.Text className="text-muted">
                    Card number should be 16 digits.
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Submit Payment
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AthWallet;
