/*
Template Name:CFDI FED  Admin-Dashboard
Author: mxraymon
Website: https://raymon.com/
Contact: raymon@gmail.com
File: Session Timeout Js File
*/

$.sessionTimeout({
	keepAliveUrl: 'pages-starter',
	logoutButton:'Logout',
	logoutUrl: 'auth-login',
	redirUrl: 'auth-lock-screen',
	warnAfter: 3000,
	redirAfter: 30000,
	countdownMessage: 'Redirecting in {timer} seconds.'
});

$('#session-timeout-dialog  [data-dismiss=modal]').attr("data-bs-dismiss", "modal");