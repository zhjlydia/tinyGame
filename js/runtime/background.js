import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/back.png'
const BG_WIDTH     = 320
const BG_HEIGHT    = 504

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.top = 0
    this.render(ctx)
    this.renderIndex=1
    
  }

  update() {
    this.top -= 2

    if ( this.top <= -screenHeight ){
      this.renderIndex+=1
      this.top = 0
    }
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      screenHeight + this.top,
      screenWidth,
      screenHeight
    )

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      this.top,
      screenWidth,
      screenHeight
    )

    ctx.fillStyle = "#7bbaf4"
    ctx.font = "50px Arial"
    ctx.fillText(
      this.renderIndex,
      screenWidth / 2 - 10,
      screenHeight + this.top,
    )
  }
}
