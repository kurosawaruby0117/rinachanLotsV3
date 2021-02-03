const fileUpload=document.querySelector(".fileUPPP");
const inputForm=document.querySelector(".input__contents");
const input=document.querySelector("input");
const button=document.getElementsByClassName("submit")[0];
const WhatYouGot=document.getElementsByClassName("value")[0];
const list=document.getElementsByClassName("arrayList")[0];
const anonymous=document.getElementsByClassName("anonymous")[0];
const rinaPic=document.getElementsByClassName("rinaLocation")[0];
const downloadButton=document.getElementsByClassName("download")[0];
const uploadFile=document.getElementsByClassName("fileUpload")[0];

let inputArray=[];
let files;
let fileArray;
checkBoolean=false;
function IDGenerateer(){
    let idNumber=[]
    for(var i=0;i<inputArray.length;i++){
        idNumber.push(Number(inputArray[i].id));
    } 
    idNumber=idNumber.sort();
 
    if(!(idNumber.includes(1))){
        
        
        return 1;
    }else{
       
    }
    if(idNumber.length===0){
       
        return 1;
    }
    for(var i=0;i<idNumber.length-1;i++){
        if(Number(idNumber[i])!==Number(idNumber[i+1])-1){
            return (Number(idNumber[i])+1);
        }
    }
    return Number(idNumber[idNumber.length-1]+1);  
}
function saveFile(){

    if(inputArray.length<=0){
        alert("please insert more than 1.");
    }else{
       var listOfArray=[];
       for(var i=0;i<inputArray.length;i++){
        listOfArray.push(inputArray[i].text);
       }
        var textDownload=document.createElement('a');
       textDownload.href='data:attachment/text,'+encodeURI(listOfArray.join('\n'));
       textDownload.target='_blank';
       textDownload.download='lots.txt';
       textDownload.click();
       
    }
   
    
}
function cancelEdit(event){

}
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    list.removeChild(li);
    const cleanToDos = inputArray.filter(function(contents) {
      return contents.id !== li.id;
    });
    inputArray = cleanToDos;

}

function handleCheckButton(){
    checking=anonymous.checked;
    
    if(checking){
        input.type="password";
        input.style="ime-mode:auto";
        checkBoolean=true;
    }else{
        input.type="text";
        checkBoolean=false;
    }
}

function editToDo(event){
    event.preventDefault()
    const btn=event.target;
    const li=btn.parentNode;
    const button=li.querySelectorAll("button");
    const before=li.querySelector("span");
    const buttonNwe=document.createElement("button");
    const buttonNwe2=document.createElement("button");
    buttonNwe.setAttribute("class","fas fa-edit")
    buttonNwe2.setAttribute("class","fas fa-eraser");


    const saving=li.innerText;
    const endEdit=document.createElement("button");
    const newLots=document.createElement("span");
    const editBlank=document.createElement("input");
    editBlank.value=li.innerText;
   
    const cancelButton=document.createElement("button");
    cancelButton.setAttribute("class","fas fa-window-close")
    endEdit.setAttribute("class","fas fa-check");
    li.removeChild(button[0]);
    li.removeChild(button[1]);
    li.removeChild(before);
    li.appendChild(editBlank);
    li.appendChild(cancelButton);
    li.appendChild(endEdit);

    cancelButton.addEventListener("click",function(event) {
       newLots.innerText=saving;
        li.removeChild(editBlank);
        li.appendChild(newLots);
        li.appendChild(buttonNwe2);
        li.appendChild(buttonNwe);
        li.removeChild(endEdit);
        li.removeChild(cancelButton);
        buttonNwe2.addEventListener("click",deleteToDo);
        buttonNwe.addEventListener("click",editToDo);
        inputArray.forEach(toDo => {
            if(toDo.id===li.id){
                toDo.text=newLots.innerText
            }
        });
    })
    
    endEdit.addEventListener("click",function(e){
       
        if(editBlank.value.length===0){
            alert("Please enter a word!")
        }else{
            
            newLots.innerText=editBlank.value;
            li.removeChild(editBlank);
            li.appendChild(newLots);
            li.appendChild(buttonNwe2);
            li.appendChild(buttonNwe);
            li.removeChild(endEdit);
            li.removeChild(cancelButton);
            buttonNwe2.addEventListener("click",deleteToDo);
            buttonNwe.addEventListener("click",editToDo);
       
            inputArray.forEach(toDo => {
                if(toDo.id===li.id){
                    toDo.text=newLots.innerText
                }
            });
        }
      
     })
 
  
    
}
function handleInput(event){
    event.preventDefault();
    const potato=document.createElement("li");
    const delBtn=document.createElement("button");
    const editButton=document.createElement("button");
    delBtn.setAttribute("class","fas fa-eraser")
    editButton.setAttribute("class","fas fa-edit")
    
    delBtn.addEventListener("click",deleteToDo);
    editButton.addEventListener("click",editToDo);
    const span=document.createElement("span");
    const newId=inputArray.length+1;
    if(checkBoolean){
        span.innerText="*****";
    }else{
        span.innerText=input.value;
    }
    
    potato.appendChild(span);
    potato.appendChild(delBtn);
    potato.appendChild(editButton);

    list.appendChild(potato);
    potato.id=IDGenerateer();
    const toDoObj={
        text:input.value,
        id:potato.id,
    };
    inputArray.push(toDoObj);
    inputForm.reset();
}

