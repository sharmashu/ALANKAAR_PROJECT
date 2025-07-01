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