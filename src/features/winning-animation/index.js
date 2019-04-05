const showWinningAnimation = () => {
  let shouldShowAnimation = false;
  const body = document.querySelector("body");

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style = `position:absolute;top:0`;

  const ctx = canvas.getContext("2d");

  const coin = new Image();
  coin.src = "./coin.png";
  coin.onload = () => {
    body.appendChild(canvas);
    shouldShowAnimation = true;
    drawloop();
  };

  const coins = [];

  const drawloop = () => {
    if (shouldShowAnimation) {
      // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation
      // The number of callbacks is usually 60 times per second.
      requestAnimationFrame(drawloop);
    }

    // the context.clearRect(startPosX, startPosY, width ,height) clears the specified pixels within a given rectangle.
    // clear the rectangle each time so the coins trail disappear at each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // the closer to 0 the less coin falling. The opposite is true for 1.
    if (Math.random() < 0.8) {
      coins.push({
        x: Math.random() * canvas.width,
        y: -50,
        moveDownBy: 3,
        size: 0.5 + Math.random(),
        state: Math.random() * 10
      });
    }

    let index = coins.length;
    while (index--) {
      const { x, y, size, state } = coins[index];

      coins[index].state = state > 9 ? 0 : state + 0.1; // 10 images in the sprite
      coins[index].moveDownBy += 0.3;
      coins[index].y += coins[index].moveDownBy;

      // JavaScript syntax:	context.drawImage(
      // img,startxInImg,startyInImg,imgWidth,imgHeight,posX,posY,width,height);
      ctx.drawImage(
        coin,
        44 * Math.floor(state), // defines the startxInImg so the selected sprite
        0,
        44,
        40,
        x,
        y,
        44 * size,
        40 * size
      );
    }
  };
};

export default showWinningAnimation;
