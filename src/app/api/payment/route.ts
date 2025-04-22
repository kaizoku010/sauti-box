import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { Payment } from '@/types/payment';

export async function POST(request: Request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { songId, artistId, amount, paymentMethod, paymentDetails } = body;
    
    // Validate input
    if (!songId || !artistId || !amount || !paymentMethod || !paymentDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    
    // Create payment record
    const payment: Payment = {
      userId: payload.id,
      songId,
      artistId,
      amount,
      currency: 'UGX',
      status: 'pending',
      paymentMethod,
      paymentDetails,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // In a real application, you would integrate with a payment gateway here
    // For this example, we'll simulate a successful payment
    
    // Process payment based on method
    if (paymentMethod === 'mobile_money') {
      // Simulate mobile money payment processing
      // In a real app, you would integrate with MTN Mobile Money, Airtel Money, etc.
      await simulatePaymentProcessing();
      payment.status = 'completed';
      payment.paymentDetails.transactionId = generateTransactionId();
    } else if (paymentMethod === 'card') {
      // Simulate card payment processing
      // In a real app, you would integrate with a payment processor like Stripe, Flutterwave, etc.
      await simulatePaymentProcessing();
      payment.status = 'completed';
      payment.paymentDetails.transactionId = generateTransactionId();
    } else {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }
    
    // Save payment to database
    const paymentsCollection = db.collection('payments');
    const result = await paymentsCollection.insertOne(payment);
    
    // Update user's library and purchase history
    const usersCollection = db.collection('users');
    await usersCollection.updateOne(
      { _id: new ObjectId(payload.id) },
      {
        $addToSet: { 'library.songs': songId },
        $push: {
          purchaseHistory: {
            songId,
            artistId,
            amount,
            date: new Date(),
            paymentMethod
          }
        }
      }
    );
    
    // Update artist's sales
    const artistsCollection = db.collection('artists');
    await artistsCollection.updateOne(
      { _id: new ObjectId(artistId) },
      {
        $inc: { totalSales: 1 }
      }
    );
    
    // Return success response
    return NextResponse.json({
      success: true,
      payment: {
        ...payment,
        _id: result.insertedId
      }
    });
    
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

// Helper function to simulate payment processing
async function simulatePaymentProcessing() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

// Helper function to generate a transaction ID
function generateTransactionId() {
  return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

// Get payment history for a user
export async function GET(request: Request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('musichub');
    
    // Get payment history for user
    const paymentsCollection = db.collection('payments');
    const payments = await paymentsCollection
      .find({ userId: payload.id })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Return payment history
    return NextResponse.json({
      success: true,
      payments
    });
    
  } catch (error) {
    console.error('Payment history error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve payment history' },
      { status: 500 }
    );
  }
}
