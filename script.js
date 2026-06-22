// Initialize state with default mock messages for each contact
const chatsData = {
    "alex": {
        name: "Alex",
        avatar: "image/Alex.png",
        status: "Online",
        unreadCount: 0,
        messages: [
            { text: "Hey! How is it going?", sender: "contact", time: "10:15" },
            { text: "How to make a whatsapp clone using html & css", sender: "contact", time: "10:56" }
        ]
    },
    "surbhiyadav": {
        name: "surbhi yadav",
        avatar: "image/surbhi.png",
        status: "last seen today at 05:20",
        unreadCount: 0,
        messages: [
            { text: "hello", sender: "contact", time: "05:26" }
        ]
    },
    "lado": {
        name: "Lado",
        avatar: "image/lado.png",
        status: "Online",
        unreadCount: 0,
        messages: [
            { text: "send for processing", sender: "contact", time: "yesterday" }
        ]
    },
    "suraj": {
        name: "suraj",
        avatar: "image/suraj.png",
        status: "last seen yesterday",
        unreadCount: 0,
        messages: [
            { text: "bye", sender: "contact", time: "yesterday" }
        ]
    },
    "joseph": {
        name: "Joseph",
        avatar: "image/joseph.png",
        status: "Offline",
        unreadCount: 0,
        messages: [
            { text: "plz wait....", sender: "contact", time: "05/11/2026" }
        ]
    },
    "ashraf": {
        name: "Ashraf",
        avatar: "image/ashraf.png",
        status: "Online",
        unreadCount: 0,
        messages: [
            { text: "Hii! I found you on justdial", sender: "contact", time: "03/03/2026" }
        ]
    },
    "diana": {
        name: "Diana",
        avatar: "image/Diana.png",
        status: "Offline",
        unreadCount: 0,
        messages: [
            { text: "oh okey,i get better soon", sender: "contact", time: "25/10/2025" }
        ]
    },
    "aliahmad": {
        name: "Ali Ahmad",
        avatar: "image/ali.png",
        status: "Online",
        unreadCount: 0,
        messages: [
            { text: "Congrats", sender: "contact", time: "24/10/2025" }
        ]
    },
    "prachisinha": {
        name: "Prachi Sinha",
        avatar: "image/prachi.png",
        status: "last seen 05/9/2025",
        unreadCount: 0,
        messages: [
            { text: "Happy Birthday", sender: "contact", time: "05/9/2025" }
        ]
    },
    "sgtinternship2026": {
        name: "SGT Internship 2026",
        avatar: "image/sgt.png",
        status: "Group Chat",
        unreadCount: 0,
        messages: [
            { text: "business card", sender: "contact", time: "12/6/2026" }
        ]
    },
    "shubhanshu": {
        name: "Shubhanshu",
        avatar: "image/shubhanshu.png",
        status: "Online",
        unreadCount: 0,
        messages: [
            { text: "HighFlow.zip", sender: "contact", time: "yesterday" }
        ]
    },
    "anjalicolg": {
        name: "Anjali colg",
        avatar: "image/anjali.png",
        status: "last seen 10/06/2026",
        unreadCount: 0,
        messages: [
            { text: "Nhi padha hai", sender: "contact", time: "10/06/2026" }
        ]
    },
    "mom": {
        name: "Mom",
        avatar: "image/mom.png",
        status: "Online",
        unreadCount: 0,
        messages: [
            { text: "hmm", sender: "contact", time: "09/06/2026" }
        ]
    },
    "bcaivsemsession2026": {
        name: "BCA IV Sem session 2026",
        avatar: "image/RMLAU.png",
        status: "Group Chat",
        unreadCount: 0,
        messages: [
            { text: "all student....", sender: "contact", time: "02/06/2026" }
        ]
    },
    "anchalmaurya": {
        name: "Anchal Maurya",
        avatar: "image/anchal.png",
        status: "last seen 29/05/2026",
        unreadCount: 0,
        messages: [
            { text: "do you means", sender: "contact", time: "29/05/2026" }
        ]
    }
};

let activeChatKey = null;

// DOM references
let chatList, chatBlocks, chatBox, welcomeScreen, backBtn, chatHeaderName, chatHeaderImg, messageContainer, messageInput, micSendBtn, chatSearchInput;
let sendBtn, emojiIconBtn, attachIconBtn, emojiPopover, attachPopover, callingModal;
let headerCameraBtn, chatCameraBtn, fileInput, cameraModal, cameraVideo, capturePhotoBtn, closeCameraBtn;

