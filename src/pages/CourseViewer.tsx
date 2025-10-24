import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import Quiz from '../components/Quiz';

const CourseViewer: React.FC = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  useEffect(() => {
    if (!courseId) return;
    api.get(`/lms/courses/${courseId}`).then(res => setCourse(res)).catch(()=>{});
  }, [courseId]);

  if (!course) return <div className="p-6">Loading course...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title || course.name}</h1>
      <div className="grid grid-cols-4 gap-6">
        <aside className="col-span-1 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Lessons</h3>
          <ul className="space-y-2">
            {course.lessons?.map((l:any)=> (
              <li key={l.id}>
                <button onClick={()=>setSelectedLesson(l)} className="text-left w-full">
                  {l.title}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link to="/student/courses" className="text-sm text-blue-600">Back to courses</Link>
          </div>
        </aside>

        <main className="col-span-3">
          {selectedLesson ? (
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{selectedLesson.title}</h2>
              <p className="mt-2">{selectedLesson.content}</p>
              {selectedLesson.videoUrl && (
                <div className="mt-4">
                  <video controls src={selectedLesson.videoUrl} className="w-full rounded" />
                </div>
              )}
              {selectedLesson.quizId && (
                <div className="mt-6">
                  <Quiz quizId={selectedLesson.quizId} />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow">Select a lesson to view its content.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseViewer;
