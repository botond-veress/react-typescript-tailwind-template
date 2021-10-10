import React from 'react';

export const App: React.FC = () => (
  <div className="max-w-7xl mx-auto space-y-4">
    <header>
      <small className="text-small text-gray-500 font-semibold tracking-wide uppercase">Header</small>
    </header>

    <main>
      <small className="text-small text-gray-500 font-semibold tracking-wide uppercase">Main</small>
    </main>

    <footer className="divide-y-2 divide-gray-900">
      <small className="text-small text-gray-500 font-semibold tracking-wide uppercase">Footer</small>
    </footer>
  </div>
);