// Message deletion variables
let deleteModal, deleteEveryoneBtn, deleteMeBtn, cancelDeleteBtn;
let msgIndexToDelete = null;

function initializeDOM() {
    chatList = document.querySelector('.chats .chatlist');
    chatBlocks = document.querySelectorAll('.chats .chatlist .block');
    chatBox = document.querySelector('.chatBox');
    welcomeScreen = document.querySelector('.welcomeScreen');
    backBtn = document.querySelector('.chatBox .back');
    chatHeaderName = document.querySelector('.chatBox .chat_header h3');
    chatHeaderImg = document.querySelector('.chatBox .chat_header img');
    messageContainer = document.querySelector('.chatBox .messageContainer');
    messageInput = document.querySelector('.messageInput input');
    micSendBtn = document.getElementById('micBtn');
    sendBtn = document.getElementById('sendBtn');
    chatSearchInput = document.getElementById('chatSearchInput');
    
    emojiIconBtn = document.getElementById('emojiIconBtn');
    attachIconBtn = document.getElementById('attachIconBtn');
    emojiPopover = document.getElementById('emojiPopover');
    attachPopover = document.getElementById('attachPopover');
    callingModal = document.getElementById('callingModal');

    // Camera & file inputs selectors
    headerCameraBtn = document.getElementById('headerCameraBtn');
    chatCameraBtn = document.getElementById('chatCameraBtn');
    fileInput = document.getElementById('fileInput');
    cameraModal = document.getElementById('cameraModal');
    cameraVideo = document.getElementById('cameraVideo');
    capturePhotoBtn = document.getElementById('capturePhotoBtn');
    closeCameraBtn = document.getElementById('closeCameraBtn');

    // Deletion modal selectors
    deleteModal = document.getElementById('deleteModal');
    deleteEveryoneBtn = document.getElementById('deleteEveryoneBtn');
    deleteMeBtn = document.getElementById('deleteMeBtn');
    cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
}

// Custom Toast Notification system
function showToast(message) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notice';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    
    if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
    }
    
    toast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Speech recognition controller
let recognition = null;
let isListening = false;
let simulationTimeout = null;

function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech Recognition API not supported. Falling back to simulation mode.");
        return;
    }
    
    try {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            if (messageInput) {
                messageInput.value = (messageInput.value + " " + transcript).trim();
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            // Handle secure origin / permission block fallback
            if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'aborted') {
                stopListening();
                startVoiceSimulation();
            } else {
                stopListening();
                showToast("Voice typing error: " + event.error);
            }
        };

        recognition.onend = () => {
            if (isListening) {
                stopListening();
            }
        };
    } catch (e) {
        console.error("SpeechRecognition initialization failed:", e);
    }
}

function startListening() {
    if (!recognition) setupSpeechRecognition();
    if (!recognition) {
        startVoiceSimulation();
        return;
    }
    try {
        isListening = true;
        if (micSendBtn) micSendBtn.classList.add('listening');
        showToast("Voice typing: Speak now...");
        recognition.start();
    } catch (e) {
        console.error("SpeechRecognition start failed. Running simulation mode.", e);
        startVoiceSimulation();
    }
}

function stopListening() {
    if (simulationTimeout) {
        clearTimeout(simulationTimeout);
        simulationTimeout = null;
    }
    if (recognition && isListening) {
        try {
            recognition.stop();
        } catch (e) {
            console.error("Error stopping recognition:", e);
        }
    }
    isListening = false;
    if (micSendBtn) micSendBtn.classList.remove('listening');
    showToast("Voice typing stopped.");
}

function startVoiceSimulation() {
    isListening = true;
    if (micSendBtn) micSendBtn.classList.add('listening');
    showToast("Mic Active: Speak now (Hindi/English)");

    const phrases = [
        "Aap kaise hain? Main theek hoon.",
        "Please complete the report and send it to me.",
        "Kya hum kal mil sakte hain?",
        "Okay, thank you so much!",
        "Main abhi thodi der mein call karta hoon."
    ];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    let words = phrase.split(' ');
    let wordIndex = 0;

    function typeNext() {
        if (!isListening) return;
        if (wordIndex < words.length) {
            if (messageInput) {
                messageInput.value = (messageInput.value + " " + words[wordIndex]).trim();
            }
            wordIndex++;
            simulationTimeout = setTimeout(typeNext, 450);
        } else {
            stopListening();
        }
    }
    simulationTimeout = setTimeout(typeNext, 1200);
}

