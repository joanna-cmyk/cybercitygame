import { useState, useMemo } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { websiteUrls, domainExtensions, redFlagPatterns, verificationTools, UrlItem } from '@/data/gameData';

type SortCategory = 'unsorted' | 'real' | 'fake';

interface SortedItem extends UrlItem {
  sortedTo: SortCategory;
}

export function Round1Screen() {
  const { setCurrentScreen, updateScore } = useGame();
  const [items, setItems] = useState<SortedItem[]>(
    () => shuffleArray(websiteUrls).map(item => ({ ...item, sortedTo: 'unsorted' as SortCategory }))
  );
  const [showHints, setShowHints] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ correct: number; total: number } | null>(null);

  const categorized = useMemo(() => ({
    unsorted: items.filter(i => i.sortedTo === 'unsorted'),
    real: items.filter(i => i.sortedTo === 'real'),
    fake: items.filter(i => i.sortedTo === 'fake'),
  }), [items]);

  const moveItem = (id: string, to: SortCategory) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, sortedTo: to } : item
    ));
  };

  const handleSubmit = () => {
    let correct = 0;
    items.forEach(item => {
      const userAnswer = item.sortedTo;
      const correctAnswer = item.isReal ? 'real' : 'fake';
      if (userAnswer === correctAnswer) correct++;
    });
    setResults({ correct, total: items.length });
    updateScore('round1', correct * 2); // 2 points per correct answer, max 20
    setSubmitted(true);
  };

  if (submitted && results) {
    return <Round1Results items={items} results={results} onContinue={() => setCurrentScreen('round2')} onBack={() => setSubmitted(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setCurrentScreen('tutorial')} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-foreground">🌐 Round 1: Real vs Fake Websites</h1>
            <p className="text-sm text-muted-foreground">Sort each URL into the correct category</p>
          </div>
          <div className="badge-info text-sm font-semibold px-3 py-1">
            Score: {categorized.real.length + categorized.fake.length}/{items.length}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hints Box */}
        <div className="mb-6 bg-card rounded-xl border border-border overflow-hidden">
          <button
            onClick={() => setShowHints(!showHints)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <span className="font-semibold text-foreground">🎯 Key Things to Remember</span>
            {showHints ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>
          {showHints && (
            <div className="p-4 pt-0 border-t border-border space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-2">📍 Domain Extensions</h4>
                <div className="flex flex-wrap gap-2">
                  {domainExtensions.map(d => (
                    <span key={d.ext} className="badge-info">{d.ext} - {d.desc}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-2">🚩 Red Flags</h4>
                <div className="flex flex-wrap gap-2">
                  {redFlagPatterns.map(f => (
                    <span key={f.title} className="badge-danger">{f.title}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-2">🔧 Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {verificationTools.websites.map(t => (
                    <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer" className="badge-info hover:opacity-80">
                      {t.name} <ExternalLink className="w-3 h-3 inline ml-1" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sorting Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Real Column */}
          <div className="drop-zone drop-zone-safe">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="font-bold text-success">REAL</h3>
              <span className="text-sm text-muted-foreground">({categorized.real.length} items)</span>
            </div>
            <div className="space-y-2 min-h-[150px]">
              {categorized.real.map(item => (
                <UrlCard key={item.id} item={item} onMove={moveItem} currentCategory="real" />
              ))}
            </div>
          </div>

          {/* Unsorted Column */}
          <div className="drop-zone drop-zone-neutral">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📦</span>
              <h3 className="font-bold text-foreground">UNSORTED</h3>
              <span className="text-sm text-muted-foreground">({categorized.unsorted.length} items)</span>
            </div>
            <div className="space-y-2 min-h-[150px]">
              {categorized.unsorted.map(item => (
                <UrlCard key={item.id} item={item} onMove={moveItem} currentCategory="unsorted" />
              ))}
            </div>
          </div>

          {/* Fake Column */}
          <div className="drop-zone drop-zone-danger">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-destructive" />
              <h3 className="font-bold text-destructive">FAKE</h3>
              <span className="text-sm text-muted-foreground">({categorized.fake.length} items)</span>
            </div>
            <div className="space-y-2 min-h-[150px]">
              {categorized.fake.map(item => (
                <UrlCard key={item.id} item={item} onMove={moveItem} currentCategory="fake" />
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={categorized.unsorted.length > 0}
            className="font-semibold text-lg px-8"
          >
            Check My Answers
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
        {categorized.unsorted.length > 0 && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            Sort all {categorized.unsorted.length} remaining item(s) to continue
          </p>
        )}
      </main>
    </div>
  );
}

function UrlCard({ 
  item, 
  onMove, 
  currentCategory 
}: { 
  item: SortedItem; 
  onMove: (id: string, to: SortCategory) => void;
  currentCategory: SortCategory;
}) {
  return (
    <div className="url-card group">
      <div className="font-mono text-sm break-all mb-2">{item.url}</div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {currentCategory !== 'real' && (
          <button
            onClick={() => onMove(item.id, 'real')}
            className="flex-1 py-1 px-2 text-xs font-medium rounded bg-success/10 text-success hover:bg-success/20 transition-colors"
          >
            ✓ Real
          </button>
        )}
        {currentCategory !== 'unsorted' && (
          <button
            onClick={() => onMove(item.id, 'unsorted')}
            className="flex-1 py-1 px-2 text-xs font-medium rounded bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
          >
            ↩ Undo
          </button>
        )}
        {currentCategory !== 'fake' && (
          <button
            onClick={() => onMove(item.id, 'fake')}
            className="flex-1 py-1 px-2 text-xs font-medium rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          >
            ✗ Fake
          </button>
        )}
      </div>
    </div>
  );
}

function Round1Results({ 
  items, 
  results, 
  onContinue,
  onBack 
}: { 
  items: SortedItem[]; 
  results: { correct: number; total: number };
  onContinue: () => void;
  onBack: () => void;
}) {
  const percentage = Math.round((results.correct / results.total) * 100);
  const isGreat = results.correct >= 8;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Try Again
          </Button>
          <h1 className="text-lg font-bold text-foreground">Round 1 Complete!</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Score */}
        <div className={`text-center p-8 rounded-2xl mb-8 ${isGreat ? 'bg-success/10 border-2 border-success' : 'bg-warning/10 border-2 border-warning'}`}>
          <div className="text-6xl mb-4">{isGreat ? '🎉' : '💪'}</div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {results.correct}/{results.total} Correct!
          </h2>
          <p className="text-lg text-muted-foreground">{percentage}% accuracy</p>
        </div>

        {/* Answers */}
        <div className="space-y-3 mb-8">
          <h3 className="font-bold text-foreground mb-4">Your Answers:</h3>
          {items.map(item => {
            const userAnswer = item.sortedTo;
            const correctAnswer = item.isReal ? 'real' : 'fake';
            const isCorrect = userAnswer === correctAnswer;

            return (
              <div 
                key={item.id} 
                className={`p-4 rounded-lg border ${isCorrect ? 'bg-success/5 border-success/30' : 'bg-destructive/5 border-destructive/30'}`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-mono text-sm break-all">{item.url}</p>
                    {!isCorrect && (
                      <div className="mt-2 text-sm">
                        <p className="text-destructive">
                          You marked: <strong>{userAnswer.toUpperCase()}</strong> | Correct: <strong>{correctAnswer.toUpperCase()}</strong>
                        </p>
                        {item.redFlags && (
                          <p className="text-muted-foreground mt-1">
                            Red flags: {item.redFlags.join(', ')}
                          </p>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{item.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Lessons */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Scammer Tricks You Just Learned:
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Replacing letters with numbers (0 for O, 1 for l)</li>
            <li>• Adding extra words (secure, login, verify)</li>
            <li>• Using weird endings (.xyz, .top, .online)</li>
            <li>• Adding extra dots and hyphens</li>
          </ul>
        </div>

        {/* Continue */}
        <div className="flex justify-center">
          <Button onClick={onContinue} size="lg" className="font-semibold text-lg px-8">
            Next Round: Emails
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
