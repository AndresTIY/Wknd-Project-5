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
          store.dispatch({type:"MSG_LOADED", fullMsg: data})
        })
        console.log(newState);
        return Object.assign({}, currentState, newState);


      case "LOAD_MSG":
        $.getJSON(url).then((data)=>{
          store.dispatch({type:"MSG_LOADED", fullMsg: data})
        })
        return currentState;

      case "MSG_LOADED":
        var newState = {
          fullMsg: action.actionmsg
        }
        console.log(newState);

        return Object.assign({}, currentState, newState);



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
    let currentUser = state.user;
    let $html =
        $(`<div class="chat-card"></div>
            <div class="user-area-card">
            <p id="user-name-text">${state.currentUser}</p>
            <input id="input-msg" type="text" name="" value="">
            <button id="ent-msg-btn" type="button" name="button">SEND</button>
          </div>`);

    let actionmsg = console.log('it works');

    return $html;

  }//end of chat view


}//end of export
