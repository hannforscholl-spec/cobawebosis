export interface CabinetMember {
  id: string;
  name: string;
  role: string;
  division: 'BPH' | 'Sekbid I' | 'Sekbid II' | 'Sekbid III' | 'Sekbid IV' | 'Sekbid V' | 'Sekbid VI' | 'Sekbid VII' | 'Sekbid VIII' | 'Sekbid IX' | 'Sekbid X';
  divisionName: string;
  classGrade: string;
  nis: string;
  email: string;
  image: string;
  isCoordinator?: boolean;
  isBph?: boolean;
  bio?: string;
  instagram?: string;
}

export interface BphMember {
  id: string;
  name: string;
  role: string;
  classGrade: string;
  quote: string;
  nis: string;
  email: string;
  image: string;
  borderTopClass: string;
  badgeClass: string;
  fullBio?: string;
  instagram?: string;
}

export interface SekbidItem {
  id: string;
  numberLabel: string;
  title: string;
  description: string;
  coordinator: string;
  iconName: string;
  programs: string[];
  membersCount: number;
}

export interface ProgramKerjaItem {
  id: string;
  dateDay: string;
  dateYear: string;
  fullDate: string;
  status: 'Terlaksana' | 'Sedang Berjalan' | 'Mendatang';
  statusNote: string;
  skNumber: string;
  title: string;
  description: string;
  metrics: string[];
  objective?: string;
  location?: string;
  organizer?: string;
}

export interface DokumentasiItem {
  id: string;
  monthYear: string;
  title: string;
  description: string;
  image: string;
  colSpanDesktop: string;
  aspectDesktop?: string;
  category: string;
  photographer?: string;
}

export interface PaslonKandidat {
  id: string;
  number: string;
  names: string;
  ketua: string;
  wakil: string;
  image: string;
  badgeText: string;
  vision: string;
  missions: string[];
  supportSignatures: number;
  slogan: string;
  quickStats: { label: string; value: string }[];
}

export interface AspirasiRecord {
  id: string;
  name: string;
  grade: string;
  category: string;
  message: string;
  timestamp: string;
  ticketId: string;
}