// Camera stream controller
let cameraStream = null;

function openCamera() {
    if (cameraModal && cameraVideo) {
        cameraModal.classList.remove('hide');
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
            .then(stream => {
                cameraStream = stream;
                cameraVideo.srcObject = stream;
            })
            .catch(err => {
                console.error("Camera access error:", err);
                showToast("Cannot access camera: " + err.message);
                cameraModal.classList.add('hide');
            });
    }
}

function closeCamera() {
    if (cameraModal) {
        cameraModal.classList.add('hide');
    }
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    if (cameraVideo) {
        cameraVideo.srcObject = null;
    }
}

function capturePhoto() {
    if (cameraStream && activeChatKey) {
        const chat = chatsData[activeChatKey];
        if (!chat) return;

        // Render photo frame using HTML Canvas
        const canvas = document.createElement('canvas');
        canvas.width = cameraVideo.videoWidth || 640;
        canvas.height = cameraVideo.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/png');
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        chat.messages.push({
            text: `<img src="${dataUrl}" style="max-width: 100%; border-radius: 8px; margin-top: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.15);">`,
            sender: 'me',
            time: timeStr,
            isImage: true
        });

        renderMessages();
        updateSidebarLastMessage(activeChatKey, "📷 Photo", timeStr);
        simulateReply(activeChatKey);
        closeCamera();
        showToast("Photo sent!");
    } else {
        showToast("Open a chat to send a photo!");
        closeCamera();
    }
}

