const createHtmlResponse = {
    success: (msg) => `
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>Account Verified</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 80px auto; background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
                    <h2 style="color: #2c3e50;">${msg}</h2>
                    <p style="margin: 20px 0;">Your account has been successfully verified.</p>
                    <a href="http://localhost:5173/auth"
                        style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold;">
                        Go to Login
                    </a>
                </div>
            </body>
        </html>
    `,
    error: (msg) => `
    <html>
        <head>
            <meta charset="UTF-8" />
            <title>Verification Failed</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #fff3f3; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 80px auto; background-color: #fff; border: 1px solid #f5c6cb; border-radius: 8px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); text-align: center;">
                <h2 style="color: #c0392b;">Verification Failed</h2>
                <p style="color: #555;">${msg}</p>
                <a href="http://localhost:5173/"
                    style="display: inline-block; margin-top: 20px; background-color: #c0392b; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    Return to Home
                </a>
            </div>
        </body>
    </html>
    `,
}

export { createHtmlResponse };

