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
          allData: action.allData

        }
        // console.log(newState);

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
        })





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
        $(`<div><div class="chat-card"></div></div>
            <div class="user-area-card">
            <p id="user-name-text">${state.currentUser}</p>
            <input id="input-msg" type="text" name="" value="">
            <button id="ent-msg-btn" type="button" name="button">SEND</button>
          </div>`);
    let $sendBtn = $($html).find('#ent-msg-btn');
    let $msgInput = $($html).find('#input-msg');
    var moment = require('moment');
    let timestamp = moment().format('M/D/YYYY, h:mm:ssa');



    // var messages = state.allData.map(function(message, i, arr){
    //   return messageView(store, message)
    // })
    // var allOfTheData = state.allData
    // var getItemsFn = function(){
    //   $.getJSON(url).then((data)=>{
    //     data.map(function(message, i, arr){
    //       messageView(store, message)
    //       console.log(message.fullMsg);
    //       //all fullMsg gets logged 4 times
    //     })
    //   })
    // };
    // getItemsFn();
    // chatCard.append(getItemsFn()) nothing happens
    // chatCard.append(getItemsFn) nothing happens



    // getItemsFn();
    let chatCard = $($html).find('.chat-card');
    // chatCard.append(getItemsFn())

    // var getItemsFn2 =
    //   if (state.allData !== undefined){
      // state.allData.map(function(message, i, arr){
        // messageView(store, message)
        // console.log(message.fullMsg );
    //   })
    // };
    // var getItemsFn3 =
    //   if (state.allData !== undefined){
    //     state.allData.map(function(message,i,arr){
    //       messageView(store, message)
    //     })
    //   };

    // getItemsFn3();

    if (state.allData !== undefined){
      chatCard.html("")
      state.allData.forEach(function(message,i,arr){
          if(message.fullMsg !== undefined){
          chatCard.append(messageView(store, message))
          console.log(message.fullMsg);
        }
      })
    };
    // chatCard.append(getIt)



    // chatCard.append(getItemsFn3)
    // console.log(getItemsFn2);

    //logs everything twice
    // var blarg = state.allData
    // console.log(blarg);

    // var messages = state.allData.forEach(function(item, i, arr){
    //   return item;
    // })

    //state.allData gives me an array of objects


    $sendBtn.on('click',function(e){

      let $newMsg = $msgInput.val();

      let $fullMessage = `${state.currentUser} (${timestamp}): ${$newMsg}`


      store.dispatch({
        type:"MSG_SENT",
        user: currentUser,
        timestamp: timestamp,
        messageBody: $newMsg,
        fullMsg: $fullMessage
      })
    })



    return $html;

  }//end of chat view

  function messageView(store, message){
    let $html = $(`<p class="chat-messages">${message.fullMsg}</p>`)
    //line 26,27, todo within function(todo) and
      //return toDoView(store,todo)
    //58) case CREATE_TODO, ajax post request
      //data: {name:action.todo}
    //34) click event, store.dispatch({type: CREATE, todo:todoText})
        //33)todoText assigned to input.val()
    //dispatch for todo is seen with the delete button


    return $html
    // console.log($html); //logs the p tag with appropriate messages
    // console.log(message.fullMsg) gives us fullMsg for each item twice
  }


}//end of export
