import axios from 'axios';

// Function to validate email addresses using a regular expression
export const validateEmails = (emails) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    const validEmails = [];
    const invalidEmails = [];

    emails.forEach(email => {
        if (emailRegex.test(email)) {
            validEmails.push(email);
        } else {
            invalidEmails.push(email);
        }
    });

    return { validEmails, invalidEmails };
};

// Function to read the CSV file and extract email addresses
export const readCSVFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const csv = event.target.result;
            const emails = csv.split('\n').map(line => line.trim());
            resolve(emails);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};

// Function to send emails using EmailJS API, with a 1-second delay between each email
export const sendEmails = async (validEmails, subject, message) => {
    try {
        for (const email of validEmails) {
            const templateParams = {
                to_name: email,         // Recipient email from CSV
                message,                // The message to send
                subject                 // The email subject
            };

            // Send email to each valid email address with a 1-second delay
            await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
                service_id: 'service_id',           // Your EmailJS service ID
                template_id: 'template_id',     // Your EmailJS template ID
                user_id: 'Public_key',        // Your EmailJS public user ID
                template_params: templateParams,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log(`Email sent to ${email}`);
            // Wait for 1 second before sending the next email
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        return { success: true, message: 'Emails sent successfully!' };
    } catch (error) {
        console.error('Error sending emails:', error);
        return { success: false, message: 'Failed to send emails.' };
    }
};
