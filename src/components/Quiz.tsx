import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

const Quiz: React.FC<{ quizId: string }> = ({ quizId }) => {
  const [quiz, setQuiz] = useState<any>(null);
  // store selected option index per question
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(()=>{
    if (!quizId) return;
    api.get(`/lms/quizzes/${quizId}`).then(setQuiz).catch(()=>{});
  }, [quizId]);

  const setAnswer = (questionId:string, value:number) => {
    setAnswers(a=>({ ...a, [questionId]: value }));
  };

  const submit = async () => {
    setLoading(true);
    try {
  // convert answers map to array matching question order
  const answersArray = (quiz.questions||[]).map((q:any) => answers[q.id] ?? null);
  const res = await api.post(`/lms/quizzes/${quiz.id}/attempts`, { answers: answersArray });
      setResult(res);
    } catch (err:any) {
      alert(err?.message || 'Submission failed');
    } finally { setLoading(false); }
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div className="p-4 bg-gray-50 rounded">
      <h3 className="font-semibold">{quiz.title}</h3>
      <div className="space-y-4 mt-3">
        {quiz.questions?.map((q:any)=> (
          <div key={q.id} className="bg-white p-3 rounded shadow-sm">
            <div className="font-medium">{q.prompt}</div>
            <div className="mt-2 space-y-2">
              {(q.options||[]).map((opt:any, idx:number)=> (
                <label key={idx} className="block">
                  <input type="radio" name={q.id} value={idx} checked={answers[q.id]===idx} onChange={()=>setAnswer(q.id, idx)} />
                  <span className="ml-2">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={submit} disabled={loading} className="px-3 py-2 bg-emerald-600 text-white rounded">{loading ? 'Submitting...' : 'Submit Quiz'}</button>
      </div>
      {result && (
        <div className="mt-4 p-3 bg-white rounded shadow">
          <div className="font-semibold">Result</div>
          <div>Score: {result.score}/{result.total}</div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
