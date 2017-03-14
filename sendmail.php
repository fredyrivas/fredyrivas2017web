<?php


$useremail = $_REQUEST['humanmail'];


// the message
$msg = "I love your work, please contact me asap. My email: " . $useremail;


// send email
if(mail("fredyrivas@me.com", "Request from your site bitch", $msg)){
    echo 'sent';
}else{
    echo 'went wrong';
}




?>