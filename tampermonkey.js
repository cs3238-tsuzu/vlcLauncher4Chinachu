// ==UserScript==
// @name         VLC launcher for Chinachu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Tsuzu
// @grant         GM_xmlhttpRequest
// @connect    localhost
// ==/UserScript==

const vlcLauncherAddr = "http://localhost:52145/launch";

function waitForElement(selector, callback) {
    'use strict';

    var element = document.querySelector(selector);

    if(element) {
        callback(element);
        return;
    }

    var observer = new MutationObserver(function(mutations) {
        var element = document.querySelector(selector);

        if(element) {
            callback(element);
            return;
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    return observer;
}

const urlGenerator = function(reg) {

    const ep = reg[1];
    var type = reg[2];
    const id = reg[3];

    if (type == "program") {
        if (chinachu.util.getProgramById(id)._isRecording) {
            type = "recording";
        }else {
            type = "recorded";
        }
    }

    var url = ep + "/api/" + type + "/" + id + "/watch.m2ts?ext=m2ts&amp;c%3Av=copy&amp;c%3Aa=copy";

    return url;
};

const fetchURL = function(target, url) {
    GM_xmlhttpRequest({
        url: target,
        method: 'post',
        headers: {
            'content-type': 'application/text',
        },
        data: JSON.stringify({
            URL: url,
        }),
        onerror: err => {
            alert("error occurred!");
            console.error(err);
        },
    });
};

const insert = (reg) => {
    return waitForElement("body > div.middle.extend.noside > div.main > div.main-body > div > div > div > div > footer", function(elm){
        if (document.querySelector("#vlc") != null) {
            return;
        }

        var button       = document.createElement ('button');
        var classAttr = document.createAttribute("class");

        button.setAttribute("class", "flagrate flagrate-button flagrate-button-color-green");
        button.setAttribute("type", "button");
        button.setAttribute("id", "vlc");

        button.innerHTML ='<span>VLC</span>';

        document.querySelector("body > div.middle.extend.noside > div.main > div.main-body > div > div > div > div > footer").appendChild(button);

        document.querySelector("#vlc").addEventListener (
            "click", function() {
                var url = urlGenerator(reg);

                fetchURL(vlcLauncherAddr, url);

            }, false
        );

    });

};

(function() {
    var observer;
    window.addEventListener("hashchange", ()=> {
        const regex = /(https?:\/\/.+)\/#!\/(channel|program)\/watch\/id=([^\/]+)\/?/;

        const reg = regex.exec(document.URL);

        if (reg == null) {
            if (observer != null) {
                observer.disconnect();
                observer = null;
            }

            return;
        }
        observer = insert(reg);
    }, false);
     const regex = /(https?:\/\/.+)\/#!\/(channel|program)\/watch\/id=([^\/]+)\/?/;

    const reg = regex.exec(document.URL);

    if (reg != null) {
        observer = insert(reg);
    }
})();
