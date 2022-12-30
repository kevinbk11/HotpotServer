window.onload = function(){

    document.oncontextmenu = ()=> {
        window.event.returnValue = false;
    }

    document.onkeydown = (e)=> {
        if (e.key == 'F12' || e.key=='F10' ||e.ctrlKey||e.shiftKey||e.key=='I') {
            return false;
    }}

    const LOGIN_FORM = document.getElementById('loginForm');
    var hasCreate = false;
    const FORM_GROUP = document.querySelectorAll('.form_group');
    var nickname = FORM_GROUP[0].cloneNode(true);
    nickname.querySelector('.button').id = "nick";
    nickname.querySelector('.button').textContent = "";
    nickname.querySelector('label').setAttribute("for", "nickname");
    nickname.querySelector('label').textContent = "暱稱";
    nickname.querySelector('input').id = "nickname";
    nickname.querySelector('input').name = "nickname";
    nickname.querySelector('input').setAttribute("oninput", "");

    const LOGIN = document.getElementById('login');
    const CREATE = document.getElementById('create');
    const ACTION_BUTTON = document.querySelector('.action_button');
    const RETURN = ACTION_BUTTON.querySelector('input[type="button"]');

    LOGIN.addEventListener('click', () => {
        const INPUT_AREA = document.querySelectorAll('.input_area');
        for (const input of INPUT_AREA){
            input.style.visibility='visible';
        }
        ACTION_BUTTON.style.visibility='visible';
        LOGIN.textContent = "";
        CREATE.textContent = "";
    })
    CREATE.addEventListener('click', () => {
        hasCreate = true;
        LOGIN_FORM.prepend(nickname);
        const INPUT_AREA = document.querySelectorAll('.input_area');
        for (const input of INPUT_AREA){
            input.style.visibility='visible';
        }
        ACTION_BUTTON.style.visibility='visible';
        LOGIN.textContent = "";
        CREATE.textContent = "";
    })
    RETURN.addEventListener('click', ()=>{
        if(hasCreate){
            const NICKNAME = document.querySelectorAll('.form_group');
            NICKNAME[0].remove();
            hasCreate = false;
        }
        const INPUT_AREA = document.querySelectorAll('.input_area');
        for (const input of INPUT_AREA){
            input.style.visibility='hidden';
        }
        ACTION_BUTTON.style.visibility='hidden';
        LOGIN.textContent = "已經有帳號";
        CREATE.textContent = "還沒有帳號";
    })
    LOGIN_FORM.onsubmit = () => {
        const input_check = document.querySelectorAll(".form_group input");
        var stopsubmit = false;
        for(const input of input_check){
            if(input.value == "") stopsubmit = true;
        }
        if(stopsubmit) return false;
    }
}

