<?php
    if(count($_POST) == 0){
        return;
    }

    $htmlcode = $_POST['html'];
    $csscode = $_POST['css'];
    $javascriptcode = $_POST['javascript'];


    echo $htmlcode;

    echo $csscode;
?>