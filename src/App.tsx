import React, { useState } from 'react';
import { Sidebar, Header } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { GradingView } from './components/GradingView';
import { StudentProfile } from './components/StudentProfile';
import { StudentAnalysis } from './components/StudentAnalysis';
import { TeacherDashboard } from './components/TeacherDashboard';
import { motion, AnimatePresence } from 'motion/react';
import { Homework } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [homeworkQueue, setHomeworkQueue] = useState<Homework[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleHomeworkAnalyzed = (homeworks: Homework[]) => {
    setHomeworkQueue(homeworks);
    setActiveTab('homework');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onHomeworkAnalyzed={handleHomeworkAnalyzed} />;
      case 'homework':
        return <GradingView homeworks={homeworkQueue} />;
      case 'students':
        return <StudentProfile />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'analysis':
        return <StudentAnalysis />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background-light font-sans selection:bg-primary/20 selection:text-primary">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
