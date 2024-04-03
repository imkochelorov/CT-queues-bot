function groupReply(message) {
    const senderId = message.from.id;
    const chatId = message.chat.id;
    const text = message.text;
    const split = text.split(" ");

    Logger.log("Group message: " + chatId + " " + text);

    if (split[0] === helpCommand + telegramTag) {
        sendMessage(chatId, groupHelpMessage, message.message_id);
        return;
    }

    const spreadsheet = SpreadsheetApp.getActive();

    if (split.length === 1 && text === queueCommand + telegramTag) {
        const registration = getRegistrationById(spreadsheet, senderId);
        if (registration === null) {
            sendMessage(chatId, unregisteredMessage, message.message_id);
            return;
        }
        const name = registration[2];
        if (text === scoreCommand + telegramTag) {
            sendQueue(spreadsheet, name, chatId, message.message_id);
            return;
        }
    }

    let name = null;
    if (split.length === 3) {
        name = split[1] + " " + split[2];
    } else if (split.length === 4) {
        name = split[1] + " " + split[2] + " " + split[3];
    }
    if (split[0] === queueCommand + telegramTag && name !== null) {
        sendQueue(spreadsheet, name, chatId, message.message_id);
        return;
    }
}

function privateReply(message) {
    const senderId = message.from.id;
    const text = message.text;
    const split = text.split(" ");

    Logger.log("Private message: " + senderId + " " + text);

    if (text === helpCommand || text === beginCommand) {
        sendMessage(senderId, personalHelpMessage);
        return;
    }

    const spreadsheet = SpreadsheetApp.getActive();
    const registration = getRegistrationById(spreadsheet, senderId);

    if (registration == null) {
        greetUnregistered(spreadsheet, senderId, text, split);
        return;
    }
    if (split[0] === unregisterCommand) {
        unregister(spreadsheet, senderId);
        return;
    }
    const name = registration[2];
    if (text === queueCommand) {
        sendQueue(spreadsheet, name, senderId);
    } else {
        sendMessage(senderId, wrongMessageType);
    }
}