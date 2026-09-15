import { BphMember, SekbidItem, ProgramKerjaItem, DokumentasiItem, PaslonKandidat, CabinetMember } from './types.ts';
import paslon3Photo from './assets/images/paslon_03_photo_1789458813046.jpg';

export const DEFAULT_GDRIVE_LINK = 'https://drive.google.com/drive/folders/1OSIS-SMAN1-Adhirajasa-ArsipDokumentasi-2024-2025?usp=sharing';

export const PH_MEMBERS: BphMember[] = [
  {
    id: 'ketua-umum',
    name: 'Raditya Arya Pratama',
    role: 'KETUA UMUM',
    classGrade: 'Kelas XII MIPA 1',
    quote: '"Integritas adalah fondasi di mana setiap keputusan dan aksi nyata diletakkan untuk martabat almamater."',
    nis: '2223.10.041',
    email: 'raditya.arya@osis.sman1adhirajasa.sch.id',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0ft2uiBFLCKTUxz61MKHwCGhpXMxMeKgp2uPS8Tqo2LZQ0kvGHg6HVefoP03f-cYyzlfpMR2Of-eM53Nj1LSDD8QWDhp-qTSE0_0MpGK2dpxw9WocKGEH81Bc9rfJjlI7w3YjHFgXL3q6WnaSN-py5xneapYrtv4cg1jqp9elv5QNk5lg07gG69pXB-qcPMwwfSRGq14Ob-YLv7qrz8nDSDASxAc0vURt_m_y_R1kL0UPazU9ONY',
    borderTopClass: 'border-t-4 border-t-[#cba72f]',
    badgeClass: 'bg-[#0e1c2f]/90 text-white border border-[#cba72f]/40',
    fullBio: 'Memimpin kepengurusan Kabinet Cakrawala Bhakti 2024/2025. Berpengalaman sebagai delegasi Forum OSIS Nusantara dan peraih Medali Emas Debat Konstitusi Siswa Nasional.',
    instagram: '@raditya.pratama'
  },
  {
    id: 'wakil-ketua',
    name: 'Anindya Putri Larasati',
    role: 'WAKIL KETUA',
    classGrade: 'Kelas XI MIPA 3',
    quote: '"Mendengarkan aspirasi dari lorong terdepan hingga bilik kelas terpencil adalah esensi musyawarah."',
    nis: '2324.11.088',
    email: 'anindya.larasati@osis.sman1adhirajasa.sch.id',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBknAFQ1YaouN4-l1E5RWCj7oZgANlsa5cwTPRMTK4GsLmX6JtID6j1jOjm3h52CNPWv6bZJo_jjFzPg2yVhJP5xOqyYNDe6K9GSXekIA1NUs98MmkTpsNxsZeYIfUi0iMVy0BX0dDCN5VvGKmkamgxgeuZtTqaVb3jxzkbcZVavsLsdUE7bu4ghv1LG_72lT2hniyaAJGEV8XngFgYu47GjLfJwSM010srGhMLo6SXrJhKhIYR9Ns',
    borderTopClass: 'border-t-4 border-t-[#426086]',
    badgeClass: 'bg-[#0e1c2f]/90 text-white border border-[#aac9f4]/40',
    fullBio: 'Mengoordinasikan kerja lintas 10 Seksi Bidang dan menjembatani komunikasi keorganisasian dengan Majelis Perwakilan Kelas (MPK).',
    instagram: '@anindya.larasati'
  },
  {
    id: 'sekretaris-umum',
    name: 'M. Fadhil Ramadhan',
    role: 'SEKRETARIS UMUM',
    classGrade: 'Kelas XII IPS 2',
    quote: '"Kerapian tata kelola surat dan arsip adalah saksi tertulis atas komitmen serta akuntabilitas dewan."',
    nis: '2223.10.192',
    email: 'fadhil.ramadhan@osis.sman1adhirajasa.sch.id',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8Z_p4AT_UTWjLHTegdFFzRl51OEwhINIewkFsYNDaCo1CrP3c3w6PIjR451Ku-p_bNjrBQzwUbyj9K6n-GWKJzoWMtZ3zPe9B7kTsqoSuHsOWbovXonSe3umi23dIrw93_NEIkVh9fZ43B9jzfL_fC9mhxgmtf723I7yO_2sK280P16QmX4XmFcfIBnNJUC5LZronfH20KIzOeiLSz5pfy8Kn4ofLTI26quSLEQDOF6bF1nks5Hg',
    borderTopClass: 'border-t-2 border-t-[#c5c6cd]',
    badgeClass: 'bg-[#0e1c2f]/90 text-white border border-[#c5c6cd]/50',
    fullBio: 'Penanggung jawab administrasi persuratan, inventarisasi data organisasi, dan pelaporan berkala Surat Keputusan (SK) OSIS.',
    instagram: '@fadhil.rmdhn'
  },
  {
    id: 'bendahara-umum',
    name: 'Zahra Almira',
    role: 'BENDAHARA UMUM',
    classGrade: 'Kelas XI MIPA 2',
    quote: '"Transparansi anggaran bukan sekadar angka di pembukuan, melainkan amanah setiap rupiah warga sekolah."',
    nis: '2324.11.144',
    email: 'zahra.almira@osis.sman1adhirajasa.sch.id',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDva3DNShvEl3wETV9mW3_f9QVRAex33EgwzeElvxBhI1Xa7GU8bMFfGl9ygbtCwBg9G_aKKo40RkRMskSSRs1u74DD9Jb_b28ZF8S8fpBgoeb2O985_Jqe3-wPVgSVnyz98l8mmsRsUnpElFVhJ6dTHiRv_IbF95O5alSFvk_ARUylduCS-jwTDBqqsGTXEiN0nI2UGo9ag6r0LFQL-SWniQgMRGW4PLUNi2JH1Y50xB-tT0eTOWU',
    borderTopClass: 'border-t-2 border-t-[#c5c6cd]',
    badgeClass: 'bg-[#0e1c2f]/90 text-white border border-[#c5c6cd]/50',
    fullBio: 'Mengelola tata kelola keuangan organisasi secara digital, akuntabel, dan transparan melalui buku kas mingguan terbuka untuk civitas akademika.',
    instagram: '@zahra.almira'
  }
];

