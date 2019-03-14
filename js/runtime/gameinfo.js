const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

import {drawRoundRect} from "../utils.js"

let atlas = new Image()
atlas.src = 'images/Common.png'

export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#35398c"
    ctx.font      = "20px Arial"

    ctx.fillText(
      score,
      10,
      35
    )
  }

  renderGameOver(ctx, score) {
    ctx.lineWidth = 3;
    drawRoundRect(ctx, screenWidth / 2 - 150, screenHeight / 2 - 100,300,200,10,'rgba(244,243,123,0.9)','fill');
    drawRoundRect(ctx, screenWidth / 2 - 152, screenHeight / 2 - 102, 304, 204, 10, '#35398c', 'stroke');
    ctx.drawImage(atlas, 0, 0, 320, 66, screenWidth / 2 - 140, screenHeight / 2 - 80, 280, 50)
    ctx.textAlign='center'
    ctx.fillStyle = "#35398c"
    ctx.font    = "18px Arial"


    ctx.fillText(
      'Score: ' + score,
      screenWidth / 2,
      screenHeight / 2
    )

    drawRoundRect(ctx, screenWidth / 2 - 50, screenHeight / 2 + 24, 100, 30, 3, '#f4847b', 'fill');
    drawRoundRect(ctx, screenWidth / 2 - 52, screenHeight / 2 +22, 104, 34, 5, '#35398c', 'stroke');

    ctx.fillStyle = "#fff"
    ctx.fillText(
      '重新开始',
      screenWidth / 2,
      screenHeight / 2+45
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 50,
      startY: screenHeight / 2 +24,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 + 55
    }
  }

  renderBlood(ctx,playerBlood){
    for(let i=0;i<playerBlood;i++){
      ctx.drawImage(atlas, 320, 15, 45, 45,50+i*25, 20, 20, 20)
    }
  }
}

