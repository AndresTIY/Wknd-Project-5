import { createStore } from 'redux'
import loginView from './login_view.js'
import chatView from './chat_view.js'
import messageView from './message_view.js'

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
}
