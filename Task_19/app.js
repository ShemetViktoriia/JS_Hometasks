'use strict';

const KEY = 'stickers';
const STICKER_START_SIZE = { width: 200, height: 150 };
const STICKER_START_POSITION = { left: 50, top: 50 };

const stock = new Storage(KEY);

const $field = $('#field');
const $stickerTemplate = $('#stickerTemplate');
const $textArea = $('.textarea');

let stickerList = [];
let dialog, form,
    description = $("#description"),
    tips = $(".validateTips");

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
        .width(sticker.size.width)
        .height(sticker.size.height)
        .draggable({
            cancel: "text",
            start: function () {
                $textArea.focus();
            },
            stop: function (event, ui) {
                $textArea.focus();
                updateSticker(sticker.id, 'position', ui.position);
                saveState();
            }
        })
        .resizable({
            maxHeight: 2 * STICKER_START_SIZE.height,
            maxWidth: 2 * STICKER_START_SIZE.width,
            minHeight: STICKER_START_SIZE.height,
            minWidth: STICKER_START_SIZE.width,
            animate: true,
            resize: function (event, ui) {
                updateSticker(sticker.id, 'size', ui.size);
                saveState();
            }
        })
        .css({
            'background-color': 'lightblue',
            'border-color': 'black',
            'border-width': '2px',
            'border-style': 'solid',
            'padding': '3px'
        })
        .offset(sticker.position)
        .appendTo($field)
        .on("input", function (event) {
            updateSticker(sticker.id, 'description', $(event.target).val());
            saveState();
        });
};

function getNoteHtml(sticker) {
    return $stickerTemplate
        .html()
        .replace('{{description}}', sticker.description);
}

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
        size: STICKER_START_SIZE,
        position: STICKER_START_POSITION
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