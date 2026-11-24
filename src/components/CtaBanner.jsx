export default function CtaBanner() {
  return (
    <section
      className="relative py-24 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/anak.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative max-w-7xl mx-auto px-6 text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide">
          Butuh Asuhan Keperawatan Anak?
        </h2>
        <div>
          <a href="#hubungi" className="inline-flex items-center gap-2 bg-[#2a9d8f] hover:bg-[#218276] text-white font-medium text-xs px-6 py-2.5 rounded-full transition shadow-sm">
            Hubungi Perawat &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}