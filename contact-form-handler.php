<?php 
$errors = '';
$myemail = 'ifoxsolutions.social@gmail.com';//<-----Put Your email address here.

$name = $_POST['txtname']; 
$email_address = $_POST['txtemail']; 
$website = $_POST['txtwebsite']; 
$message = $_POST['txtcomment']; 

	$to = $myemail; 
	$email_subject = "Contact form submission: $name";
	$email_body = "You have received a new message. ".
	" Here are the details:\n Name: $name \n Website: $website \n Email: $email_address \n Message \n $message"; 
	
	$headers = "From: $myemail\n"; 
	$headers .= "Reply-To: $email_address";
	
	if(mail($to,$email_subject,$email_body,$headers))
	{
		echo "Form Sumbmitted Sucessfully.";
	}
	else
	{
		echo "Some Problem occured, Please try again later.";
	}

?>