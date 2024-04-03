//const token declared in privateConst file
//const webAppUrl declared in privateConst file
const telegramUrl = "https://api.telegram.org/bot" + token;

const telegramTag = "@CT_queues_bot";

const beginCommand = "/start";
const queueCommand = "/queue";
const subscribeCommand = "/subscribe"
const unsubscribeCommand = "/unsubscribe"
const helpCommand = "/help";
const unregisterCommand = "/unregister";

const unsupportedChatTypeMessage = "Неподдерживаемый тип чата!";

const unregisteredMessage = `
К сожалению, вы не зарегистрированы!
Вы можете зарегистрироваться, написав боту в личные сообщения
`;
const unregisterMessage = "Пожалуйста, зарегистрируйтесь снова, введя ФИО, строго совпадающие с табличным";
const greetMessage = "<b>Для начала работы с ботом введите своё ФИО, строго совпадающее с табличным</b>";
const successfullRegistrationMessage = `
Регистрация прошла успешно!
<b>Отписаться от рассылки</b>
` + unsubscribeCommand;
const wrongMessageType = "Неверный формат сообщения";

const groupHelpMessage = `
<b>Получить свою позицию в очереди (только если вы зарегестрированы)</b>
` + queueCommand + telegramTag + `

<b>Получить баллы человека по имени</b>
` + queueCommand + telegramTag + ` <i>Фамилия Имя</i>

<b>Получить это сообщение</b>
` + helpCommand + telegramTag;

const personalHelpMessage = `
<i>Бот работает с очередью парадигм программирования групп M3136-M3139</i>

<b>Получить свою позицию в очереди</b>
` + queueCommand + `

<b>Перерегистирроваться</b>
` + unregisterCommand + `

<b>Получить это сообщение</b>
` + helpCommand;

const personNotFoundMessage = `
Указанный человек не найден
Убедитесь, что ввод совпадает табличному и попробуйте ещё раз`;
const personNotQueuedMessage = "Указанный человек не стоит в очереди";

//begins with 1
const queuesCountLocalization = ["<b>одной</b> очереди", "<b>двух</b> очередях", "<b>трёх</b> очередях", "<b>четырёх</b> очередях", "<b>пяти</b> очередях"];
const queuesPositionLocalization = ["<b>первый</b> в очереди", "<b>второй</b> в очереди"];

const studentsSheet = "students"
const registrationsSheet = "bot_registrations"
const paradigmsQueueScoreSheet = "paradigms"

const registrationsCountCell = "D1"