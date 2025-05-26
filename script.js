// Mood to song mappings
// Mood to Hindi/Marathi song mappings
// Mood to Hindi/Marathi song mappings with WORKING YouTube links
// Mood to Hindi/Marathi song mappings with WORKING YouTube links
// Mood to Hindi/Marathi song mappings with WORKING YouTube links
const moodSongs = {
    happy: [
        { title: "लुक्का छुप्पी (Luka Chuppi) - आर.डी. बर्मन", url: "https://www.youtube.com/watch?v=FFpgYjL2aJo" }, // Original old song
        { title: "झिंगाट (Zingaat) - सैराट", url: "https://www.youtube.com/watch?v=5AeX7Ddq4ts" }, // Official video
        { title: "मस्ती में (Masti Mein) - स्वदेश", url: "https://www.youtube.com/watch?v=FC6BBII9Qs8" } // Official audio
    ],
    sad: [
        { title: "तुम ही हो (Tum Hi Ho) - आशिकी 2", url: "https://www.youtube.com/watch?v=IJq0yyWug1k" }, // Official music video
        { title: "चाहत (Chahat) - सलमान खान", url: "https://www.youtube.com/watch?v=bzSTpdcs-EI" }, // Full song from movie
        { title: "धीरे धीरे (Dheere Dheere) - यो यो हनी सिंह", url: "https://www.youtube.com/watch?v=nCD2hj6zJEc" } // Yo Yo Honey Singh version
    ],
    angry: [
        { title: "भीगी भीगी (Bheegi Bheegi) - गैंगस्टर", url: "https://www.youtube.com/watch?v=cKs83ZQxYKA" }, // Official music video
        { title: "दर्द-ए-डिस्को (Dard-E-Disco) - ओम शांति ओम", url: "https://www.youtube.com/watch?v=fP6MNznzVcQ" }, // Official music video
        { title: "मालामाल (Malamal) - मालामाल वीकली", url: "https://www.youtube.com/watch?v=M81wneSjQbA" } // Full song from movie
    ],
    neutral: [
        { title: "तुम से ही (Tum Se Hi) - जब वी मेट", url: "https://www.youtube.com/watch?v=mt9xg0mmt28" }, // Official music video
        { title: "मन मोहना (Man Mohana) - जोधा अकबर", url: "https://www.youtube.com/watch?v=9alqwyaSOiU" }, // Official music video
        { title: "राधा कैसे न जले (Radha Kaise Na Jale) - लगान", url: "https://www.youtube.com/watch?v=qNnvL0ztJhA" } // Official music video
    ],
    surprised: [
        { title: "घुंघरू (Ghungroo) - वॉर", url: "https://www.youtube.com/watch?v=qFkNATtc3mc" }, // Official music video
        { title: "काली रे (Kaali Re) - गैंगस्टर", url: "https://www.youtube.com/watch?v=KC-DuX51NY0" }, // Full song from movie
        { title: "अजीब दास्तान है ये (Ajeeb Dastaan Hai Yeh)", url: "https://www.youtube.com/watch?v=AU-hut9lGQ4" } // Classic song
    ],
    disgusted: [
        { title: "बेवफा (Bewafa) - इमरान हाशमी", url: "https://www.youtube.com/watch?v=Q-u1W5u747A" }, // Popular sad song
        { title: "धोखा (Dhoka) - धोखा", url: "https://www.youtube.com/watch?v=TRWMM5LgEoI" }, // Full song from movie
        { title: "छोड़ दिया (Chhod Diya) - बाजीराव मस्तानी", url: "https://www.youtube.com/watch?v=uK_l_H1b11s" } // Full song from movie
    ],
    fearful: [
        { title: "भूत राजा (Bhoot Raja) - गोलमाल", url: "https://www.youtube.com/watch?v=zmMcIkg6nvo" }, // Humorous song from a movie
        { title: "डर (Dar) - डर", url: "https://www.youtube.com/watch?v=Gj9qU2s9fio" }, // Title track of Dar
        { title: "खौफ (Khauf) - खौफ", url: "https://www.youtube.com/watch?v=Z_kK0q3_N_A" } // Title track of Khauf (Full song)
    ]
};

