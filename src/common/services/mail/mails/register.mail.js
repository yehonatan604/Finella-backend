export const registerMail = (email, name, token) => {
    return {
        to: email,
        subject: "הרשמה לאתר",
        html: `
            <p>שלום ${name},</p>
            <p>תודה שנרשמת לאתר שלנו!</p>
            <p>אנא לחץ על הקישור הבא כדי לאשר את ההרשמה שלך:</p>
            <form action="http://localhost:8181/users/verify/${email}/${token}" 
                method="POST" 
                style="display:inline;" 
                onsubmit="event.preventDefault(); fetch(this.action, { method: 'POST' });"
            >
                <button type="submit">לחץ כאן לאישור הרשמה</button>
            </form>
            <p>בברכה,<br>צוות האתר</p>
        `
    };
};
