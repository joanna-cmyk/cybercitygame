import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { RotateCcw, Share2, BookOpen, ExternalLink, Trophy, Shield, Star, CheckCircle } from 'lucide-react';
import { achievementLevels, verificationTools } from '@/data/gameData';

export function FinalResultsScreen() {
  const { scores, totalScore, resetGame } = useGame();

  // Calculate percentage (max possible: 20+20+20+20+20 = 100)
  const maxScore = 100;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Get achievement
  const achievement = achievementLevels.find(
    a => percentage >= a.min && percentage <= a.max
  ) || achievementLevels[achievementLevels.length - 1];

  const getStars = (score: number, max: number) => {
    const ratio = score / max;
    if (ratio >= 0.9) return 3;
    if (ratio >= 0.7) return 2;
    if (ratio >= 0.5) return 1;
    return 0;
  };

  const rounds = [
    { name: 'Round 1 - Websites', score: scores.round1, max: 20 },
    { name: 'Round 2 - Emails', score: scores.round2, max: 20 },
    { name: 'Case 1 - Job Offer', score: scores.case1, max: 20 },
    { name: 'Case 2 - Tech Support', score: scores.case2, max: 20 },
    { name: 'Case 3 - Banking', score: scores.case3, max: 20 },
  ];

  const handleShare = () => {
    const text = `I scored ${totalScore}/100 and became a ${achievement.title}! ${achievement.emoji} Test your scam detection skills: Hidden Dangers in Links`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="game-gradient py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6 animate-bounce-in">🎉</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Mission Complete!</h1>
          
          {/* Score Circle */}
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/20 backdrop-blur-lg border-4 border-white/30 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{totalScore}</div>
              <div className="text-sm text-white/80">/{maxScore}</div>
            </div>
          </div>

          {/* Achievement */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 inline-block">
            <div className="text-3xl mb-2">{achievement.emoji}</div>
            <p className="text-white font-bold text-lg">{achievement.title}</p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 -mt-6">
        {/* Performance Breakdown */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 shadow-lg">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            📊 Performance Breakdown
          </h2>
          <div className="space-y-3">
            {rounds.map((round, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-foreground font-medium">{round.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm">{round.score}/{round.max}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= getStars(round.score, round.max)
                            ? 'text-warning fill-warning'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/30 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Achievement Unlocked!</h3>
              <p className="text-lg font-semibold text-primary">{achievement.title} {achievement.emoji}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-success" />
              Fake websites
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-success" />
              Suspicious emails
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-success" />
              Short links
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-success" />
              Red flags
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button
            onClick={resetGame}
            variant="outline"
            size="lg"
            className="w-full font-semibold"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
          <Button
            onClick={handleShare}
            size="lg"
            className="w-full font-semibold"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Score
          </Button>
        </div>

        {/* Tools Reference */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-info" />
            Bookmark These Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...verificationTools.websites, ...verificationTools.emails, ...verificationTools.shortLinks].map(tool => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
              >
                <div>
                  <span className="font-mono font-semibold text-primary">{tool.name}</span>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mt-8 p-6">
          <Shield className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">Stay Safe Online!</h3>
          <p className="text-muted-foreground">
            Remember: When in doubt, verify before you click. Share this game with friends and family to help them stay safe too!
          </p>
        </div>
      </main>
    </div>
  );
}
