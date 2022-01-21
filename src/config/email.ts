import nodemailer from 'nodemailer';

// Create a SMTP transport object
function configureSMTP(){
    try{
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_KEY
            }
        });
    }catch(error: any){
        console.log(error);
        return null;
    }
}

export function sendMail(to: string, subject: string, text?: string, html?: string){
    try{
        const transporter = configureSMTP();
        if(transporter){
            console.log('sending registration email to: ' + to);
            var message = {
                // sender info
                from: 'psychapp.ucy@gmail.com',
                // Comma separated list of recipients
                to: to,
                // Subject of the message
                subject: subject, 
                // plaintext body
                text: text,
                // HTML body
                html: html
            }

                transporter.sendMail(message, function(error: any, info: any){
                if(error){
                    console.log('Error occured');
                    console.log(error.message);
                    return;
                }else{
                    console.log('Message sent successfully!');
                    console.log(info)
                }
            
                transporter.close(); // close the connection pool
            });
        };
    }catch(error){
        console.error(error);
    }
}