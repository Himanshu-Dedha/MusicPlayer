import express from "express";
import Player from "@bhznjns/node-mp3-player"
import cors from 'cors';
import os from 'os';

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    let ipAddress = '';

    Object.keys(interfaces).forEach((iface) => {
        interfaces[iface].forEach((details) => {
            if (!details.internal && details.family === 'IPv4') {
                ipAddress = details.address;
            }
        });
    });

    return ipAddress;
}

const app = express();
app.use(cors({
    origin: '*'
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies



const PORT = process.env.PORT || 3000;

const player = new Player({ mode: "local" })

const src = [
"/home/imanshuh/MusicPlayerJs/FINAL/music/music1.mp3",
"/home/imanshuh/MusicPlayerJs/FINAL/music/music2.mp3",
"/home/imanshuh/MusicPlayerJs/FINAL/music/music3.mp3",
"/home/imanshuh/MusicPlayerJs/FINAL/music/music4.mp3",
"/home/imanshuh/MusicPlayerJs/FINAL/music/music5.mp3",
"/home/imanshuh/MusicPlayerJs/FINAL/music/music6.mp3",
"/home/imanshuh/MusicPlayerJs/FINAL/music/music7.mp3",
"/home/imanshuh/MusicPlayerJs/FINAL/music/music8.mp3",
"/home/imanshuh/MusicPlayerJs/FINAL/music/music9.mp3"
];
player.src = src[0]
let i = 0;



app.post('/gesture',async (req, res) => {
    console.log(req.body);
    // Mock JSON data for gestures, replace this with your actual gesture data
    const gestures = {
        gesture: req.body.gesture // Assuming the gesture is sent in the request body
    };
    let previous_gesture=gestures.gesture
    // Logic to handle different gestures
    if (gestures.gesture === 'ILoveYou') {
        console.log("ILoveYou Accesed");
        await player.play()
        previous_gesture='ILoveYou'



    }else if (gestures.gesture === 'Thumb_Up') {
        if(i>=8){
            i=i%9;
        }else{
            i=i+1;
        }

        player.src = src[i];
        await player.play();
        previous_gesture='Thumb_Up'



    } else if (gestures.gesture === 'Thumb_Down') {
        if(i==0){
            i=8;
        }
        else{
            i=i-1;
        }
        player.src = src[i];
        await player.play();
        previous_gesture='Thumb_Down'




    } else if (gestures.gesture === 'Open_Palm') {
        player.stop();
        previous_gesture='Open_Palm'





    } else if(gestures.gesture == 'Thumb_Up' && previous_gesture == 'Open_Palm'){
            player.resume();

    }
    else{
        console.log("The music is not playing")
    }

    res.status(200);
    res.json({ message: 'Gesture received and processed' });
});

const localIpAddress = getLocalIpAddress();

app.listen(PORT, () => {
    console.log(`Server running at http://${localIpAddress}:${PORT}`);
});