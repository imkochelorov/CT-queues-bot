function getQueuePositions(queue, name) {
    let queuePosition = [];
    for (let practitionerIndex = 0; practitionerIndex < 5; practitionerIndex++) {
        for (let i = 0; i < 90; i++) {
            if (queue[i][practitionerIndex].replace(/\d+\s\d+\s/, "") === name) {
                queuePosition.push([i, practitionerIndex]);
            }
        }
    }
    return queuePosition;
}

function sendQueue(spreadsheet, sheetName, name, id, message_id = null) {
    const queue = spreadsheet.getSheetByName(sheetName).getRange("C4:G100").getValues();
    const queuePositions = getQueuePositions(queue, name);

    if (queuePositions === null || queuePositions.length === 0) {
        //sendMessage(id, personNotQueuedMessage, message_id);
        return null;
    }

    let message = "";
    message += "Вы стоите в " + queuesCountLocalization[queuePositions.length - 1] + ":";

    const practitioners = spreadsheet.getSheetByName(sheetName).getRange("C1:G1").getValues();
    for (let queueIndex = 0; queueIndex < queuePositions.length; queueIndex++) {
        message += "\r\n\r\n" + "<b>" + practitioners[0][queuePositions[queueIndex][1]] + "</b>";
        for (let i = 0; i < queuePositions[queueIndex][0]; i++) {
            message += "\r\n" + (i + 1).toString() + ". " + queue[i][queuePositions[queueIndex][1]];
        }
        message += "\r\n" + (queuePositions[queueIndex][0] + 1).toString() + ". " + "<i>" + queue[queuePositions[queueIndex][0]][queuePositions[queueIndex][1]] + "</i>";
    }

    sendMessage(id, message, message_id);
    return message;
}
function notifyQueue(spreadsheet, sheetName) {
    const practitioners = spreadsheet.getSheetByName(sheetName).getRange("C1:G1").getValues();

    const queue = spreadsheet.getSheetByName(sheetName).getRange("C4:G5").getValues();
    for (let queuePosition = 0; queuePosition < queue.length; queuePosition++) {
        for (let practitionerIndex = 0; practitionerIndex < 5; practitionerIndex++) {
            const name = queue[queuePosition][practitionerIndex].replace(/\d+\s\d+\s/, "");
            let registration = getRegistrationByName(spreadsheet, name);
            if (registration !== null) {
                let message = name + ", ты " + queuesPositionLocalization[queuePosition] + "\r\n";
                message += "<b>" + practitioners[0][practitionerIndex] + "</b>"
                for (let i = 0; i < queuePosition; i++) {
                    message += "\r\n" + (i + 1) + ". " + queue[i][practitionerIndex];
                }
                message += "\r\n" + (queuePosition + 1) + ". " + "<i>" + queue[queuePosition][practitionerIndex] + "</i>";
                sendMessage(registration[1], message);
            }
        }

    }
}