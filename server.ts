import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import AdmZip from 'adm-zip';
import path from 'path';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON bodies
  app.use(express.json());

  // API Routes
  app.get('/api/download-source', async (req, res) => {
    try {
      const zip = new AdmZip();
      const projectRoot = process.cwd();

      // Add files/folders manually to avoid adding unwanted directories
      const exclude = ['node_modules', '.git', 'dist', '.DS_Store'];
      
      // Use addLocalFolder but filter is tricky with AdmZip's addLocalFolder
      // Instead, let's just use addLocalFolder with a filter function if supported, 
      // or just add specific directories.
      // AdmZip's addLocalFolder filter is a RegExp or function in newer versions.
      // Let's try a safer approach: add specific folders and files.
      
      // Actually, adm-zip addLocalFolder takes a filter callback in recent versions.
      // But to be safe and simple, let's just zip the whole thing and let the filter handle it if possible,
      // or just add the important folders: src, public, and root files.
      
      zip.addLocalFolder(path.join(projectRoot, 'src'), 'src');
      zip.addLocalFolder(path.join(projectRoot, 'public'), 'public');
      
      // Add root files
      const rootFiles = ['package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'index.html', 'server.ts', '.env.example', '.gitignore', 'metadata.json', 'postcss.config.js', 'tailwind.config.js', 'README.md'];
      
      rootFiles.forEach(file => {
        try {
          zip.addLocalFile(path.join(projectRoot, file));
        } catch (e) {
          // File might not exist, ignore
        }
      });

      const buffer = zip.toBuffer();
      
      res.set('Content-Type', 'application/zip');
      res.set('Content-Disposition', 'attachment; filename=project-source.zip');
      res.set('Content-Length', buffer.length.toString());
      res.send(buffer);
    } catch (error) {
      console.error('Error creating zip:', error);
      res.status(500).send('Error creating zip file');
    }
  });

  app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, phone, serviceType, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !serviceType || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Create a transporter using Gmail or other SMTP service
      // For Gmail, use App Password if 2FA is enabled
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your app password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: '3genelectriccanada@gmail.com', // Send to this email as requested
        subject: `New Service Request: ${serviceType} from ${firstName} ${lastName}`,
        text: `
          New Service Request Details:
          
          Name: ${firstName} ${lastName}
          Email: ${email}
          Phone: ${phone}
          Service Type: ${serviceType}
          
          Message:
          ${message}
        `,
        html: `
          <h3>New Service Request Received</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      // Check for specific Gmail authentication error
      if (error.responseCode === 535) {
        console.error('----------------------------------------------------------------');
        console.error('GMAIL AUTHENTICATION FAILED');
        console.error('Reason: Username and Password not accepted.');
        console.error('Solution: You must use an "App Password" instead of your regular Gmail password.');
        console.error('1. Go to https://myaccount.google.com/security');
        console.error('2. Enable 2-Step Verification (if not already enabled)');
        console.error('3. Go to "App passwords" (search for it in the search bar)');
        console.error('4. Generate a new password and use that 16-character code.');
        console.error('----------------------------------------------------------------');
      }
      
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
