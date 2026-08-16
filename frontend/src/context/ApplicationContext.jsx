import { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Holds the in-progress multi-step loan application so every step
// component (PersonalDetailsForm, EmploymentForm, ...) can read/write
// a shared draft without prop-drilling, and so progress survives
// moving between steps.

const STORAGE_KEY = 'credifast_application_draft';

const emptyDraft = {
  personal: {},
  employment: {},
  loan: {},
  credit: {},
  existingLoans: [],
  hasExistingLoans: null,
};

function loadDraft() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyDraft, ...JSON.parse(raw) } : emptyDraft;
  } catch {
    return emptyDraft;
  }
}

const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const [draft, setDraft] = useState(loadDraft);
  const [currentStep, setCurrentStep] = useState(0);
  const [submittedApplication, setSubmittedApplication] = useState(null);

  const persist = useCallback((next) => {
    setDraft(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* sessionStorage may be unavailable — safe to ignore in a demo */
    }
  }, []);

  const updateSection = useCallback(
    (section, values) => {
      persist({ ...draft, [section]: { ...draft[section], ...values } });
    },
    [draft, persist]
  );

  const setExistingLoans = useCallback(
    (loans) => {
      persist({ ...draft, existingLoans: loans });
    },
    [draft, persist]
  );

  const setHasExistingLoans = useCallback(
    (value) => {
      persist({ ...draft, hasExistingLoans: value, existingLoans: value ? draft.existingLoans : [] });
    },
    [draft, persist]
  );

  const resetDraft = useCallback(() => {
    persist(emptyDraft);
    setCurrentStep(0);
  }, [persist]);

  const value = useMemo(
    () => ({
      draft,
      currentStep,
      setCurrentStep,
      updateSection,
      setExistingLoans,
      setHasExistingLoans,
      resetDraft,
      submittedApplication,
      setSubmittedApplication,
    }),
    [draft, currentStep, updateSection, setExistingLoans, setHasExistingLoans, resetDraft, submittedApplication]
  );

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}

export function useApplication() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error('useApplication must be used within an ApplicationProvider');
  return ctx;
}
