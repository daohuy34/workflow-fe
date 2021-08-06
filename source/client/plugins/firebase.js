import firebase from 'firebase'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyBe-BBXuUzVIXXDl2MVGLBQ7THstM3h2D0',
        authDomain: 'test-8613b.firebaseapp.com',
        databaseURL: '',
        projectId: 'test-8613b',
        storageBucket: 'test-8613b.appspot.com',
        messagingSenderId: '876651344560'
    })
}

export default firebase
