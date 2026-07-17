export default function Footer() {
  return (
    <footer className="relative bg-cream-deep border-t-2 border-dashed border-cocoa/15 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="font-hand text-3xl text-cocoa-deep mb-2">📔 Petal & Page</p>
          <p className="font-utility text-sm text-cocoa/60">a cozy little corner for your memories</p>
        </div>
        {[
          { title: "Product", links: ["Features", "Albums", "AI Journal", "Pricing"] },
          { title: "Company", links: ["About", "Blog", "Careers"] },
          { title: "Support", links: ["Help Center", "Contact", "Privacy"] },
        ].map((col) => (
          <div key={col.title}>
            <p className="font-tape text-cocoa-deep mb-3">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="font-utility text-sm text-cocoa/60 hover:text-terracotta transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-center font-utility text-xs text-cocoa/40 pb-6">made with 🤎 for people who like keeping things</p>
    </footer>
  );
}
