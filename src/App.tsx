import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OperatorSandbox } from './components/OperatorSandbox';
import { DecisionStructures } from './components/DecisionStructures';
import { ExpressionInspector } from './components/ExpressionInspector';
import { OperatorCheatsheet } from './components/OperatorCheatsheet';
import { QuizArena } from './components/QuizArena';
import { Footer } from './components/Footer';
import { OperatorCategory } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('sandbox');
  const [sandboxCategory, setSandboxCategory] = useState<OperatorCategory>('arithmetic');

  const handleSelectCategoryFromHero = (categoryId: string) => {
    setSandboxCategory(categoryId as OperatorCategory);
    setActiveTab('sandbox');
    const el = document.getElementById('sandbox');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreDecisions = () => {
    setActiveTab('decisions');
    const el = document.getElementById('decisions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTakeQuiz = () => {
    setActiveTab('quiz');
    const el = document.getElementById('quiz');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    const el = document.getElementById(tab);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-600/30 selection:text-indigo-200">
      {/* Top Bar with 3-Zone Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavClick}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectCategory={handleSelectCategoryFromHero}
          onExploreDecisions={handleExploreDecisions}
          onTakeQuiz={handleTakeQuiz}
        />

        {/* 1. Interactive Operator Sandbox */}
        <OperatorSandbox initialCategory={sandboxCategory} />

        {/* 2. Decision Structures & Dynamic Code Execution */}
        <DecisionStructures />

        {/* 3. Live Expression Evaluator (REPL) */}
        <ExpressionInspector />

        {/* 4. Complete Operator Cheatsheet & Precedence Table */}
        <OperatorCheatsheet />

        {/* 5. Interactive Quiz & Certified by Enes Öztürk */}
        <QuizArena />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavClick} />
    </div>
  );
}
