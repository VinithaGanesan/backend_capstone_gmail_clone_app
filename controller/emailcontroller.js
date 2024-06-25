const Email = require("../models/Email");

async function GET_ALL_EMAILS(req, res, next) {
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

async function COMPOSE_NEW_EMAIL(req, res, next) {
    try {
        // sent new email 
        const { userId, from, to, subject, body, date, image, name, type } = req.body
        const email = await new Email({ userId, from, to, subject, body, date, image, name, type });
        const sentEmail = await email.save();

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

async function SAVE_DRAFT_EMAIL(req, res, next) {
    try {
        const { userId, from, to, subject, body, date, image, name, type } = req.body;
        const email = await new Email({ userId, from, to, subject, body, date, image, name, type });
        const savedraftEmail = await email.save();
        return res.status(200).json({
            success: true,
            message: 'Email saved to draft',
            data: savedraftEmail,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function SEARCH_EMAIL(req, res, next) {
    try {
        const {query} = req.body;
        const emails = await Email.find({  
            $or: [
              { subject: new RegExp(query, 'i') },
              { body: new RegExp(query, 'i') },
            ],
           });

        return res.status(200).json({
            success: true,
            message: 'all mails searched successfully',
            data: emails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


async function TOGGLE_STARRED_EMAIL(req, res, next) {
    try {
        await Email.updateOne({ _id: req.body.id }, { $set: { starred: req.body.value } })
        return res.status(200).json({
            success: true,
            message: 'Email is starred',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function MOVES_EMAILS_TO_BIN(req, res, next) {
    try {
        await Email.updateMany({ _id: { $in: req.body } }, { $set: { bin: true, starred: false, type: 'bin' } });

        return res.status(200).json({
            success: true,
            message: 'Email moved to bin successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function DELETE_EMAILS(req, res, next) {
    try {
        await Email.deleteMany({ _id: { $in: req.body } });
        return res.status(200).json({
            success: true,
            message: 'Emails deleted successfully',
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
    COMPOSE_NEW_EMAIL,
    TOGGLE_STARRED_EMAIL,
    MOVES_EMAILS_TO_BIN,
    DELETE_EMAILS,
    SAVE_DRAFT_EMAIL,
    SEARCH_EMAIL
}