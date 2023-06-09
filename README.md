# SOCIAL MEDIA USING BLOCKCHAIN ETHBCLUB WEB 3.O#

# Configuration of api keys
- Create config folder inside client/src/ 
- Paste following contains in file with name config.js and save config.js inside config folder 
- Get the below details from firebase 

import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "REPLACE YOUR API KEY",
    authDomain: "REPLACE YOUR APP DOMAIN",
    projectId: "REPLACE PROJECT ID",
    storageBucket: "REPLACE STOREAGE BUCKET",
    messagingSenderId: "REPLACE MSG ID",
    appId: "REPLACE API ID"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 
export  const storage = getStorage(app)


# Requirements 
- Ganache
- Truffle 

# Configuration of project
- Deploy smart contracts on ganache blockchain using truffle 
- to deploy smart contract use npx truffle migrate 
