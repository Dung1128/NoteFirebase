import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyBDSaI61Yrb9vVA2Qalf7g9FJqLJbNhBow',
  authDomain: 'note-a8b00.firebaseapp.com',
  databaseURL: 'https://note-a8b00.firebaseio.com',
  projectId: 'note-a8b00',
  storageBucket: 'note-a8b00.appspot.com',
  messagingSenderId: '252593496999'
};
export const firebaseApp = firebase.initializeApp(config);
