function doPost(e) {
    Logger.log("got post");
    var message = JSON.parse(e.postData.contents).message;

    if (message.chat.type === "private") {
        privateReply(message);
        return;
    }
    if (message.chat.type === "group" || message.chat.type === "supergroup") {
        groupReply(message);
        return;
    }
    sendMessage(message.chat.id, unsupportedChatTypeMessage);
}

function doGet() {
    Logger.log("got get");
    return HtmlService.createHtmlOutputFromFile('index');
}

function timeTrigger() {
    Logger.log("got time trigger");
    const spreadsheet = SpreadsheetApp.getActive();

    for (let queueSheet in queueSheets) {
        notifyQueue(spreadsheet, queueSheets[queueSheet]);
    }
}