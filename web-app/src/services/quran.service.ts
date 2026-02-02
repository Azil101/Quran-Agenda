import axios from 'axios';
import { logger } from '../lib/logger';
import { QURAN_API, RECITERS } from '../lib/constants';

const QURAN_API_BASE_URL = import.meta.env.VITE_QURAN_API_BASE_URL || 'https://api.quran.com/api/v4';

export interface Surah {
  id: number;
  revelation_place: string;
  name_simple: string;
  name_arabic: string;
  verses_count: number;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  translations?: Translation[];
}

export interface Translation {
  id: number;
  resource_id: number;
  text: string;
}

export interface ChapterResponse {
  chapter: Surah;
}

export interface VersesResponse {
  verses: Verse[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
}

export class QuranService {
  /**
   * Get all surahs (chapters)
   */
  static async getAllSurahs(): Promise<Surah[]> {
    try {
      const response = await axios.get(`${QURAN_API_BASE_URL}/chapters`);
      return response.data.chapters;
    } catch (error) {
      logger.error('Failed to fetch Quran chapters', error);
      throw new Error('Failed to fetch Quran chapters');
    }
  }

  /**
   * Get a specific surah by ID
   */
  static async getSurah(surahId: number): Promise<Surah> {
    try {
      const response = await axios.get<ChapterResponse>(
        `${QURAN_API_BASE_URL}/chapters/${surahId}`
      );
      return response.data.chapter;
    } catch (error) {
      logger.error(`Failed to fetch Surah ${surahId}`, error);
      throw new Error(`Failed to fetch Surah ${surahId}`);
    }
  }

  /**
   * Get verses for a specific surah
   * @param surahId - The surah number (1-114)
   * @param page - Page number for pagination
   * @param perPage - Number of verses per page
   * @param includeTranslation - Include English translation (ID 131 - Dr. Mustafa Khattab)
   */
  static async getVerses(
    surahId: number,
    page: number = 1,
    perPage: number = 50,
    includeTranslation: boolean = false
  ): Promise<VersesResponse> {
    try {
      const params: Record<string, string | number> = {
        page,
        per_page: perPage,
        // CRITICAL: Must explicitly request text_uthmani field from API v4
        fields: 'text_uthmani',
      };

      // Add translation parameter if requested
      if (includeTranslation) {
        params.translations = QURAN_API.DEFAULT_TRANSLATION_ID;
      }

      const response = await axios.get<VersesResponse>(
        `${QURAN_API_BASE_URL}/verses/by_chapter/${surahId}`,
        { params }
      );

      return response.data;
    } catch (error) {
      logger.error(`Failed to fetch verses for Surah ${surahId}`, error);
      throw new Error(`Failed to fetch verses for Surah ${surahId}`);
    }
  }

  /**
   * Get a specific verse by surah and ayah number
   */
  static async getVerse(
    surahId: number,
    ayahNumber: number,
    includeTranslation: boolean = false
  ): Promise<Verse> {
    try {
      const params: Record<string, string | number> = {
        // CRITICAL: Must explicitly request text_uthmani field from API v4
        fields: 'text_uthmani',
      };

      if (includeTranslation) {
        params.translations = QURAN_API.DEFAULT_TRANSLATION_ID;
      }

      const verseKey = `${surahId}:${ayahNumber}`;
      const response = await axios.get(
        `${QURAN_API_BASE_URL}/verses/by_key/${verseKey}`,
        { params }
      );

      return response.data.verse;
    } catch (error) {
      logger.error(`Failed to fetch verse ${surahId}:${ayahNumber}`, error);
      throw new Error(`Failed to fetch verse ${surahId}:${ayahNumber}`);
    }
  }

  /**
   * Get verses by Juz (para)
   */
  static async getVersesByJuz(
    juzNumber: number,
    includeTranslation: boolean = false
  ): Promise<Verse[]> {
    try {
      const params: Record<string, string | number> = {
        // CRITICAL: Must explicitly request text_uthmani field from API v4
        fields: 'text_uthmani',
      };

      if (includeTranslation) {
        params.translations = QURAN_API.DEFAULT_TRANSLATION_ID;
      }

      const response = await axios.get(
        `${QURAN_API_BASE_URL}/verses/by_juz/${juzNumber}`,
        { params }
      );

      return response.data.verses;
    } catch (error) {
      logger.error(`Failed to fetch Juz ${juzNumber}`, error);
      throw new Error(`Failed to fetch Juz ${juzNumber}`);
    }
  }

  /**
   * Get verses by page (mushaf page)
   */
  static async getVersesByPage(
    pageNumber: number,
    includeTranslation: boolean = false
  ): Promise<Verse[]> {
    try {
      const params: Record<string, string | number> = {
        // CRITICAL: Must explicitly request text_uthmani field from API v4
        fields: 'text_uthmani',
      };

      if (includeTranslation) {
        params.translations = QURAN_API.DEFAULT_TRANSLATION_ID;
      }

      const response = await axios.get(
        `${QURAN_API_BASE_URL}/verses/by_page/${pageNumber}`,
        { params }
      );

      return response.data.verses;
    } catch (error) {
      logger.error(`Failed to fetch page ${pageNumber}`, error);
      throw new Error(`Failed to fetch page ${pageNumber}`);
    }
  }

  /**
   * Search verses by keyword
   */
  static async searchVerses(query: string, page: number = 1): Promise<{ search: { results: Verse[] } }> {
    try {
      const response = await axios.get(`${QURAN_API_BASE_URL}/search`, {
        params: {
          q: query,
          page,
          size: 20,
        },
      });

      return response.data;
    } catch (error) {
      logger.error('Failed to search verses', error);
      throw new Error('Failed to search verses');
    }
  }

  /**
   * Get audio recitation URL for a surah
   * @param surahId - The surah number
   */
  static getAudioUrl(surahId: number): string {
    const paddedSurah = String(surahId).padStart(3, '0');
    return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${paddedSurah}.mp3`;
  }

  /**
   * Get popular reciters list
   */
  static getReciters() {
    return RECITERS.POPULAR;
  }
}
