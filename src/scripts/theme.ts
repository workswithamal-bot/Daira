// Runs inline in <head> before paint to avoid a flash. Remembers the choice.
export const themeInit = `(function(){try{var s=localStorage.getItem('daira-theme');var t=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;}catch(e){}document.documentElement.classList.add('js');})();`;
