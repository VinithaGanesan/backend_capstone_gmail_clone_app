const Email = require("../models/Email");

async function GET_ALL_EMAILS (req, res, next) {
    try {

        let emails = await Email.find({ userId: req.userId });
        if (req.params.type === 'bin') {
            emails = await Email.find({ bin: true, userId: req.userId });
        } else if (req.params.type === 'allmail') {
            emails = await Email.find({ userId: req.userId });
        } else if (req.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false, userId: req.userId });

        } else {
            emails = await Email.find({ type: req.params.type, userId: req.userId });
        }

        return res.status(200).json({
                success: true,
                message: 'all mails fetched successfully',
                data: emails,
                
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function COMPOSE_NEW_EMAIL (req, res, next) {
    try {
        // sent new email 
        const {userId, from, to, subject, body, date, image, name, type} = req.body
        const email = await new Email({userId, from, to, subject, body, date, image, name, type});
        console.log(req.body);
        const sentEmail = await email.save();
        console.log(`email sent successfully${sentEmail}`);

        //generate a random reply email
        const newEmainIn = new Email({
            userId: email.userId,
            from: email.to,
            to: email.from,
            subject: 'Re:' + email.subject,
            body: 'This is a random reply mail',
            date: new Date(),
            image: '',
            name: email.name,
            type: 'inbox'
        });

        //save random reply email
        const EmailIn = await newEmainIn.save();
        console.log(`email received successfully${EmailIn}`);

        return res.status(200).json({
            success: true,
            message: 'Email saved successfully',
            data: sentEmail,
            received: EmailIn
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}



module.exports = {
    GET_ALL_EMAILS,
    COMPOSE_NEW_EMAIL
}