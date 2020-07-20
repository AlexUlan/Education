export default class Form {
    constructor(forms){
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll("input");
        this.message = {
            loading: "Загрузка...",
            fail: "Ошибка",
            success: "Спасибо! Скоро мы с вами свяжемся",
        };
        this.path = "assets/question.php";
    }

    async postDate  (data, url) {
        const resData = await fetch(url, {
            method: "POST",
            body: data,
        });
        return await resData.text();
    };

    clearInputs(){
        this.
        inputs.forEach(input =>{
            input.value = "";
        })
    }

    mailCheckInputs(){
        let mailInputs = document.querySelectorAll('[type="email"]')

        mailInputs.forEach(input =>{
            input.addEventListener("keypress", (event) => {
            if (event.key.match(/[^a-z 0-9 @ \.]/ig)) {
                event.preventDefault();
            }
    });
        })
    }

    phoneMask(){
        let setCursorPosition = (pos, elem) => {
        elem.focus();
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
         let range = elem.createTextRange();
            range.collapse(true);

            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = "+1 (___) ___-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) {
        val = def;
        }

        this.value = matrix.replace(/./g, (char) => {
        /* /[_\d]/ проверка или символ явяеться _ или цифрой */
        return /[_\d]/.test(char) && i < val.length
            ? val.charAt(i++)
            : i >= val.length
            ? ""
            : char;
        });

        if (event.type === "blur") {
            if (this.value.length == 2) {
                this.value = "";
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll("[name='phone']");

    inputs.forEach((input) => {
        input.addEventListener("input", createMask);
        input.addEventListener("focus", createMask);
        input.addEventListener("blur", createMask);
    });
}
    


    init(){
        this.mailCheckInputs();
        this.phoneMask();
        this.forms.forEach(form => {
             form.addEventListener('submit', (event)=>{

                event.preventDefault();
                const messageStatus = document.createElement("div");
                messageStatus.style.innerText = `
                    margin-top:15px;
                    font-size: 18px;
                    color:grey;
                `;
                messageStatus.textContent = this.message.loading;
                form.parentNode.appendChild(messageStatus);

                const formData = new FormData(form);
                this.postDate(formData, this.path)
                    .then(res=>{
                        messageStatus.textContent = this.message.success;
                    })
                    .catch(()=>{
                        messageStatus.textContent = this.message.fail;
                    })
                    .finally(()=>{
                         this.clearInputs();
                         setTimeout(() => {
                              messageStatus.remove();
                         }, 6000);
                    }
                    )
                        
                    

             })   
        });
    }


}