export const SEKBID_LIST: SekbidItem[] = [
  {
    id: 'sekbid-1',
    numberLabel: 'SEKBID I',
    title: 'Ketaqwaan Terhadap Tuhan YME',
    description: 'Membina toleransi lintas kerohanian (Rohis & Rokris), peringatan hari besar keagamaan, serta pendalaman etika spiritual.',
    coordinator: 'Ahmad Zaki (XII MIPA 4)',
    iconName: 'Church',
    programs: ['Peringatan Hari Besar Islam & Kristen', 'Kajian Rohani Jumat Berkah', 'Bakti Sosial Ramadhan & Natal', 'Kolektivitas Donasi Duka Cita'],
    membersCount: 12
  },
  {
    id: 'sekbid-2',
    numberLabel: 'SEKBID II',
    title: 'Wawasan Kebangsaan & Nasionalisme',
    description: 'Menyelenggarakan upacara bendera reguler, pelatihan paskibraka unit, serta wacana pemahaman konstitusi kemerdekaan.',
    coordinator: 'Bagas Pratista (XI IPS 1)',
    iconName: 'Flag',
    programs: ['Pelatihan Paskibra Inti', 'Peringatan Hari Kemerdekaan 17 Agustus', 'Seminar Konstitusi Pemuda', 'Parade Pahlawan Nasional'],
    membersCount: 14
  },
  {
    id: 'sekbid-3',
    numberLabel: 'SEKBID III',
    title: 'Pendidikan Karakter & Bela Negara',
    description: 'Pelatihan kedisiplinan baris-berbaris, tata tertib lingkungan sekolah, serta koordinasi keamanan kegiatan OSIS.',
    coordinator: 'Dimas Nugraha (XII MIPA 2)',
    iconName: 'GraduationCap',
    programs: ['LDKS Angkatan', 'Operasi Tertib Atribut', 'Simulasi Kebencanaan & Evakuasi', 'Piket Keamanan Event'],
    membersCount: 16
  },
  {
    id: 'sekbid-8',
    numberLabel: 'SEKBID VIII',
    title: 'Apresiasi Sastra & Seni Budaya',
    description: 'Eksplorasi estetika lewat Pekan Seni Adhirajasa, galeri pameran visual, karawitan tradisional, dan teater modern.',
    coordinator: 'Clara Salsabila (XI Bahasa)',
    iconName: 'Palette',
    programs: ['Pekan Seni Budaya Adhirajasa', 'Pameran Lukis & Fotografi', 'Pentas Musik Orkestra & Karawitan', 'Lomba Cipta Puisi & Monolog'],
    membersCount: 15
  },
  {
    id: 'sekbid-9',
    numberLabel: 'SEKBID IX',
    title: 'Teknologi Informasi & Komunikasi',
    description: 'Pengelolaan portal digital, livestreaming siaran sekolah, perlombaan e-sport etis, dan workshop literasi siber.',
    coordinator: 'Rian Daniswara (XII MIPA 5)',
    iconName: 'Laptop',
    programs: ['Pengembangan Website Resmi OSIS', 'Liputan & Livestream Multi-Kamera', 'Turnamen E-Sport Edukatif', 'Workshop AI & Desain Grafis'],
    membersCount: 10
  },
  {
    id: 'sekbid-10',
    numberLabel: 'SEKBID X',
    title: 'Komunikasi Bahasa Internasional',
    description: 'Model United Nations (MUN) simulation club, English Debate League, serta pembekalan kompetisi TOEFL/IELTS dasar.',
    coordinator: 'Jessica Maheswari (XI MIPA 1)',
    iconName: 'Globe',
    programs: ['Adhirajasa Model United Nations', 'English Debate Championship', 'Language Exchange Hour', 'TOEFL Preparation Clinic'],
    membersCount: 11
  }
];

