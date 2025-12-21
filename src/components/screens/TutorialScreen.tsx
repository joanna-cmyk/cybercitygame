import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Globe, Mail, Package, Lock, Home, Building, ExternalLink, AlertTriangle, CheckCircle, Check } from 'lucide-react';
import { verificationTools } from '@/data/gameData';

type TabType = 'websites' | 'emails' | 'shortlinks';

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'websites', label: 'Websites', icon: <Globe className="w-4 h-4" /> },
  { id: 'emails', label: 'Emails', icon: <Mail className="w-4 h-4" /> },
  { id: 'shortlinks', label: 'Short Links', icon: <Package className="w-4 h-4" /> },
];

export function TutorialScreen() {
  const { setCurrentScreen } = useGame();
  const [activeTab, setActiveTab] = useState<TabType>('websites');
  const [completedTabs, setCompletedTabs] = useState<Set<TabType>>(new Set());

  const currentIndex = tabs.findIndex(t => t.id === activeTab);
  const isFirstTab = currentIndex === 0;
  const isLastTab = currentIndex === tabs.length - 1;

  const goToNextTab = () => {
    setCompletedTabs(prev => new Set([...prev, activeTab]));
    if (!isLastTab) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const goToPrevTab = () => {
    if (!isFirstTab) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const canAccessTab = (tabId: TabType) => {
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    if (tabIndex === 0) return true;
    return completedTabs.has(tabs[tabIndex - 1].id);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setCurrentScreen('title')} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h1 className="text-lg font-bold text-foreground">Understanding Links & Emails</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Understanding Links & Emails</h2>
          <p className="text-muted-foreground">Learn to identify the important parts of web addresses and emails</p>
        </div>

        {/* Tabs with completion indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const isCompleted = completedTabs.has(tab.id);
            const isActive = activeTab === tab.id;
            const isAccessible = canAccessTab(tab.id);

            return (
              <button
                key={tab.id}
                onClick={() => isAccessible && setActiveTab(tab.id)}
                disabled={!isAccessible}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive ? 'bg-primary text-primary-foreground' :
                  isCompleted ? 'bg-success/10 text-success border border-success/30' :
                  isAccessible ? 'bg-muted text-muted-foreground hover:bg-muted/80' :
                  'bg-muted/50 text-muted-foreground/50 cursor-not-allowed'
                }`}
              >
                {isCompleted && !isActive ? <Check className="w-4 h-4" /> : tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          {activeTab === 'websites' && <WebsitesTab />}
          {activeTab === 'emails' && <EmailsTab />}
          {activeTab === 'shortlinks' && <ShortLinksTab />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={goToPrevTab} disabled={isFirstTab} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Previous Tab
          </Button>
          {isLastTab ? (
            <Button onClick={() => setCurrentScreen('round1')} size="lg" className="font-semibold text-lg px-8">
              I Understand - Start Game <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button onClick={goToNextTab} className="flex items-center gap-2">
              Go to Next Tab <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

function WebsitesTab() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl mb-4 block">🏠</span>
        <h3 className="text-xl font-bold text-foreground mb-2">Website Structure</h3>
        <p className="text-muted-foreground">Think of a website like visiting someone's home!</p>
      </div>

      <div className="bg-muted rounded-xl p-4 font-mono text-center">
        <span className="text-lg">https://www.<span className="text-orange-600 font-bold">pnbindia.in</span>/netbanking</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-success/5 rounded-lg border border-success/20">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-success" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">https:// = Safe door with lock</h4>
            <p className="text-sm text-muted-foreground mt-1">
              <AlertTriangle className="w-4 h-4 inline text-orange-600 mr-1" />
              Warning: Even scammers use https these days!
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <Home className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">pnbindia.in = The REAL house name</h4>
            <p className="text-sm text-muted-foreground mt-1">⭐ MOST IMPORTANT - Always verify this part!</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-muted rounded-lg border border-border">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border">
            <Building className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">/netbanking = Like a room inside the house</h4>
            <p className="text-sm text-muted-foreground mt-1">This is just the page path.</p>
          </div>
        </div>
      </div>

      <ToolsSection tools={verificationTools.websites} />
    </div>
  );
}

function EmailsTab() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl mb-4 block">📧</span>
        <h3 className="text-xl font-bold text-foreground mb-2">Email Structure</h3>
        <p className="text-muted-foreground">Think of email like sending a letter by post!</p>
      </div>

      <div className="bg-muted rounded-xl p-4 font-mono text-center">
        <span className="text-lg">
          <span className="text-success">customercare</span>
          <span className="text-primary">@</span>
          <span className="text-orange-600 font-bold">pnb.co.in</span>
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-success/5 rounded-lg border border-success/20">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <span className="text-lg">✉️</span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">customercare = Who the letter belongs to</h4>
            <p className="text-sm text-muted-foreground mt-1">In this case: Customer Care Team</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-lg">📍</span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">@ = "Located at" / "Sitting at"</h4>
            <p className="text-sm text-muted-foreground mt-1">Connects the person to their organization</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <span className="text-lg">🏢</span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">pnb.co.in = The building's name and location</h4>
            <p className="text-sm text-muted-foreground mt-1">Customer Care Team of PNB Bank</p>
          </div>
        </div>
      </div>

      <ToolsSection tools={verificationTools.emails} />
    </div>
  );
}

function ShortLinksTab() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl mb-4 block">📦</span>
        <h3 className="text-xl font-bold text-foreground mb-2">Short Links</h3>
        <p className="text-muted-foreground">Short links are like sealed envelopes!</p>
      </div>

      <div className="bg-muted rounded-xl p-6 text-center">
        <p className="text-muted-foreground mb-3">Have you ever seen links like:</p>
        <div className="space-y-2 font-mono">
          <p className="text-foreground">https://sw.run/abcd12</p>
          <p className="text-foreground">https://bit.ly/3Bg19uM</p>
        </div>
      </div>

      <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
        <p className="text-foreground">Just like you can't see what's inside a sealed envelope, <strong className="text-orange-600">short links HIDE the real website.</strong></p>
      </div>

      <div className="p-4 bg-destructive/5 rounded-xl border border-destructive/20">
        <h4 className="font-semibold text-destructive flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5" /> Hidden dangers may contain:
        </h4>
        <p className="text-sm text-foreground">Harmful viruses that steal passwords, banking details, and personal info</p>
      </div>

      <div className="p-6 bg-success/10 rounded-xl border-2 border-success">
        <h4 className="text-xl font-bold text-success mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" /> Golden Rule
        </h4>
        <p className="text-lg font-semibold text-foreground mb-4">NEVER open them directly!</p>
        <div className="space-y-2">
          {['COPY the link (don\'t click)', 'Paste into URL expander tools', 'Scan with virustotal.com if needed', 'Then decide to open or delete'].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-bold">{i + 1}</span>
              <span className="text-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <ToolsSection tools={verificationTools.shortLinks} />
    </div>
  );
}

function ToolsSection({ tools }: { tools: { name: string; desc: string; url: string }[] }) {
  return (
    <div>
      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">🔧 Tools to Investigate</h4>
      <div className="grid gap-3">
        {tools.map(tool => (
          <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-info/5 rounded-lg border border-info/20 hover:bg-info/10 transition-colors group">
            <div>
              <span className="font-mono font-semibold text-info">{tool.name}</span>
              <p className="text-sm text-muted-foreground">{tool.desc}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-info group-hover:translate-x-1 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
}
