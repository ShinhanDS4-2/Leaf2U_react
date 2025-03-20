import confetti from 'canvas-confetti';

let timeoutId;

const SnowConfetti = () => {
    var duration = 15 * 100000;
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function frame() {
        var timeLeft = animationEnd - Date.now();
        var ticks = Math.max(100, 300 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);

        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
                x: Math.random(),
                // since particles fall down, skew start toward the top
                y: Math.random() * skew - 0.2,
            },
            colors: ['#A0DC3C'],
            shapes: ['circle'],
            gravity: randomInRange(0.3, 0.5),
            scalar: randomInRange(0.6, 1),
            drift: randomInRange(-0.4, 0.4),
        });

        if (timeLeft > 0) {
            timeoutId = setTimeout(() => requestAnimationFrame(frame), 80);
        }
    }

    // frame();

    return {
        stopConfetti: () => {
            clearTimeout(timeoutId);
            confetti({ particleCount: 0 });
        },
        frame,
    };
};

export default SnowConfetti;
