'use strict';

const KEY = 'stickers';
const STICKER_START_WIDTH = 200;
const STICKER_START_HEIGHT = 150;
const STICKER_START_OFFSET = { top: 100, left: 40 };

const stock = new Storage(KEY);
const $field = $('#field');
const $stickerTemplate = $('#stickerTemplate');

let stickerList = [];

init();

function init() {
    restoreState();
    renderList();
}

function restoreState() {
    stickerList = stock.get();
    stickerList = stickerList ? JSON.parse(stickerList) : [];
}

function renderList() {
    stickerList.forEach(renderSticker);
}

function renderSticker(sticker) {
    $(getNoteHtml(sticker))
        .width(sticker.width)
        .height(sticker.height)
        .draggable({
            cancel: "text",
            start: function () {
                $('.textarea').focus();
            },
            stop: function () {
                $('.textarea').focus();

            }
        })
        .resizable({
            maxHeight: 2 * STICKER_START_HEIGHT,
            maxWidth: 2 * STICKER_START_WIDTH,
            minHeight: STICKER_START_HEIGHT,
            minWidth: STICKER_START_WIDTH,
            animate: true,
            stop: function (event, ui) {
                updateSticker(sticker.id, 'width', ui.size.width);
                updateSticker(sticker.id, 'height', ui.size.height);
                saveState();
            }
        })
        .css({
            'background-color': 'yellow',
            'border-color': 'black',
            'border-width': '1px',
            'border-style': 'solid'
        })
        .offset(STICKER_START_OFFSET)
        .appendTo($field);
};

function getNoteHtml(sticker) {
    return $stickerTemplate
        .html()
        .replace('{{description}}', sticker.description);
}

let dialog, form,
    description = $("#description"),
    tips = $(".validateTips");

$('#addStickerBtn').on("click", function () {
    dialog.dialog("open");
});

$('#clearAllBtn').on("click", clearAll);

dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 250,
    width: 400,
    modal: true,
    buttons: {
        Add: addSticker,
        Cancel: function () {
            dialog.dialog("close");
        }
    },
    close: function () {
        form[0].reset();
    }
});

form = dialog.find("form").on("submit", function (event) {
    event.preventDefault();
    addSticker();
});

function clearAll() {
    stickerList = [];
    stock.save(stickerList);
    $field.html('');
}

function addSticker() {
    var valid = true;
    valid = valid && checkLength(description, "description", 1, 100);

    if (valid) {
        createSticker();
        dialog.dialog("close");
    }
    return valid;
}

function createSticker() {
    const sticker = {
        id: Date.now(),
        description: description.val(),
        width: STICKER_START_WIDTH,
        height: STICKER_START_HEIGHT
    };

    stickerList.push(sticker);
    saveState();
    renderSticker(sticker);
}

function saveState() {
    stock.save(stickerList);
}

function checkLength(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
        o.addClass("ui-state-error");
        updateTips("Length of " + n + " must be between " +
            min + " and " + max + ".");
        return false;
    } else {
        return true;
    }
}

function updateTips(t) {
    tips
        .text(t)
        .addClass("ui-state-highlight");
    setTimeout(function () {
        tips.removeClass("ui-state-highlight", 1500);
    }, 500);
}

function updateSticker(id, name, value) {
    const sticker = stickerList.find(el => el.id == id);
    sticker[name] = value;
}