// Marathi translations for emotions (no change needed here)
const emotionTranslations = {
    happy: 'आनंदी',
    sad: 'दुःखी',
    angry: 'रागीट',
    neutral: 'तटस्थ',
    surprised: 'आश्चर्यचकित',
    disgusted: 'तिरस्कार',
    fearful: 'घाबरलेला'
};

// Function to validate URLs before displaying (this function is good as is, no changes needed)
function validateUrl(url) {
    // This simple check is usually sufficient for YouTube links which are already HTTPS
    if (!url.startsWith('https://')) {
        return `https://${url.replace('://', '')}`;
    }
    return url;
}

// Updated song recommendation function with URL validation (no changes needed here either)
function updateSongRecommendations(mood) {
    const songs = moodSongs[mood] || moodSongs.neutral;

    songList.innerHTML = '';
    songs.forEach(song => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = validateUrl(song.url);
        a.textContent = song.title;
        a.target = '_blank';
        li.appendChild(a);
        songList.appendChild(li);
    });
}
// DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');
const emotionDisplay = document.getElementById('emotion');
const emotionMarathiDisplay = document.getElementById('emotion-marathi');
const songList = document.getElementById('songList');

let stream = null;

// Load models and enable start button
async function loadModels() {
    try {
        startButton.disabled = true;
        startButton.textContent = 'Loading Models...';
        
        await faceapi.nets.tinyFaceDetector.loadFromUri(
            'https://justadudewhohacks.github.io/face-api.js/models'
        );
        await faceapi.nets.faceLandmark68Net.loadFromUri(
            'https://justadudewhohacks.github.io/face-api.js/models'
        );
        await faceapi.nets.faceExpressionNet.loadFromUri(
            'https://justadudewhohacks.github.io/face-api.js/models'
        );
        
        startButton.disabled = false;
        startButton.textContent = 'Start Camera';
    } catch (error) {
        console.error('Error loading models:', error);
        startButton.textContent = 'Error Loading Models';
    }
}

// Start video stream and detection
async function startVideo() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        
        startButton.disabled = true;
        startButton.textContent = 'Detection Active';
        
        detectFaces();
    } catch (error) {
        console.error('Error accessing camera:', error);
        emotionDisplay.textContent = 'Camera Error';
        songList.innerHTML = '<li>Please allow camera access to use Moodify</li>';
        startButton.textContent = 'Try Again';
        startButton.disabled = false;
    }
}

// Detect faces and expressions
async function detectFaces() {
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, 
            new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
        
        // Clear canvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Resize detections to match canvas
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        // Draw detections
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        
        // Update emotion display
        if (detections.length > 0 && detections[0].expressions) {
            const expressions = detections[0].expressions;
            const dominantExpression = getDominantExpression(expressions);
            
            emotionDisplay.textContent = dominantExpression;
            emotionMarathiDisplay.textContent = emotionTranslations[dominantExpression.toLowerCase()] || dominantExpression;
            
            updateSongRecommendations(dominantExpression.toLowerCase());
        } else {
            emotionDisplay.textContent = 'No face detected';
            emotionMarathiDisplay.textContent = '--';
            songList.innerHTML = '<li>Please position your face in the camera</li>';
        }
    }, 500);
}

// Get the dominant expression from detection results
function getDominantExpression(expressions) {
    let maxProbability = 0;
    let dominantExpression = 'neutral';
    
    for (const expression in expressions) {
        if (expressions[expression] > maxProbability) {
            maxProbability = expressions[expression];
            dominantExpression = expression;
        }
    }
    
    // Capitalize first letter
    return dominantExpression.charAt(0).toUpperCase() + dominantExpression.slice(1);
}

// Update song recommendations based on mood
function updateSongRecommendations(mood) {
    const songs = moodSongs[mood] || moodSongs.neutral;
    
    songList.innerHTML = '';
    songs.forEach(song => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = song.url;
        a.textContent = song.title;
        a.target = '_blank';
        li.appendChild(a);
        songList.appendChild(li);
    });
}

// Event listeners
startButton.addEventListener('click', startVideo);

// Initialize
loadModels();