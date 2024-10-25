const audioCtx = new AudioContext();

function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
}

document.getElementById('close').onclick = function() {
    document.getElementById('popup').style.display = 'none';
    const distortion = audioCtx.createWaveShaper();

    // Slowly distort audio over a couple minutes
    var amount = 0;
    setInterval(function() {
        amount += 0.05;

        distortion.curve = makeDistortionCurve(amount);
    }, 10);

    var audio = new Audio('music.mp3');
    
    var source = audioCtx.createMediaElementSource(audio);

    source.connect(distortion);
    distortion.connect(audioCtx.destination);

    audio.loop = true;
    audio.playbackRate = 1.5;

    setInterval(function() {
        audio.playbackRate += Math.random() * 0.1 - 0.05;
    }, 1000);

    audio.play();
}

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.navbar a');
    const contents = document.querySelectorAll('.content');

    links.forEach(link => {
        if (link.getAttribute('href') !== 'https://hack.club/boba-manor') {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);

                contents.forEach(content => {
                    content.style.display = 'none';
                });

                document.getElementById(targetId).style.display = 'block';
            });
        }
    });
});

scream = function() {
    let audio = new Audio('scream.mp3');

    audio.playbackRate = 1.5;

    audioCtx.suspend();

    audio.play();

    document.getElementById('momo').style.display = 'block';

    setTimeout(function() {
        audioCtx.resume();
        document.getElementById('momo').style.display = 'none';
        document.getElementById('boba-manor').style.display = 'inline';
    }, 1000);
}

drops = document.getElementsByClassName('blood-drop');

for (let i = 0; i < drops.length; i++) {
    drops[i].style.transform = 'rotate(' + Math.random() * 20 + 45 + 'deg)';
    drops[i].style.animationDelay = Math.random() * 1000 + 'ms';
    drops[i].style.left = Math.random() * 100 / drops.length + '%';
}

setInterval(function() {
    for (let i = 0; i < drops.length; i++) {
        drops[i].style.transform = 'rotate(' + Math.random() * 20 + 45 + 'deg)';
    }
}, 2000);

var pool = document.getElementById('pool');
pool.style.top = '100%';
pool.style.height = '0%';

setInterval(function() {
    if (parseFloat(pool.style.top) == 0) {
        pool.style.top = '0%';
        pool.style.height = '100%';
    } else {
        pool.style.top = parseFloat(pool.style.top) - 0.002 + '%';
        pool.style.height = parseFloat(pool.style.height) + 0.002 + '%';
    }
}, 10);