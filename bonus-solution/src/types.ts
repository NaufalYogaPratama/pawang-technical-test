export type Level = 'Dasar' | 'Menengah' | 'Mahir';
export type Category = 'Semua' | 'Dasar' | 'Menengah' | 'Mahir' | 'Mahasiswa' | 'Kreator' | 'Kantor';

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  slug: string;
  summary: string;
  keyTakeaways: string[];
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  moduleNumber: string;
  title: string;
  lessons: Lesson[];
  hasQuiz?: boolean;
  quizTitle?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: Level;
  categories: Category[];
  durationText: string;
  lessonCount: number;
  moduleCount: number;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  modules: Module[];
}