export const PROGRAM_KERJA_LIST: ProgramKerjaItem[] = [
  {
    id: 'prog-mpls',
    dateDay: '15-18 Jul',
    dateYear: '2024',
    fullDate: '15 - 18 Juli 2024',
    status: 'Terlaksana',
    statusNote: 'Terlaksana 100%',
    skNumber: 'SK No: 014/OSIS-ADH/VII/2024',
    title: 'Masa Pengenalan Lingkungan Sekolah (MPLS) Ramah Anak',
    description: 'Penyambutan 360 peserta didik baru angkatan 2024 dengan materi kurikulum merdeka, literasi anti-perundungan, pengenalan laboratorium sains modern, dan tur paguyuban ekstrakurikuler tanpa intimidasi fisik.',
    metrics: ['360 Siswa Baru Terlibat', 'Indeks Kepuasan 99.2%', '0 Kasus Pelanggaran'],
    objective: 'Membimbing adaptasi peserta didik baru dalam iklim akademik inklusif, kondusif, dan ramah anak.',
    location: 'Auditorium & Lingkungan Kampus SMAN 1 Adhirajasa',
    organizer: 'BPH & Panitia Ad-Hoc MPLS 2024'
  },
  {
    id: 'prog-ldks',
    dateDay: '27-29 Sep',
    dateYear: '2024',
    fullDate: '27 - 29 September 2024',
    status: 'Sedang Berjalan',
    statusNote: 'Sedang Berjalan (Fase Evaluasi)',
    skNumber: 'SK No: 028/OSIS-ADH/IX/2024',
    title: 'Latihan Dasar Kepemimpinan Siswa (LDKS) Cakrawala Bhakti',
    description: 'Kaderisasi intensif 80 delegasi pengurus kelas dan sub-organisasi di Bumi Perkemahan Gunung Geulis. Fokus pada manajemen konflik, penyusunan proposal akuntabel, dan simulasi persidangan perumusan anggaran.',
    metrics: ['80 Delegasi Terseleksi', 'Modul Kepemimpinan Militer & Sipil', 'Simulasi Sidang Pleno'],
    objective: 'Menanamkan karakter kepemimpinan adaptif, ketahanan mental, dan kecakapan tata kelola organisasi siswa.',
    location: 'Bumi Perkemahan Gunung Geulis, Bogor',
    organizer: 'Dewan Pengurus Harian & Pembina Kesiswaan'
  },
  {
    id: 'prog-pensi',
    dateDay: '14 Des',
    dateYear: '2024',
    fullDate: '14 Desember 2024',
    status: 'Mendatang',
    statusNote: 'Mendatang (Persiapan 75%)',
    skNumber: 'SK No: 039/OSIS-ADH/XI/2024',
    title: "Pentas Seni & Budaya Nusantara: 'Gita Swara Adhirajasa'",
    description: 'Perayaan megah akhir semester ganjil yang memadukan orkestra etnis, pentas monolog sastrawan muda, stan kewirausahaan kriya nusantara, serta guest star ansambel string nasional.',
    metrics: ['Estimasi 1,500 Hadirin', '32 Booth Komersil Pelajar', 'Kurasi 18 Penampil'],
    objective: 'Wadah apresiasi kreasi seni lintas genre dan penguatan daya wirausaha kreatif siswa.',
    location: 'Stadion Terbuka & Panggung Budaya SMAN 1 Adhirajasa',
    organizer: 'Sekbid VIII & Tim Kreatif Gita Swara'
  }
];

