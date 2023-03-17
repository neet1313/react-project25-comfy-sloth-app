//domain/.netlify/functions/create-payment-intent
require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
    if (event.body) {
        const { cart, total_amount, shipping_fee } = JSON.parse(event.body);
        const calculateOrderAmount = () => shipping_fee + total_amount
        //Calculation to be done on the server but here 
        //its just for dummy purposes

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: 'inr'
            });
            return {
                statusCode: 200,
                body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error.message })
            }
        }
    } else {
        return {
            statusCode: 200,
            body: 'Payment Intent'
        }
    }

}