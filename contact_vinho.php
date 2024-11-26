<?php
$name = $_POST['name-vinho'];
$email = $_POST['email-vinho'];
$tel = $_POST['tel'];
$city = $_POST['city'];
$comment = $_POST['comment'];
$assunto = "Vinho Site HDBR";

$emailsender = 'contato@habonimdrorbrasil.com';
$emaildestinatario = 'mazkirhdbr@gmail.com, guizbarhdbr@gmail.com';

$headers = 'From: contato@habonimdrorbrasil.com' . "\n" .
	'Bcc: contato@habonimdrorbrasil.com' . "\n" .
	'Reply-To: ' . $email . "\n";

$body = "Solicitacao de compra de vinho recebida no formulario do site. \n" .
	"De: $name ; \n" .
	"E-Mail: $email ; \n" .
	"Telefone: $tel ; \n" .
	"Cidade: $city ; \n" .
	"Comentario (opcional): \n $comment \n";

if(!empty($_POST['g-recaptcha-response']))
{
	$secret = '6LeqSpwaAAAAABP6cVkCopi6TxydgxRHNGKjgalY';
	$verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
	$responseData = json_decode($verifyResponse);

	if($responseData->success) {
		if (!mail($emaildestinatario, $assunto, $body, $headers, "-r" . $emailsender)) { // Se for Postfix
		$headers .= "Return-Path: " . $emailsender . "\n"; // Se "não for Postfix"
		mail($emaildestinatario, $assunto, $body, $headers);
		}
	$message = "Sua solicitação foi enviada com sucesso! Em breve responderemos";
	}
	else 
		$message = "Erro ao autenticar recaptcha";
	echo $message;
	
} else {

	$message = "reCaptcha não preenchido. Sua solicitação não foi enviada! Preencha o reCapcha e tente novamente";
	echo $message;
}

?>