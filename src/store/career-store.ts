'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ScenarioFormData,
  GeneratedScenario,
  FeedbackTag,
  SavedPath,
} from '@/lib/types';
import { DEFAULT_FORM_DATA } from '@/lib/mock-data';

interface CareerStore {
  // ─── Form state ─────────────────────────────────────
  formData: ScenarioFormData;
  setFormField: <K extends keyof ScenarioFormData>(field: K, value: ScenarioFormData[K]) => void;
  resetForm: () => void;
  setFormData: (data: ScenarioFormData) => void;

  // ─── Generated scenario ─────────────────────────────
  scenario: GeneratedScenario | null;
  setScenario: (s: GeneratedScenario | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;

  // ─── Loading / Error ────────────────────────────────
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
  errorState: 'none' | 'high-uncertainty' | 'offline';
  setErrorState: (s: 'none' | 'high-uncertainty' | 'offline') => void;

  // ─── Feedback ───────────────────────────────────────
  annotations: string;
  setAnnotations: (a: string) => void;
  feedbackTags: FeedbackTag[];
  toggleTag: (tag: FeedbackTag) => void;
  resetFeedback: () => void;

  // ─── Saved paths ───────────────────────────────────
  savedPaths: SavedPath[];
  savePath: () => void;
  deleteSavedPath: (id: string) => void;
}

export const useCareerStore = create<CareerStore>()(
  persist(
    (set, get) => ({
      // ─── Form ────────────────────────────────────────
      formData: { ...DEFAULT_FORM_DATA },
      setFormField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),
      resetForm: () => set({ formData: { ...DEFAULT_FORM_DATA } }),
      setFormData: (data) => set({ formData: data }),

      // ─── Scenario ───────────────────────────────────
      scenario: null,
      setScenario: (s) => set({ scenario: s }),
      selectedNodeId: null,
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),

      // ─── Loading / Error ────────────────────────────
      isGenerating: false,
      setIsGenerating: (v) => set({ isGenerating: v }),
      errorState: 'none',
      setErrorState: (s) => set({ errorState: s }),

      // ─── Feedback ──────────────────────────────────
      annotations: '',
      setAnnotations: (a) => set({ annotations: a }),
      feedbackTags: [],
      toggleTag: (tag) =>
        set((state) => ({
          feedbackTags: state.feedbackTags.includes(tag)
            ? state.feedbackTags.filter((t) => t !== tag)
            : [...state.feedbackTags, tag],
        })),
      resetFeedback: () => set({ annotations: '', feedbackTags: [] }),

      // ─── Saved Paths ──────────────────────────────
      savedPaths: [],
      savePath: () => {
        const state = get();
        if (!state.scenario) return;
        const newPath: SavedPath = {
          id: `path-${Date.now()}`,
          timestamp: Date.now(),
          formData: { ...state.formData },
          scenario: state.scenario,
          annotations: state.annotations,
          feedbackTags: [...state.feedbackTags],
        };
        set((s) => ({ savedPaths: [...s.savedPaths, newPath] }));
      },
      deleteSavedPath: (id) =>
        set((s) => ({
          savedPaths: s.savedPaths.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'career-sandbox-storage',
      partialize: (state) => ({
        savedPaths: state.savedPaths,
        formData: state.formData,
      }),
    }
  )
);
