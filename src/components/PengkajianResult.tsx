'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, Check, Copy, FileText, Printer, RotateCcw, Send, Link, Home, } from 'lucide-react';
import { BAB_TONE, FieldConfig, ToneKey, } from '@/lib/data/pengkajian-questions';

interface BabItem {
    id: FieldConfig['bab'];
    short: string;
    title: string;
}

interface PengkajianResultProps {
    isVokasi: boolean;
    visibleFields: FieldConfig[];
    answers: Record<string, string>;
    babList: BabItem[];
    onBackToForm: () => void;
    onReset: () => void;
}

const BAB_ACCENT: Record<
    ToneKey,
    {
        headerBg: string;
        headerBorder: string;
        badge: string;
        titleText: string;
        sectionBorder: string;
    }
> = {
    neutral: {
        headerBg: 'bg-slate-50/90',
        headerBorder: 'border-l-slate-600 border-slate-200',
        badge: 'bg-slate-200/80 text-slate-800',
        titleText: 'text-slate-900',
        sectionBorder: 'border-slate-200/90',
    },
    violet: {
        headerBg: 'bg-violet-50/75',
        headerBorder: 'border-l-violet-600 border-violet-200/80',
        badge: 'bg-violet-100 text-violet-800',
        titleText: 'text-violet-950',
        sectionBorder: 'border-violet-200/70',
    },
    blue: {
        headerBg: 'bg-blue-50/75',
        headerBorder: 'border-l-blue-600 border-blue-200/80',
        badge: 'bg-blue-100 text-blue-800',
        titleText: 'text-blue-950',
        sectionBorder: 'border-blue-200/70',
    },
    teal: {
        headerBg: 'bg-teal-50/75',
        headerBorder: 'border-l-teal-600 border-teal-200/80',
        badge: 'bg-teal-100 text-teal-800',
        titleText: 'text-teal-950',
        sectionBorder: 'border-teal-200/70',
    },
    amber: {
        headerBg: 'bg-amber-50/75',
        headerBorder: 'border-l-amber-600 border-amber-200/80',
        badge: 'bg-amber-100 text-amber-800',
        titleText: 'text-amber-950',
        sectionBorder: 'border-amber-200/70',
    },
    emerald: {
        headerBg: 'bg-emerald-50/75',
        headerBorder: 'border-l-emerald-600 border-emerald-200/80',
        badge: 'bg-emerald-100 text-emerald-800',
        titleText: 'text-emerald-950',
        sectionBorder: 'border-emerald-200/70',
    },
};

function normalizeWaPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '');
    if (!digits) return '';
    if (digits.startsWith('0')) return `62${digits.slice(1)}`;
    if (digits.startsWith('62')) return digits;
    return `62${digits}`;
}

function normalizeCatName(cat: string, babId: string): string {
    const trimmedCat = cat.trim();
    const upperCat = trimmedCat.toUpperCase();
    const upperBab = babId.trim().toUpperCase();

    if (upperCat === upperBab || upperCat.startsWith(`${upperBab} `)) {
        return babId.trim();
    }

    return trimmedCat
        .replace(/^0\.\s*/i, '')
        .replace(/^[A-E]\.\d+(?:\s*&\s*[A-E]\.\d+)?(?:\.[a-z]+(?:-[a-z]+)?)?\s+/i, '')
        .trim();
}