// Initialize event listeners when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDOM();

    // 1. Contact selection click event
    chatBlocks.forEach(block => {
        block.addEventListener('click', () => {
            const h4 = block.querySelector('h4');
            if (!h4) return;
            const name = h4.textContent.trim();
            const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            
            // Set active/open styling
            chatBlocks.forEach(b => b.classList.remove('open'));
            block.classList.add('open');

            // Reset local state unread count
            chatsData[key].unreadCount = 0;
            
            // Clear unread badge status visually
            block.classList.remove('unread');
            const unreadBadge = block.querySelector('.message_p b');
            if (unreadBadge) unreadBadge.remove();

            openChat(key);
        });
    });

    // 2. Chat back button event (slide out)
    if (backBtn) {
        backBtn.addEventListener('click', closeChat);
    }

    // 3. Send message when user hits Enter inside message input
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Clicking message input hides any open popovers
        messageInput.addEventListener('focus', () => {
            if (emojiPopover) emojiPopover.classList.add('hide');
            if (attachPopover) attachPopover.classList.add('hide');
        });
    }

    // 4. Click listener for the permanent Send button
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            sendMessage();
        });
    }

    // 5. Mic speech-to-text recording click event
    if (micSendBtn) {
        micSendBtn.addEventListener('click', () => {
            if (isListening) {
                stopListening();
            } else {
                startListening();
            }
        });
    }

    // 6. Chat filtering/searching logic
    if (chatSearchInput) {
        chatSearchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            chatBlocks.forEach(block => {
                const name = block.querySelector('h4').textContent.toLowerCase();
                const lastMsg = block.querySelector('.message_p p').textContent.toLowerCase();
                if (name.includes(term) || lastMsg.includes(term)) {
                    block.style.display = 'flex';
                } else {
                    block.style.display = 'none';
                }
            });
        });
    }

    // 7. Toggle emoji picker
    if (emojiIconBtn) {
        emojiIconBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (attachPopover) attachPopover.classList.add('hide');
            if (emojiPopover) emojiPopover.classList.toggle('hide');
        });
    }

    // 8. Toggle attachments picker
    if (attachIconBtn) {
        attachIconBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (emojiPopover) emojiPopover.classList.add('hide');
            if (attachPopover) attachPopover.classList.toggle('hide');
        });
    }

    // Dismiss popovers when clicking outside
    document.addEventListener('click', (e) => {
        if (emojiPopover && !emojiPopover.classList.contains('hide')) {
            if (!e.target.closest('#emojiPopover') && !e.target.closest('#emojiIconBtn')) {
                emojiPopover.classList.add('hide');
            }
        }
        if (attachPopover && !attachPopover.classList.contains('hide')) {
            if (!e.target.closest('#attachPopover') && !e.target.closest('#attachIconBtn')) {
                attachPopover.classList.add('hide');
            }
        }
    });

    // 9. Emoji click listener
    if (emojiPopover) {
        emojiPopover.addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji-item')) {
                const emoji = e.target.textContent;
                if (messageInput) {
                    messageInput.value += emoji;
                    messageInput.focus();
                }
                emojiPopover.classList.add('hide');
            }
        });
    }

    // 10. Attach items click listener (File input trigger)
    if (attachPopover) {
        attachPopover.addEventListener('click', (e) => {
            const item = e.target.closest('.attach-item');
            if (item) {
                const type = item.getAttribute('data-type');
                if (type === 'camera') {
                    openCamera();
                } else {
                    if (fileInput) fileInput.click();
                }
                attachPopover.classList.add('hide');
            }
        });
    }

    // 11. Handle native file selection
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && activeChatKey) {
                const chat = chatsData[activeChatKey];
                if (!chat) return;

                const now = new Date();
                const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

                // Render images inline, others as downloads
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        chat.messages.push({
                            text: `<img src="${event.target.result}" style="max-width: 100%; border-radius: 8px; margin-top: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.15);">`,
                            sender: 'me',
                            time: timeStr,
                            isImage: true
                        });
                        renderMessages();
                        updateSidebarLastMessage(activeChatKey, "📷 Photo", timeStr);
                        simulateReply(activeChatKey);
                    };
                    reader.readAsDataURL(file);
                } else {
                    chat.messages.push({
                        text: `📄 <a href="#" onclick="alert('Downloading: ${file.name}')" style="color: #008069; text-decoration: underline; font-weight: 600;">${file.name}</a> (${(file.size/1024).toFixed(1)} KB)`,
                        sender: 'me',
                        time: timeStr,
                        isImage: true
                    });
                    renderMessages();
                    updateSidebarLastMessage(activeChatKey, `📄 ${file.name}`, timeStr);
                    simulateReply(activeChatKey);
                }
                showToast(`Sent "${file.name}"`);
                fileInput.value = '';
            }
        });
    }

    // 12. Camera modal triggers
    if (headerCameraBtn) {
        headerCameraBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCamera();
        });
    }
    if (chatCameraBtn) {
        chatCameraBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCamera();
        });
    }
    if (closeCameraBtn) {
        closeCameraBtn.addEventListener('click', closeCamera);
    }
    if (capturePhotoBtn) {
        capturePhotoBtn.addEventListener('click', capturePhoto);
    }

    // 13. Decline Call Button listener
    const declineCallBtn = document.getElementById('declineCallBtn');
    if (declineCallBtn) {
        declineCallBtn.addEventListener('click', () => {
            if (callingModal) {
                callingModal.classList.add('hide');
                if (callingModal.statusTimeout) clearTimeout(callingModal.statusTimeout);
            }
        });
    }

    // 14. Message Deletion triggers
    if (deleteEveryoneBtn) {
        deleteEveryoneBtn.addEventListener('click', () => {
            if (activeChatKey && msgIndexToDelete !== null) {
                const chat = chatsData[activeChatKey];
                if (chat && chat.messages[msgIndexToDelete]) {
                    chat.messages[msgIndexToDelete].text = "<i>🚫 You deleted this message</i>";
                    chat.messages[msgIndexToDelete].isDeleted = true;
                    
                    const lastIdx = chat.messages.length - 1;
                    if (msgIndexToDelete === lastIdx) {
                        updateSidebarLastMessage(activeChatKey, "🚫 You deleted this message", chat.messages[lastIdx].time);
                    }
                    renderMessages();
                }
            }
            if (deleteModal) deleteModal.classList.add('hide');
            msgIndexToDelete = null;
        });
    }

    if (deleteMeBtn) {
        deleteMeBtn.addEventListener('click', () => {
            if (activeChatKey && msgIndexToDelete !== null) {
                const chat = chatsData[activeChatKey];
                if (chat) {
                    chat.messages.splice(msgIndexToDelete, 1);
                    
                    if (chat.messages.length > 0) {
                        const lastMsg = chat.messages[chat.messages.length - 1];
                        updateSidebarLastMessage(activeChatKey, lastMsg.isImage ? "📷 Photo" : (lastMsg.isDeleted ? "🚫 You deleted this message" : lastMsg.text), lastMsg.time);
                    } else {
                        updateSidebarLastMessage(activeChatKey, "", "");
                    }
                    renderMessages();
                }
            }
            if (deleteModal) deleteModal.classList.add('hide');
            msgIndexToDelete = null;
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            if (deleteModal) deleteModal.classList.add('hide');
            msgIndexToDelete = null;
        });
    }

    // 15. Make static actions clickable & handle Call/Video trigger
    document.body.addEventListener('click', (e) => {
        const targetIcon = e.target.closest('ion-icon');
        if (!targetIcon) return;

        const nameAttr = targetIcon.getAttribute('name');
        if (nameAttr === 'send' || targetIcon.classList.contains('back')) return;

        // Visual click anim
        targetIcon.style.transform = 'scale(0.8)';
        setTimeout(() => targetIcon.style.transform = '', 150);

        // Map icons to functional simulations
        switch (nameAttr) {
            case 'ellipsis-vertical-outline':
            case 'ellipsis-vertical':
                showToast("Menu settings coming soon!");
                break;
            case 'videocam':
                triggerCallingScreen("video");
                break;
            case 'call':
                triggerCallingScreen("voice");
                break;
            case 'pencil-sharp':
                showToast("Create a status update...");
                break;
            case 'link-outline':
                showToast("WhatsApp call link copied to clipboard!");
                break;
            case 'chatbubble':
                showToast("Opening new chat selection list...");
                break;
        }
    });
});

