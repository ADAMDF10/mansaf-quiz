import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function AdminPanel() {
  const results = useQuery(api.quiz.getAllResults);

  if (!results) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-mono">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-mono text-black mb-8 text-center">
        لوحة إدارة النتائج
      </h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 text-lg font-mono">
          إجمالي المشاركين: {results.length}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2 border-black font-mono">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2">الاسم</th>
                <th className="border border-black p-2">النقاط</th>
                <th className="border border-black p-2">النسبة المئوية</th>
                <th className="border border-black p-2">تاريخ الإكمال</th>
                <th className="border border-black p-2">التفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id}>
                  <td className="border border-black p-2">{result.playerName}</td>
                  <td className="border border-black p-2 text-center">
                    {result.totalScore} / 10
                  </td>
                  <td className="border border-black p-2 text-center">
                    {((result.totalScore / 10) * 100).toFixed(0)}%
                  </td>
                  <td className="border border-black p-2 text-center">
                    {new Date(result.completedAt).toLocaleString('ar')}
                  </td>
                  <td className="border border-black p-2">
                    <details>
                      <summary className="cursor-pointer">عرض الإجابات</summary>
                      <div className="mt-2 text-sm">
                        {result.answers.map((answer, index) => (
                          <div key={index} className={`p-1 ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            السؤال {answer.questionIndex + 1}: {answer.isCorrect ? '✓' : '✗'}
                          </div>
                        ))}
                      </div>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {results.length === 0 && (
          <div className="text-center text-gray-500 font-mono mt-8">
            لا توجد نتائج بعد
          </div>
        )}
      </div>
    </div>
  );
}
