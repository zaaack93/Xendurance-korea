function CopyLinkToClipboard(e) {
    var t = document.getElementById(e);
    return null != t && (t.select(), document.execCommand("copy"), alert("The link has been copied to your clipboard.")), !1
}

function getUrlParameter(e) {
    var t = RegExp("[\\?&]" + (e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")) + "=([^&#]*)").exec(location.search);
    return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
}

function getCookie(e) {
    for (var t = e + "=", r = decodeURIComponent(document.cookie).split(";"), n = 0; n < r.length; n++) {
        for (var o = r[n];
            " " == o.charAt(0);) o = o.substring(1);
        if (0 == o.indexOf(t)) {
            if ("ReferralName" == e) return o.substring(t.length, o.length);
            return o.substring(t.length, o.length).replace(" ", "+")
        }
    }
    return ""
}

function buildReplicatedCookie() {
    var e = window.location.hostname,
        t = "",
        r = !0;
    if (t = e.split(".").length > 2 ? e.substring(e.indexOf(".") + 1) : e, getUrlParameter("ref")) {
        "" != t && "myshopify.com" != t ? (document.cookie = "ReferralToken=; expires=Thu, 1 Jan 1970 12:00:00 UTC; path=/", document.cookie = "ReferralToken=" + getUrlParameter("ref") + ";domain=" + t + ";path=/;") : document.cookie = "ReferralToken=" + getUrlParameter("ref") + ";path=/;";
        try {
            jQuery.post("/cart/update.js", "attributes[Referrer]=" + encodeURIComponent(getUrlParameter("ref")), null, "json")
        } catch (n) {}
        r = !1
    }
    if ("" == getCookie("fs_prt") && getUrlParameter("prt")) {
        var o = new Date;
        o.setFullYear(o.getFullYear() + 10);
        var e = window.location.hostname,
            t = "";
        "" != (t = e.split(".").length > 2 ? e.substring(e.indexOf(".") + 1) : e) && "myshopify.com" != t ? document.cookie = "fs_prt=" + getUrlParameter("prt") + ";domain=" + t + ";path=/; expires=" + o.toUTCString() : document.cookie = "fs_prt=" + getUrlParameter("prt") + ";path=/; expires=" + o.toUTCString()
    }
    if ("" == getCookie("ReferralToken") && "" != getCookie("fs_prt")) {
        "" != t && "myshopify.com" != t ? document.cookie = "ReferralToken=" + getCookie("fs_prt") + ";domain=" + t + ";path=/;" : document.cookie = "ReferralToken=" + getCookie("fs_prt") + ";path=/;";
        try {
            jQuery.post("/cart/update.js", "attributes[Referrer]=" + encodeURIComponent(getCookie("fs_prt")), null, "json")
        } catch (a) {}
        r = !1
    }
    if (r) {
        var i = getCookie("ReferralToken");
        if ("" != i) try {
            jQuery.post("/cart/update.js", "attributes[Referrer]=" + encodeURIComponent(i), null, "json")
        } catch (l) {}
    }
    return !0
}

function clearReplicatedCookie(e, t, r, n, o, a) {
    var i = new Date("1/1/1970 00:00:01"),
        l = window.location.hostname,
        s = "";
    "" != (s = l.split(".").length > 2 ? l.substring(l.indexOf(".") + 1) : l) && "myshopify.com" != s ? document.cookie = "ReferralToken=;domain=" + s + ";path=/; expires=" + i.toUTCString() : document.cookie = "ReferralToken=;path=/; expires=" + i.toUTCString(), document.cookie = "ReferralName=;path=/; expires=" + i.toUTCString();
    var f = document.getElementById(n);
    f && (f.innerHTML = ""), "" != e && "" != r && "" != o && displayDynamicContent(e, r, o, a);
    try {
        jQuery.post("/cart/update.js", "attributes[Referrer]=", null, "json")
    } catch (p) {}
}

function displayDynamicContent(siteURL, contentCode, outputDiv, scriptID) {
    var pageRequest;
    if (window.XMLHttpRequest) pageRequest = new XMLHttpRequest;
    else {
        if (!window.ActiveXObject) return !1;
        pageRequest = new ActiveXObject("Microsoft.XMLHTTP")
    }
    return pageRequest.onreadystatechange = function () {
        var MyObject;
        if (4 == pageRequest.readyState) {
            (MyObject = document.getElementById(outputDiv)).innerHTML = "", MyObject.innerHTML = pageRequest.responseText.replace('Help us credit your order by letting us know who referred you to our site!','Help us credit your order by letting us know who referred you to our site.');
            var myScript = document.getElementById(scriptID);
            myScript && eval(myScript.innerText)
        }
    }, pageRequest.open("GET", "https://" + siteURL + "/MemberToolsDotNet/ExternalIntegration/Shopify/GetDynamicContent.aspx?ID=" + encodeURIComponent(getCookie("ReferralToken")) + "&Source=" + encodeURIComponent(getSourcePage()) + "&Code=" + encodeURIComponent(contentCode), !0), pageRequest.send(null), !0
}

function displayReplicatedInfo(siteURL, contentCode, outputDiv) {
    if ("" != getCookie("ReferralToken")) {
        var pageRequest;
        if (window.XMLHttpRequest) pageRequest = new XMLHttpRequest;
        else {
            if (!window.ActiveXObject) return !1;
            pageRequest = new ActiveXObject("Microsoft.XMLHTTP")
        }
        pageRequest.onreadystatechange = function () {
            var MyObject;
            if (4 == pageRequest.readyState) {
                (MyObject = document.getElementById(outputDiv)).innerHTML = "", MyObject.innerHTML = pageRequest.responseText;
                var refName = pageRequest.getResponseHeader("fs-refname");
                if (refName) {
                    if ("," != refName.trim()) {
                        document.cookie = "ReferralName=" + refName + ";path=/;";
                        var lookup = document.getElementById("referrerLookup");
                        lookup && (lookup.value = refName)
                    } else document.cookie = "ReferralName=;path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
                } else document.cookie = "ReferralName=;path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                var myScript = document.getElementById("hp1");
                myScript && eval(myScript.innerText)
            }
        }, pageRequest.open("GET", "https://" + siteURL + "/MemberToolsDotNet/ExternalIntegration/Shopify/GetReplicatedContent.aspx?ID=" + encodeURIComponent(getCookie("ReferralToken")) + "&Source=" + encodeURIComponent(getSourcePage()) + "&Code=" + encodeURIComponent(contentCode), !0), pageRequest.send(null)
    } else document.cookie = "ReferralName=;path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    return !0
}

function getSourcePage() {
    var e = "";
    return window.location.pathname
}

function lookupReferrers(e, t, r) {
    if (window.XMLHttpRequest) n = new XMLHttpRequest;
    else {
        if (!window.ActiveXObject) return !1;
        n = new ActiveXObject("Microsoft.XMLHTTP")
    }
    var n, o, a, i, l = document.getElementById(t).value;
    l.length >= 1 ? (n.onreadystatechange = function () {
        var e;
        if (4 == n.readyState) {
            e = document.getElementById(r);
            var t = document.createElement("div");
            t.id = "injRefCont", t.style = "position: absolute; overflow-y:auto; z-index: 9999; width: 100% !important; background-color:white; right: 0; top: 0; border: 1px solid #949494; margin - right: 15px; overflow - y: auto; height: 300px; box - shadow: 5px 5px 12px rgba(186, 186, 186, 0.62);", t.innerHTML = n.responseText, e.innerHTML = "", e.appendChild(t)
        }
    }, o = "" != getCookie("ReferralToken") ? getCookie("ReferralToken") : "", a = document.getElementById("zipCodeFilter") ? document.getElementById("zipCodeFilter").value : "", i = window.location.href.indexOf("/checkouts") > -1 ? -1 : 0, "" != a ? (n.open("GET", "https://" + e + "/MemberToolsDotNet/ExternalIntegration/Shopify/GetReferrerList.aspx?ID=" + encodeURIComponent(o) + "&s=" + encodeURIComponent(l) + "&z=" + encodeURIComponent(a) + "&c=" + encodeURIComponent(i), !0), n.send(null)) : (n.open("GET", "https://" + e + "/MemberToolsDotNet/ExternalIntegration/Shopify/GetReferrerList.aspx?ID=" + encodeURIComponent(o) + "&s=" + encodeURIComponent(l) + "&c=" + encodeURIComponent(i), !0), n.send(null))) : document.getElementById(r).innerHTML = "&nbsp;"
}

function lookupReferrersHeader(e, t, r, n) {
    if (window.XMLHttpRequest) o = new XMLHttpRequest;
    else {
        if (!window.ActiveXObject) return !1;
        o = new ActiveXObject("Microsoft.XMLHTTP")
    }
    var o, a = document.getElementById(t).value;
    a.length >= 1 ? (o.onreadystatechange = function () {
        var e;
        4 == o.readyState && ((e = document.getElementById(r)).innerHTML = "", e.innerHTML = o.responseText)
    }, o.open("GET", "https://" + e + "/MemberToolsDotNet/ExternalIntegration/Shopify/GetReferrerListLight.aspx?s=" + encodeURIComponent(a) + "&d=" + encodeURIComponent(r) + "&od=" + encodeURIComponent(n), !0), o.send(null)) : document.getElementById(r).innerHTML = "&nbsp;"
}

function updateReferrer(e, t, r) {
    if ("" != e) {
        var n, o, a = window.location.hostname,
            i = "";
        "" != (i = a.split(".").length > 2 ? a.substring(a.indexOf(".") + 1) : a) && "myshopify.com" != i ? document.cookie = "ReferralToken=" + e + ";domain=" + i + ";path=/;" : document.cookie = "ReferralToken=" + e + ";path=/;"
    }
    displayReplicatedInfo(t, "HEADER", "replicatedInfo"), document.getElementById("referrer").value = e, "partyList" != r && "referredPartyList" != r && (document.getElementById(r).innerHTML = "&nbsp;"), document.getElementById("zipCodeFilter").value = "", jQuery.post("/cart/update.js", "attributes[Referrer]=" + encodeURIComponent(e));
    var l = getCookie("ReferralName");
    if (l && "," != l.trim() ? document.getElementById("referrerLookup").value = l : document.getElementById("referrerLookup").value = "", n = document.getElementById("fsReferButtonYesLabel"), o = document.getElementById("fsReferButtonNoLabel"), n && o && (n.style.display = "none", o.style.display = "none"), document.getElementById("referrerLookup").required = !1, "referredPartyList" == r || "referrerList" == r) {
        var s = document.getElementById("referredPartyListWrapper"),
            f = document.getElementById("referredPartyList"),
            p = document.getElementById("referrerPartyListLabel");
        if (s && f) {
            s.style.display = "block", populateParties(t, "referredPartyList"), p && (p.style.display = "block");
            var d = document.getElementById("referrerContainer");
            d && (d.style.display = "block")
        }
    }
    setTimeout(()=>{
        displayDynamicContent('shopxnd.com', 'REFERRER_BLOCK', 'referrerInjection', 'refManFuncs');
    },1000)
}

function updateReferrerCheckout(e, t, r) {
    if ("" != e) {
        var n, o, a = window.location.hostname,
            i = "";
        "" != (i = a.split(".").length > 2 ? a.substring(a.indexOf(".") + 1) : a) && "myshopify.com" != i ? document.cookie = "ReferralToken=" + e + ";domain=" + i + ";path=/;" : document.cookie = "ReferralToken=" + e + ";path=/;"
    }
    try {
        jQuery.post("/cart/update.js", "attributes[Referrer]=" + encodeURIComponent(e), null, "json")
        displayDynamicContent('shopxnd.com', 'REFERRER_BLOCK', 'referrerInjection', 'refManFuncs');
    } catch (l) {}
    var s = getCookie("ReferralName");
    if (s && "," != s.trim() ? document.getElementById("referrerLookup").value = s : document.getElementById("referrerLookup").value = "", n = document.getElementById("fsReferButtonYesLabel"), o = document.getElementById("fsReferButtonNoLabel"), n && o && (n.style.display = "none", o.style.display = "none"), document.getElementById("referrerLookup").required = !1, "referredPartyList" == r || "referrerList" == r) {
        var f = document.getElementById("referredPartyListWrapper"),
            p = document.getElementById("referredPartyList"),
            d = document.getElementById("referrerPartyListLabel");
        if (f && p) {
            f.style.display = "block", populateParties(t, "referredPartyList"), d && (d.style.display = "block");
            var u = document.getElementById("referrerContainer");
            u && (u.style.display = "block")
        }
    }
}

function updateReferrerHeader(e, t, r, n) {
    if ("" != e) {
        var o = window.location.hostname,
            a = "";
        "" != (a = o.split(".").length > 2 ? o.substring(o.indexOf(".") + 1) : o) && "myshopify.com" != a ? document.cookie = "ReferralToken=" + e + ";domain=" + a + ";path=/;" : document.cookie = "ReferralToken=" + e + ";path=/;", jQuery.post("/cart/update.js", "attributes[Referrer]=" + encodeURIComponent(e))
    }
    var i = document.getElementById(r);
    i && (i.innerHTML = ""), displayReplicatedInfo(t, "HEADER", "replicatedInfo"), "" != n && window.location.replace(n)
}

function populateNoteAttribute() {
    if ("" != getCookie("ReferralToken")) {
        document.getElementById("referrer").value = getCookie("ReferralToken");
        try {
            jQuery.post("/cart/update.js", "attributes[Referrer]=" + encodeURIComponent(getCookie("ReferralToken")), null, "json")
        } catch (e) {}
    }
}

function startEnrollment(e, t) {
    window.location.replace("https://" + e + "/MemberToolsDotNet/ExternalIntegration/Shopify/StartReferredShopifyEnrollment.aspx?ID=" + encodeURIComponent(getCookie("ReferralToken")) + "&EnrollmentCode=" + t)
}

function hP(e) {
    var t = document.getElementById(e);
    t && (t.style = "display: none")
}

function manageRefFields() {
    if ("" != getCookie("ReferralToken") && "" != getCookie("ReferralName") && "," != getCookie("ReferralName")) {
        document.getElementById("referrerContainer").style = "display: none", document.getElementById("shoppingWithContainer").style = "display: block";
        var e = getCookie("ReferralName");
        e && "," != e ? document.getElementById("shoppingWithLabel").innerText = e : document.getElementById("shoppingWithLabel").innerText = "", document.getElementById("fsReferButtonNo").required = !1, document.getElementById("referrerLookup").required = !1
    } else document.getElementById("referrerContainer").style = "display: block", document.getElementById("shoppingWithContainer").style = "display: none"
}

function fsReferrerNo() {
    document.getElementById("fsReferButtonNo") && (document.getElementById("fsReferButtonNo").required = !1), document.getElementById("referrerLookup") && (document.getElementById("referrerLookup").required = !1), document.getElementById("fsReferButtonNoLabel") && (document.getElementById("fsReferButtonNoLabel").className = "fsButtonActive"), document.getElementById("fsReferButtonYesLabel") && (document.getElementById("fsReferButtonYesLabel").className = "fsButtonInactive"), document.getElementById("referrerLookupSection") && (document.getElementById("referrerLookupSection").style = "display: none"), document.getElementById("referrerList") && (document.getElementById("referrerList").innerHTML = "&nbsp;"), document.getElementById("referrerLookup") && (document.getElementById("referrerLookup").value = ""), document.getElementById("zipCodeFilter") && (document.getElementById("zipCodeFilter").value = "")
}

function fsReferrerYes() {
    document.getElementById("fsReferButtonNo") && (document.getElementById("fsReferButtonNo").required = !1), document.getElementById("referrerLookup") && (document.getElementById("referrerLookup").required = !0), document.getElementById("fsReferButtonNoLabel") && (document.getElementById("fsReferButtonNoLabel").className = "fsButtonInactive"), document.getElementById("fsReferButtonYesLabel") && (document.getElementById("fsReferButtonYesLabel").className = "fsButtonActive"), document.getElementById("referrerLookupSection") && (document.getElementById("referrerLookupSection").style = "display: block"), document.getElementById("fsReferButtonNo") && document.getElementById("fsReferButtonNo").setCustomValidity("")
}

function checkStoreAuth(e) {
    var t, r;
    if (t = "" != getCookie("ReferralToken") ? getCookie("ReferralToken") : "", window.XMLHttpRequest) r = new XMLHttpRequest;
    else {
        if (!window.ActiveXObject) return !1;
        r = new ActiveXObject("Microsoft.XMLHTTP")
    }
    return r.onreadystatechange = function () {
        if (4 == r.readyState) {
            var e = r.getResponseHeader("fs-authurl");
            e && "" != e && window.location.replace(e)
        }
    }, r.open("GET", "https://" + siteURL + "/MemberToolsDotNet/ExternalIntegration/Shopify/CheckStoreAuth.aspx?ID=" + encodeURIComponent(t) + "&cid=" + encodeURIComponent(e), !0), r.send(null), !0
}

function populateParties(e, t) {
    if ("" != getCookie("ReferralToken")) {
        var r;
        if (window.XMLHttpRequest) r = new XMLHttpRequest;
        else {
            if (!window.ActiveXObject) return !1;
            r = new ActiveXObject("Microsoft.XMLHTTP")
        }
        r.onreadystatechange = function () {
            var e;
            4 == r.readyState && ((e = document.getElementById(t)).innerHTML = "", e.innerHTML = r.responseText)
        }, r.open("GET", "https://" + e + "/MemberToolsDotNet/ExternalIntegration/Shopify/GetPartyList.aspx?ID=" + encodeURIComponent(getCookie("ReferralToken")), !0), r.send(null)
    }
    return !0
}

function restorePermanentReferrer() {}
buildReplicatedCookie();