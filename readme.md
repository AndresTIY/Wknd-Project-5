## Chat Room Weekend Project
#### Explorer Mode
- using redux, model state of your application as a single object and use multiple actions to handle any changes in that state
- app should have a SINGLE REDUCER function that is PURE and returns a new copy of the state after every action
- create an online chat app that can host multiple users that have unique usernames/handles
- users can submit new chat messages which should update chat area in about 2 seconds. users can not edit any chat messages. older messages can be deleted only by user that created message
- messages should display name of user and timestamp. newest chats should be closest to the input area for writing new messages
- app should include at least 2 view functions for each page. page 1 has login info. page 2 has chat box.user can only see messages after logging in
- code should be MODULAR
- VIEWS, should have at least a render function for each
  - LOGIN, for rendering login page and handling any user events that occur on login page
  - CHAT, for rendering chat room page and any user events that occur on the chat page
  - MESSAGE, for rendering a single message to the chat area and handling any user events that can occur for a single message

- Should use Redux to handle all communication between your different views and to change the state of your application

#### Reminders
- use `Object.assign` to update the state
- check out redux website
- setInterval()
- moment.js (already installed)

let state [x]
cont store [x]
const reducer[]

predicting action.user, action.timestamp, action.messages to not work

#### Going through Justin's Todo Redux Example

what are:

action.type => type looks like the property of action. it's in the switch statement. if action.type case is LOGIN USER, do this...

action.user => within a click function, store.dispatch({type: LOGIN_USER, user: $('input').val() })
  - action = store.dispatch?

action.todo => within a keyup function, store.dispatch({type:CREATE_TODO, todo: toDoText})
  - toDoText = $('input').val();

action.todos
var todos = state.todos.map(function(todo){
  return todoView(store, todos)
  })
  - $html.find('ul').html(todos)
    - todos gets added to html
  - todos is a map function

Conclusion: Looks like the words after action. are functions. except for type.
- store.dispatch happens on click and keyup events/functions
- does store.dispatch always match the state?
- it looks like dispatch runs the switch statement
  - there's a dispatch in the switch statements as well, like when user logs in, grab the data from json url, then switch to TODOS_LOADED. when you log in, load the todos.

  More info: store.dispatch within login case, load_todos case, create todo, delete todo
  - if case=LOGIN, set a new state, getJSON(url)/grab data, switch to TODOS LOADED
  - if case=LOAD_TODOS, getJSON(url)/grab data, switch to TODOS_LOADED
  - if case=TODOS_LOADED, set newState
  - if case=CREATE_TODO, post that data to ajax, then dispatch to LOAD_TODOS
  - to do list uses store.dispatch outside of switch statement for LOGIN_USER on click event, CREATE_TODO on key in event, and DELETE_TODO. MAYBE it's for changing the state of the page itself
  - store.dispatch based on initialState only? NO
  - store.dispatch match switch?




need a fn/value AND store.dispatch:
timestamp
  - fn/val[x] dispatch[]
user
  - fn/val[x] dispatch[x]
messages
  - fn/val[] dispatch[]


  - says reducer is not a function?
    - reducer contains the entire switch statement
    -
FOR EACH ON MESSAGES


DIVIDE IT UP
Justin has
- app.js
  - const initialState
  - const reducer
  - const store
  - const render
  - store.subscribe(render)
  - NOOP?

- loginView
  - let html = section tags
  - on click event for LOGIN_USER

- todoListView
  - let state, let title, let className, let todoInput

- todoView
 - let html, li tags with todo.name
 - todo is being passed as an arg
 - todo is every item that the map function runs though