// Trigger calling overlay screen
function triggerCallingScreen(callType) {
    if (!activeChatKey) {
        showToast("Select a contact to make a call!");
        return;
    }
    const chat = chatsData[activeChatKey];
    if (!chat || !callingModal) return;

    const callingAvatar = document.getElementById('callingAvatar');
    const callingName = document.getElementById('callingName');
    const callingStatus = document.getElementById('callingStatus');

    if (callingAvatar) callingAvatar.src = chat.avatar;
    if (callingName) callingName.textContent = chat.name;
    if (callingStatus) callingStatus.textContent = callType === 'video' ? "Video Calling..." : "Calling...";

    callingModal.classList.remove('hide');

    if (callingModal.statusTimeout) clearTimeout(callingModal.statusTimeout);

    // State simulation timings
    callingModal.statusTimeout = setTimeout(() => {
        if (callingStatus) callingStatus.textContent = "Ringing...";

        callingModal.statusTimeout = setTimeout(() => {
            if (callingStatus) callingStatus.textContent = "Connected";
        }, 3000);
    }, 1500);
}

// Load active chat screen
function openChat(key) {
    activeChatKey = key;
    const chat = chatsData[key];
    if (!chat) return;

    // Update active chat header details
    if (chatHeaderImg) chatHeaderImg.src = chat.avatar;
    if (chatHeaderName) chatHeaderName.innerHTML = `${chat.name}<br><span>${chat.status}</span>`;

    // Render active chat's messages
    renderMessages();

    // Show Chat Panel
    if (chatBox) chatBox.classList.remove('hide');
    if (welcomeScreen) welcomeScreen.classList.add('hide');

    // Reset message inputs and defaults
    if (messageInput) {
        messageInput.value = '';
        messageInput.focus();
    }
    stopListening(); // Make sure speech recognition resets
}

// Close active chat screen
function closeChat() {
    if (chatBox) chatBox.classList.add('hide');
    if (welcomeScreen) welcomeScreen.classList.remove('hide');
    
    chatBlocks.forEach(b => b.classList.remove('open'));
    activeChatKey = null;
    stopListening();
}

