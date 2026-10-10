import React, { useState, useEffect } from 'react';
import { PageId, ClimateIndicatorId, ClimateArticle } from './types/climate';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { ArticleModal } from './components/ArticleModal';

// Views
import { HomeView } from './views/HomeView';
import { WorldMapView } from './views/WorldMapView';
import { DataExplorerView } from './views/DataExplorerView';
import { CompareView } from './views/CompareView';
import { ClimateRisksView } from './views/ClimateRisksView';
import { AiInsightsView } from './views/AiInsightsView';
import { ArticlesView } from './views/ArticlesView';
import { AboutView } from './views/AboutView';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedBaseline, setSelectedBaseline] = useState('1850-1900');

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<ClimateArticle | null>(null);

  // Cross-page state transfers
  const [explorerIndicator, setExplorerIndicator] = useState<ClimateIndicatorId>('temperature');
  const [compareRegionA, setCompareRegionA] = useState<string>('in');
  const [compareRegionB, setCompareRegionB] = useState<string>('us');
  const [risksRegionId, setRisksRegionId] = useState<string>('in');

  // Global CMD+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handlers with contextual parameters
  const handleNavigateToExplorer = (indicator: ClimateIndicatorId) => {
    setExplorerIndicator(indicator);
    setActivePage('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCompare = (regionA: string, regionB?: string) => {
    setCompareRegionA(regionA);
    if (regionB) setCompareRegionB(regionB);
    setActivePage('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSearchRegion = (regionId: string) => {
    setRisksRegionId(regionId);
    setCompareRegionA(regionId);
  };

  const handlePageChange = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      <div className="flex-1 flex w-full">
        {/* Desktop Persistent Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={handlePageChange}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Global Navigation Bar */}
          <Header
            activePage={activePage}
            onNavigate={handlePageChange}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenAuth={() => setAuthOpen(true)}
            selectedBaseline={selectedBaseline}
            onChangeBaseline={setSelectedBaseline}
          />

          {/* Page View Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
            {activePage === 'home' && (
              <HomeView
                onNavigate={handlePageChange}
                onSelectIndicator={handleNavigateToExplorer}
                onSelectArticle={(art) => setActiveArticle(art)}
              />
            )}

            {activePage === 'map' && (
              <WorldMapView
                onNavigateToCompareWithRegion={(regId) => handleNavigateToCompare(regId, 'global')}
                onNavigateToExplorerWithIndicator={handleNavigateToExplorer}
              />
            )}

            {activePage === 'explorer' && (
              <DataExplorerView
                initialIndicator={explorerIndicator}
                onNavigateToCompare={(a, b) => handleNavigateToCompare(a, b)}
              />
            )}

            {activePage === 'compare' && (
              <CompareView
                initialRegionA={compareRegionA}
                initialRegionB={compareRegionB}
              />
            )}

            {activePage === 'risks' && (
              <ClimateRisksView initialRegionId={risksRegionId} />
            )}

            {activePage === 'ai-insights' && <AiInsightsView />}

            {activePage === 'articles' && (
              <ArticlesView onSelectArticle={(art) => setActiveArticle(art)} />
            )}

            {activePage === 'about' && <AboutView />}
          </main>

          {/* Universal Footer */}
          <Footer onNavigate={handlePageChange} />
        </div>
      </div>

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handlePageChange}
        onSelectIndicator={handleNavigateToExplorer}
        onSelectRegion={handleSelectSearchRegion}
        onSelectArticle={(art) => setActiveArticle(art)}
      />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </div>
  );
}