export const DOKUMENTASI_LIST: DokumentasiItem[] = [
  {
    id: 'doc-bulan-bahasa',
    monthYear: 'Oktober 2024',
    title: 'Bulan Bahasa & Sastra 2024',
    description: 'Lomba debat bahasa Indonesia, cipta puisi bertema patriotisme kontemporer, dan parade busana adat 38 provinsi di panggung utama sekolah.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy5HyTo954e4HtYyKy17a1ygzbypXc5QDpUCMKPra9k-sXDb4TaZ0T7SlBfJ3AXqFCNpcm3iOgz_VoLsNhh7jGMeaP_jhZJ4k9oHZ6syLpMHzv85bH9whjPPCSXmjkMJ54Zp_1k8V-maYuzI_CshBjkoYdgcsPoLK7wtD2setro9LZ6w1RxrKT0card50p2vWx_CNBGXAFU4rOAndLUumhzGr2yZKQQiXn-CwERuQO79B8FCNF2d0',
    colSpanDesktop: 'md:col-span-7',
    aspectDesktop: 'aspect-[16/10]',
    category: 'Kebudayaan & Sastra',
    photographer: 'Tim Dokumentasi Sekbid IX'
  },
  {
    id: 'doc-ldks',
    monthYear: 'September 2024',
    title: 'Latihan Dasar Kepemimpinan Siswa',
    description: 'Penempaan fisik, kedisiplinan baris-berbaris, dan pembinaan karakter resiliensi dewan terpilih.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRxtHrfvunIV0PXz6XlBE3_2nPt-WhQhbThSkGvaNIxrcUBlkSzs2kRkM1uL6N-hJHxL98ZZ1txNqLmjKNgNJghzz2DjTqJp55C0c8awNxl07BHCB9grBjJyRly2JQL2jUhflt0sEkloe9lZ6UjPUjbD-5gScWnHwalkWvVTLT1OmnZw53Onmzl6i00HWV5pvmF3Yb_yJJYY0yhxFNClV4uWDQwIW2528WpSEs7k3zkYTaJQpD07A',
    colSpanDesktop: 'md:col-span-5',
    aspectDesktop: 'aspect-[16/10] md:aspect-auto',
    category: 'Kaderisasi',
    photographer: 'Sie Publikasi LDKS'
  },
  {
    id: 'doc-class-meeting',
    monthYear: 'Juni 2024',
    title: 'Class Meeting Semester Ganjil',
    description: 'Turnamen futsal, bola voli antar angkatan, serta kontes logika catur cepat antar siswa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaB8XW6uRiaeIFLFhb9wtQvtD927Z6G8zlVtX1K0Ks-1XBno8iwIN3b2fGV1XsSYHiMNRL8seK9yxtinTEHfIvV40wLj0guHMIrjPc-RBMCHCbzCVD93GNCVg6qlQPiltgsqHfz5fgetIb0e7hJDGTM5P92YCQ0HO6JALPKBEn71apSryNmoQEfMCok-Yt0isQenwxG8KdzUYBrctpIewondl8hTz-SsZyUBw3kAPmonr1wy1tTI0',
    colSpanDesktop: 'md:col-span-5',
    aspectDesktop: 'aspect-[16/10] md:aspect-auto',
    category: 'Olahraga & Sportivitas',
    photographer: 'Sie Dokumentasi Classmeet'
  },
  {
    id: 'doc-sosial',
    monthYear: 'Agustus 2024',
    title: 'Aksi Peduli Sosial Adhirajasa',
    description: 'Penyaluran 450 paket perlengkapan sekolah dan bedah perpustakaan desa binaan di pelosok lereng bukit oleh perwakilan pengurus OSIS.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYRmukcUWif4lKiATeETqXjEXRqD-EswvNuFpwKkesXCLT8v-h-Z3dQW3kcX6YxHTp1lv6LV54GyulH2dq0uH9yd7m1yprk601OZ7eZf5g5pZRSdJLpgikB3WEBqy70bIc2Kr9l6yDdCZv-dvwrW55XaRx1wMGM6R2kzYrtpyeAo-Xoy5Of_5cgezROQx4Oevm7qs6C2WT9-3_0ut7ZjZEnDk3u7NyU5q4PQlMXbYDpL9a7Tc31-w',
    colSpanDesktop: 'md:col-span-7',
    aspectDesktop: 'aspect-[16/10]',
    category: 'Pengabdian Masyarakat',
    photographer: 'Tim Relawan Peduli Adhirajasa'
  }
];

