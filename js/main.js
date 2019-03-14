import Player from './player/index'
import FloorNormal from './npc/floor/floorNormal'
import FloorIce from './npc/floor/floorIce'
import FloorLeft from './npc/floor/floorLeft'
import FloorRight from './npc/floor/floorRight'
import FloorBounce from './npc/floor/floorBounce'
import FloorAttack from './npc/floor/floorAttack'
import BackGround from './runtime/background'
import Celling from './npc/celling'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
canvas.width = canvas.width * window.devicePixelRatio
canvas.height = canvas.height * window.devicePixelRatio
ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.floorType = [FloorNormal, FloorIce, FloorLeft, FloorRight, FloorBounce, FloorAttack]
    this.restart()
  }

  restart() {
    console.log(window.devicePixelRatio)
    databus.reset()
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
    this.bg = new BackGround(ctx)
    this.player = new Player()
    this.ceiling = new Celling()
    this.gameinfo = new GameInfo()
    this.music = new Music()
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  initFirstFloor() {
    let floor = new FloorNormal();
    floor.init(2, 100, 300)
    databus.floors.push(floor)
  }
  /**
   * 随着帧数变化的地板生成逻辑
   * 帧数取模定义成生成的频率
   */
  floorGenerate() {
    if (databus.frame === 1) {
      this.initFirstFloor();
    }
    if (databus.frame % 60 === 0) {
      var index = Math.ceil(Math.random() * 6 - 1)
      var mstage = this.floorType[index]
      let floor = databus.pool.getItemByClass('floor', mstage)
      floor.init(2)
      databus.floors.push(floor)
    }
  }


  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {

    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY) {
      this.restart()
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    databus.floors
      .forEach((item) => {
        item.setView(ctx)
      })

    this.player.onFrame(ctx);
    this.ceiling.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)
    this.gameinfo.renderBlood(ctx, this.player.blood)

    // 游戏结束停止帧循环
    if (databus.gameOver) {
      this.gameinfo.renderGameOver(ctx, databus.score)

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    this.bg.update()
    if (this.player) {
      this.player.update()
    }
    databus.floors
      .forEach((item) => {
        item.update()
      })

    this.floorGenerate()
    this.player.isJump = true
    this.collisionDetection()
    databus.score = this.bg.renderIndex
    if (this.player.blood <= 0) {
      databus.gameOver = true
    }
  }
  //碰撞检测
  collisionDetection() {
    for (let i = 0, il = databus.floors.length; i < il; i++) {
      let floor = databus.floors[i]
      if (floor.isTouched(this.player)) {
        this.player.isJump = false;
        this.player.speed = 0;
        this.player.y = floor.y - this.player.height + 5;
        if (!floor.hit) {
          this.music.playTouch();
        }
        floor.hitRun(this.player);  
        break
      }
    }
    if (this.ceiling.isCollideWith(this.player)) {
      this.player.blood -= 1;
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()
    if (!this.player.blood) {
      return
    }
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
