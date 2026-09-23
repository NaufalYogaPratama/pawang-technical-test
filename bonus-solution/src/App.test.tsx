import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

describe('Pawang.io Course Catalog & Syllabus Preview', () => {
  it('renders the main heading and course catalog', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Katalog Kelas AI Prompting/i })
    ).toBeInTheDocument();

    // Verify course cards are rendered
    expect(screen.getByText('ChatGPT buat Semua Orang')).toBeInTheDocument();
    expect(screen.getByText('Dasar Prompting')).toBeInTheDocument();
  });

  it('filters courses when user types in search input', () => {
    render(<App />);
    const searchInput = screen.getByRole('searchbox', {
      name: /Cari kelas prompting AI berdasarkan judul atau topik/i,
    });

    fireEvent.change(searchInput, { target: { value: 'skripsi' } });

    // Should match "Nulis Skripsi Lebih Cepat"
    expect(screen.getByText('Nulis Skripsi Lebih Cepat')).toBeInTheDocument();
    // Should filter out "Kenalan sama AI & Prompt"
    expect(screen.queryByText('Kenalan sama AI & Prompt')).not.toBeInTheDocument();
  });

  it('filters courses when clicking category tab', () => {
    render(<App />);
    const creatorTab = screen.getByRole('tab', { name: 'Kreator' });
    fireEvent.click(creatorTab);

    expect(screen.getByText('Bikin Konten dengan AI')).toBeInTheDocument();
    expect(screen.queryByText('Kenalan sama AI & Prompt')).not.toBeInTheDocument();
  });

  it('opens the open syllabus preview modal when clicking Tinjau Silabus', () => {
    render(<App />);
    const previewButtons = screen.getAllByRole('button', { name: /Tinjau silabus/i });
    fireEvent.click(previewButtons[0]);

    // Modal should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Silabus Terbuka \(Tinjau Sebelum Mulai\)/i)).toBeInTheDocument();
    expect(screen.getByText('Pratinjau Materi Terbuka')).toBeInTheDocument();
  });

  it('closes the syllabus modal when pressing Escape key', () => {
    render(<App />);
    const previewButtons = screen.getAllByRole('button', { name: /Tinjau silabus/i });
    fireEvent.click(previewButtons[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('provides an accessible streak indicator with tooltip for non-IT users', () => {
    render(<App />);
    const streakButton = screen.getByRole('button', {
      name: /Status progres belajar: 0 hari beruntun dan 0 poin/i,
    });
    expect(streakButton).toBeInTheDocument();

    // Hover to trigger tooltip
    fireEvent.mouseEnter(streakButton);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText(/Rekor Belajar Harian/i)).toBeInTheDocument();
  });
});
