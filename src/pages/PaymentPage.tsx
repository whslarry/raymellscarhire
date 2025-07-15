import React, { useState } from 'react';
import { CreditCard, Smartphone, QrCode, Shield, Clock, CheckCircle, ArrowLeft, Bitcoin, Globe, DollarSign, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('toyota-rav4');
  const [rentalDuration, setRentalDuration] = useState('daily');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [bookingStep, setBookingStep] = useState(1);
  const [showMpesaPrompt, setShowMpesaPrompt] = useState(false);
  const [mpesaPin, setMpesaPin] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    pickupDate: '',
    returnDate: '',
    pickupLocation: 'office'
  });
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [cryptoData, setCryptoData] = useState({
    walletAddress: '',
    cryptoType: 'bitcoin'
  });

  const vehicles = {
    'toyota-rav4': { name: 'Toyota RAV4', hourly: 700, daily: 6000, monthly: 140000 },
    'nissan-note': { name: 'Nissan Note', hourly: 350, daily: 3000, monthly: 70000 },
    'mercedes-c-class': { name: 'Mercedes C-Class', hourly: 1200, daily: 12000, monthly: 280000 }
  };

  const calculateTotal = () => {
    const vehicle = vehicles[selectedVehicle];
    let basePrice = 0;
    let days = 1;

    if (rentalDuration === 'hourly') {
      basePrice = vehicle.hourly * 8; // 8 hours default
    } else if (rentalDuration === 'daily') {
      basePrice = vehicle.daily;
      if (formData.pickupDate && formData.returnDate) {
        const pickup = new Date(formData.pickupDate);
        const returnDate = new Date(formData.returnDate);
        days = Math.max(1, Math.ceil((returnDate - pickup) / (1000 * 60 * 60 * 24)));
        basePrice = vehicle.daily * days;
      }
    } else if (rentalDuration === 'monthly') {
      basePrice = vehicle.monthly;
    }

    const insurance = basePrice * 0.1; // 10% insurance
    const tax = (basePrice + insurance) * 0.16; // 16% VAT
    const total = basePrice + insurance + tax;

    return { basePrice, insurance, tax, total, days };
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    }
  };

  const handleBooking = () => {
    if (paymentMethod === 'mpesa') {
      setShowMpesaPrompt(true);
    } else {
      processPayment();
    }
  };

  const processMpesaPayment = () => {
    if (mpesaPin.length !== 4) {
      alert('Please enter a valid 4-digit M-Pesa PIN');
      return;
    }
    
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowMpesaPrompt(false);
      setBookingStep(4);
    }, 3000);
  };

  const processPayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setBookingStep(4);
    }, 2000);
  };

  const { basePrice, insurance, tax, total, days } = calculateTotal();

  // M-Pesa Prompt Modal
  if (showMpesaPrompt) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Smartphone className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">M-Pesa Payment</h2>
            <p className="text-gray-600">Enter your M-Pesa PIN to complete payment</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800 mb-2">
              <strong>Payment Request Sent</strong>
            </p>
            <p className="text-sm text-green-700">
              Amount: <strong>KSH {(total + (formData.pickupLocation === 'airport' ? 2000 : 0)).toLocaleString()}</strong>
            </p>
            <p className="text-sm text-green-700">
              From: <strong>{formData.phone || '+254 XXX XXX XXX'}</strong>
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter M-Pesa PIN
            </label>
            <input
              type="password"
              maxLength="4"
              value={mpesaPin}
              onChange={(e) => setMpesaPin(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-center text-2xl tracking-widest"
              placeholder="••••"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => {
                setShowMpesaPrompt(false);
                setMpesaPin('');
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={processMpesaPayment}
              disabled={mpesaPin.length !== 4 || paymentProcessing}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {paymentProcessing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Confirm Payment'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStep === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your booking has been confirmed. You will receive an SMS confirmation shortly with your tracking ID.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Booking Reference</p>
            <p className="text-lg font-bold text-gray-900">RC00{Math.floor(Math.random() * 100) + 1}</p>
          </div>
          <Link
            to="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors inline-block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/vehicles" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Vehicles
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Book Your Vehicle</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  bookingStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    bookingStep > step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Vehicle & Duration</span>
            <span>Customer Details</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Vehicle Selection */}
            {bookingStep === 1 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Select Vehicle & Duration</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose Vehicle
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(vehicles).map(([key, vehicle]) => (
                        <label key={key} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="vehicle"
                            value={key}
                            checked={selectedVehicle === key}
                            onChange={(e) => setSelectedVehicle(e.target.value)}
                            className="mr-3"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{vehicle.name}</p>
                            <p className="text-sm text-gray-600">
                              From KSH {vehicle.daily.toLocaleString()}/day
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Rental Duration
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['hourly', 'daily', 'monthly'].map((duration) => (
                        <label key={duration} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="duration"
                            value={duration}
                            checked={rentalDuration === duration}
                            onChange={(e) => setRentalDuration(e.target.value)}
                            className="mr-2"
                          />
                          <span className="capitalize">{duration}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Return Date
                      </label>
                      <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        min={formData.pickupDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Continue to Customer Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Customer Details */}
            {bookingStep === 2 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Details</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        ID Number *
                      </label>
                      <input
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Pickup Location
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pickupLocation"
                          value="office"
                          checked={formData.pickupLocation === 'office'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>Our Office (Nairobi, CBD)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pickupLocation"
                          value="airport"
                          checked={formData.pickupLocation === 'airport'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>JKIA Airport (+KSH 2,000)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pickupLocation"
                          value="delivery"
                          checked={formData.pickupLocation === 'delivery'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>Free Delivery (Within Nairobi CBD)</span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {bookingStep === 3 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {/* M-Pesa */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="mpesa"
                        checked={paymentMethod === 'mpesa'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <Smartphone className="h-6 w-6 text-green-600 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">M-Pesa</p>
                        <p className="text-sm text-gray-600">Pay via M-Pesa mobile money</p>
                      </div>
                    </label>

                    {/* Credit Card */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Credit/Debit Card</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                      </div>
                    </label>

                    {/* PayPal */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <DollarSign className="h-6 w-6 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">PayPal</p>
                        <p className="text-sm text-gray-600">Pay with your PayPal account</p>
                      </div>
                    </label>

                    {/* Cryptocurrency */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="crypto"
                        checked={paymentMethod === 'crypto'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <Bitcoin className="h-6 w-6 text-orange-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Cryptocurrency</p>
                        <p className="text-sm text-gray-600">Bitcoin, Ethereum, Binance Coin</p>
                      </div>
                    </label>

                    {/* Global Pay */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="globalpay"
                        checked={paymentMethod === 'globalpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <Globe className="h-6 w-6 text-green-600 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Global Pay</p>
                        <p className="text-sm text-gray-600">International payment gateway</p>
                      </div>
                    </label>

                    {/* Payall */}
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="payall"
                        checked={paymentMethod === 'payall'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard className="h-6 w-6 text-purple-600 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Payall</p>
                        <p className="text-sm text-gray-600">Secure digital payment platform</p>
                      </div>
                    </label>
                  </div>

                  {/* Payment Details */}
                  {paymentMethod === 'mpesa' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">M-Pesa Payment Instructions</h4>
                      <div className="text-sm text-green-700 space-y-2">
                        <p>Click "Confirm Booking & Payment" to receive M-Pesa prompt on your phone</p>
                        <div className="bg-white rounded p-3 border border-green-300">
                          <p><strong>Business Number:</strong> 174379</p>
                          <p><strong>Amount:</strong> KSH {(total + (formData.pickupLocation === 'airport' ? 2000 : 0)).toLocaleString()}</p>
                          <p><strong>Phone:</strong> {formData.phone || 'Enter phone number above'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-4">Credit/Debit Card Details</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardData.cardNumber}
                            onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardData.expiryDate}
                              onChange={(e) => setCardData({...cardData, expiryDate: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={cardData.cardName}
                            onChange={(e) => setCardData({...cardData, cardName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">PayPal Payment</h4>
                      <div className="text-sm text-blue-700 space-y-2">
                        <p>You will be redirected to PayPal to complete your payment securely.</p>
                        <div className="bg-white rounded p-3 border border-blue-300">
                          <p><strong>Amount:</strong> USD {Math.round((total + (formData.pickupLocation === 'airport' ? 2000 : 0)) / 130)}</p>
                          <p><strong>Merchant:</strong> Raymells Carhire Ltd</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'crypto' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-medium text-orange-800 mb-4">Cryptocurrency Payment</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Select Cryptocurrency</label>
                          <select
                            value={cryptoData.cryptoType}
                            onChange={(e) => setCryptoData({...cryptoData, cryptoType: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="bitcoin">Bitcoin (BTC)</option>
                            <option value="ethereum">Ethereum (ETH)</option>
                            <option value="binance">Binance Coin (BNB)</option>
                          </select>
                        </div>
                        <div className="bg-white rounded p-3 border border-orange-300">
                          <p className="text-sm"><strong>Amount:</strong> 
                            {cryptoData.cryptoType === 'bitcoin' && ` ${((total + (formData.pickupLocation === 'airport' ? 2000 : 0)) / 3500000).toFixed(6)} BTC`}
                            {cryptoData.cryptoType === 'ethereum' && ` ${((total + (formData.pickupLocation === 'airport' ? 2000 : 0)) / 350000).toFixed(4)} ETH`}
                            {cryptoData.cryptoType === 'binance' && ` ${((total + (formData.pickupLocation === 'airport' ? 2000 : 0)) / 45000).toFixed(2)} BNB`}
                          </p>
                          <p className="text-sm"><strong>Wallet Address:</strong> Will be provided after confirmation</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'globalpay' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">Global Pay</h4>
                      <div className="text-sm text-green-700 space-y-2">
                        <p>Secure international payment processing with multi-currency support.</p>
                        <div className="bg-white rounded p-3 border border-green-300">
                          <p><strong>Amount:</strong> KSH {(total + (formData.pickupLocation === 'airport' ? 2000 : 0)).toLocaleString()}</p>
                          <p><strong>Supported:</strong> Visa, Mastercard, Bank Transfers</p>
                          <p><strong>Processing:</strong> Instant confirmation</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'payall' && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-800 mb-2">Payall Payment</h4>
                      <div className="text-sm text-purple-700 space-y-2">
                        <p>You will be redirected to Payall's secure payment platform to complete your transaction.</p>
                        <div className="bg-white rounded p-3 border border-purple-300">
                          <p><strong>Amount:</strong> KSH {(total + (formData.pickupLocation === 'airport' ? 2000 : 0)).toLocaleString()}</p>
                          <p><strong>Merchant:</strong> Raymells Carhire Ltd</p>
                          <p><strong>Payment ID:</strong> PAY{Math.floor(Math.random() * 100000)}</p>
                          <p><strong>Processing:</strong> Real-time confirmation</p>
                        </div>
                        <div className="flex items-center mt-2">
                          <Shield className="h-4 w-4 text-purple-600 mr-1" />
                          <span className="text-xs">256-bit SSL encryption & fraud protection</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-sm text-gray-600">
                      Your payment is secure and protected. We use industry-standard encryption and PCI DSS compliance.
                    </p>
                  </div>

                  {paymentMethod === 'mpesa' && !formData.phone && (
                    <div className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className="text-sm text-yellow-800">
                        Please enter your phone number in the customer details section to receive M-Pesa prompt.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleBooking}
                    disabled={paymentMethod === 'mpesa' && !formData.phone}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    {paymentProcessing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Lock className="h-5 w-5 mr-2" />
                    )}
                    {paymentProcessing ? 'Processing...' : 'Confirm Booking & Payment'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium">{vehicles[selectedVehicle].name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium capitalize">{rentalDuration}</span>
                </div>
                {rentalDuration === 'daily' && days > 1 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days:</span>
                    <span className="font-medium">{days}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup:</span>
                  <span className="font-medium">{formData.pickupDate || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return:</span>
                  <span className="font-medium">{formData.returnDate || 'Not selected'}</span>
                </div>
              </div>

              <div className="space-y-2 py-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price:</span>
                  <span>KSH {basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Insurance (10%):</span>
                  <span>KSH {insurance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (16%):</span>
                  <span>KSH {tax.toLocaleString()}</span>
                </div>
                {formData.pickupLocation === 'airport' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Airport Pickup:</span>
                    <span>KSH 2,000</span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    KSH {(total + (formData.pickupLocation === 'airport' ? 2000 : 0)).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">Free Cancellation</span>
                </div>
                <p className="text-xs text-blue-700">
                  Cancel up to 24 hours before pickup for a full refund
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;