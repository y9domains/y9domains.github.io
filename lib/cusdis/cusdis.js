window.CUSDIS = {
    powered_by: '评论由 Cusdis 提供',
    post_comment: '发送',
    loading: '加载中',
  
    // comment
    email: '邮箱地址 (可选)',
    nickname: '昵称',
    reply_placeholder: '回复内容...',
    reply_btn: '回复',
    sending: '发送中...',
  
    // reply
    mod_badge: '管理员',
    content_is_required: '内容不能为空',
    nickname_is_required: '昵称不能为空',
  
    comment_has_been_sent:
      '评论已发送，管理员审核通过后会展示',
};
let e;

function t(t) {
    return e || (e = document.createElement("iframe"), function (e, t) {
        const s = window.matchMedia("(prefers-color-scheme: dark)"),
            d = d => {
                try {
                    const i = JSON.parse(d.data);
                    if ("cusdis" === i.from) switch (i.event) {
                        case "onload":
                            "auto" === t.dataset.theme && n("setTheme", s.matches ? "dark" : "light");
                            break;
                        case "resize":
                            e.style.height = i.data + "px"
                    }
                } catch (i) {}
            };

        function i(e) {
            const s = e.matches;
            "auto" === t.dataset.theme && n("setTheme", s ? "dark" : "light")
        }
        window.addEventListener("message", d), s.addEventListener("change", i)
    }(e, t)), e.srcdoc = (e => {
        const t = e.dataset.host || "https://cusdis.com",
            n = `https://www.y9.network/lib/cusdis/iframe.umd.js`;
        return `<!DOCTYPE html>\n<html>\n  <head>\n    <link rel="stylesheet" href="${t}/js/style.css">\n    <base target="_parent" />\n    <link>\n    <script>\n      window.CUSDIS_LOCALE = ${JSON.stringify(window.CUSDIS_LOCALE)}\n      window.__DATA__ = ${JSON.stringify(e.dataset)}\n    <\/script>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script src="${n}" type="module">\n      \n    <\/script>\n  </body>\n</html>`
    })(t), e.style.width = "100%", e.style.border = "0", e
}

function n(t, n) {
    e && e.contentWindow.postMessage(JSON.stringify({
        from: "cusdis",
        event: t,
        data: n
    }))
}

function s(e) {
    if (e) {
        e.innerHTML = "";
        const n = t(e);
        e.appendChild(n)
    }
}

function d() {
    let e;
    window.cusdisElementId ? e = document.querySelector(`#${window.cusdisElementId}`) : document.querySelector("#cusdis_thread") ? e = document.querySelector("#cusdis_thread") : document.querySelector("#cusdis") && (console.warn("id `cusdis` is deprecated. Please use `cusdis_thread` instead"), e = document.querySelector("#cusdis")), !0 === window.CUSDIS_PREVENT_INITIAL_RENDER || e && s(e)
}
window.renderCusdis = s, window.CUSDIS.renderTo = s, window.CUSDIS.setTheme = function (e) {
    n("setTheme", e)
}, window.CUSDIS.initial = d, d();