export default function PengkajianResult({
    isVokasi,
    visibleFields,
    answers,
    babList,
    onBackToForm,
    onReset,
}: PengkajianResultProps) {
    const [waNumber, setWaNumber] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const [waError, setWaError] = useState<string>('');

    const stats = useMemo(() => {
        const total = visibleFields.length;
        const filled = visibleFields.filter((f) => (answers[f.id] || '').trim().length > 0).length;
        return {
            total,
            filled,
            pct: total ? Math.round((filled / total) * 100) : 0,
        };
    }, [visibleFields, answers]);

    const generateWAText = () => {
        const lines: string[] = [
            '*DOKUMENTASI ASUHAN KEPERAWATAN ANAK*',
            `Pengisi: ${isVokasi ? 'Mahasiswa Vokasi Keperawatan' : 'Perawat Ruangan'}`,
        ];

        if (isVokasi && (answers.namaMahasiswa || answers.nim)) {
            lines.push(`Mahasiswa: ${answers.namaMahasiswa || '-'} (${answers.nim || '-'})`);
        }

        lines.push(
            `Klien: ${answers.namaKlien || '-'} | Ruang: ${answers.ruangAnak || '-'} | Dx Medis: ${answers.diagnosaMedis || '-'}`,
            ''
        );

        babList.forEach((bab) => {
            const fields = visibleFields.filter((f) => f.bab === bab.id);
            if (!fields.length) return;

            lines.push(`*${bab.id}*`);
            fields.forEach((f) => {
                const val = (answers[f.id] || '').trim();
                lines.push(`• ${f.label}: ${val || '-'}`);
            });
            lines.push('');
        });

        return lines.join('\n').trim();
    };

    const handleCopyText = async () => {
        const text = generateWAText();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setWaError('Gagal menyalin otomatis. Silakan gunakan tombol Kirim WhatsApp.');
        }
    };

    const handleSendWhatsApp = (e: React.FormEvent) => {
        e.preventDefault();
        const normalized = normalizeWaPhone(waNumber);
        if (normalized.length < 10) {
            setWaError('Masukkan nomor WhatsApp yang valid (contoh: 081234567890).');
            return;
        }

        setWaError('');
        const encodedText = encodeURIComponent(generateWAText());
        window.open(`https://wa.me/${normalized}?text=${encodedText}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="space-y-4">
            {/* PANEL AKSI: PDF & WHATSAPP */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs space-y-4 print:hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-gray-100">
                    <div className="space-y-0.5">
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Rekap Akhir Dokumentasi</span>
                        </div>
                        <h2 className="text-base font-semibold text-gray-900 tabular-nums">
                            Kelengkapan {stats.filled}/{stats.total} field ({stats.pct}%)
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleCopyText}
                            className="h-9 px-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-800 transition cursor-pointer inline-flex items-center gap-1.5"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Teks Tersalin</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                                    <span>Salin Teks</span>
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                        >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Cetak / PDF</span>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSendWhatsApp} className="space-y-2">
                    <label htmlFor="wa-target-number" className="block text-xs font-medium text-gray-700">
                        Nomor WhatsApp Tujuan
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            id="wa-target-number"
                            type="tel"
                            inputMode="tel"
                            placeholder="Contoh: 081234567890 atau 6281234567890"
                            value={waNumber}
                            onChange={(e) => {
                                setWaNumber(e.target.value);
                                if (waError) setWaError('');
                            }}
                            className="flex-1 h-10 px-3.5 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                        />
                        <button
                            type="submit"
                            className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                            <Send className="w-3.5 h-3.5" />
                            <span>Kirim ke WhatsApp</span>
                        </button>
                    </div>
                    {waError ? (
                        <p className="text-xs text-rose-600">{waError}</p>
                    ) : (
                        <p className="text-[11px] text-gray-400">
                            Nomor diawali <span className="font-medium text-gray-600">0</span> otomatis diubah menjadi{' '}
                            <span className="font-medium text-gray-600">62</span> sebelum membuka WhatsApp.
                        </p>
                    )}
                </form>
            </div>

            {/* LEMBAR DOKUMEN HASIL */}
            <article className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xs print:border-0 print:p-0 print:shadow-none">
                <div className="border-b-2 border-slate-900 pb-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                                Laporan Askep Pediatri
                            </p>
                            <h1 className="text-lg font-bold text-slate-900 uppercase tracking-tight">
                                Asuhan Keperawatan Anak
                            </h1>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 w-fit">
                            {isVokasi ? 'Mahasiswa Vokasi Keperawatan' : 'Perawat Ruangan'}
                        </span>
                    </div>

                    <dl className="mt-4 pt-3 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 text-xs">
                        <div>
                            <dt className="text-gray-400 text-[11px]">Nama / Inisial Klien</dt>
                            <dd className="font-semibold text-gray-900 mt-0.5">{answers.namaKlien || '—'}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-400 text-[11px]">Ruang Rawat</dt>
                            <dd className="font-semibold text-gray-900 mt-0.5">{answers.ruangAnak || '—'}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-400 text-[11px]">Diagnosa Medis</dt>
                            <dd className="font-semibold text-gray-900 mt-0.5">{answers.diagnosaMedis || '—'}</dd>
                        </div>
                    </dl>
                </div>

                <div className="space-y-7">
                    {babList.map((bab) => {
                        const fields = visibleFields.filter((f) => f.bab === bab.id);
                        if (!fields.length) return null;

                        const tone = BAB_TONE[bab.id] ?? 'neutral';
                        const accent = BAB_ACCENT[tone];
                        const cats = Array.from(
                            new Set(fields.map((f) => normalizeCatName(f.cat, bab.id)))
                        );
                        const cleanTitle = bab.id.replace(/^[A-E]\.\s*/, '');

                        return (
                            <section key={bab.id} className="break-inside-avoid">
                                <div
                                    className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border mb-3 ${accent.headerBg} ${accent.headerBorder}`}
                                >
                                    <span
                                        className={`w-5 h-5 rounded text-[11px] font-bold flex items-center justify-center shrink-0 ${accent.badge}`}
                                    >
                                        {bab.short}
                                    </span>
                                    <h2 className={`text-xs font-bold uppercase tracking-wider ${accent.titleText}`}>
                                        {cleanTitle}
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {cats.map((cat) => {
                                        const catFields = fields.filter(
                                            (f) => normalizeCatName(f.cat, bab.id) === cat
                                        );
                                        const showCatHeading =
                                            cat !== bab.id && cat.toUpperCase() !== bab.id.toUpperCase();

                                        return (
                                            <div key={cat}>
                                                {showCatHeading && (
                                                    <h3 className="text-[11px] font-semibold text-gray-600 mb-1.5 px-1">
                                                        {cat}
                                                    </h3>
                                                )}

                                                <div
                                                    className={`rounded-xl border overflow-hidden divide-y divide-gray-100 ${accent.sectionBorder}`}
                                                >
                                                    {catFields.map((f) => {
                                                        const val = (answers[f.id] || '').trim();
                                                        return (
                                                            <div
                                                                key={f.id}
                                                                className="px-3.5 py-2 grid grid-cols-1 sm:grid-cols-12 gap-1.5 text-xs"
                                                            >
                                                                <div className="sm:col-span-5 text-gray-600">
                                                                    {f.sub && (
                                                                        <span className="font-semibold text-gray-800 mr-1">
                                                                            {f.sub} —
                                                                        </span>
                                                                    )}
                                                                    <span>{f.label}</span>
                                                                </div>
                                                                <div className="sm:col-span-7 text-gray-900 font-medium whitespace-pre-wrap break-words">
                                                                    {val || <span className="text-gray-300 font-normal">—</span>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </article>

            {/* FOOTER NAVIGASI */}
            <div className="pt-1 print:hidden">
                <div className="rounded-xl border border-gray-200/90 bg-white px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                        >
                            <Home className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                            <span>Beranda utama</span>
                        </Link>

                        <span className="text-gray-200">|</span>

                        <button
                            type="button"
                            onClick={onBackToForm}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                            <span>Kembali mengedit form</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                        <span>Reset semua data</span>
                    </button>
                </div>
            </div>
        </div>
    );
}