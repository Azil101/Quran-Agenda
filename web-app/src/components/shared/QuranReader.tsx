import React, { useState, useEffect } from 'react';
import { QuranService, Surah, Verse } from '../../services/quran.service';
import { Button, Card, CardHeader, CardTitle, CardContent, Select } from '../shared';
import { cn } from '../../lib/utils';

interface QuranReaderProps {
  mode?: 'student' | 'teacher';
  onSelectRange?: (fromSurah: number, fromAyah: number, toSurah: number, toAyah: number) => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({ mode = 'student', onSelectRange }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSurahInfo, setCurrentSurahInfo] = useState<Surah | null>(null);

  // Selection state for teachers
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState<{ surah: number; ayah: number } | null>(null);
  const [selectedTo, setSelectedTo] = useState<{ surah: number; ayah: number } | null>(null);

  // Load all surahs on mount
  useEffect(() => {
    loadSurahs();
  }, []);

  // Load verses when surah changes
  useEffect(() => {
    if (selectedSurah) {
      loadVerses(selectedSurah);
    }
  }, [selectedSurah, showTranslation]);

  const loadSurahs = async () => {
    try {
      const data = await QuranService.getAllSurahs();
      setSurahs(data);
    } catch (error) {
      console.error('Error loading surahs:', error);
    }
  };

  const loadVerses = async (surahId: number) => {
    setLoading(true);
    try {
      const surahInfo = await QuranService.getSurah(surahId);
      setCurrentSurahInfo(surahInfo);

      const response = await QuranService.getVerses(surahId, 1, 286, showTranslation);
      setVerses(response.verses);
    } catch (error) {
      console.error('Error loading verses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerseClick = (verse: Verse) => {
    if (mode === 'teacher' && selectionMode) {
      if (!selectedFrom) {
        setSelectedFrom({ surah: selectedSurah, ayah: verse.verse_number });
      } else if (!selectedTo) {
        setSelectedTo({ surah: selectedSurah, ayah: verse.verse_number });
      } else {
        // Reset and start new selection
        setSelectedFrom({ surah: selectedSurah, ayah: verse.verse_number });
        setSelectedTo(null);
      }
    }
  };

  const handleConfirmSelection = () => {
    if (selectedFrom && selectedTo && onSelectRange) {
      onSelectRange(
        selectedFrom.surah,
        selectedFrom.ayah,
        selectedTo.surah,
        selectedTo.ayah
      );
      setSelectionMode(false);
      setSelectedFrom(null);
      setSelectedTo(null);
    }
  };

  const isVerseInRange = (verse: Verse) => {
    if (!selectedFrom) return false;
    if (!selectedTo) return verse.verse_number === selectedFrom.ayah;

    const fromAyah = Math.min(selectedFrom.ayah, selectedTo.ayah);
    const toAyah = Math.max(selectedFrom.ayah, selectedTo.ayah);

    return verse.verse_number >= fromAyah && verse.verse_number <= toAyah;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quran Reader</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Surah Selection */}
            <Select
              label="Select Surah"
              value={String(selectedSurah)}
              onChange={(e) => setSelectedSurah(Number(e.target.value))}
              options={surahs.map((surah) => ({
                value: String(surah.id),
                label: `${surah.id}. ${surah.name_simple} - ${surah.name_arabic}`,
              }))}
            />

            <div className="flex items-end gap-2">
              <Button
                variant={showTranslation ? 'primary' : 'outline'}
                onClick={() => setShowTranslation(!showTranslation)}
                className="flex-1"
              >
                {showTranslation ? 'Hide' : 'Show'} Translation
              </Button>

              {mode === 'teacher' && (
                <Button
                  variant={selectionMode ? 'primary' : 'outline'}
                  onClick={() => {
                    setSelectionMode(!selectionMode);
                    setSelectedFrom(null);
                    setSelectedTo(null);
                  }}
                  className="flex-1"
                >
                  {selectionMode ? 'Cancel Selection' : 'Select Range'}
                </Button>
              )}
            </div>
          </div>

          {/* Selection Info for Teachers */}
          {mode === 'teacher' && selectionMode && (
            <div className="bg-primary/10 border border-primary rounded-md p-4">
              <p className="text-sm font-medium mb-2">
                Click verses to select a range for lesson assignment
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  From: {selectedFrom ? `${selectedFrom.surah}:${selectedFrom.ayah}` : '--'}
                </div>
                <div>
                  To: {selectedTo ? `${selectedTo.surah}:${selectedTo.ayah}` : '--'}
                </div>
                {selectedFrom && selectedTo && (
                  <Button size="sm" onClick={handleConfirmSelection}>
                    Confirm Selection
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Surah Info */}
          {currentSurahInfo && (
            <div className="bg-muted rounded-md p-4">
              <h3 className="text-lg font-bold text-center mb-2">
                {currentSurahInfo.name_arabic}
              </h3>
              <p className="text-center text-sm text-muted-foreground">
                {currentSurahInfo.name_simple} • {currentSurahInfo.translated_name.name}
              </p>
              <p className="text-center text-xs text-muted-foreground mt-1">
                {currentSurahInfo.revelation_place} • {currentSurahInfo.verses_count} verses
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bismillah */}
      {selectedSurah !== 1 && selectedSurah !== 9 && (
        <div className="text-center arabic-text text-3xl py-6">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
      )}

      {/* Verses */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading verses...</p>
          </div>
        ) : (
          verses.map((verse) => (
            <Card
              key={verse.id}
              className={cn(
                'transition-all',
                mode === 'teacher' && selectionMode && 'cursor-pointer hover:border-primary',
                isVerseInRange(verse) && 'border-primary bg-primary/5'
              )}
              onClick={() => handleVerseClick(verse)}
            >
              <CardContent className="p-6">
                {/* Verse Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {verse.verse_number}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {currentSurahInfo?.name_simple} {verse.verse_number}
                    </span>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="arabic-text text-2xl md:text-3xl leading-loose text-right mb-4">
                  {verse.text_uthmani}
                </div>

                {/* Translation */}
                {showTranslation && verse.translations && verse.translations.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {verse.translations[0].text}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
