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
  const savedTheme = localStorage.getItem('theme');
  const validTheme = (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') ? savedTheme : 'system';
  theme.value = validTheme;
  applyTheme(validTheme);
  
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
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    theme.value = nextTheme;
    
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return {
    theme,
    isDark,
    toggleTheme
  };
};