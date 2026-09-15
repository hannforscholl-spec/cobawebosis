import { useState, FormEvent } from 'react';
import { Send, ShieldCheck, MessageSquare, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { INITIAL_ASPIRASI } from '../data.ts';
import { AspirasiRecord } from '../types.ts';

interface AspirasiSectionProps {
  onOpenModal?: () => void;
}

export default function AspirasiSection({ onOpenModal }: AspirasiSectionProps) {
  const [aspirasiList, setAspirasiList] = useState<AspirasiRecord[]>(INITIAL_ASPIRASI);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('Kelas XI (Sebelas)');
  const [category, setCategory] = useState('Fasilitas & Sarana');
  const [message, setMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const ticketCode = `ASP-ADH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: AspirasiRecord = {
      id: `asp-${Date.now()}`,
      name: isAnonymous ? 'Siswa Anonim (Rahasia Terjamin)' : name.trim() || 'Civitas Siswa',
      grade,
      category,
      message: message.trim(),
      timestamp: 'Baru saja (Hari ini)',
      ticketId: ticketCode,
    };

    setAspirasiList([newRecord, ...aspirasiList]);
    setSubmittedTicket(ticketCode);
    setMessage('');
    if (!isAnonymous) setName('');
  };

  return (
    <section id="aspirasi" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#c5c6cd]/30">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Descriptive info & Recent Aspirations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#d3e4ff] text-[#001c38] text-[11px] font-bold tracking-wider uppercase font-heading">
            RUANG DENGAR SISWA &amp; SISWA
          </div>
          <h2 className="text-[28px] md:text-[34px] font-bold text-[#0e1c2f] tracking-tight font-heading">
            Kotak Aspirasi &amp; Advokasi Pelajar
          </h2>
          <p className="text-[14px] text-[#44474c] leading-relaxed">
            Dewan Pengurus Harian membuka kanal terbuka bagi setiap keluhan, usulan program, serta perbaikan fasilitas SMKN 1 REMBANG. Setiap laporan dienkripsi dan diproses bersama Majelis Perwakilan Kelas (MPK).
          </p>

          <div className="p-4 rounded-xl bg-white border border-[#c5c6cd]/40 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#735c00] text-[13px] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#cba72f]" />
              <span>Prinsip Perlindungan Identitas Siswa</span>
            </div>
            <p className="text-[12px] text-[#44474c] leading-relaxed">
              Anda berhak memilih mode anonim. Masukan konstruktif akan dirumuskan langsung pada Sidang Paripurna OSIS tanpa prasangka.
            </p>
          </div>

          {/* Recent Feed Snippet */}
          <div className="pt-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#0e1c2f] mb-3 font-heading">
              Aspirasi Masuk Terakhir
            </h4>
            <div className="space-y-3">
              {aspirasiList.slice(0, 2).map((item) => (
                <div key={item.id} className="p-3.5 rounded-lg bg-[#f2f4f6] border border-[#c5c6cd]/30 text-[13px]">
                  <div className="flex items-center justify-between text-[11px] text-[#75777d] mb-1">
                    <span className="font-semibold text-[#0e1c2f]">{item.name}</span>
                    <span className="font-mono text-[#cba72f] font-bold">{item.ticketId}</span>
                  </div>
                  <p className="text-[#44474c] line-clamp-2 italic mb-1">"{item.message}"</p>
                  <div className="flex items-center justify-between text-[10px] text-[#426086]">
                    <span>{item.category}</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Submission Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#c5c6cd]/40 shadow-xs">
          {submittedTicket && (
            <div className="mb-6 p-4 rounded-xl bg-[#d3e4ff]/50 border border-[#b3d1fd] text-[#001c38] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#426086] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[13px] font-bold mb-1">Aspirasi Berhasil Diterima!</h4>
                <p className="text-[12px] text-[#44474c]">
                  Nomor resi advokasi Anda adalah <strong className="font-mono text-[#0e1c2f]">{submittedTicket}</strong>. Terima kasih telah berpartisipasi menjaga perbaikan almamater.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-[#0e1c2f] uppercase tracking-wider font-heading">
                Identitas Pengirim
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#426086]">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-[#c5c6cd] text-[#0e1c2f] focus:ring-[#cba72f]"
                />
                <span>Kirim Sebagai Anonim</span>
              </label>
            </div>

            {!isAnonymous && (
              <div>
                <input
                  type="text"
                  placeholder="Nama Lengkap / Nama Panggilan (opsional jika anonim)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#c5c6cd] text-[13px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#0e1c2f]/30"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#44474c] uppercase tracking-wider block mb-1.5 font-heading">
                  Jenjang / Tingkat Kelas
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cd] text-[13px] text-[#191c1e] bg-white focus:outline-none focus:ring-2 focus:ring-[#0e1c2f]/30"
                >
                  <option value="Kelas X (Sepuluh)">Kelas X (Sepuluh)</option>
                  <option value="Kelas XI (Sebelas)">Kelas XI (Sebelas)</option>
                  <option value="Kelas XII (Dua Belas)">Kelas XII (Dua Belas)</option>
                  <option value="Guru / Civitas Staf">Guru / Civitas Staf</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#44474c] uppercase tracking-wider block mb-1.5 font-heading">
                  Kategori Aspirasi
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cd] text-[13px] text-[#191c1e] bg-white focus:outline-none focus:ring-2 focus:ring-[#0e1c2f]/30"
                >
                  <option value="Fasilitas & Sarana">Fasilitas &amp; Sarana Kelas/Lab</option>
                  <option value="Akademik & Kurikulum">Akademik &amp; KBM</option>
                  <option value="Kegiatan Ekstrakurikuler">Ekstrakurikuler &amp; Olahraga</option>
                  <option value="Kesejahteraan Siswa">Kantin &amp; Kesejahteraan</option>
                  <option value="Tata Tertib & Ketertiban">Tata Tertib &amp; Kebersihan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#44474c] uppercase tracking-wider block mb-1.5 font-heading">
                Isi Masukan / Usulan Aspirasi
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tuliskan ide pembaruan, keluhan fasilitas, atau program kerja yang ingin Anda usulkan untuk kemajuan sekolah kita..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#c5c6cd] text-[13px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#0e1c2f]/30"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-[#0e1c2f] text-white text-[14px] font-semibold hover:bg-[#426086] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <Send className="w-4 h-4 text-[#ffe088]" />
              <span>Sampaikan Aspirasi Resmi</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
