// lib/external-links.ts
var e = class {
	constructor(e = [], t = {}) {
		if (this.baseDomain = null, this.options = {
			openPDFNewTab: !0,
			classList: ["external-link"],
			icon: null,
			...t ?? {}
		}, this.options.domain != null && this.options.domain !== "") {
			let e = this.options.domain.toLowerCase().trim();
			this.baseDomain = e.startsWith("www.") ? e.slice(4) : e;
		}
		this.links = e, this.addAttributesToLinks(this.links);
	}
	addAttributesToLinks(e) {
		for (let t of e) {
			let e = t.getAttribute("href") || "", n = this.getFileExtension(e) === "pdf";
			(this.isExternalLink(t) && !this.matchDomain(e) || n && this.options.openPDFNewTab) && (t.hasAttribute("target") || t.setAttribute("target", "_blank"), t.hasAttribute("aria-label") || t.setAttribute("aria-label", `${t.innerText.trim()} (Opens in new window)`), t.hasAttribute("rel") || t.setAttribute("rel", "noopener noreferrer"), t.classList.add(...this.options.classList), this.options.icon && t.insertAdjacentHTML("beforeend", this.options.icon));
		}
	}
	getFileExtension(e) {
		let t;
		try {
			t = new URL(e).pathname;
		} catch {
			t = e;
		}
		return t.slice((t.lastIndexOf(".") - 1 >>> 0) + 2);
	}
	isExternalLink(e) {
		return (e.protocol === "https:" || e.protocol === "http:") && location.hostname !== e.hostname && e.hostname.length > 0 && e.hostname.slice(0, 1) !== "/";
	}
	matchDomain(e, t) {
		let n;
		try {
			n = new URL(e).host.toLowerCase();
		} catch {
			return !1;
		}
		let r = (t ?? this.baseDomain ?? window.location.host).toLowerCase(), i = r.startsWith("www.") ? r.slice(4) : r, a = n.startsWith("www.") ? n.slice(4) : n;
		return a === i || a.endsWith("." + i);
	}
};
export { e as ExternalLinks };
