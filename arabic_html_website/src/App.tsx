import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { QuizGame } from "./QuizGame";
import { AdminPanel } from "./AdminPanel";
import { useState } from "react";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  const handleAdminLogin = () => {
    // كلمة المرور السرية للإدارة
    if (adminPassword === 'mansaf2024') {
      setIsAdminAuthenticated(true);
      setShowAdmin(true);
    } else {
      alert('كلمة مرور خاطئة!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      
      {/* زر الإدارة السري */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => {
            if (!isAdminAuthenticated) {
              const password = prompt('أدخل كلمة مرور الإدارة:');
              if (password === 'mansaf2024') {
                setIsAdminAuthenticated(true);
                setShowAdmin(true);
              } else if (password) {
                alert('كلمة مرور خاطئة!');
              }
            } else {
              setShowAdmin(!showAdmin);
            }
          }}
          className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-xs opacity-30 hover:opacity-100 transition-opacity"
        >
          {isAdminAuthenticated ? (showAdmin ? "اللعبة" : "الإدارة") : "•••"}
        </button>
      </div>

      {/* لوحة الإدارة */}
      {showAdmin && isAdminAuthenticated && <AdminPanel />}

      {/* اللعبة متاحة للجميع */}
      {!showAdmin && <QuizGame />}

    </div>
  );
}
