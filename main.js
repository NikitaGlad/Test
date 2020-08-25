(function() {
    let panelWidth = 400
    let panelHeight = 190
    let btnWidth = 180
    let btnHeight = 25
    let screenWidth = window.innerWidth
    let screenHeight = window.innerHeight

    let body = document.getElementsByTagName("body")[0]
    body.addEventListener('click', () => {
        let panel = document.getElementById("widget-panel")
        if (panel) panel.remove()
    })

    new WidgetPanel({
        width: panelWidth,
        height: panelHeight,
        x: (screenWidth - panelWidth) / 2,
        y: (screenHeight - panelHeight) / 2
    })

    new TextWidget({
        text: "I want to work with you!",
        align: 'HCenter',
        clip_mode: 'Dots',
        y: 10
    })

    new WidgetImage({
        width: panelWidth / 4,
        height: panelHeight / 2,
        x: (panelWidth - panelWidth / 4) / 2,
        y: (panelHeight - panelHeight / 2) / 2
    })

    new WIdgetButton({
        width: btnWidth,
        height: btnHeight,
        x: 10,
        y: panelHeight - btnHeight - 10,
        text: 'Unblock',
        clickEvent: openSecondPopup
    })

    new WIdgetButton({
        width: btnWidth,
        height: btnHeight,
        x: panelWidth - btnWidth - 10,
        y: panelHeight - btnHeight - 10,
        text: 'Cancel',
        clickEvent: closePopup
    })

    function openSecondPopup() {
        body.click()
        createSecondPopup()
    }

    function closePopup() {
        body.click()
    }

    // SECOND POPUP
    function createSecondPopup() {
        new WidgetPanel({
            width: panelWidth,
            height: panelHeight,
            x: (screenWidth - panelWidth) / 2,
            y: (screenHeight - panelHeight) / 2
        })

        new TextWidget({
            text: "Congratulation!!!",
            align: 'HCenter | VCenter'
        })

        new WIdgetButton({
            width: btnWidth,
            height: btnHeight,
            x: panelWidth / 2 - btnWidth / 2,
            y: panelHeight - btnHeight - 10,
            text: 'It is cool',
            clickEvent: closePopup
        })
    }
})()
