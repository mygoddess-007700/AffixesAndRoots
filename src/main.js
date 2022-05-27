import kaboom from "kaboom"

kaboom()

randSeed(Date.now());

loadSprite("begin", "sprites/begin.png")
loadSprite("game1", "sprites/game1.jpg")
loadSprite("game2", "sprites/game2.png")
loadSprite("end", "sprites/end.png")
loadSprite("meaning", "sprites/meaning/meaning.png")
loadSprite("root", "sprites/root/root.png")
loadSprite("aud", "sprites/meaning/aud.png")
loadSprite("cept", "sprites/meaning/cept.png")
loadSprite("cred", "sprites/meaning/cred.png")
loadSprite("dict", "sprites/meaning/dict.png")
loadSprite("fact", "sprites/meaning/fact.png")
loadSprite("fer", "sprites/meaning/fer.png")
loadSprite("ten", "sprites/meaning/ten.png")
loadSprite("mit", "sprites/meaning/mit.png")
loadSprite("scrib", "sprites/meaning/scrib.png")
loadSprite("spec", "sprites/meaning/spec.png")
loadSprite("believe", "sprites/root/believe.png")
loadSprite("carry", "sprites/root/carry.png")
loadSprite("hear", "sprites/root/hear.png")
loadSprite("hold", "sprites/root/hold.png")
loadSprite("make", "sprites/root/make.png")
loadSprite("write", "sprites/root/write.png")
loadSprite("see", "sprites/root/see.png")
loadSprite("send", "sprites/root/send.png")
loadSprite("speak", "sprites/root/speak.png")
loadSprite("taken", "sprites/root/taken.png")
loadSprite("right", "sprites/right.png")
loadSprite("error", "sprites/error.png")
loadSound("right", "sounds/正确音效.mp3")
loadSound("wrong", "sounds/错误音效.mp3")
loadSound("bgm", "sounds/bgm.mp3")

loadSprite("audible", "sprites/word/audible.png")
loadSprite("contradict", "sprites/word/contradict.png")
loadSprite("except", "sprites/word/except.png")
loadSprite("incredible", "sprites/word/incredible.png")
loadSprite("manufacture", "sprites/word/manufacture.png")
loadSprite("prescribe", "sprites/word/prescribe.png")
loadSprite("spectator", "sprites/word/spectator.png")
loadSprite("submit", "sprites/word/submit.png")
loadSprite("tenable", "sprites/word/tenable.png")
loadSprite("transfer", "sprites/word/transfer.png")
loadSprite("mean0", "sprites/mean/mean0.png")
loadSprite("mean1", "sprites/mean/mean1.png")
loadSprite("mean2", "sprites/mean/mean2.png")
loadSprite("mean3", "sprites/mean/mean3.png")
loadSprite("mean4", "sprites/mean/mean4.png")
loadSprite("mean5", "sprites/mean/mean5.png")
loadSprite("mean6", "sprites/mean/mean6.png")
loadSprite("mean7", "sprites/mean/mean7.png")
loadSprite("mean8", "sprites/mean/mean8.png")
loadSprite("mean9", "sprites/mean/mean9.png")

let gameTime = 0
let gamePause = false
let xScale = width() / 614
let yScale = () => {
    if (width() > height()) {
        return height() / 247
    } else {
        return xScale / (1920 / 1080)
    }
}
let backgroundHeight = () => {
    if (width() > height()) {
        return height()
    } else {
        return width() / (1920 / 1080)
    }
}
let bgmSound = play("bgm", {
    speed: 1
});

const builtinFonts = [
    "apl386o",
    "apl386",
    "sinko",
    "sink",
]

// Make a list of fonts that we cycle through
const fonts = [
    ...builtinFonts,
]

