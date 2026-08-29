export function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="text-xl font-bold text-primary">Ceche</a>
            <p className="mt-2 text-sm text-muted-foreground">
              Know what&apos;s available. Know what it&apos;s worth. Own it first.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://x.com/nekwasar" className="text-muted-foreground hover:text-primary text-sm">X</a>
              <a href="https://linkedin.com/company/nekwasar" className="text-muted-foreground hover:text-primary text-sm">LinkedIn</a>
              <a href="https://github.com/nekwasar" className="text-muted-foreground hover:text-primary text-sm">GitHub</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="/platform/domain-appraiser" className="text-sm text-muted-foreground hover:text-primary">Appraiser</a></li>
              <li><a href="/platform/domain-scanner" className="text-sm text-muted-foreground hover:text-primary">Scanner</a></li>
              <li><a href="/platform/domain-marketplace" className="text-sm text-muted-foreground hover:text-primary">Marketplace</a></li>
              <li><a href="/platform/intelligence-profile" className="text-sm text-muted-foreground hover:text-primary">Intelligence</a></li>
              <li><a href="/platform/name-suggestions" className="text-sm text-muted-foreground hover:text-primary">Suggestions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/resources/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</a></li>
              <li><a href="/resources/guides" className="text-sm text-muted-foreground hover:text-primary">Guides</a></li>
              <li><a href="/resources/help-center" className="text-sm text-muted-foreground hover:text-primary">Help Center</a></li>
              <li><a href="/resources/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</a></li>
              <li><a href="/resources/changelog" className="text-sm text-muted-foreground hover:text-primary">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="/company/about" className="text-sm text-muted-foreground hover:text-primary">About</a></li>
              <li><a href="/company/news" className="text-sm text-muted-foreground hover:text-primary">News</a></li>
              <li><a href="/company/careers" className="text-sm text-muted-foreground hover:text-primary">Careers</a></li>
              <li><a href="/resources/affiliate" className="text-sm text-muted-foreground hover:text-primary">Affiliate</a></li>
              <li><a href="/resources/partner" className="text-sm text-muted-foreground hover:text-primary">Partner</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/legal/terms" className="text-sm text-muted-foreground hover:text-primary">Terms</a></li>
              <li><a href="/legal/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy</a></li>
              <li><a href="/legal/cookies" className="text-sm text-muted-foreground hover:text-primary">Cookies</a></li>
              <li><a href="/legal/data" className="text-sm text-muted-foreground hover:text-primary">Data Policy</a></li>
              <li><a href="/legal/dpa" className="text-sm text-muted-foreground hover:text-primary">DPA</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Ceche. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="text-sm border border-border rounded-md px-3 py-1.5 bg-background"
            />
            <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
