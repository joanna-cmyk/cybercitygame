import { useState } from 'react';
import { useGame, GameScreen } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertTriangle, Lightbulb, Shield } from 'lucide-react';
import { scamCases, ScamCase, ChecklistItem } from '@/data/gameData';
import scamJobOffer from '@/assets/scam-job-offer.png';
import scamTechSupport from '@/assets/scam-tech-support.png';
import scamBanking from '@/assets/scam-banking.png';

const caseImages: Record<string, string> = {
  'case1': scamJobOffer,
  'case2': scamTechSupport,
  'case3': scamBanking,
};

interface CaseScreenProps {
  caseId: 'case1' | 'case2' | 'case3';
  caseNumber: 1 | 2 | 3;
  prevScreen: GameScreen;
  nextScreen: GameScreen;
}

export function CaseScreen({ caseId, caseNumber, prevScreen, nextScreen }: CaseScreenProps) {
  const { setCurrentScreen, updateScore } = useGame();
  const caseData = scamCases.find(c => c.id === caseId)!;
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggleItem = (id: string) => {
    if (submitted) return;
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    // Calculate score
    let correct = 0;
    let incorrect = 0;
    const redFlags = caseData.checklist.filter(i => i.isRedFlag);
    const totalRedFlags = redFlags.length;

    caseData.checklist.forEach(item => {
      const isSelected = selectedItems.has(item.id);
      if (item.isRedFlag && isSelected) {
        correct++;
      } else if (!item.isRedFlag && isSelected) {
        incorrect++;
      }
    });

    // Score: correct flags worth 2 points each, minus 1 for wrong selections
    const score = Math.max(0, (correct * 2) - incorrect);
    const scoreKey = caseId as 'case1' | 'case2' | 'case3';
    updateScore(scoreKey, score);
    setSubmitted(true);
  };

  const getItemStatus = (item: ChecklistItem) => {
    if (!submitted) return 'neutral';
    const isSelected = selectedItems.has(item.id);
    if (item.isRedFlag && isSelected) return 'correct';
    if (item.isRedFlag && !isSelected) return 'missed';
    if (!item.isRedFlag && isSelected) return 'wrong';
    return 'neutral';
  };

  const correctCount = caseData.checklist.filter(
    i => i.isRedFlag && selectedItems.has(i.id)
  ).length;
  const totalRedFlags = caseData.checklist.filter(i => i.isRedFlag).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setCurrentScreen(prevScreen)} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-foreground">🎓 Final Mission: Scam Analysis</h1>
            <p className="text-sm text-muted-foreground">Case {caseNumber} of 3: {caseData.title}</p>
          </div>
          <div className="badge-info text-sm font-semibold px-3 py-1">
            {selectedItems.size} selected
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Image and Results */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <img 
                src={caseImages[caseId]} 
                alt={caseData.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {submitted && (
              <div className="animate-fade-in space-y-4">
                {/* Score */}
                <div className={`p-6 rounded-xl ${correctCount >= totalRedFlags - 2 ? 'bg-success/10 border-2 border-success' : 'bg-warning/10 border-2 border-warning'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    {correctCount >= totalRedFlags - 2 ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-warning" />
                    )}
                    <h3 className="font-bold text-foreground">
                      {correctCount}/{totalRedFlags} Red Flags Identified
                    </h3>
                  </div>
                </div>

                {/* Why This is a Scam */}
                <div className="bg-destructive/5 rounded-xl border border-destructive/20 p-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warning" />
                    Why This is a Scam:
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    {caseData.whyScam.map((reason, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-destructive">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What to Do */}
                <div className="bg-success/5 rounded-xl border border-success/20 p-6">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success" />
                    What to Do:
                  </h3>
                  <p className="text-sm text-foreground">{caseData.whatToDo}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Checklist */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                🚩 Select all RED FLAGS you can find:
              </h3>
              <div className="space-y-2">
                {caseData.checklist.map(item => {
                  const status = getItemStatus(item);
                  const isSelected = selectedItems.has(item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        submitted
                          ? status === 'correct'
                            ? 'bg-success/10 border-success'
                            : status === 'missed'
                            ? 'bg-warning/10 border-warning'
                            : status === 'wrong'
                            ? 'bg-destructive/10 border-destructive'
                            : 'bg-muted border-border'
                          : isSelected
                          ? 'bg-primary/10 border-primary'
                          : 'bg-card border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                          submitted
                            ? status === 'correct'
                              ? 'border-success bg-success text-success-foreground'
                              : status === 'missed'
                              ? 'border-warning bg-warning text-warning-foreground'
                              : status === 'wrong'
                              ? 'border-destructive bg-destructive text-destructive-foreground'
                              : 'border-muted-foreground'
                            : isSelected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted-foreground'
                        }`}>
                          {(isSelected || status === 'missed') && (
                            status === 'correct' ? <CheckCircle className="w-3 h-3" /> :
                            status === 'missed' ? <AlertTriangle className="w-3 h-3" /> :
                            status === 'wrong' ? <XCircle className="w-3 h-3" /> :
                            <CheckCircle className="w-3 h-3" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{item.text}</p>
                          {submitted && status === 'correct' && item.explanation && (
                            <p className="text-xs text-success mt-1">✅ Correct! {item.explanation}</p>
                          )}
                          {submitted && status === 'missed' && item.explanation && (
                            <p className="text-xs text-warning mt-1">⚠️ Missed: {item.explanation}</p>
                          )}
                          {submitted && status === 'wrong' && item.explanation && (
                            <p className="text-xs text-destructive mt-1">This is not a red flag - {item.explanation}</p>
                          )}
                          {submitted && status === 'neutral' && !item.isRedFlag && (
                            <p className="text-xs text-muted-foreground mt-1">✓ Correctly left unselected</p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              {!submitted ? (
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="font-semibold text-lg px-8"
                >
                  Check Answers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentScreen(nextScreen)}
                  size="lg"
                  className="font-semibold text-lg px-8"
                >
                  {caseNumber === 3 ? 'View Final Results' : 'Next Case'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function Case1Screen() {
  return <CaseScreen caseId="case1" caseNumber={1} prevScreen="round2" nextScreen="case2" />;
}

export function Case2Screen() {
  return <CaseScreen caseId="case2" caseNumber={2} prevScreen="case1" nextScreen="case3" />;
}

export function Case3Screen() {
  return <CaseScreen caseId="case3" caseNumber={3} prevScreen="case2" nextScreen="final-results" />;
}
