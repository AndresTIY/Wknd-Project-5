import messageView from './message_view.js'
// import loginView from './login_view.js'
export default function (store){

  let state = store.getState();
  // console.log(state);
  let $user = state.currentUser;
  // console.log($user);



  let $html =
        $(`<div class="outer-chat-card">
            <div class="chat-card">
            </div>
          </div>
          <div class="user-area-card">
          <p id="user-name-text">${$user}</p>
          <input id="input-msg" type="text" name="" value="">
          <button id="ent-msg-btn" type="button" name="button">SEND</button>
        </div>`);
  let $sendBtn = $($html).find('#ent-msg-btn');
  let $msgInput = $($html).find('#input-msg');
  var moment = require('moment');
  let timestamp = moment().format('M/D/YYYY, h:mm:ssa');
  let chatCard = $($html).find('.chat-card');
  if (state.allData !== undefined){
    chatCard.html("")
    state.allData.forEach(function(message,i,arr){
        if(message.fullMsg !== undefined){
        chatCard.prepend(messageView(store, message))
        // chatCard.html("")

      }
    })
  };


  $sendBtn.on('click',function(e){
    let $newMsg = $msgInput.val();
    let $fullMessage = `${$user} (${timestamp}): ${$newMsg}`
    store.dispatch({
      type:"MSG_SENT",
      user: $user,
      timestamp: timestamp,
      messageBody: $newMsg,
      fullMsg: $fullMessage
    })
  })



  return $html;

}//end of chat view
