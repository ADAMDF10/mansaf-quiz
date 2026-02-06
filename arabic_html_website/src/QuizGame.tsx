import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

// الأسئلة الجديدة عن منصف
const QUESTIONS = [
  {
    question: "هل منصف هو..؟",
    options: ["افضل مسدد", "افضل حارس", "افضل مدافع", "افضل مراوغ"],
    correctAnswer: 3
  },
  {
    question: "اكلة منصف المفضلة هي:",
    options: ["زفيطي", "عيش", "مال اليتيم", "بيتزا"],
    correctAnswer: 0
  },
  {
    question: "لون منصف المفضل هو..؟",
    options: ["اخضر", "ازرق", "اخضر بيستاش", "اسود"],
    correctAnswer: 1
  },
  {
    question: "في قصة مملكة من العصور الوسطى يفضل منصف ان يكون..؟",
    options: ["امير", "ملك", "فارس", "التنين لي يخطف الاميرة"],
    correctAnswer: 2
  },
  {
    question: "الحيوان الاليف المفضل لمنصف هو..؟",
    options: ["قط", "قط", "قط", "قط"],
    correctAnswer: 0 // كل الاجابات صحيحة، سنعتبر الأولى
  },
  {
    question: "سيارة منصف المفضلة هي..؟",
    options: ["audi", "BMW", "Alto", "عبدو"],
    correctAnswer: 1
  },
  {
    question: "النوي بالنسبة لمنصف هو..؟",
    options: ["طويل", "مزعج", "معضل كيوت", "محب الاطفال"],
    correctAnswer: 0
  },
  {
    question: "بدرو بالنسبة لمنصف هو..؟",
    options: ["محب الاطفال", "سمين", "ام", "فريسة"],
    correctAnswer: 2
  },
  {
    question: "اذا ايقظت منصف من النوم اول شيء تسمعه هو..؟",
    options: ["كلام رومانسي", "التسبيح والاذكار", "الدعاء للامهات", "كل ما سبق"],
    correctAnswer: 3
  },
  {
    question: "هل كان هذا الامتحان جيد؟",
    options: ["نعم", "نعم", "نعم", "نعم"],
    correctAnswer: 0 // كل الاجابات صحيحة
  }
];

type GameState = 'welcome' | 'name-input' | 'quiz' | 'completed';

export function QuizGame() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<{questionIndex: number, selectedAnswer: number, isCorrect: boolean}>>([]);
  const [redButtonPosition, setRedButtonPosition] = useState({ x: 0, y: 0 });
  const [showRedButton, setShowRedButton] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const saveQuizResult = useMutation(api.quiz.saveQuizResult);

  const moveRedButton = () => {
    const newX = Math.random() * (window.innerWidth - 100);
    const newY = Math.random() * (window.innerHeight - 50);
    setRedButtonPosition({ x: newX, y: newY });
    
    // إخفاء الزر بعد 3 محاولات
    setTimeout(() => {
      setShowRedButton(false);
    }, 2000);
  };

  const handleYesClick = () => {
    setGameState('name-input');
  };

  const handleNameSubmit = () => {
    if (playerName.trim()) {
      setGameState('quiz');
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // منع النقر أثناء عرض النتيجة
    
    const question = QUESTIONS[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer || 
                     (question.question.includes("الحيوان الاليف") || 
                      question.question.includes("هل كان هذا الامتحان جيد")); // كل الإجابات صحيحة لهذين السؤالين
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const newAnswer = {
      questionIndex: currentQuestion,
      selectedAnswer: answerIndex,
      isCorrect
    };
    
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // الانتقال للسؤال التالي بعد ثانيتين
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // انتهاء الاختبار
        const totalScore = newAnswers.filter(a => a.isCorrect).length;
        saveQuizResult({
          playerName,
          answers: newAnswers,
          totalScore
        });
        setGameState('completed');
      }
    }, 2000);
  };

  if (gameState === 'welcome') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center relative">
        <div className="text-center">
          <h1 className="text-4xl font-mono text-black mb-8 pixel-font">
            هل منصف شيكورك؟
          </h1>
          
          <div className="flex gap-8 justify-center">
            <button
              onClick={handleYesClick}
              className="px-8 py-4 bg-green-500 text-white font-mono text-xl rounded pixel-button hover:bg-green-600"
            >
              نعم
            </button>
            
            {showRedButton && (
              <button
                onClick={moveRedButton}
                onMouseEnter={moveRedButton}
                className="px-8 py-4 bg-red-500 text-white font-mono text-xl rounded pixel-button hover:bg-red-600 transition-all duration-300"
                style={{
                  position: redButtonPosition.x || redButtonPosition.y ? 'fixed' : 'static',
                  left: redButtonPosition.x || 'auto',
                  top: redButtonPosition.y || 'auto',
                }}
              >
                لا
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'name-input') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-mono text-black mb-8 pixel-font">
            اكتب اسمك
          </h2>
          
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="px-4 py-2 border-2 border-black font-mono text-xl mb-4 text-center"
            placeholder="اسمك هنا"
          />
          
          <br />
          
          <button
            onClick={handleNameSubmit}
            disabled={!playerName.trim()}
            className="px-8 py-4 bg-blue-500 text-white font-mono text-xl rounded pixel-button hover:bg-blue-600 disabled:opacity-50"
          >
            متابعة
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'quiz') {
    const question = QUESTIONS[currentQuestion];
    
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          <div className="mb-4 text-sm font-mono text-gray-600">
            السؤال {currentQuestion + 1} من {QUESTIONS.length}
          </div>
          
          <h2 className="text-2xl font-mono text-black mb-8 pixel-font">
            {question.question}
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, index) => {
              let buttonClass = "px-6 py-4 border-2 border-black font-mono text-lg pixel-button transition-all duration-300";
              
              if (showFeedback && selectedAnswer === index) {
                const isCorrect = index === question.correctAnswer || 
                                (question.question.includes("الحيوان الاليف") || 
                                 question.question.includes("هل كان هذا الامتحان جيد"));
                buttonClass += isCorrect 
                  ? " bg-green-500 text-white border-green-500" 
                  : " bg-red-500 text-white border-red-500";
              } else if (showFeedback) {
                buttonClass += " opacity-50";
              } else {
                buttonClass += " hover:bg-gray-100";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              );
            })}
          </div>
          
          {showFeedback && (
            <div className="mt-6 text-lg font-mono">
              {(() => {
                const isCorrect = selectedAnswer === question.correctAnswer || 
                                (question.question.includes("الحيوان الاليف") || 
                                 question.question.includes("هل كان هذا الامتحان جيد"));
                return isCorrect ? (
                  <span className="text-green-600">✓ إجابة صحيحة!</span>
                ) : (
                  <span className="text-red-600">✗ إجابة خاطئة</span>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-mono text-black mb-8 pixel-font">
            شكراً لك لزيارة الموقع
          </h2>
          <p className="text-xl font-mono text-black pixel-font">
            سيتم مراجعة إجاباتك من قبل شيكورك منصف
          </p>
        </div>
      </div>
    );
  }

  return null;
}
