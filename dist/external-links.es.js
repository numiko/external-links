// lib/external-links.ts
var e = class {
	constructor(e = [], t = {}) {
		this.options = {
			openPDFNewTab: !0,
			classList: ["external-link"],
			icon: null,
			...t
		}, this.links = e, this.addAttributesToLinks(this.links);
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
	matchDomain(e, t = window.location.host) {
		let n;
		try {
			n = new URL(e).host;
		} catch {
			return !1;
		}
		return n.toLowerCase() === t.toLowerCase() || n.toLowerCase().endsWith("." + t.toLowerCase());
	}
};
export { e as ExternalLinks };