export const PASLON_LIST: PaslonKandidat[] = [
  {
    id: 'paslon-01',
    number: '01',
    names: 'Agung & Indah',
    ketua: 'Agung Nawwaf Hilal Al-Rauf (XI FKK)',
    wakil: 'Indah (X PPLG 3)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF9T8VBGJY4mn2C6A6g7OnkUnjC8XFRPJpIe_j-52rLnnoyMxCpXKanMNB-1IkaMAtsxOI3AOlfJQkNDAQKN9SBX_zCHciFAmOGCv9n0RT9Ei-enpjis6zdu7uEixq33N2hVD2iJ6K_zq_GtXMTDLLoJVc8RXbZztd8TGuTVzlKU1kAHTzM6wcziQeYpxX9c760JnPC12OjESrT_8riFSAAJizrsGWGJq5eryKWRDh08QQtGv9wcE',
    badgeText: 'Terverifikasi KPU',
    slogan: 'Aspiratif, Berintegritas, Memimpin dengan Sains dan Nurani',
    vision: '"Mewujudkan OSIS Adhirajasa yang responsif, berwawasan global, dan menjunjung keadilan partisipasi pelajar melalui optimalisasi sains data aspirasi."',
    missions: [
      'Digitalisasi laporan pertanggungjawaban anggaran per triwulan secara publik.',
      'Penyediaan inkubator riset olimpiade sains dan debat bilingual.',
      'Gerakan ekologis bebas plastik dan audit sanitasi hijau kantin sekolah.'
    ],
    supportSignatures: 412,
    quickStats: [
      { label: 'Indeks Dukungan', value: '52.3%' },
      { label: 'Basis Suara Kelas', value: '18 Komite' },
      { label: 'Program Unggulan', value: 'Open Budgeting' }
    ]
  },
  {
    id: 'paslon-02',
    number: '02',
    names: 'Caca & Didi',
    ketua: 'Sri Cahyani (XI BD 1)',
    wakil: 'Ahmad Muzhadi (X PM 3)',
    image: "paslon2.JPG",
    badgeText: 'Terverifikasi KPU',
    slogan: 'Kolaborasi Nyata Menuju Harmoni Prestasi Civitas Almamater',
    vision: '"Menciptakan ekosistem almamater yang kolaboratif, memuliakan kebhinekaan minat, serta memperkuat solidaritas sosial siswa lintas jenjang kelas."',
    missions: [
      'Penyelenggaraan liga olahraga dan turnamen seni antarsekolah tingkat provinsi.',
      'Kemitraan pelatihan kepemimpinan profesional bersama ikatan alumni ternama.',
      'Penguatan ruang konseling sebaya dan advokasi kesehatan mental pelajar.'
    ],
    supportSignatures: 398,
    quickStats: [
      { label: 'Indeks Dukungan', value: '47.7%' },
      { label: 'Basis Suara Kelas', value: '16 Komite' },
      { label: 'Program Unggulan', value: 'Liga Seni Adhirajasa' }
    ]
  },
  {
    id: 'paslon-03',
    number: '03',
    names: 'Alfin & Nani',
    ketua: 'Alfin Febrianto Hidayat (XI RPL 2)',
    wakil: 'Nani (X PM 1)',
    image: paslon3.jpg,
    badgeText: 'Terverifikasi KPU',
    slogan: 'Inovasi Digital, Karakter Tangguh, Aksi Nyata untuk Seluruh Pelajar',
    vision: '"Mewujudkan OSIS SMAN 1 Adhirajasa yang inklusif, adaptif terhadap kemajuan era digital, serta menjadi episentrum kolaborasi dan inkubasi potensi pelajar."',
    missions: [
      'Digitalisasi layanan pengaduan aspirasi dan perizinan sub-organisasi melalui sistem satu pintu terpadu.',
      'Penyelenggaraan inkubator riset olimpiade sains serta fasilitasi talenta seni dan olahraga ke ajang nasional.',
      'Membangun gerakan kepedulian mental pelajar dan beasiswa gotong royong antar-alumni.'
    ],
    supportSignatures: 385,
    quickStats: [
      { label: 'Indeks Dukungan', value: '46.1%' },
      { label: 'Basis Suara Kelas', value: '15 Komite' },
      { label: 'Program Unggulan', value: 'Adhirajasa Smart Hub' }
    ]
  }
];

export const INITIAL_ASPIRASI: {
  id: string;
  name: string;
  grade: string;
  category: string;
  message: string;
  timestamp: string;
  ticketId: string;
}[] = [
  {
    id: 'asp-1',
    name: 'Anonim (Siswa RPL)',
    grade: 'Kelas XI (Sebelas)',
    category: 'Fasilitas & Sarana',
    message: 'Mohon perbaikan proyektor di ruang Lab RPL 2 pada komputernya',
    timestamp: '14 Sep 2026, 14:20 WIB',
    ticketId: 'ASP-ADH-8821'
  },
  {
    id: 'asp-2',
    name: 'Dimas S.',
    grade: 'Kelas X (Sepuluh)',
    category: 'Kegiatan Ekstrakurikuler',
    message: 'Apakah ekstrakurikuler Computer Club bisa menambah materi coding?',
    timestamp: '12 Sep 2026, 09:45 WIB',
    ticketId: 'ASP-ADH-8794'
  }
];

export { ALL_CABINET_MEMBERS } from './cabinetMembersData.ts';

