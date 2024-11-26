<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$assunto = $_POST['subject'];

$emailsender = 'contato@habonimdrorbrasil.com';
$emaildestinatario = 'mazkirhdbr@gmail.com';

$headers = 'From: contato@habonimdrorbrasil.com' . "\n" .
	'Bcc: contato@habonimdrorbrasil.com' . "\n" .
	'Reply-To: ' . $email . "\n";

$body = "Mensagem recebida no formulario de contato do site. \n" .
	"De: $name ; \n" .
	"E-Mail: $email ; \n" .
	"Mensagem: \n $message ; \n";



if(!empty($_POST['g-recaptcha-response']))
{
	$secret = '6LcNRpwaAAAAAI82-K7dpWvrm4f-p30GXhBPI-d6';
	$verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
	$responseData = json_decode($verifyResponse);

	if($responseData->success) {
		if (!mail($emaildestinatario, $assunto, $body, $headers, "-r" . $emailsender)) { // Se for Postfix
		$headers .= "Return-Path: " . $emailsender . "\n"; // Se "não for Postfix"
		mail($emaildestinatario, $assunto, $body, $headers);
		}
		$message = "Sua mensagem foi enviada com sucesso! Em breve responderemos";
	}
	else 
		$message = "Erro ao autenticar recaptcha";
	echo $message;
	
} else {

	$message = "reCaptcha não preenchido. Sua mensagem não foi enviada! Preencha o reCapcha e tente novamente";
	echo $message;
}
?>