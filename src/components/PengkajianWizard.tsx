'use client';

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    RotateCcw,
} from 'lucide-react';
import {
    PENGKAJIAN_FIELDS,
    FieldConfig,
    BAB_TONE,
    ToneKey,
} from '@/lib/data/pengkajian-questions';
import PengkajianResult from '@/components/PengkajianResult';

const STORAGE_KEY = 'askep_anak_draft_v3';

const BAB_LIST: { id: FieldConfig['bab']; short: string; title: string; tone: ToneKey }[] = [
    { id: 'A. PENGKAJIAN', short: 'A', title: 'Pengkajian', tone: 'violet' },
    { id: 'B. DIAGNOSA KEPERAWATAN', short: 'B', title: 'Diagnosa', tone: 'blue' },
    { id: 'C. RENCANA KEPERAWATAN', short: 'C', title: 'Rencana', tone: 'teal' },
    { id: 'D. PELAKSANAAN', short: 'D', title: 'Pelaksanaan', tone: 'amber' },
    { id: 'E. EVALUASI', short: 'E', title: 'Evaluasi', tone: 'emerald' },
];

const TONE_STYLES: Record<
    ToneKey,
    {
        dot: string;
        active: string;
        soft: string;
        text: string;
        ring: string;
        bar: string;
        btn: string;
    }
> = {
    neutral: {
        dot: 'bg-gray-400',
        active: 'bg-gray-900 text-white',
        soft: 'bg-gray-100 text-gray-700',
        text: 'text-gray-700',
        ring: 'ring-gray-300',
        bar: 'bg-gray-800',
        btn: 'bg-slate-700 hover:bg-slate-800',
    },
    violet: {
        dot: 'bg-violet-500',
        active: 'bg-violet-600 text-white',
        soft: 'bg-violet-50 text-violet-700',
        text: 'text-violet-700',
        ring: 'ring-violet-300',
        bar: 'bg-violet-600',
        btn: 'bg-violet-600 hover:bg-violet-700',
    },
    blue: {
        dot: 'bg-blue-500',
        active: 'bg-blue-600 text-white',
        soft: 'bg-blue-50 text-blue-700',
        text: 'text-blue-700',
        ring: 'ring-blue-300',
        bar: 'bg-blue-600',
        btn: 'bg-blue-600 hover:bg-blue-700',
    },
    teal: {
        dot: 'bg-teal-500',
        active: 'bg-teal-600 text-white',
        soft: 'bg-teal-50 text-teal-700',
        text: 'text-teal-700',
        ring: 'ring-teal-300',
        bar: 'bg-teal-600',
        btn: 'bg-teal-600 hover:bg-teal-700',
    },
    emerald: {
        dot: 'bg-emerald-500',
        active: 'bg-emerald-600 text-white',
        soft: 'bg-emerald-50 text-emerald-700',
        text: 'text-emerald-700',
        ring: 'ring-emerald-300',
        bar: 'bg-emerald-600',
        btn: 'bg-emerald-600 hover:bg-emerald-700',
    },
    amber: {
        dot: 'bg-amber-500',
        active: 'bg-amber-600 text-white',
        soft: 'bg-amber-50 text-amber-700',
        text: 'text-amber-700',
        ring: 'ring-amber-300',
        bar: 'bg-amber-600',
        btn: 'bg-amber-600 hover:bg-amber-700',
    },
};

interface StepSection {
    key: string;
    isInitial: boolean;
    bab: FieldConfig['bab'];
    cat: string;
    navCode: string;
    navGroup: string;
    fields: FieldConfig[];
}

