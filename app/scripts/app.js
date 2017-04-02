import { createStore } from 'redux'

export default function app() {
  const url = 'http://tiny-za-server.herokuapp.com/collections/dres-chat2';
    // console.log(Redux.store('foo'));
  const initialState = {
    currentUser: null,
    time: null,
    messageBody: null,
    fullMsg: [],
    view: loginView
  };

  const reducer = function(currentState, action){
    if (currentState === undefined) {
      return initialState
    }

    switch(action.type){

      case "LOGIN_USER":
        var newState = {
          currentUser: action.user,
          view: chatView
        };
        $.getJSON(url).then((data)=> {
          store.dispatch({type:"MSG_LOADED", allData: data})
        })
        // console.log(newState);
        return Object.assign({}, currentState, newState);

        //done when msg sent or del
      case "LOAD_MSG":
        $.getJSON(url).then((data)=>{
          store.dispatch({type:"MSG_LOADED", allData: data})
        })
        return currentState;

      case "MSG_LOADED":
        var newState = {
          allData: action.allData,
          currentUser: 'text'
        }

        console.log(newState);
        return Object.assign({}, currentState, newState);


      case "MSG_SENT":
        $.ajax({
          url: url,
          type: "POST",
          dataType: "JSON",
          data: {
            user: action.user,
            time: action.timestamp,
            msgBody: action.messageBody,
            fullMsg: action.fullMsg
          }
        }).then(function(data,status, xhr){
          store.dispatch({type:"LOAD_MSG"})
        });
        return currentState;

      case "DELETE_MSG":
        var msg = action.message
        $.ajax({
          url: `${url}/${msg._id }`,
          type: "DELETE"
        }).then((data)=>{
          store.dispatch({type:"LOAD_MSG"}) });
        return currentState;





      case "NOOP":
        return currentState;

      default:
        return currentState;

    }//end of switch

  };//end of reducer

  const store = createStore(reducer, initialState);

  const render = function(){
    let state = store.getState();
    $('#app').html(state.view(store));
  };

  store.subscribe(render);
  store.dispatch({type:"NOOP"})



  //Login View
  function loginView(store){
    let $html =
        $(`<div class="header-card"><h1>Chat Room</h1></div>
            <div class="user-login-card">
            <h3>Log In to Start Chatting!</h3>
            <input class="login-input" placeholder="username" type="text" name="" value=""><br>
            <button class="login-btn" type="button" name="button">ENTER</button>
          </div>`);

    let $loginBtn = $($html).find('.login-btn');
    let $loginInput = $($html).find('.login-input');

    $($loginBtn).on('click', (e)=>{
      store.dispatch({
        type: 'LOGIN_USER',
        user: $loginInput.val()
      })
    });

    return $html;




  }//end of loginView

  //Chat View
  function chatView(store){
    let state = store.getState();
    let $user = state.currentUser;
    let $html =
        $(`<div><div class="chat-card"></div></div>
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
          chatCard.append(messageView(store, message))
          // console.log(message._id);
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

  function messageView(store, message){
    let $html = $(`<p class="chat-messages"><button class="">x</button> ${message.fullMsg}</p>`)
    let $deleteBtn = $($html).find('button');

    let state = store.getState();
    if (state.currentUser = message.user){
      console.log('yay');
    }

    $deleteBtn.on('click',(e)=>{
      console.log('delete button clicks');
      store.dispatch({ type: "DELETE_MSG", message: message})
    })
    return $html
  }


}//end of export
