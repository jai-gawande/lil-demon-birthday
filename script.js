document.addEventListener("DOMContentLoaded", () => {


  /* ================= FLOATING HEARTS ================= */
  const container = document.querySelector(".hearts-container");

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = ["💖", "💛", "💜"][Math.floor(Math.random() * 3)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 10 + 12) + "px";
    heart.style.animationDuration = (Math.random() * 3 + 4) + "s";

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }
  setInterval(createHeart, 400);


  /* ================= COUNTDOWN ================= */
   

  /* ================= BUTTONS ================= */
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  noBtn.addEventListener("mouseenter", () => {
    const parent = document.querySelector(".buttons");

    const maxX = parent.clientWidth - noBtn.offsetWidth;
    const maxY = parent.clientHeight - noBtn.offsetHeight;

    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";
  });

  yesBtn.onclick = () => show("balloonSection");


  /* ================= BALLOONS ================= */
  const popSound = document.getElementById("popSound");
  let popped = 0;

  function attachBalloons() {
    popped = 0;

    const balloons = document.querySelectorAll(".balloon");

    balloons.forEach((b, i) => {

      b.classList.remove("pop");
      b.innerText = "🎈";

      b.onclick = () => {
        if (!b.classList.contains("pop")) {

          b.classList.add("pop");

          // 💥 Pop sound
          try {
            popSound.currentTime = 0;
            popSound.play();
          } catch (e) { }

          // 🎉 Confetti burst
          burstConfetti(b);

          // 💬 Animated message
          const msg = document.getElementById("balloonMsg");
          msg.classList.remove("show");

          setTimeout(() => {
            msg.innerText = [
              "If you were dinosaur, you'd be a Gorgeousaurus 🦖",
              "If you were a notification, I’d check you instantly every time 📱",
              "You’re the reason random smiles happen for no reason 😊"
            ][i];

            msg.classList.add("show");
          }, 200);

          // Replace balloon after animation (keeps UI full)
          setTimeout(() => {
            b.classList.remove("pop");
            b.innerText = "💥";
          }, 400);

          popped++;

          if (popped === balloons.length) {
            document.getElementById("balloonNext").style.display = "inline-block";
          }
        }
      };
    });
  }


  /* ================= QUIZ ================= */
  const questions = [
    {
      q: "Who is the best person in your life?",
      options: ["Me 😌", "Others ❌"],
      correct: 0
    },
    {
      q: "Who makes you smile randomly?",
      options: ["Me 💖", "No one"],
      correct: 0
    },
    {
      q: "Who annoys you the most? 😏",
      options: ["Me 😂", "Others"],
      correct: 0
    },
    {
      q: "Who do you trust the most?",
      options: ["Me ❤️", "Others"],
      correct: 0
    }
  ];

  let currentQ = 0;

  function loadQuestion() {
    const q = questions[currentQ];

    document.getElementById("questionText").innerText = q.q;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.innerText = opt;

      btn.onclick = () => {
        if (i === q.correct) {
          document.getElementById("quizMsg").innerText = "Correct 😌💖";
          currentQ++;

          if (currentQ < questions.length) {
            setTimeout(loadQuestion, 800);
          } else {
            setTimeout(() => show("cakeSection"), 1200);
          }
        } else {
          document.getElementById("quizMsg").innerText = "Wrong 😏 Try again";
        }
      };

      optionsDiv.appendChild(btn);
    });
  }


  /* ================= SLIDESHOW ================= */
  const images = [

    "assets/bday.jpeg",
    "assets/snakeee.jpeg",
    "assets/black.jpeg",
    "assets/diwali.jpeg",
    "assets/hehe.jpeg",
    "assets/theog.jpeg",
  ];

  let slideInterval;

  function startSlideshow() {
    const img = document.getElementById("slideImg");
    const music = document.getElementById("photoMusic");
    music.addEventListener("ended", () => {
      music.currentTime = 0;
      music.play();
    });

    clearInterval(slideInterval);

    let i = 0;

    // 🎧 play music (only once)
    if (music.paused) {
      music.currentTime = 0;
      music.volume = 0.4; // soft background
      music.play().catch(() => { }); // avoid browser errors
    }

    slideInterval = setInterval(() => {
      i = (i + 1) % images.length;

      img.style.opacity = 0;

      setTimeout(() => {
        img.src = images[i];
        img.style.opacity = 1;
      }, 400);

    }, 3000);
  }


  /* ================= CAKE ================= */
  const bgMusic = document.getElementById("bgMusic");

  document.getElementById("cake").onclick = () => {

    const cake = document.getElementById("cake");

    cake.style.transform = "scale(1.2)";
    cake.innerText = "🎂💨";

    setTimeout(() => {
      document.body.classList.add("final-mode");
      show("finalSection");
      typeFinal();
      bgMusic.play();
      confettiBlast();
    }, 2000);
  };


  /* ================= CONFETTI ================= */
  function burstConfetti(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 15; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.innerText = ["✨", "💖", "🎉"][Math.floor(Math.random() * 3)];

      c.style.left = rect.left + Math.random() * 50 + "px";
      c.style.top = rect.top + "px";

      document.body.appendChild(c);

      setTimeout(() => c.remove(), 2000);
    }
  }
  function confettiBlast() {
    for (let i = 0; i < 80; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.innerText = ["💖", "✨", "🎉"][Math.floor(Math.random() * 3)];

      c.style.left = Math.random() * 100 + "vw";
      c.style.animationDuration = (Math.random() * 2 + 2) + "s";

      document.body.appendChild(c);

      setTimeout(() => c.remove(), 3000);
    }
  }


  /* ================= FINAL SCENE ================= */
  function startFinalScene() {

    const container = document.querySelector(".balloonContainer");

    const interval = setInterval(() => {

      for (let i = 0; i < 5; i++) {

        const b = document.createElement("div");
        b.className = "balloonFloat";
        b.innerText = ["🎈", "💖", "✨"][Math.floor(Math.random() * 3)];

        b.style.left = Math.random() * 100 + "vw";
        b.style.transform = `translateX(${Math.random() * 100 - 50}px)`;

        container.appendChild(b);

        setTimeout(() => b.remove(), 5000);
      }

    }, 150);

    setTimeout(() => {
      document.querySelector(".curtain.left").classList.add("show");
      document.querySelector(".curtain.right").classList.add("show");
    }, 2500);

    setTimeout(() => {
      document.querySelector(".curtain.left").classList.remove("show");
      document.querySelector(".curtain.right").classList.remove("show");

      document.querySelector(".finalContent").classList.add("show");

      typeFinalMessage(); // 👈 important

      // clearInterval(interval);

    }, 4500);
  }
  function typeFinalMessage() {

    const text = `
Yooo mah Lil demon 👻 wish you again a very happy birthday 🎉🎂. I hope you have an amazing day filled with love, laughter, and all the things that make you happy (PS- if that thing is me 🙃).

A short Poetry for mah billi🐱-

You never asked me what I like the most about you  
But if you ask me someday  
I would say it's your eyes  
And of course it's not just them  
It's everything about you  
But your eyes captivate me the most  
Because whenever I look into them they look so painfully beautiful  
Holding so many stories you never spoke  
They understand the language my eyes speak  
The language that no one ever tried to understand  
Many eyes looked, But none of them tried to read the torment my eyes hide  
But when your eyes looked into mine  
After a long time I felt seen.

I hope you like this little surprise I made for you. I wanted to do something special and unique not just to show how much you mean to me, but to remind you how important you are in my life and I am grateful for every moment we share together. Love you lots, Billi 💖💖
`;

    const el = document.getElementById("finalMsg");

    if (!el) return;

    el.innerHTML = "";
    let i = 0;

    function type() {
      if (i < text.length) {

        // 👇 IMPORTANT FIX
        if (text[i] === "\n") {
          el.innerHTML += "<br>";
        } else {
          el.innerHTML += text[i];
        }

        i++;
         const box = document.querySelector(".finalBox");
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
        setTimeout(type, 45); // slightly faster for long text
      }
    }

    type();
  }
  /* ================= COMPLIMENT TAP ================= */

  const compliments = [
    "Kay re tu… itki cute ka ahes 😶💖",
    "Tu thodi dangerous cute ahes… disclaimer dyayla pahije🙃",
    "Tu innocent vatate… pan ik kiti innocent ahes😏",
    "You make everything feel nice… kasa kay kartes tu 🤥",
    "Lowkey… tu mazi favorite distraction ahes 💖",
    "Tu sobat asel tar normal goshti pan special vatatat 💫",
    "If cuteness had voice then ti thodi tujhya sarkhi asel 😶💖"



  ];

  let usedCompliments = new Set();

  const icon = document.getElementById("tapIcon");

  if (icon) {
    icon.onclick = () => {
      icon.innerText = ["🐾", "💖", "👻","⭐","💗","🐱","🎀"][Math.floor(Math.random() * 7)];

      // 🔥 shake effect
      icon.classList.add("shake");
      setTimeout(() => icon.classList.remove("shake"), 400);

      // 🔊 sound
      // playClick();
      document.getElementById("tapSound").play();

      // avoid repeat
      if (usedCompliments.size === compliments.length) {
        usedCompliments.clear();
      }

      let index;
      do {
        index = Math.floor(Math.random() * compliments.length);
      } while (usedCompliments.has(index));

      usedCompliments.add(index);

      const text = document.getElementById("complimentText");

      text.style.opacity = 0;

      setTimeout(() => {
        text.innerText = compliments[index];
        text.style.opacity = 1;
      }, 200);

      // show next after 3 taps
      if (usedCompliments.size >= 3) {
        document.getElementById("complimentNext").style.display = "inline-block";
      }
    };
  }


  /* ================= NAVIGATION ================= */
  window.show = function (id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    const music = document.getElementById("photoMusic");

    // stop music when leaving photo section
    if (id !== "photoSection" && music) {
      music.pause();
    }

    if (id === "balloonSection") attachBalloons();
    if (id === "quizSection") {
      currentQ = 0;
      loadQuestion();
    }
    if (id === "photoSection") startSlideshow();
    if (id === "finalSection") {
      startFinalScene();
    }
  };

  window.playClick = function () {
    const sound = document.getElementById("clickSound");
    try {
      sound.currentTime = 0;
      sound.play();
    } catch (e) { }
  }


});