function handleButton(event){
    if(inputArray.length>1){
        
        const ranNumber=Math.floor(Math.random()*(inputArray.length-1+1));
        const len=inputArray[ranNumber].text.length
        if(inputArray[ranNumber].text.startsWith("secret_")){
            WhatYouGot.innerText=inputArray[ranNumber].text.substring(7,len);
        }else{
            WhatYouGot.innerText=inputArray[ranNumber].text
        }
       
    }else{
        alert("please insert more than 1.");
    }
}
function readFile1(e) { 
    var file = e.target.files[0];
 
    if (!file) {
           return;
    }
    var reader = new FileReader();
    
    reader.onload = function(e) {
        files=reader.result.split('\n');
        
        for(var i=0;i<files.length;i++){
            if(files[i].length==0||files[i]===""){
                continue;
            }
            if(files[i][files[i].length-1].charCodeAt(0)==13){
                files[i]=files[i].substring(0,files[i].length-1);
            }
            const potato=document.createElement("li");
            const delBtn=document.createElement("button");
            const editButton=document.createElement("button");
            delBtn.setAttribute("class","fas fa-eraser")
            editButton.setAttribute("class","fas fa-edit")
            delBtn.addEventListener("click",function(event) {
                const btn = event.target;
                const li = btn.parentNode;
                list.removeChild(li);
                const cleanToDos = inputArray.filter(function(contents) {
                  return contents.id !== li.id;
                });
                inputArray = cleanToDos;
            
            })
            editButton.addEventListener("click",function(event){
                event.preventDefault()
                const btn=event.target;
                const li=btn.parentNode;
                const button=li.querySelectorAll("button");
                const before=li.querySelector("span");
                const buttonNwe=document.createElement("button");
                const buttonNwe2=document.createElement("button");
                buttonNwe.setAttribute("class","fas fa-edit")
                buttonNwe2.setAttribute("class","fas fa-eraser");
            
            
                const saving=li.innerText;
                const endEdit=document.createElement("button");
                const newLots=document.createElement("span");
                const editBlank=document.createElement("input");
                editBlank.value=li.innerText;
               
                const cancelButton=document.createElement("button");
                cancelButton.setAttribute("class","fas fa-window-close")
                endEdit.setAttribute("class","fas fa-check");
                li.removeChild(button[0]);
                li.removeChild(button[1]);
                li.removeChild(before);
                li.appendChild(editBlank);
                li.appendChild(cancelButton);
                li.appendChild(endEdit);
            
                cancelButton.addEventListener("click",function(event) {
                   newLots.innerText=saving;
                    li.removeChild(editBlank);
                    li.appendChild(newLots);
                    li.appendChild(buttonNwe2);
                    li.appendChild(buttonNwe);
                    li.removeChild(endEdit);
                    li.removeChild(cancelButton);
                    buttonNwe2.addEventListener("click",deleteToDo);
                    buttonNwe.addEventListener("click",editToDo);
                    inputArray.forEach(toDo => {
                        if(toDo.id===li.id){
                            toDo.text=newLots.innerText
                        }
                    });
                })
                
                endEdit.addEventListener("click",function(e){
                    if(editBlank.value.length===0){
                        alert("Please enter a word!")
                    }else{
                    newLots.innerText=editBlank.value;
                     li.removeChild(editBlank);
                     li.appendChild(newLots);
                     li.appendChild(buttonNwe2);
                     li.appendChild(buttonNwe);
                     li.removeChild(endEdit);
                     li.removeChild(cancelButton);
                     buttonNwe2.addEventListener("click",deleteToDo);
                     buttonNwe.addEventListener("click",editToDo);
                     inputArray.forEach(toDo => {
                         if(toDo.id===li.id){
                             toDo.text=newLots.innerText
                         }
                     });
                 }})})
            const span=document.createElement("span");
            const newId=IDGenerateer()
            
            if(files[i].startsWith("secret_")){
                console.log(files[i])
                span.innerText="*****";
            }else{
                console.log(files[i])
                span.innerText=files[i];
            }

            potato.appendChild(span);
            potato.appendChild(delBtn);
            if(files[i].startsWith("secret_")){
                const a=3;
            }else{
                potato.appendChild(editButton);
            }
           
            list.appendChild(potato);
            
            potato.id=newId;
            const toDoObj={
                text:files[i],
                id:potato.id,
            };
            inputArray.push(toDoObj);
            
        }

        
        //file데이터를 읽어서 처리할 로직.
    };
    reader.readAsText(file, 'utf-8');
}


uploadFile.addEventListener("change",readFile1);


if(button){
    button.addEventListener("click",handleButton);
}
inputForm.addEventListener("submit",handleInput);
anonymous.addEventListener("click",handleCheckButton);

downloadButton.addEventListener("click",saveFile)


