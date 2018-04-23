const Message = (message, user) => {
  console.log('got ere');
  console.log(message, user);
  this.message = message;
  this.user = user;
  this.time = Date.now();
};

export default Message;
