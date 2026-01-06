import { ref } from 'vue';

const theme = ref<'light' | 'dark' | 'system'>('system');
const isDark = ref(true);

// Get system preference
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme to DOM
const applyTheme = (themeValue: 'light' | 'dark' | 'system') => {
  const actualTheme = themeValue === 'system' ? getSystemTheme() : themeValue;
  isDark.value = actualTheme === 'dark';
  
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(actualTheme);
};

// Initialize
if (typeof window !== 'undefined') {
  const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
  theme.value = savedTheme;
  applyTheme(savedTheme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (theme.value === 'system') {
      applyTheme('system');
    }
  });
}

export const useTheme = () => {
  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme.value);
    theme.value = themes[(currentIndex + 1) % themes.length];
    
    applyTheme(theme.value);
    localStorage.setItem('theme', theme.value);
  };

  return {
    theme,
    isDark,
    toggleTheme
  };
};