function formatSectionTitle(cat: string, bab: FieldConfig['bab']): string {
    const trimmed = cat.trim();

    // Jika cat diawali nama bab (misal "D. PELAKSANAAN (CATATAN KEPERAWATAN)" atau "B. DIAGNOSA KEPERAWATAN")
    if (trimmed.toUpperCase().startsWith(bab.toUpperCase())) {
        const insideParen = trimmed.match(/\(([^)]+)\)/);
        if (insideParen?.[1]) {
            return insideParen[1].trim();
        }
        return trimmed.replace(/^[A-E]\.\s*/i, '').trim();
    }

    // Hapus prefix kode di depan cat seperti:
    // "A.3.a ", "A.3.b-i ", "A.6.c-d ", "A.4 & A.5 ", "A.10 ", "0. "
    return trimmed
        .replace(/^0\.\s*/i, '')
        .replace(/^[A-E]\.\d+(?:\s*&\s*[A-E]\.\d+)?(?:\.[a-z]+(?:-[a-z]+)?)?\s+/i, '')
        .trim();
}

export default function PengkajianWizard() {
    const [step, setStep] = useState<'role' | 'form' | 'result'>('role');
    const [isVokasi, setIsVokasi] = useState<boolean>(true);
    const [activeKey, setActiveKey] = useState<string>('');
    const [navOpen, setNavOpen] = useState<boolean>(true);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    // ===== Load draft dari localStorage =====
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.answers && typeof parsed.answers === 'object') {
                    setAnswers(parsed.answers);
                }
                if (typeof parsed.isVokasi === 'boolean') {
                    setIsVokasi(parsed.isVokasi);
                }
            } catch (e) {
                console.error('Gagal memuat draft:', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // ===== Simpan draft otomatis ke localStorage =====
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ isVokasi, answers }));
    }, [answers, isVokasi, isLoaded]);

    // ===== Filter field sesuai peran =====
    const visibleFields = useMemo(
        () =>
            PENGKAJIAN_FIELDS.filter((f) =>
                isVokasi ? true : f.cat !== '0. IDENTITAS MAHASISWA'
            ),
        [isVokasi]
    );

    // ===== Statistik global =====
    const stats = useMemo(() => {
        const total = visibleFields.length;
        const filled = visibleFields.filter((f) => (answers[f.id] || '').trim().length > 0).length;
        return {
            total,
            filled,
            pct: total ? Math.round((filled / total) * 100) : 0,
        };
    }, [visibleFields, answers]);

    // ===== Kelompokkan section berdasarkan data di pengkajian-questions.ts =====
    const orderedSections = useMemo<StepSection[]>(() => {
        const groups: StepSection[] = [];

        visibleFields.forEach((field) => {
            const isInitial = field.navGroup === 'Data Awal';
            const key = `${isInitial ? 'initial' : field.bab}:${field.cat}`;
            const existing = groups.find((g) => g.key === key);

            if (existing) {
                existing.fields.push(field);
            } else {
                groups.push({
                    key,
                    isInitial,
                    bab: field.bab,
                    cat: field.cat,
                    navCode: field.navCode ?? `${groups.length + 1}`,
                    navGroup: field.navGroup ?? field.cat,
                    fields: [field],
                });
            }
        });

        return groups;
    }, [visibleFields]);

    const currentIdx = useMemo(() => {
        if (!orderedSections.length) return 0;
        const found = orderedSections.findIndex((s) => s.key === activeKey);
        return found >= 0 ? found : 0;
    }, [orderedSections, activeKey]);

    const activeSection = orderedSections[currentIdx] ?? orderedSections[0];
    const isLastOverall = currentIdx >= orderedSections.length - 1;

    const initialSections = useMemo(
        () => orderedSections.filter((s) => s.isInitial),
        [orderedSections]
    );

    const babAGroups = useMemo(() => {
        const items = orderedSections.filter(
            (s) => !s.isInitial && s.bab === 'A. PENGKAJIAN'
        );
        const map = new Map<string, { navGroup: string; children: StepSection[] }>();

        items.forEach((item) => {
            const grpKey = item.navGroup;
            const current = map.get(grpKey);
            if (current) {
                current.children.push(item);
            } else {
                map.set(grpKey, { navGroup: grpKey, children: [item] });
            }
        });

        return Array.from(map.values());
    }, [orderedSections]);

    const handleSelectRole = (vokasi: boolean) => {
        setIsVokasi(vokasi);
        const firstKey =
            PENGKAJIAN_FIELDS.filter((f) => (vokasi ? true : f.cat !== '0. IDENTITAS MAHASISWA'))
                .map((f) => `${f.navGroup === 'Data Awal' ? 'initial' : f.bab}:${f.cat}`)[0] ?? '';
        setActiveKey(firstKey);
        setStep('form');
    };

    const handleSelectBabTab = (babId: FieldConfig['bab']) => {
        const firstInBab = orderedSections.find((s) => !s.isInitial && s.bab === babId);
        if (firstInBab) {
            setActiveKey(firstInBab.key);
        }
    };

    const handleNext = () => {
        if (currentIdx < orderedSections.length - 1) {
            setActiveKey(orderedSections[currentIdx + 1].key);
        } else {
            setStep('result');
        }
    };

    const handlePrev = () => {
        if (currentIdx > 0) {
            setActiveKey(orderedSections[currentIdx - 1].key);
        } else {
            setStep('role');
        }
    };

    const handleChange = (id: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

  

    const performReset = () => {
        localStorage.removeItem(STORAGE_KEY);
        setAnswers({});
        setIsVokasi(true);
        setActiveKey('');
        setStep('role');
        toast.success('Semua isian berhasil direset');
    };

    const handleReset = () => {
        toast('Hapus semua isian dan mulai dari awal?', {
            description: 'Draft yang tersimpan di perangkat akan dihapus.',
            action: {
                label: 'Hapus',
                onClick: performReset,
            },
            cancel: {
                label: 'Batal',
                onClick: () => { },
            },
        });
    };

    if (!isLoaded) return null;

    // ============ STEP 0: PILIH PERAN ============
    if (step === 'role') {
        const hasDraft = Object.values(answers).some((v) => (v || '').trim().length > 0);

        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="max-w-md mx-auto text-center space-y-1 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Pilih peran pengisi</h2>
                    <p className="text-sm text-gray-500">
                        Struktur bagian akan menyesuaikan kebutuhan dokumentasi Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleSelectRole(true)}
                        className="group p-4 rounded-xl border border-gray-200 hover:border-violet-400 hover:bg-violet-50/30 text-left transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2.5">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-700 bg-violet-50 px-2 py-0.5 rounded">
                                Akademik
                            </span>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-violet-600 transition">
                                01
                            </span>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">Mahasiswa Vokasi Keperawatan</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Mulai dari data awal mahasiswa & RS, lalu lanjut ke Bab A–E.
                        </p>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSelectRole(false)}
                        className="group p-4 rounded-xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/30 text-left transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2.5">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                Klinis
                            </span>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-emerald-600 transition">
                                02
                            </span>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">Perawat Ruangan</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Mulai dari data administrasi RS, lalu lanjut ke Bab A–E.
                        </p>
                    </button>
                </div>

                {hasDraft && (
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                            Draft tersimpan ·{' '}
                            <strong className="font-semibold text-gray-700">
                                {stats.filled}/{stats.total}
                            </strong>{' '}
                            terisi
                        </span>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    if (!activeKey && orderedSections[0]) {
                                        setActiveKey(orderedSections[0].key);
                                    }
                                    setStep('form');
                                }}
                                className="font-semibold text-violet-700 hover:text-violet-800 cursor-pointer"
                            >
                                Lanjutkan draft →
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="text-rose-600 hover:text-rose-700 cursor-pointer"
                            >
                                Hapus draft
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ============ STEP 1: FORM PENGKAJIAN ============
    if (step === 'form') {
        if (!activeSection) {
            return (
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
                    Tidak ada bagian form yang tersedia.{' '}
                    <button
                        type="button"
                        onClick={() => setStep('role')}
                        className="text-violet-600 font-semibold hover:underline cursor-pointer"
                    >
                        Kembali
                    </button>
                </div>
            );
        }

        const tone = activeSection.isInitial ? 'neutral' : BAB_TONE[activeSection.bab];
        const styles = TONE_STYLES[tone];
        const sectionFilled = activeSection.fields.filter(
            (f) => (answers[f.id] || '').trim().length > 0
        ).length;
        const cleanSectionTitle = formatSectionTitle(activeSection.cat, activeSection.bab);

        return (
            <div className="space-y-4">
                {/* TOP BAR: PERAN + PROGRES */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2.5 shadow-2xs">
                    <div className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                            <button
                                type="button"
                                onClick={() => setStep('role')}
                                className="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition cursor-pointer shrink-0"
                            >
                                {isVokasi ? 'Mahasiswa Vokasi' : 'Perawat Ruangan'}
                            </button>
                            <span className="text-gray-300">·</span>
                            <span className="text-gray-500 truncate">Total kelengkapan</span>
                        </div>
                        <span className="font-semibold text-gray-900 tabular-nums shrink-0">
                            {stats.filled}/{stats.total} ({stats.pct}%)
                        </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                            className={`h-full ${styles.bar} transition-all duration-300`}
                            style={{ width: `${stats.pct}%` }}
                        />
                    </div>
                </div>

                {/* DATA AWAL (DI LUAR BAB A) */}
                {initialSections.length > 0 && (
                    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-2xs">
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                Data Awal (Di Luar Bab A)
                            </span>
                            <span className="text-[11px] text-gray-400">Pra-Pengkajian</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {initialSections.map((sec) => {
                                const isCurrent = sec.key === activeSection.key;
                                const filled = sec.fields.filter((f) => (answers[f.id] || '').trim()).length;
                                const done = filled === sec.fields.length && sec.fields.length > 0;

                                return (
                                    <button
                                        key={sec.key}
                                        type="button"
                                        onClick={() => setActiveKey(sec.key)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border flex items-center gap-2 cursor-pointer ${isCurrent
                                            ? 'bg-gray-900 text-white border-transparent shadow-xs'
                                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span>{formatSectionTitle(sec.cat, sec.bab)}</span>
                                        {done && (
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-emerald-400' : 'bg-emerald-500'
                                                    }`}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* PILIH BAB BESAR A - E */}
                <nav aria-label="Navigasi Bab" className="grid grid-cols-5 gap-1.5">
                    {BAB_LIST.map((bab) => {
                        const isActive = !activeSection.isInitial && bab.id === activeSection.bab;
                        const s = TONE_STYLES[bab.tone];
                        const babFields = orderedSections
                            .filter((sec) => !sec.isInitial && sec.bab === bab.id)
                            .flatMap((sec) => sec.fields);
                        const filledCount = babFields.filter(
                            (f) => (answers[f.id] || '').trim().length > 0
                        ).length;
                        const done = babFields.length > 0 && filledCount === babFields.length;
                        const partial = filledCount > 0 && filledCount < babFields.length;

                        return (
                            <button
                                key={bab.id}
                                type="button"
                                onClick={() => handleSelectBabTab(bab.id)}
                                className={`relative py-2.5 px-1 rounded-xl text-xs font-semibold transition border cursor-pointer ${isActive
                                    ? `${s.active} border-transparent shadow-xs`
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                                    }`}
                            >
                                <span className="block text-sm font-bold leading-tight">{bab.short}</span>
                                <span className="block text-[10px] font-medium opacity-85 truncate mt-0.5">
                                    {bab.title}
                                </span>
                                {!isActive && (done || partial) && (
                                    <span
                                        className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${done ? s.dot : 'bg-gray-300'
                                            }`}
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* PANEL NOMOR UTAMA & TURUNAN DI DALAM BAB AKTIF */}
                {!activeSection.isInitial && (
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-2xs overflow-hidden">
                        <div className="px-4 py-3 flex items-center justify-between gap-2 border-b border-gray-100">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${styles.soft}`}>
                                    {activeSection.bab}
                                </span>
                                <span className="text-xs font-semibold text-gray-700 tabular-nums truncate">
                                    Nomor {activeSection.navCode}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setNavOpen((prev) => !prev)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer shrink-0"
                            >
                                <span>{navOpen ? 'Sembunyikan' : 'Nomor'}</span>
                                {navOpen ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {navOpen && (
                            <div className="p-4 bg-gray-50/50">
                                {activeSection.bab === 'A. PENGKAJIAN' ? (
                                    <div className="flex flex-wrap gap-3">
                                        {babAGroups.map((grp) => (
                                            <div
                                                key={grp.navGroup}
                                                className="rounded-xl border border-gray-200/90 bg-white p-2.5 space-y-1.5"
                                            >
                                                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-0.5">
                                                    No. {grp.navGroup}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    {grp.children.map((child) => {
                                                        const isCurrent = child.key === activeSection.key;
                                                        const filledInChild = child.fields.filter(
                                                            (f) => (answers[f.id] || '').trim().length > 0
                                                        ).length;
                                                        const isDone =
                                                            filledInChild === child.fields.length && child.fields.length > 0;

                                                        return (
                                                            <button
                                                                key={child.key}
                                                                type="button"
                                                                title={`${formatSectionTitle(child.cat, child.bab)} (${filledInChild}/${child.fields.length})`}
                                                                onClick={() => setActiveKey(child.key)}
                                                                className={`relative min-w-10 h-9 px-2 rounded-lg text-xs font-bold tabular-nums transition border flex items-center justify-center cursor-pointer ${isCurrent
                                                                    ? `${styles.active} border-transparent shadow-xs ring-2 ${styles.ring}`
                                                                    : isDone
                                                                        ? 'bg-gray-50 border-gray-300 text-gray-900 hover:border-gray-400'
                                                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                                                                    }`}
                                                            >
                                                                <span>{child.navCode}</span>
                                                                {!isCurrent && isDone && (
                                                                    <span
                                                                        className={`w-1.5 h-1.5 rounded-full absolute top-1 right-1 ${styles.dot}`}
                                                                    />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {orderedSections
                                            .filter((s) => !s.isInitial && s.bab === activeSection.bab)
                                            .map((sec) => {
                                                const isCurrent = sec.key === activeSection.key;
                                                const filledInSec = sec.fields.filter(
                                                    (f) => (answers[f.id] || '').trim().length > 0
                                                ).length;
                                                const isDone =
                                                    filledInSec === sec.fields.length && sec.fields.length > 0;

                                                return (
                                                    <button
                                                        key={sec.key}
                                                        type="button"
                                                        title={`${formatSectionTitle(sec.cat, sec.bab)} (${filledInSec}/${sec.fields.length})`}
                                                        onClick={() => setActiveKey(sec.key)}
                                                        className={`relative w-10 h-10 rounded-xl text-xs font-bold tabular-nums transition border flex items-center justify-center cursor-pointer ${isCurrent
                                                            ? `${styles.active} border-transparent shadow-xs ring-2 ${styles.ring}`
                                                            : isDone
                                                                ? 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
                                                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800'
                                                            }`}
                                                    >
                                                        <span>{sec.navCode}</span>
                                                        {!isCurrent && isDone && (
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full absolute top-1.5 right-1.5 ${styles.dot}`}
                                                            />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* KONTEKS KLIEN PADA BAB B - E */}
                {!activeSection.isInitial && activeSection.bab !== 'A. PENGKAJIAN' && (
                    <div className="rounded-xl bg-gray-50/90 border border-gray-200/80 px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-x-5 gap-y-1">
                            <span className="text-gray-500">
                                Klien: <strong className="font-semibold text-gray-900">{answers.namaKlien || '—'}</strong>
                            </span>
                            <span className="text-gray-500">
                                Ruang: <strong className="font-semibold text-gray-900">{answers.ruangAnak || '—'}</strong>
                            </span>
                            <span className="text-gray-500">
                                Dx Medis: <strong className="font-semibold text-gray-900">{answers.diagnosaMedis || '—'}</strong>
                            </span>
                        </div>
                        {!answers.namaKlien && (
                            <button
                                type="button"
                                onClick={() => setActiveKey('A. PENGKAJIAN:A.1.a IDENTITAS KLIEN')}
                                className="text-[11px] font-medium text-violet-700 hover:underline cursor-pointer"
                            >
                                Isi identitas di Bab A (1a)
                            </button>
                        )}
                    </div>
                )}

                {/* FORM CARD */}
                <section className="rounded-2xl border border-gray-200 bg-white shadow-2xs overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className={`text-[11px] font-semibold uppercase tracking-wider ${styles.text}`}>
                                {activeSection.isInitial
                                    ? `Data Awal · Bagian ${activeSection.navCode}`
                                    : `${activeSection.bab} · Nomor ${activeSection.navCode}`}
                            </p>
                            <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate mt-0.5">
                                {cleanSectionTitle}
                            </h2>
                        </div>
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 tabular-nums ${styles.soft}`}>
                            {sectionFilled}/{activeSection.fields.length} terisi
                        </span>
                    </div>

                    <div className="p-5 sm:p-6 space-y-5">
                        {activeSection.fields.map((field) => {
                            const val = answers[field.id] || '';
                            const inputId = `field-${field.id}`;

                            return (
                                <div key={field.id} className="space-y-1.5">
                                    <div className="flex items-baseline justify-between gap-2">
                                        <label htmlFor={inputId} className="text-xs sm:text-[13px] font-medium text-gray-800">
                                            {field.label}
                                            {field.required && <span className="text-rose-500 ml-1">*</span>}
                                        </label>
                                        {field.sub && (
                                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold shrink-0">
                                                {field.sub}
                                            </span>
                                        )}
                                    </div>

                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={inputId}
                                            rows={3}
                                            placeholder={field.placeholder || ''}
                                            value={val}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition resize-y"
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            id={inputId}
                                            value={val}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition"
                                        >
                                            <option value="">Pilih…</option>
                                            {field.options?.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={inputId}
                                            type={field.type}
                                            placeholder={field.placeholder || ''}
                                            value={val}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* NAVIGASI BAWAH */}
                <div className="flex items-center gap-2.5 pt-1">
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="flex-1 h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm transition cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                        <ArrowLeft className="w-4 h-4 text-gray-500 shrink-0" />
                        <span>Kembali</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        className={`flex-[2] h-11 rounded-xl font-semibold text-sm text-white shadow-xs transition cursor-pointer inline-flex items-center justify-center gap-2 ${isLastOverall
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : styles.btn
                            }`}
                    >
                        <span>{isLastOverall ? 'Selesai & Lihat Hasil' : 'Lanjut'}</span>
                        {isLastOverall ? (
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                        ) : (
                            <ArrowRight className="w-4 h-4 shrink-0" />
                        )}
                    </button>
                </div>

                {/* RESET BAR */}
                <div className="pt-1">
                    <div className="rounded-xl border border-gray-200/90 bg-white px-3.5 py-2 flex items-center justify-between gap-2 shadow-2xs">
                        <span className="text-[11px] text-gray-400">
                            Draft tersimpan otomatis di perangkat
                        </span>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition cursor-pointer"
                        >
                            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                            <span>Reset semua isian</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ============ STEP 2: HASIL (KOMPONEN TERPISAH) ============
    return (
        <PengkajianResult
            isVokasi={isVokasi}
            visibleFields={visibleFields}
            answers={answers}
            babList={BAB_LIST}
            onBackToForm={() => setStep('form')}
            onReset={handleReset}
        />
    );
}