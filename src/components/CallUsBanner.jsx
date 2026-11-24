export default function CallUsBanner() {
  return (
    <section
      className="relative py-16 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/callcenter.webp')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
        <div className="text-white space-y-1">
          <p className="text-xs text-gray-300 font-medium">24/7 Customer Support Services</p>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            Call Us : 021-845290
          </h3>
        </div>
        <a href="#hubungi" className="bg-[#2a9d8f] hover:bg-[#218276] text-white font-medium text-xs px-6 py-3 rounded-full transition shadow-sm">
          Hubungi Perawat &rarr;
        </a>
      </div>
    </section>
  );
}