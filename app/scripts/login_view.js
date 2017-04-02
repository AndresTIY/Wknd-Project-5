export default function (store){

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




}
