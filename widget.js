class WidgetBase {
    constructor(params) {
        this.width = params && params.width || 400
        this.height = params && params.height || 300
        this.x = params && params.x || 0
        this.y = params && params.y || 0
        this.visible = params && params.visible || true
        this.color = params && params.color || "#fff"
    }

    setAttr = function(name, value) {
        this[name] = value
    }

    getAttr = function(name) {
        return this[name]
    }
}

class WidgetPanel extends WidgetBase {
    constructor(params) {
        super(params)
        this.createPanel()
    }

    createPanel = function() {
        let div = document.createElement('DIV')
        let main = document.getElementById("main")
        div.style.width = this.width + "px"
        div.style.height = this.height + "px"
        div.style.backgroundColor = "#034AA4"
        div.style.opacity = "0.8"
        div.style.position = "fixed"
        div.style.top = this.y + 'px'
        div.style.left = this.x + 'px'
        div.id = "widget-panel"
        div.addEventListener('click', (e) => {
            e.stopPropagation()
        })
        main.appendChild(div)
    }
}

class TextWidget extends WidgetBase {
    constructor(params) {
        super(params)
        this.font = params && params.font || "14px/19px 'body_font','Helvetica Neue',Helvetica,Arial,sans-serif;"
        this.text = params && params.text || ""
        this.align = params && params.align || "Left"
        this.clip_mode = params && params.clip_mode || "None"
        this.createText()
    }

    createText = function() {
        let p = document.createElement("P")
        let parent = document.getElementById("widget-panel") || document.getElementsByTagName("body")[0]
        p.innerText = this.text
        p.style.font = this.font
        p.style.color = this.color
        p.style.margin = 0
        p.style.width = this.width + "px" || "100%"
        p.style.position = 'absolute'
        p.style.left = this.x + 'px'
        p.style.top = this.y + 'px'

        if (this.align.includes("|")) {
            const props = this.align.split(" | ")
            props.forEach((prop) => {
                this.alignText(p, prop)
            })
        } else {
            this.alignText(p, this.align)
        }


        switch (this.clip_mode) {
            case 'NewLine':
                // Did not understand what different with "None"
                break
            case 'Dots':
                p.style.textOverflow = "ellipsis"
                p.style.overflow = "hidden"
                p.style.whiteSpace = "nowrap"
                p.style.maxWidth = "100%"
                break
            case 'Cut':
                p.style.overflow = "hidden"
                p.style.whiteSpace = "nowrap"
                p.style.maxWidth = "100%"
        }

        this.p = p
        parent.appendChild(p)
    }

    alignText = function(p, prop) {
        switch (prop) {
            case 'Left':
                p.style.textAlign = "left"
                break
            case 'Right':
                p.style.textAlign = "right"
                break
            case 'Bottom':
                p.style.top = "auto"
                p.style.bottom = 0
                break
            case 'HCenter':
                p.style.textAlign = "center"
                break
            case 'VCenter':
                p.style.top = "50%"
                p.style.transform = "translateY(-50%)"
        }
    }

    textWidth = function() {
        return this.p.clientWidth
    }

    textHeight = function() {
        return this.p.clientHeight
    }
}

class WidgetImage extends WidgetBase {
    constructor(params) {
        super(params)
        this.bitmap = params && params.bitmap || "./src/icontexto.png"
        this.createImage()
    }

    createImage() {
        let img = document.createElement("IMG")
        let parent = document.getElementById("widget-panel") || document.getElementsByTagName("body")[0]
        img.src = this.bitmap
        img.width = this.width
        img.height = this.height
        img.style.position = "absolute"
        img.style.left = this.x + 'px'
        img.style.top = this.y + 'px'
        parent.appendChild(img)
    }
}

class WIdgetButton extends WidgetBase {
    constructor(params) {
        super(params)
        this.text = params && params.text || ""
        this.bitmap_normal = params && params.bitmap_normal || "./src/tick.png"
        this.bitmap_pressed = params && params.bitmap_pressed || "./src/remove.png"
        this.bitmap_disabled = params && params.bitmap_disabled || "./src/disabled.png"
        this.state = params && params.state || "state_normal"
        this.clickEvent = params && params.clickEvent || function() {}
        this.createButton()
    }

    createButton() {
        let button = document.createElement("INPUT")
        let parent = document.getElementById("widget-panel") || document.getElementsByTagName("body")[0]
        button.type = "button"
        button.style.width = this.width + 'px'
        button.style.height = this.height + 'px'
        button.value = this.text
        button.style.position = "absolute"
        button.style.left = this.x + 'px'
        button.style.top = this.y + 'px'
        button.style.backgroundImage = `url(${this.bitmap_normal})`
        button.style.backgroundSize = 'contain'
        button.style.backgroundRepeat = 'no-repeat'
        if (this.state === 'state_pressed') {
            button.style.backgroundImage = `url(${this.bitmap_pressed})`
        }
        if (this.state === 'state_disabled') {
            button.style.backgroundImage = `url(${this.bitmap_disabled})`
            button.style.pointerEvents = 'none'
        }
        button.addEventListener('mousedown', (e) => {
            button.style.backgroundImage = `url(${this.bitmap_pressed})`
        })
        button.addEventListener('mouseup', (e) => {
            button.style.backgroundImage = `url(${this.bitmap_normal})`
        })
        button.addEventListener('click', this.clickEvent)
        parent.appendChild(button)
    }
}