export default function messageView (store, message){
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