function addText(curFont = 0, curSize = 42, padX = 24, padY = 48, labelText) {
    add([
        pos(padX, padY),
        // Render text with the text() component
        text("Congratulations! The clearance time is " + labelText, {
            // What font to use
            font: fonts[curFont],
            // It'll wrap to next line if the text width exceeds the width option specified here
            width: (width() - padX * 2),
            // The height of character
            size: curSize,
            lineSpacing: 8,
            letterSpacing: 4,
            // Transform each character for special effects
            transform: (idx, ch) => ({
                color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
                pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
                scale: wave(1, 1.2, time() * 3 + idx),
                angle: wave(-9, 9, time() * 3 + idx),
            }),
        }),
    ])
}

function addButton(txt, p, f) {
    const btn = add([
        text(txt),
        pos(p),
        area({ cursor: "pointer", }),
        scale(0.4 * xScale, 0.4 * yScale),
        origin("center"),
    ])

    btn.onClick(f)

    btn.onUpdate(() => {
        if (btn.isHovering()) {
            const t = time() * 10
            btn.color = rgb(
                wave(0, 255, t),
                wave(0, 255, t + 2),
                wave(0, 255, t + 4),
            )
            btn.scale = vec2(0.5 * xScale, 0.5 * yScale)
        } else {
            btn.scale = vec2(0.4 * xScale, 0.4 * yScale)
            btn.color = rgb()
        }
    })
}

function fixZeroStart(str, n) {
    return (Array(n).join('0') + str).slice(-n);
}

function getTime() {
    return Math.trunc(gameTime / 60000) + ":" + fixZeroStart(Math.trunc(gameTime / 1000) % 60, 2) + ":" + fixZeroStart(Math.trunc(gameTime / 10) % 100, 2)
}

scene("gameBegin", () => {
    add([
        sprite("begin", { width: width(), height: height() }),
        scale(1),
        z(-1)
    ])

    addButton("Start", vec2(320 * (width() / 614), 200 * (height() / 247)), () => go("game1"))
})

