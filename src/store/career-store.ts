'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ScenarioFormData,
  GeneratedScenario,
  FeedbackTag,
  SavedPath,
  EvaluationStatus,
} from '@/lib/types';
import { DEFAULT_FORM_DATA } from '@/lib/mock-data';

interface CareerStore {
  // ─── App State ─────────────────────────────────────
  userRole: 'employee' | 'hr';
  setUserRole: (role: 'employee' | 'hr') => void;

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
  activeSavedPathId: string | null;
  setActiveSavedPathId: (id: string | null) => void;
  savePath: () => void;
  loadSavedPath: (id: string) => void;
  deleteSavedPath: (id: string) => void;
  updatePathStatus: (id: string, status: EvaluationStatus, hrFeedback?: string) => void;
}

export const useCareerStore = create<CareerStore>()(
  persist(
    (set, get) => ({
      // ─── App State ────────────────────────────────
      userRole: 'employee',
      setUserRole: (role) => set({ userRole: role }),

      // ─── Form ────────────────────────────────────────
      formData: { ...DEFAULT_FORM_DATA },
      setFormField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),
      resetForm: () => set({ formData: { ...DEFAULT_FORM_DATA }, activeSavedPathId: null }),
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
      activeSavedPathId: null,
      setActiveSavedPathId: (id) => set({ activeSavedPathId: id }),
      savePath: () => {
        const state = get();
        if (!state.scenario) return;
        
        // If we're viewing an active path, user might be updating it rather than creating new
        if (state.activeSavedPathId) {
          set((s) => ({
            savedPaths: s.savedPaths.map((p) =>
              p.id === state.activeSavedPathId
                ? {
                    ...p,
                    formData: { ...state.formData },
                    scenario: state.scenario!,
                    annotations: state.annotations,
                    feedbackTags: [...state.feedbackTags],
                  }
                : p
            ),
          }));
          return;
        }

        const newPath: SavedPath = {
          id: `path-${Date.now()}`,
          timestamp: Date.now(),
          formData: { ...state.formData },
          scenario: state.scenario,
          annotations: state.annotations,
          feedbackTags: [...state.feedbackTags],
          status: 'pending',
        };
        set((s) => ({ savedPaths: [...s.savedPaths, newPath], activeSavedPathId: newPath.id }));
      },
      loadSavedPath: (id: string) => {
        const state = get();
        const pathToLoad = state.savedPaths.find((p) => p.id === id);
        if (pathToLoad) {
          set({
            formData: { ...pathToLoad.formData },
            scenario: pathToLoad.scenario,
            annotations: pathToLoad.annotations || '',
            feedbackTags: pathToLoad.feedbackTags || [],
            activeSavedPathId: id,
          });
        }
      },
      deleteSavedPath: (id) =>
        set((s) => ({
          savedPaths: s.savedPaths.filter((p) => p.id !== id),
        })),
      updatePathStatus: (id, status, hrFeedback?: string) =>
        set((s) => ({
          savedPaths: s.savedPaths.map((p) =>
            p.id === id ? { ...p, status, hrFeedback: hrFeedback ?? p.hrFeedback } : p
          ),
        })),
    }),
    {
      name: 'career-sandbox-storage',
      partialize: (state) => ({
        savedPaths: state.savedPaths,
        formData: state.formData,
        userRole: state.userRole,
      }),
    }
  )
);
