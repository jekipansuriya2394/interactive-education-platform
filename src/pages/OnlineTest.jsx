import React, { useState } from 'react';
import { FiPlay, FiCheck, FiRefreshCw, FiAward } from 'react-icons/fi';
import { getEmbedImageUrl } from '../utils/imageUrl';

export default function OnlineTest() {
  const [testStarted, setTestStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "Which of the following is correct relation between Linear Velocity (v) and Angular Velocity (w)?",
      options: ["v = w / r", "v = r * w", "v = r^2 * w", "w = v * r"],
      answer: 1,
      explanation: "Linear velocity (v) is equal to radius (r) times angular velocity (w), i.e., v = r * w."
    },
    {
      id: 2,
      question: "Which keyword in JavaScript is used to declare a block-scoped local variable?",
      options: ["var", "let", "const", "Both let and const"],
      answer: 3,
      explanation: "Both 'let' and 'const' declare block-scoped variables in modern ES6 JavaScript, whereas 'var' is function-scoped."
    },
    {
      id: 3,
      question: "In DDCET Applied Mathematics, what is the value of the integral of 1/x dx?",
      options: ["log(x) + c", "e^x + c", "x + c", "-1/x^2 + c"],
      answer: 0,
      explanation: "The integration of 1/x with respect to dx is natural logarithm log(x) + arbitrary integration constant c."
    }
  ];

  const handleOptionSelect = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qId]: optionIdx
    });
  };

  const calculateResults = () => {
    let finalScore = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) {
        finalScore += 1;
      }
    });
    setScore(finalScore);
    setSubmitted(true);
  };

  const restartTest = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setTestStarted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F4F6F9] text-[#5A6472]">
      
      {/* Hero Header */}
      <section className="py-20 text-white text-center relative overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url('${getEmbedImageUrl('/images/bg-courses-hero.png')}')`, backgroundPosition: 'center 60%' }}>
        <div className="absolute inset-0 bg-[#1C2E60]/85 w-full h-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#DC2626] font-extrabold tracking-widest text-xs uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Online Test Portal
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-6 mb-6 text-white leading-tight text-glow-blue">
            OMR Mock Test Trial
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Practice timed engineering, mathematics, and science questions. Get instant score logs and answer explanations.
          </p>
        </div>
      </section>

      {/* Test Dashboard */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!testStarted && !submitted ? (
          <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
            <FiAward className="text-blue-600 text-5xl mb-6 mx-auto" />
            <h3 className="text-xl font-extrabold text-[#0F172A] mb-4">Start Academic Mock Trial</h3>
            <p className="text-zinc-500 text-xs font-light mb-8 max-w-sm mx-auto leading-relaxed">
              This demo test contains 3 multiple choice questions covering Basic Science, Programming, and DDCET Applied Mathematics.
            </p>
            <button
              onClick={() => setTestStarted(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs transition-all shadow-md flex items-center gap-2 mx-auto"
            >
              <FiPlay /> Start Test Trial
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Questions list */}
            {questions.map((q, idx) => (
              <div key={q.id} className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  Question 0{idx + 1}
                </span>
                <h4 className="font-extrabold text-[#0F172A] text-sm mb-4">{q.question}</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[q.id] === oIdx;
                    const isCorrect = q.answer === oIdx;
                    
                    let btnStyle = "bg-slate-50 border-slate-200 text-zinc-600";
                    if (isSelected) {
                      btnStyle = "bg-blue-50 border-blue-600 text-blue-600";
                    }
                    if (submitted) {
                      if (isCorrect) {
                        btnStyle = "bg-green-50 border-green-600 text-green-600";
                      } else if (isSelected) {
                        btnStyle = "bg-red-50 border-red-600 text-red-600";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionSelect(q.id, oIdx)}
                        className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-light text-zinc-500 leading-relaxed">
                    <strong className="text-[#0F172A] font-semibold block mb-1">Explanation:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}

            {/* Actions / Results */}
            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
              {!submitted ? (
                <div>
                  <button
                    onClick={calculateResults}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2 mx-auto"
                  >
                    <FiCheck /> Submit Test Answers
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">Test Completed!</h3>
                  <p className="text-zinc-500 text-xs font-light mb-6">
                    You scored <strong className="text-blue-600">{score} out of {questions.length}</strong> correct answers.
                  </p>
                  <button
                    onClick={restartTest}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2 mx-auto"
                  >
                    <FiRefreshCw /> Try Test Again
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </section>

    </div>
  );
}