scene("game1", () => {
    let xNum1 = 0
    let yNum1 = 0
    let xNum2 = 0
    let yNum2 = 0

    let meaningFliped = false
    let meaningFlipNum = -1
    let flipMeaning
    let rootFliped = false
    let rootFlipNum = -1
    let flipRoot
    let rightNum = 0
    let rootList = [
        sprite("aud", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("cept", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("cred", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("dict", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("fact", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("fer", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("mit", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("scrib", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("spec", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("ten", { width: 80 * (width() / 614), height: 80 * (height() / 247) })
    ]
    let meaningList = [
        sprite("believe", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("carry", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("hear", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("hold", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("make", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("see", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("send", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("speak", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("taken", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
        sprite("write", { width: 80 * (width() / 614), height: 80 * (height() / 247) })
    ]
    let meanAndRootDic = { 0: 2, 1: 8, 2: 0, 3: 7, 4: 4, 5: 1, 6: 6, 7: 9, 8: 5, 9: 3 }

    function initGame1() {
        add([
            sprite("game1", { width: width(), height: height() }),
            scale(1),
        ])

        addLevel([
            "                ",
            "x x x x  y y y y",
            "                ",
            "x x x x  y y y y",
            "                ",
            "  x x      y y  ",
        ], {
            width: 35 * (width() / 614),
            height: 35 * (height() / 247),
            layer: 1,
            "x": () => [
                "meaning",
                sprite("meaning", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
                area(),
                {
                    x: xNum1,
                    y: yNum1,
                },
                xNum1++,
                yNum1++,
            ],
            "y": () => [
                "root",
                sprite("root", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
                area(),
                {
                    x: xNum2,
                    y: yNum2,
                },
                xNum2++,
                yNum2++,
            ],
        })
    }

    function checkAns() {
        if (meanAndRootDic[meaningFlipNum] == rootFlipNum) {
            rightNum++
            if (rightNum >= 10) {
                destroy(flipMeaning)
                destroy(flipRoot)
                gamePause = true
                addText(0, 42 * (width() / 614), 24 * (width() / 614), 48 * (height() / 247), label.text)
                addButton("Next Game", vec2(320 * (width() / 614), 210 * (height() / 247)), () => go("game2"))
                return
            }
            right = add([
                sprite("right", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
                pos(270 * (width() / 614), 180 * (height() / 247))
            ])
            play("right")
            wait(1, () => {
                destroy(flipMeaning)
                destroy(flipRoot)
                destroy(right)
                meaningFliped = false
                rootFliped = false
            })
        } else {
            wrong = add([
                sprite("error", { width: 80 * (width() / 614), height: 80 * (height() / 247) }),
                pos(270 * (width() / 614), 180 * (height() / 247))
            ])
            play("wrong")
            wait(1, () => {
                destroy(wrong)
                flipMeaning.use(sprite("meaning", { width: 80 * (width() / 614), height: 80 * (height() / 247) }))
                flipRoot.use(sprite("meaning", { width: 80 * (width() / 614), height: 80 * (height() / 247) }))
                meaningFliped = false
                rootFliped = false
            })
        }
    }

    initGame1()

    const label = add([
        text(getTime()),
        pos(4 * (width() / 614), 4 * (height() / 247)),
        scale(0.5 * (width() / 614), 0.5 * (height() / 247))
    ])

    label.onUpdate(() => {
        if (!gamePause) {
            gameTime += Math.trunc(dt() * 1000)
        }
        label.text = getTime()
    })

    onClick("meaning", (meaning) => {
        if (!meaningFliped) {
            meaning.use(meaningList[meaning.x])
            meaningFliped = true
            meaningFlipNum = meaning.x
            flipMeaning = meaning
            if (rootFliped) {
                checkAns()
            }
        } else {
            if (!rootFliped && meaning.x == meaningFlipNum) {
                meaningFliped = false
                meaningFlipNum = -1
                meaning.use(sprite("meaning", { width: 80 * (width() / 614), height: 80 * (height() / 247) }))
            }
        }
    })

    onClick("root", (root) => {
        if (!rootFliped) {
            root.use(rootList[root.x])
            rootFliped = true
            rootFlipNum = root.x
            flipRoot = root
            if (meaningFliped) {
                checkAns()
            }
        } else {
            if (!meaningFliped && root.x == rootFlipNum) {
                rootFliped = false
                rootFlipNum = -1
                root.use(sprite("meaning", { width: 80 * (width() / 614), height: 80 * (height() / 247) }))
            }
        }
    })
})

scene("game2", () => {
    let hasWordControl = false
    let rightNum = 0
    let wordList = [
        vec2(68 * (width() / 614), 56 * (height() / 247)), vec2(165 * (width() / 614), 39 * (height() / 247)), vec2(75 * (width() / 614), 100 * (height() / 247)), vec2(185 * (width() / 614), 95 * (height() / 247)), vec2(315 * (width() / 614), 55 * (height() / 247)),
        vec2(320 * (width() / 614), 100 * (height() / 247)), vec2(405 * (width() / 614), 45 * (height() / 247)), vec2(420 * (width() / 614), 110 * (height() / 247)), vec2(520 * (width() / 614), 50 * (height() / 247)), vec2(520 * (width() / 614), 105 * (height() / 247)),
    ]
    let meanList = [
        vec2(70 * (width() / 614), 170 * (height() / 247)), vec2(220 * (width() / 614), 170 * (height() / 247)), vec2(360 * (width() / 614), 170 * (height() / 247)), vec2(490 * (width() / 614), 170 * (height() / 247)), vec2(110 * (width() / 614), 205 * (height() / 247)),
        vec2(280 * (width() / 614), 205 * (height() / 247)), vec2(460 * (width() / 614), 205 * (height() / 247)), vec2(130 * (width() / 614), 235 * (height() / 247)), vec2(310 * (width() / 614), 235 * (height() / 247)), vec2(490 * (width() / 614), 235 * (height() / 247)),
    ]
    let wordAndMeanDic = { 0: 0, 1: 7, 2: 2, 3: 9, 4: 3, 5: 8, 6: 5, 7: 4, 8: 1, 9: 6 }

    function initGame2() {
        add([
            sprite("game2", { width: width(), height: height() }),
            scale(1),
            z(-1)
        ])

        add([
            "mean",
            sprite("mean0", { width: 120 * (width() / 614), height: 40 * (height() / 247) }),
            pos(meanList[0]),
            origin("center"),
            area(),
            {
                x: 0
            }
        ])

        add([
            "mean",
            sprite("mean1", { width: 120 * (width() / 614), height: 40 * (height() / 247) }),
            pos(meanList[1]),
            origin("center"),
            area(),
            {
                x: 1
            }
        ])

        add([
            "mean",
            sprite("mean2", { width: 120 * (width() / 614), height: 40 * (height() / 247) }),
            pos(meanList[2]),
            origin("center"),
            area(),
            {
                x: 2
            }
        ])

        add([
            "mean",
            sprite("mean3", { width: 120 * (width() / 614), height: 40 * (height() / 247) }),
            pos(meanList[3]),
            origin("center"),
            area(),
            {
                x: 3
            }
        ])

        add([
            "mean",
            sprite("mean4", { width: 160 * (width() / 614), height: 35 * (height() / 247) }),
            pos(meanList[4]),
            origin("center"),
            area(),
            {
                x: 4
            }
        ])

        add([
            "mean",
            sprite("mean5", { width: 160 * (width() / 614), height: 35 * (height() / 247) }),
            pos(meanList[5]),
            origin("center"),
            area(),
            {
                x: 5
            }
        ])

        add([
            "mean",
            sprite("mean6", { width: 160 * (width() / 614), height: 35 * (height() / 247) }),
            pos(meanList[6]),
            origin("center"),
            area(),
            {
                x: 6
            }
        ])

        add([
            "mean",
            sprite("mean7", { width: 160 * (width() / 614), height: 35 * (height() / 247) }),
            pos(meanList[7]),
            origin("center"),
            area(),
            {
                x: 7
            }
        ])

        add([
            "mean",
            sprite("mean8", { width: 160 * (width() / 614), height: 35 * (height() / 247) }),
            pos(meanList[8]),
            origin("center"),
            area(),
            {
                x: 8
            }
        ])

        add([
            "mean",
            sprite("mean9", { width: 160 * (width() / 614), height: 35 * (height() / 247) }),
            pos(meanList[9]),
            origin("center"),
            area(),
            {
                x: 9
            }
        ])

        add([
            "word",
            sprite("audible", { width: 120 * (width() / 614), height: 70 * (height() / 247) }),
            pos(wordList[0]),
            origin("center"),
            area(),
            {
                x: 0,
                isPressed: false,
                hasAns: false
            }
        ])

        add([
            "word",
            sprite("contradict", { width: 110 * (width() / 614), height: 60 * (height() / 247) }),
            pos(wordList[1]),
            origin("center"),
            area(),
            {
                x: 1,
                isPressed: false,
                hasAns: false
            }
        ])

        add([
            "word",
            sprite("manufacture", { width: 90 * (width() / 614), height: 45 * (height() / 247) }),
            pos(wordList[2]),
            origin("center"),
            area(),
            rotate(15),
            {
                x: 2,
                isPressed: false,
                hasAns: false
            }
        ])

        add([
            "word",
            sprite("prescribe", { width: 110 * (width() / 614), height: 60 * (height() / 247) }),
            pos(wordList[3]),
            origin("center"),
            area(),
            rotate(8),
            {
                x: 3,
                isPressed: false,
                hasAns: false
            }
        ])

        add([
            "word",
            sprite("incredible", { width: 95 * (width() / 614), height: 60 * (height() / 247) }),
            pos(wordList[4]),
            origin("center"),
            area(),
            {
                x: 4,
                isPressed: false,
                hasAns: false
            }
        ])

        add([
            "word",
            sprite("except", { width: 85 * (width() / 614), height: 40 * (height() / 247) }),
            pos(wordList[5]),
            origin("center"),
            area(),
            {
                x: 5,
                isPressed: false,
                hasAns: false
            }
        ])

        add([
            "word",
            sprite("spectator", { width: 95 * (width() / 614), height: 60 * (height() / 247) }),
            pos(wordList[6]),
            origin("center"),
            rotate(-10),
            area(),
            {
                x: 6,
                isPressed: false,
                hasAns: false
            }
        ])

        add([
            "word",
            sprite("tenable", { width: 95 * (width() / 614), height: 50 * (height() / 247) }),
            pos(wordList[7]),
            origin("center"),
            rotate(10),
            area(),
            {
                x: 7,
                isPressed: false,
                hasAns: false
            }
        ])

        add([
            "word",
            sprite("transfer", { width: 95 * (width() / 614), height: 60 * (height() / 247) }),
            pos(wordList[8]),
            origin("center"),
            rotate(8),
            area(),
            {
                x: 8,
                isPressed: false,
                hasAns: false
            }
        ])

        add([
            "word",
            sprite("submit", { width: 95 * (width() / 614), height: 50 * (height() / 247) }),
            pos(wordList[9]),
            origin("center"),
            area(),
            {
                x: 9,
                isPressed: false,
                hasAns: false
            }
        ])
    }

    initGame2()

    const label = add([
        text(getTime()),
        pos(230 * (width() / 614), 4 * (height() / 247)),
        scale(0.5 * (width() / 614), 0.5 * (height() / 247)),
        gamePause = false
    ])

    label.onUpdate(() => {
        if (!gamePause) {
            gameTime += Math.trunc(dt() * 1000)
        }
        label.text = getTime()
    })

    onUpdate("word", (word) => {
        if (word.isPressed) {
            word.use(pos(mousePos()))
            if (isMouseDown("left")) {
                if (mousePos().x > meanList[wordAndMeanDic[word.x]].x - 25 * (width() / 614) &&
                    mousePos().x < meanList[wordAndMeanDic[word.x]].x + 25 * (width() / 614) &&
                    mousePos().y > meanList[wordAndMeanDic[word.x]].y - 15 * (height() / 247) &&
                    mousePos().y < meanList[wordAndMeanDic[word.x]].y + 15 * (height() / 247)) {
                    word.hasAns = true
                    word.isPressed = false
                    hasWordControl = false
                    play("right")
                    rightNum++
                    if (rightNum >= 10) {
                        gamePause = true
                        addText(0, 42 * (width() / 614), 24 * (width() / 614), 48 * (height() / 247), label.text)
                        addButton("Into End", vec2(320 * (width() / 614), 210 * (height() / 247)), () => go("gameEnd", label.text))
                        return
                    }
                } else {
                    hasWordControl = false
                    word.isPressed = false
                    play("wrong")
                    word.use(pos(wordList[word.x]))
                }
            }
        }
    })

    onClick("word", (word) => {
        if (!hasWordControl && !word.hasAns) {
            wait(0.1, () => {
                hasWordControl = true
                word.isPressed = true
            })
        }
    })
})

scene("gameEnd", (labelText) => {
    add([
        sprite("end", { width: width(), height: height() }),
        scale(1),
        z(-1)
    ])

    addText(0, 42 * (width() / 614), 24 * (width() / 614), 48 * (height() / 247), labelText)
    addButton("Restart", vec2(320 * (width() / 614), 210 * (height() / 247)), () => go("gameBegin"))
})

go("gameBegin")
bgmSound.play()
    // debug.log(width())
    // debug.log(height())