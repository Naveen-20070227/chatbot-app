// 🔹 Supabase init
const supabaseClient = supabase.createClient(
  "https://izgfgxmodrwyrlzpmxfq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6Z2ZneG1vZHJ3eXJsenBteGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDg5NDYsImV4cCI6MjA5MzQ4NDk0Nn0.f8Zlng6Znt1wimDbfTd0Bjis2NINlrNLPkW32sdgi0M",
);

// 🔹 session id (chat memory)
let session_id = localStorage.getItem("session_id");
if (!session_id) {
  session_id = "user_" + Math.random().toString(36).substring(2);
  localStorage.setItem("session_id", session_id);
}

// 🔹 check auth on load (REAL check from Supabase)
window.onload = async () => {
  const { data } = await supabaseClient.auth.getSession();

  if (data.session) {
    localStorage.setItem("token", data.session.access_token);
    showChat();
  } else {
    localStorage.clear();
    showAuth();
  }
};

// 🔹 UI toggles
function showChat() {
  document.getElementById("authBox").style.display = "none";
  document.getElementById("chatBox").style.display = "flex";
}

function showAuth() {
  document.getElementById("chatBox").style.display = "none";
  document.getElementById("authBox").style.display = "flex";
}

// 🔹 register
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Registered successfully");
  }
}

// 🔹 login
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    localStorage.setItem("token", data.session.access_token);
    showChat();
  }
}

// 🔹 logout
async function logout() {
  await supabaseClient.auth.signOut();
  localStorage.clear();
  location.reload();
}

// 🔹 send message
async function sendMessage() {
  const input = document.getElementById("userInput");
  const userInput = input.value;

  if (!userInput.trim()) return;

  addMessage("You", userInput);
  input.value = "";

  const typingEl = addMessage("Bot", "Typing...");

  try {
    const token = localStorage.getItem("token");
    console.log("Sending request...");

    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: userInput,
        session_id: session_id,
      }),
    });

    const data = await response.json();

    typingEl.remove();
    addMessage("Bot", data.reply);
    scrollToBottom();
  } catch (err) {
    typingEl.remove();
    addMessage("Bot", "Error occurred");
    console.error(err);
  }
}

// 🔹 add message UI
function addMessage(sender, text) {
  const chatHistory = document.getElementById("chatHistory");

  const msg = document.createElement("div");
  msg.classList.add("message");

  if (sender === "You") msg.classList.add("user");
  else msg.classList.add("bot");

  msg.innerHTML = text;

  chatHistory.appendChild(msg);
  return msg;
}

// 🔹 scroll
function scrollToBottom() {
  const chatHistory = document.getElementById("chatHistory");
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// 🔹 enter key support
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }
});

// 🔹 new chat
function newChat() {
  const newId = "user_" + Math.random().toString(36).substring(2);
  localStorage.setItem("session_id", newId);
  location.reload();
}
