<?php
$redirect = "https://sgholding.ru/landings/dropship/#form-anchor";

$to = "alexeykonoplev2@yandex.ru";
$data = [];
$type = 0;
$name = '';
$email = '';
$phone = '';
$send = true;
 
if(isset($_POST))   {

 
    $data['type'] = isset($_POST['type']) ? $_POST['type'] : 0;
    $data['name'] = isset($_POST['name']) ? $_POST['name'] : ' Имя не указано ';
    $data['email'] = isset($_POST['name']) ? $_POST['email'] : ' Емайл не указан';
    $data['comment'] = isset($_POST['comment']) ? $_POST['comment'] : ' Коментарий не указан';
    // checkReq($_POST['phone'], 'phone') $_POST["пареметр"] название поля


    //$data['phone'] = (checkReq($_POST['phone'], 'phone')) ? $_POST['phone'] : ' Телефон не указан ';
    $data['phone'] = checkReq($_POST['phone']); 
    $send = checkReq($_POST['phone']);
    $mail_message = getTypeMSG($data);

    /* Для отправки HTML-почты вы можете установить шапку Content-type. */
    $headers= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf8\r\n";
    /* дополнительные шапки */
    $headers .= "From: " . $email . "\r\n";
    if($send){
        if(mail($to,'Обращение с формы', $mail_message, $headers)){
             echo 'success'; // раскоментить когда аякс будет готов
            //header("Location: " . $redirect); // закоментить когда аякс будет готов
        }   
    }else{
        echo 'bad';
    }
    


}

function getTypeMSG($data){
    $msg = 'Что то тут не так!';
    if($data['type'] == 2){
        $msg = "Имя: " . $data['name'] . "\n<br>" .
            "Телефон: " . $data['phone'] . "<br>".
            "Коментарий: " . $data['comment'] . "<br>
            Форма: Дропшип
            "; 
    }else if($data['type'] == 1){
        $msg = "Имя: " . $data['name'] . "\n<br>" .
            "Email пользователя: " . $data['email'] . "\n<br>".
            "Телефон: " . $data['phone'] . "<br>
            Форма: Поп-ап
            ";
        return  $msg;
    }
    return  $msg;
}

function badSend($msg){     $send = false; echo $msg; return true;}

function checkReq($trg, $msg){ 
    if(empty($trg)){
        $send = false;  
        return false;
    }
    return $trg;
}

function debug($msg){
    echo '<div><pre> -   '.print_r($msg,true).'</pre></div>';
}