// Render list of messages in message screen container
function renderMessages() {
    if (!activeChatKey || !messageContainer) return;
    const chat = chatsData[activeChatKey];
    messageContainer.innerHTML = '';

    chat.messages.forEach((msg, index) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.sender === 'me' ? 'my_message' : ''}`;
        msgDiv.setAttribute('data-msg-index', index);
        
        if (msg.isImage) {
            msgDiv.innerHTML = `${msg.text}<br><span class="time">${msg.time}</span>`;
        } else {
            msgDiv.innerHTML = `${msg.isDeleted ? msg.text : escapeHTML(msg.text)}<br><span class="time">${msg.time}</span>`;
        }
        
        // Double-click triggers delete menu
        msgDiv.addEventListener('dblclick', () => {
            if (msg.isDeleted) return;
            msgIndexToDelete = index;
            if (deleteModal) {
                deleteModal.classList.remove('hide');
            }
        });
        
        messageContainer.appendChild(msgDiv);
    });

    // Auto-scroll to latest message
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Send input message
function sendMessage() {
    if (!messageInput || !activeChatKey) return;
    const text = messageInput.value.trim();
    if (!text) return;

    const chat = chatsData[activeChatKey];
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    // Append outgoing message
    chat.messages.push({
        text: text,
        sender: 'me',
        time: timeStr
    });

    // Redraw message pane
    renderMessages();

    // Reset input states
    messageInput.value = '';

    // Update latest activity summary in sidebar list item
    updateSidebarLastMessage(activeChatKey, text, timeStr);

    // Simulate auto response from the contact
    simulateReply(activeChatKey);
}

// Update sidebar chat elements (and unread badges)
function updateSidebarLastMessage(key, text, time) {
    const chat = chatsData[key];
    chatBlocks.forEach(block => {
        const name = block.querySelector('h4').textContent.trim();
        const blockKey = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (blockKey === key) {
            const p = block.querySelector('.message_p p');
            const timeEl = block.querySelector('.time');
            if (p) p.textContent = text;
            if (timeEl) timeEl.textContent = time;

            // Handle unread badges
            const messageP = block.querySelector('.message_p');
            if (messageP) {
                let badge = messageP.querySelector('b');
                if (chat.unreadCount > 0) {
                    if (!badge) {
                        badge = document.createElement('b');
                        messageP.appendChild(badge);
                    }
                    badge.textContent = chat.unreadCount;
                    block.classList.add('unread');
                } else {
                    if (badge) badge.remove();
                    block.classList.remove('unread');
                }
            }

            // Move this contact to the top of chat list
            if (chatList) chatList.prepend(block);
        }
    });
}

// Simulated auto replies
function simulateReply(key) {
    const chat = chatsData[key];
    if (!chat) return;

    // Simulate contact typing status indicator in header after 1s
    setTimeout(() => {
        if (activeChatKey === key && chatHeaderName) {
            chatHeaderName.innerHTML = `${chat.name}<br><span style="color: #25d366; font-weight: 500;">typing...</span>`;
        }
    }, 1000);

    // Deliver response message after 2.5s
    setTimeout(() => {
        const userMsgs = chat.messages.filter(m => m.sender === 'me');
        const lastUserMsg = userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].text.toLowerCase().trim() : '';

        let responses = [];
        
        const isBoy = ['alex', 'suraj', 'joseph', 'ashraf', 'shubhanshu', 'aliahmad'].includes(key);
        const isGirl = ['surbhiyadav', 'lado', 'diana', 'prachisinha', 'anjalicolg', 'anchalmaurya'].includes(key);
        const isMom = key === 'mom';

        if (lastUserMsg === 'hii' || lastUserMsg === 'hi' || lastUserMsg === 'hello' || lastUserMsg === 'hey' || lastUserMsg === 'helo') {
            if (isBoy) {
                responses = ["hello bhai!", "hello bro! kaise ho?", "hii dude!"];
            } else if (isGirl) {
                responses = ["hello dear!", "hello! kya chal raha hai?", "hii! kaise ho?"];
            } else if (isMom) {
                responses = ["hello beta. ghar kab aaoge?", "hello beta. sab theek hai?"];
            } else {
                responses = ["hello!", "hi there!"];
            }
        } else if (lastUserMsg.includes('kaise ho') || lastUserMsg.includes('how are you') || lastUserMsg.includes('kasi ho') || lastUserMsg.includes('how r u') || lastUserMsg.includes('kasa ho') || lastUserMsg.includes('kaisa ho')) {
            if (isBoy) {
                responses = ["main theek hoon bhai, tum sunao?", "sab badhiya bro, tum batao?", "mast hoon dude."];
            } else if (isGirl) {
                responses = ["main theek hoon dear, tum batao?", "sab badhiya yaar, tum kaise ho?", "achi hoon dear, tum batao?"];
            } else if (isMom) {
                responses = ["main theek hoon beta, tum apna dhyan rakhna.", "theek hoon beta. tum kaise ho?"];
            } else {
                responses = ["we are fine, thanks!", "all good here!"];
            }
        } else if (lastUserMsg.includes('kya kar rahe') || lastUserMsg.includes('what are you doing') || lastUserMsg.includes('kya chal raha') || lastUserMsg.includes('kya kr rhe') || lastUserMsg.includes('what r u doing') || lastUserMsg.includes('kya ho raha')) {
            if (isBoy) {
                responses = ["kuch nahi bhai, bas baitha tha.", "bas thoda kaam kar raha tha bro.", "kuch nahi yaar, coding kar raha tha."];
            } else if (isGirl) {
                responses = ["kuch nahi yaar, ghar ke kaam kar rahi thi.", "college ka assignment poora kar rahi hoon behn.", "bas normal, chill kar rahi hoon dear."];
            } else if (isMom) {
                responses = ["ghar ka kaam kar rahi thi beta. tumne khana khaya?", "beta bas aaram kar rahi thi. kab aaoge ghar?"];
            } else {
                responses = ["discussing some group projects.", "just discussing study plans."];
            }
        } else if (lastUserMsg.includes('khana khaya') || lastUserMsg.includes('lunch') || lastUserMsg.includes('dinner') || lastUserMsg.includes('khana ho gaya') || lastUserMsg.includes('kha liya')) {
            if (isBoy) {
                responses = ["haan bhai, maine kha liya. tumne khaya?", "haan bro, ho gaya mera lunch. aapka?"];
            } else if (isGirl) {
                responses = ["haan dear, ho gaya khana. tumne khaya?", "haan, maine kha liya. tum batao?"];
            } else if (isMom) {
                responses = ["haan beta, maine kha liya. tumne khaya ki nahi?", "haan beta, lunch kar liya maine. tumne khaya?"];
            } else {
                responses = ["yes, finished!", "not yet."];
            }
        } else if (lastUserMsg.includes('kahan ho') || lastUserMsg.includes('where are you') || lastUserMsg.includes('kaha ho')) {
            if (isBoy) {
                responses = ["ghar pe hoon bhai, tum kahan ho?", "college mein hoon bro.", "bas thoda bahar aaya tha dude."];
            } else if (isGirl) {
                responses = ["ghar pe hi hoon dear.", "college campus mein hoon behn.", "bas market aayi thi dear."];
            } else if (isMom) {
                responses = ["ghar par hi hoon beta. tum ghar kab aa rahe ho?", "beta ghar par hoon. koi kaam tha?"];
            } else {
                responses = ["we are in college class.", "at the seminar hall."];
            }
        } else if (lastUserMsg.includes('kya haal') || lastUserMsg.includes('kya chal') || lastUserMsg.includes('sab theek')) {
            if (isBoy) {
                responses = ["sab badhiya bhai! tum sunao.", "ekdam mast bro.", "sab sahi chal raha hai."];
            } else if (isGirl) {
                responses = ["sab badhiya dear, tum batao.", "haan yaar, sab theek hai.", "sab badhiya behn!"];
            } else if (isMom) {
                responses = ["sab theek hai beta. tum apna dhyan rakhna.", "theek hai beta, sab achha hai."];
            } else {
                responses = ["everything is great!", "yes, all good."];
            }
        } else if (lastUserMsg === 'bye' || lastUserMsg.includes('bye bye') || lastUserMsg === 'tata' || lastUserMsg.includes('chalo bye') || lastUserMsg.includes('tc')) {
            if (isBoy) {
                responses = ["bye bhai! kal baat karte hain.", "ok bro, see you later!", "chalo bye bro, dhyan rakhna!"];
            } else if (isGirl) {
                responses = ["bye dear! take care.", "ok behn, baad mein baat karte hain.", "bye bye! tc dear."];
            } else if (isMom) {
                responses = ["haan beta bye, dhyan rakhna.", "bye beta, jaldi ghar aana."];
            } else {
                responses = ["good bye!", "bye!"];
            }
        } else {
            switch (key) {
                case 'alex':
                    responses = [
                        "Yo bro! What's up?",
                        "Haan bhai, bolo?",
                        "Arre haan, wahi toh!",
                        "Bhai, sham ko milte hain free ho ke?",
                        "Haha true dude!",
                        "Bilkul bro, link share kar."
                    ];
                    break;
                case 'surbhiyadav':
                    responses = [
                        "Haan yaar, bolo?",
                        "Main theek hoon, tum sunao?",
                        "Suno na, kal college chalna hai?",
                        "Haan behn, bilkul!",
                        "Acha thik hai, main karke batati hoon."
                    ];
                    break;
                case 'lado':
                    responses = [
                        "Suno, files processed ho gayi hain?",
                        "Haan yaar, thodi busy thi.",
                        "Bilkul dear, abhi karti hoon.",
                        "Acha, thik hai behn."
                    ];
                    break;
                case 'suraj':
                    responses = [
                        "Bhai, kya haal chal?",
                        "Haan bro, bol kya kaam hai?",
                        "Arre nahi yaar, main thoda busy tha.",
                        "Milte hain bhai kal!",
                        "Haha sahi hai bro."
                    ];
                    break;
                case 'joseph':
                    responses = [
                        "Hello bro!",
                        "Yes dude, working on it.",
                        "Bhai, thoda time lagega.",
                        "Sure bro, will check.",
                        "No problem yaar."
                    ];
                    break;
                case 'ashraf':
                    responses = [
                        "Ji bhai, boliye?",
                        "Haan bro, justdial se call aaya tha?",
                        "Bilkul bhai, abhi bhejta hoon.",
                        "Acha yaar, thik hai.",
                        "Thanks bro!"
                    ];
                    break;
                case 'diana':
                    responses = [
                        "Hey girl! How are you?",
                        "Yeah, feeling much better now dear!",
                        "Thanks for checking on me, yaar.",
                        "Acha, kal baat karte hain?",
                        "Okay, take care behn!"
                    ];
                    break;
                case 'aliahmad':
                    responses = [
                        "Ji bhai, shukriya!",
                        "Haan bro, party kab hai?",
                        "Bilkul bhai, treat toh banti hai.",
                        "Arre thanks yaar!"
                    ];
                    break;
                case 'prachisinha':
                    responses = [
                        "Thank you so much yaar!",
                        "Party kab de rahi ho behn?",
                        "Haan dear, bilkul milte hain.",
                        "Achaa, wahi toh yaar!"
                    ];
                    break;
                case 'sgtinternship2026':
                    responses = [
                        "Please submit your daily reports.",
                        "All interns check your portals.",
                        "Meeting starting at 3 PM today.",
                        "Internship guidelines have been updated."
                    ];
                    break;
                case 'shubhanshu':
                    responses = [
                        "Bhai, HighFlow file bhej di hai.",
                        "Haan bro, open karke dekh le.",
                        "Acha yaar, checking now.",
                        "Haan bro, sahi chal raha hai."
                    ];
                    break;
                case 'anjalicolg':
                    responses = [
                        "Yaar college ka assignment wrote?",
                        "Nhi padha hai yaar maine toh abhi.",
                        "Haan behn, help chahiye toh batana.",
                        "Exam ka kya scene hai?"
                    ];
                    break;
                case 'mom':
                    responses = [
                        "Beta khana khaya?",
                        "Hmm, theek hai.",
                        "Ghar kab aaoge?",
                        "Beta dhyan rakhna apna.",
                        "Achaa thik hai beta."
                    ];
                    break;
                case 'bcaivsemsession2026':
                    responses = [
                        "All students fill the examination form.",
                        "Classes are suspended for tomorrow.",
                        "Notice board update has been posted.",
                        "Practical exams start next week."
                    ];
                    break;
                case 'anchalmaurya':
                    responses = [
                        "Suno, kya hua?",
                        "Haan behn, main wahi soch rahi thi.",
                        "Tum batao yaar kya chal raha hai?",
                        "Acha thik hai, kal milte hain clg mein."
                    ];
                    break;
                default:
                    responses = [
                        "Achaa, thik hai!",
                        "Sure, will talk to you later.",
                        "Thanks for letting me know!"
                    ];
            }
        }
        
        const replyText = responses[Math.floor(Math.random() * responses.length)];
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        chat.messages.push({
            text: replyText,
            sender: 'contact',
            time: timeStr
        });

        // Increment unread count if the chat is not active
        if (activeChatKey !== key) {
            chat.unreadCount = (chat.unreadCount || 0) + 1;
        }

        if (activeChatKey === key) {
            if (chatHeaderName) chatHeaderName.innerHTML = `${chat.name}<br><span>Online</span>`;
            renderMessages();
        }

        updateSidebarLastMessage(key, replyText, timeStr);
    }, 2500);
}

// Helper utility to clean raw input strings and prevent script inject
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}