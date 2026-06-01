import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const authEmail    = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authModal      = document.getElementById('authModal');
const authTitle      = document.getElementById('authTitle');
const authSub        = document.getElementById('authSub');
const authSubmitBtn  = document.getElementById('authSubmitBtn');
const modalClose     = document.getElementById('modalClose');
const openLoginBtn   = document.getElementById('openLoginBtn');
const openSignupBtn  = document.getElementById('openSignupBtn');

const reserveModal    = document.getElementById('reserveModal');
const reserveRestName = document.getElementById('reserveRestName');
const reserveDate     = document.getElementById('reserveDate');
const reserveTime     = document.getElementById('reserveTime');
const reserveGuests   = document.getElementById('reserveGuests');
const reserveName     = document.getElementById('reserveName');
const reserveClose    = document.getElementById('reserveClose');
const reserveConfirm  = document.getElementById('reserveConfirm');

let isLoginMode = true;

export function openAuthModal(login = true) {
  isLoginMode = login;
  authModal.classList.add('open');
  authModal.setAttribute('aria-hidden', 'false');
  authTitle.textContent    = login ? 'Welcome back' : 'Create account';
  authSubmitBtn.textContent = login ? 'Log in'       : 'Create account';

  authSub.innerHTML = login
    ? `Don't have an account? <a href="#" id="authToggleLink" role="button">Sign up</a>`
    : `Already have an account? <a href="#" id="authToggleLink" role="button">Log in</a>`;

  document.getElementById('authToggleLink').addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal(!isLoginMode);
  });

  modalClose.focus();
}

function closeAuthModal() {
  authModal.classList.remove('open');
  authModal.setAttribute('aria-hidden', 'true');
}

export function openReserveModal(restaurantName) {
  reserveRestName.textContent = `at ${restaurantName}`;
  reserveDate.min             = new Date().toISOString().split('T')[0];
  reserveModal.classList.add('open');
  reserveModal.setAttribute('aria-hidden', 'false');
  reserveClose.focus();
}

function closeReserveModal() {
  reserveModal.classList.remove('open');
  reserveModal.setAttribute('aria-hidden', 'true');
}

function confirmReservation() {
  const name   = reserveName.value.trim();
  const date   = reserveDate.value;
  const time   = reserveTime.value;
  const guests = reserveGuests.value;

  if (!name || !date) {
    alert('Please fill in your name and preferred date.');
    return;
  }

  alert(
    `✅ Table reserved for ${name}\n` +
    `📅 ${date} at ${time} · ${guests} guest(s)\n\n` +
    `Confirmation will be sent to your phone.`
  );
  closeReserveModal();
}

openLoginBtn.addEventListener('click',  () => openAuthModal(true));
openSignupBtn.addEventListener('click', () => openAuthModal(false));
modalClose.addEventListener('click',   closeAuthModal);
authModal.addEventListener('click',    (e) => { if (e.target === authModal) closeAuthModal(); });
authModal.addEventListener('keydown',  (e) => { if (e.key === 'Escape') closeAuthModal(); });

reserveClose.addEventListener('click',   closeReserveModal);
reserveModal.addEventListener('click',   (e) => { if (e.target === reserveModal) closeReserveModal(); });
reserveModal.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeReserveModal(); });

if (reserveConfirm) {
  reserveConfirm.addEventListener('click', confirmReservation);
}

authSubmitBtn.addEventListener('click', async () => {
  const email    = authEmail.value.trim();
  const password = authPassword.value;

  if (!email || !password) {
    alert('Please enter email and password');
    return;
  }

  try {
    if (isLoginMode) {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully');
    }
    closeAuthModal();
  } catch (error) {
    alert(error.message);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    openLoginBtn.style.display  = 'none';
    openSignupBtn.style.display = 'none';
  } else {
    openLoginBtn.style.display  = '';
    openSignupBtn.style.display = '';
  }
});
