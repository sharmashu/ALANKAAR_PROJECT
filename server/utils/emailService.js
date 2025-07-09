import nodemailer from 'nodemailer';
import { logger } from '../config/winston.js';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD // Use app password for Gmail
    }
  });
};

// Send verification email
export const sendVerificationEmail = async (email, name, token) => {
  try {
    const transporter = createTransporter();
    
    // Use same domain for single deployment with rewrites
    const baseUrl = process.env.VITE_API_BASE_URL || process.env.FRONTEND_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - ALANKAAR',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">ALANKAAR</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Welcome to ALANKAAR!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Hi ${name}, thank you for registering with ALANKAAR. To complete your registration, 
              please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block; 
                        font-weight: bold;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="color: #667eea; word-break: break-all; margin-bottom: 20px;">
              ${verificationUrl}
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              This link will expire in 24 hours. If you didn't create an account with ALANKAAR, 
              you can safely ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2024 ALANKAAR. All rights reserved.
            </p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    logger.info('Verification email sent successfully', { 
      email, 
      messageId: info.messageId 
    });
    
    return true;
  } catch (error) {
    logger.error('Failed to send verification email', { 
      email, 
      error: error.message 
    });
    throw error;
  }
};

// Send password reset email (bonus feature)
export const sendPasswordResetEmail = async (email, name, token) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password - ALANKAAR',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">ALANKAAR</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Hi ${name}, we received a request to reset your password. Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block; 
                        font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              If you didn't request a password reset, you can safely ignore this email.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              This link will expire in 1 hour for security reasons.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2024 ALANKAAR. All rights reserved.
            </p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    logger.info('Password reset email sent successfully', { 
      email, 
      messageId: info.messageId 
    });
    
    return true;
  } catch (error) {
    logger.error('Failed to send password reset email', { 
      email, 
      error: error.message 
    });
    throw error;
  }
};

// Send order details email to admin
export const sendOrderDetailsEmail = async (orderDetails) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info.alankaarco@gmail.com',
      subject: `New Order Received - ALANKAAR`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #333;">New Order Received</h2>
          <h3>Customer Details</h3>
          <ul>
            <li><b>Name:</b> ${orderDetails.firstName || ''} ${orderDetails.lastName || ''}</li>
            <li><b>Email:</b> ${orderDetails.email}</li>
            <li><b>Phone:</b> ${orderDetails.phone}</li>
            <li><b>Address:</b> ${orderDetails.address}</li>
            <li><b>City:</b> ${orderDetails.city}</li>
            <li><b>State:</b> ${orderDetails.state}</li>
            <li><b>PIN Code:</b> ${orderDetails.pincode}</li>
          </ul>
          <h3>Order Details</h3>
          <ul>
            <li><b>Total:</b> ₹${orderDetails.total}</li>
            <li><b>Order Date:</b> ${new Date().toLocaleString()}</li>
          </ul>
          <h3>Cart Items</h3>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${orderDetails.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${item.size || '-'}</td>
                  <td>₹${item.price}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    logger.info('Order details email sent to admin', { order: orderDetails });
    return true;
  } catch (error) {
    logger.error('Failed to send order details email', { error: error.message });
    throw error;
  }
}; 