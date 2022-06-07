  module.exports = (message, client) => {/*
	if(message.author.id == "635303930879803412"){
	console.log(message.author.id)	
	return}
  if (!message.channel.type === 'text') return;
  if (!client.usersMap) client.usersMap = new Map();
  const usersMap = client.usersMap
  const LIMIT = 5;
  const DIFF = 5000;
  const TIME = 3000

  if (message.author.bot) return;

  if (usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;

    if (difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared Timeout');
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, TIME);
      usersMap.set(message.author.id, userData)
    }
    else {
      ++msgCount;
      if (parseInt(msgCount) === LIMIT) {

        client.utility.warn(message,"SYSTEM","Warning: Spamming in this channel is forbidden. If you are caught spamming you will be ",message.author)

      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  }
  else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
*/
	}