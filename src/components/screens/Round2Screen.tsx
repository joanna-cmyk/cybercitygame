import { useState, useMemo } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { emailAddresses, verificationTools, EmailItem } from '@/data/gameData';

type SortCategory = 'unsorted' | 'real' | 'fake';

interface SortedItem extends EmailItem {
  sortedTo: SortCategory;
}

export function Round2Screen() {
  const { setCurrentScreen, updateScore } = useGame();
  const [items, setItems] = useState<SortedItem[]>(
    () => shuffleArray(emailAddresses).map(item => ({ ...item, sortedTo: 'unsorted' as SortCategory }))
  );
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
    updateScore('round2', correct * 2);
    setSubmitted(true);
  };

  if (submitted && results) {
    return <Round2Results items={items} results={results} onContinue={() => setCurrentScreen('case1')} onBack={() => setSubmitted(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setCurrentScreen('round1')} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h1 className="text-lg font-bold text-foreground">📧 Round 2: Real vs Fake Emails</h1>
          <div className="badge-info text-sm font-semibold px-3 py-1">
            Score: {categorized.real.length + categorized.fake.length}/{items.length}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hints Box - Always Visible, Horizontal */}
        <div className="hints-box mb-6">
          <h3 className="font-bold text-foreground mb-4 text-lg">🎯 KEY THINGS TO REMEMBER</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Real Company Emails */}
            <div>
              <h4 className="font-semibold text-success mb-2 text-sm">✅ Real Company Emails</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">Use their own domain</p>
                  <p className="text-muted-foreground text-xs">Example: customercare@pnb.co.in</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Match their website domain exactly</p>
                  <p className="text-muted-foreground text-xs">If website is amazon.in, email should be @amazon.in</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Never use free providers</p>
                  <p className="text-muted-foreground text-xs">Banks never use Gmail, Hotmail, or Yahoo</p>
                </div>
              </div>
            </div>

            {/* Fake Email Signs */}
            <div>
              <h4 className="font-semibold text-destructive mb-2 text-sm">❌ Fake Email Signs</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">Use free email services</p>
                  <p className="text-muted-foreground text-xs">Example: customercare.pnb@gmail.com</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Have extra words/dots in domain</p>
                  <p className="text-muted-foreground text-xs">Example: support@bank.login.com</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Mix different domains together</p>
                  <p className="text-muted-foreground text-xs">Example: support@sbi.co.in.help.com</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Numbers replacing letters</p>
                  <p className="text-muted-foreground text-xs">Example: amaz0n with number 0</p>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">🔧 Tools to Verify</h4>
              <div className="space-y-2">
                {verificationTools.emails.map(t => (
                  <a 
                    key={t.name} 
                    href={t.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm text-info hover:underline"
                  >
                    <span className="font-mono">{t.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
                <a 
                  href="https://spotthescam.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-sm text-info hover:underline"
                >
                  <span className="font-mono">spotthescam.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sorting Area - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Real Column */}
          <div className="drop-zone drop-zone-safe">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-success" />
              <h3 className="font-bold text-success text-lg">REAL</h3>
              <span className="text-sm text-muted-foreground">({categorized.real.length} items)</span>
            </div>
            <div className="space-y-2 flex-1">
              {categorized.real.map(item => (
                <EmailCard key={item.id} item={item} onMove={moveItem} currentCategory="real" />
              ))}
            </div>
          </div>

          {/* Unsorted Column */}
          <div className="drop-zone drop-zone-neutral">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📧</span>
              <h3 className="font-bold text-foreground text-lg">EMAILS</h3>
              <span className="text-sm text-muted-foreground">({categorized.unsorted.length} items)</span>
            </div>
            <div className="space-y-2 flex-1">
              {categorized.unsorted.map(item => (
                <EmailCard key={item.id} item={item} onMove={moveItem} currentCategory="unsorted" />
              ))}
            </div>
          </div>

          {/* Fake Column */}
          <div className="drop-zone drop-zone-danger">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6 text-destructive" />
              <h3 className="font-bold text-destructive text-lg">FAKE</h3>
              <span className="text-sm text-muted-foreground">({categorized.fake.length} items)</span>
            </div>
            <div className="space-y-2 flex-1">
              {categorized.fake.map(item => (
                <EmailCard key={item.id} item={item} onMove={moveItem} currentCategory="fake" />
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

function EmailCard({ 
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
      <div className="font-mono text-sm break-all mb-2">{item.email}</div>
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

function Round2Results({ 
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
          <h1 className="text-lg font-bold text-foreground">Round 2 Complete!</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className={`text-center p-8 rounded-2xl mb-8 ${isGreat ? 'bg-success/10 border-2 border-success' : 'bg-orange-100 border-2 border-orange-400'}`}>
          <div className="text-6xl mb-4">{isGreat ? '🎉' : '💪'}</div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {results.correct}/{results.total} Correct!
          </h2>
          <p className="text-lg text-muted-foreground">{percentage}% accuracy</p>
        </div>

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
                    <p className="font-mono text-sm break-all">{item.email}</p>
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

        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Key Lessons:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-success text-sm mb-2">✅ Real Companies:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use their own domain</li>
                <li>• Never use Gmail/Hotmail/Yahoo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-destructive text-sm mb-2">❌ Fake Emails:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use free email services</li>
                <li>• Have extra words/dots in domain</li>
                <li>• Mix different domains together</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={onContinue} size="lg" className="font-semibold text-lg px-8">
            Final Mission: Scam Analysis
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
