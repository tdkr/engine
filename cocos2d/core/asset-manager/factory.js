/****************************************************************************
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
const Bundle = require('./bundle');

function createTexture (id, data, options, onComplete) {
    let out = null, err = null;
    try {
        out = new cc.Texture2D();
        out._uuid = id;
        out._nativeUrl = id;
        out._nativeAsset = data;
    }
    catch (e) {
        err = e;
    }
    onComplete && onComplete(err, out);
}

function createAudioClip (id, data, options, onComplete) {
    let out = new cc.AudioClip();
    out._uuid = id;
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete && onComplete(null, out);
}

function createJsonAsset (id, data, options, onComplete) {
    let out = new cc.JsonAsset();
    out._uuid = id;
    out.json = data;
    onComplete && onComplete(null, out);
}

function createTextAsset (id, data, options, onComplete) {
    let out = new cc.TextAsset();
    out._uuid = id;
    out.text = data;
    onComplete && onComplete(null, out);
}

function createFont (id, data, options, onComplete) {
    let out = new cc.TTFFont();
    out._uuid = id;
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete && onComplete(null, out);
}

function createBufferAsset (id, data, options, onComplete) {
    let out = new cc.BufferAsset();
    out._uuid = id;
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete && onComplete(null, out);
}

function createAsset (id, data, options, onComplete) {
    let out = new cc.Asset();
    out._uuid = id;
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete && onComplete(null, out);
}

function createBundle (id, data, options, onComplete) {
    let bundle = new Bundle();
    data.base = data.base || id + '/';
    bundle.init(data);
    onComplete && onComplete(null, bundle);
}

const factory = {

    register (type, handler) {
        if (typeof type === 'object') {
            cc.js.mixin(producers, type);
        }
        else {
            producers[type] = handler;
        }
    },

    create (id, data, type, options, onComplete) {
        var func = producers[type] || producers['default'];
        func(id, data, options, onComplete);
    }
};

const producers = {
    // Images
    '.png' : createTexture,
    '.jpg' : createTexture,
    '.bmp' : createTexture,
    '.jpeg' : createTexture,
    '.gif' : createTexture,
    '.ico' : createTexture,
    '.tiff' : createTexture,
    '.webp' : createTexture,
    '.image' : createTexture,
    '.pvr': createTexture,
    '.pkm': createTexture,

    // Audio
    '.mp3' : createAudioClip,
    '.ogg' : createAudioClip,
    '.wav' : createAudioClip,
    '.m4a' : createAudioClip,

    // Txt
    '.txt' : createTextAsset,
    '.xml' : createTextAsset,
    '.vsh' : createTextAsset,
    '.fsh' : createTextAsset,
    '.atlas' : createTextAsset,

    '.tmx' : createTextAsset,
    '.tsx' : createTextAsset,
    '.fnt' : createTextAsset,

    '.json' : createJsonAsset,
    '.ExportJson' : createJsonAsset,

    // font
    '.font' : createFont,
    '.eot' : createFont,
    '.ttf' : createFont,
    '.woff' : createFont,
    '.svg' : createFont,
    '.ttc' : createFont,

    // Binary
    '.binary': createBufferAsset,
    '.bin': createBufferAsset,
    '.dbbin': createBufferAsset,
    '.skel': createBufferAsset,

    'bundle': createBundle,

    'default': createAsset

};

module.exports = factory;