import * as store from './store.js';
import * as wss from './wss.js';
import * as webRTCHandler from './webRTCHandler.js';
import * as constants from './constants.js';

// initialization of socketIO connection
const socket = io('/');
wss.registerSocketEvents(socket);

//register event listener for personal code button
const personalCodeCopyButton = document.getElementById('personal_code_copy_button');
personalCodeCopyButton.addEventListener('click', () => {
	const personalCode = store.getState().socketId;
	navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// register event listeners for connection buttons

const personalCodeChatButton = document.getElementById('personal_code_chat_button');
personalCodeChatButton.addEventListener('click', () => {
	console.log('personal code chat button clicked');

	const calleePersonalCode = document.getElementById('personal_code_input').value;
	const callType = constants.callType.CHAT_PERSONAL_CODE;

	webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});

const personalCodeVideoButton = document.getElementById('personal_code_video_button');
personalCodeVideoButton.addEventListener('click', () => {
	console.log('personal video chat button clicked');
	const callType = constants.callType.VIDEO_PERSONAL_CODE;

	const calleePersonalCode = document.getElementById('personal_code_input').value;
	webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});
