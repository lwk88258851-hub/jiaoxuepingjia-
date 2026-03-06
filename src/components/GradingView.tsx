import React, { useState } from 'react';
import { ChevronRight, FileText, Check, X, Lightbulb, Brain, PlayCircle, Edit3, Send, Edit, CheckCircle2, Eye, HelpCircle, ChevronLeft, XCircle, Save } from 'lucide-react';
import { Card, Badge, Button, cn } from './UI';
import { MOCK_HOMEWORKS } from '../constants';
import { Homework } from '../types';

export function GradingView({ homeworks }: { homeworks?: Homework[] | null }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMastery, setShowMastery] = useState(false);
  const [showLearningSuggestions, setShowLearningSuggestions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state to manage edits and statuses for the current session
  const [localHomeworks, setLocalHomeworks] = useState<Homework[]>(
    homeworks && homeworks.length > 0 ? [...homeworks] : [...MOCK_HOMEWORKS]
  );

  const queue = localHomeworks;
  const hw = queue[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsEditing(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsEditing(false);
    }
  };

  const handleUpdateFeedback = (questionId: string, newFeedback: string) => {
    const updatedHomeworks = [...localHomeworks];
    const currentHw = { ...updatedHomeworks[currentIndex] };
    currentHw.questions = currentHw.questions.map(q => 
      q.id === questionId ? { ...q, feedback: newFeedback } : q
    );
    updatedHomeworks[currentIndex] = currentHw;
    setLocalHomeworks(updatedHomeworks);
  };

  const handleStatusChange = (status: 'approved' | 'rejected' | 'pending') => {
    const updatedHomeworks = [...localHomeworks];
    updatedHomeworks[currentIndex] = { ...updatedHomeworks[currentIndex], status };
    setLocalHomeworks(updatedHomeworks);
  };

  const handleSend = () => {
    alert(`已发送反馈给学生: ${hw.studentName}`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Breadcrumbs & Pagination */}
      <div className="flex flex-wrap items-center justify-between p-4 px-6 lg:px-10 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
          <a className="hover:text-primary transition-colors" href="#">作业</a>
          <ChevronRight size={14} />
          <a className="hover:text-primary transition-colors" href="#">{hw.folderName || hw.title}</a>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-bold">{hw.studentName}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 p-4 lg:p-6 lg:px-10 gap-6 overflow-hidden">
        {/* Left: Homework Viewer */}
        <div className="flex-1 flex flex-col gap-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-w-0">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 w-1/3">
              <FileText className="text-primary" size={20} />
              <h3 className="font-black text-slate-900 truncate text-sm">{hw.title || "学生作业提交"}</h3>
            </div>

            {/* Centered Pagination */}
            <div className="flex items-center justify-center gap-4 w-1/3">
              {queue.length > 1 && (
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
                  <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-1 rounded-full hover:bg-slate-100 disabled:opacity-20 transition-colors"
                    title="上一份"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[10px] font-black text-slate-600 whitespace-nowrap">
                    {currentIndex + 1} / {queue.length}
                  </span>
                  <button 
                    onClick={handleNext}
                    disabled={currentIndex === queue.length - 1}
                    className="p-1 rounded-full hover:bg-slate-100 disabled:opacity-20 transition-colors"
                    title="下一份"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 w-1/3">
              {/* Buttons removed as per user request */}
            </div>
          </div>
          
          <div className="flex-1 relative overflow-auto p-8 bg-slate-100 flex justify-center">
            {homeworks ? (
              <div className="w-full max-w-3xl flex flex-col items-center gap-6">
                {hw.imageUrl ? (
                  <div className="relative w-full bg-white shadow-2xl rounded-sm overflow-hidden border border-slate-200">
                    <img 
                      src={hw.imageUrl} 
                      alt="Homework" 
                      className="w-full h-auto block"
                      referrerPolicy="no-referrer"
                    />
                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-4 py-20">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                      <FileText size={40} className="text-primary/40" />
                    </div>
                    <p className="font-bold">AI 已完成图像识别与批改</p>
                    <p className="text-xs">详细详情请查看右侧分析面板</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full max-w-2xl aspect-[1/1.414] bg-white shadow-2xl rounded-sm p-12 text-slate-800">
                {/* Handwritten Content Mock */}
                <div className="space-y-12 font-serif italic text-xl opacity-80 select-none">
                  <div>
                    <p className="mb-4 text-slate-400 text-xs font-sans not-italic font-bold uppercase tracking-widest">
                      姓名: {hw.studentName} | 日期: {hw.date}
                    </p>
                    <p className="font-sans not-italic font-black text-slate-900 mb-4 text-lg">Q1. Solve for x: 3x + 12 = 42</p>
                    <div className="relative inline-block px-4 py-2 leading-relaxed">
                      3x = 42 - 12<br/>
                      3x = 30<br/>
                      x = 10
                      <div className="absolute -right-16 top-0 border-4 border-green-500 rounded-full p-1 text-green-500 transform rotate-12 animate-in zoom-in duration-500">
                        <Check size={24} strokeWidth={4} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <p className="font-sans not-italic font-black text-slate-900 mb-4 text-lg">Q2. Find the derivative of f(x) = x³ - 5x + 2</p>
                    <div className="relative inline-block px-4 py-2 leading-relaxed">
                      f'(x) = 3x² - 5x
                      <div className="absolute -right-14 top-2 border-4 border-red-500 rounded-full p-1 text-red-500 transform -rotate-12 flex items-center justify-center animate-in zoom-in duration-500">
                        <X size={20} strokeWidth={4} />
                      </div>
                      <div className="absolute -bottom-12 left-0 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5 text-xs text-red-600 font-sans not-italic font-bold flex items-center gap-2 shadow-lg shadow-red-500/10">
                        <Lightbulb size={14} /> 缺少 -5x 的导数
                      </div>
                    </div>
                  </div>

                  <div className="mt-20">
                    <p className="font-sans not-italic font-black text-slate-900 mb-4 text-lg">Q3. Integrate ∫ (2x + 4) dx</p>
                    <div className="relative inline-block px-4 py-2 leading-relaxed">
                      = x² + 4x + C
                      <div className="absolute -right-16 top-0 border-4 border-green-500 rounded-full p-1 text-green-500 transform rotate-6 animate-in zoom-in duration-500">
                        <Check size={24} strokeWidth={4} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar Analysis */}
        <div className="w-full lg:w-[550px] flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Compact Score Summary Bar */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all text-left">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">总分</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-primary">{hw.score}</span>
                  <span className="text-sm text-slate-300 font-bold">/{hw.totalScore}</span>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-slate-100" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">等级</span>
                <span className="text-xl font-black text-slate-900">A</span>
              </div>
            </div>

            {/* Middle: AI Learning Suggestions Trigger */}
            <button 
              onClick={() => setShowLearningSuggestions(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-full transition-all group border border-primary/10"
            >
              <Brain size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black">AI 学习建议</span>
            </button>

            <button 
              onClick={() => setShowMastery(true)}
              className="flex items-center gap-2 text-primary font-bold text-xs hover:underline"
            >
              掌握程度分析 <ChevronRight size={14} />
            </button>
          </div>

          {/* Question Details - Now with internal pagination */}
          <Card className="flex-1 flex flex-col overflow-hidden min-h-[400px]">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-slate-900">题目得分详情</h3>
                {hw.status === 'approved' && <Badge variant="success">已批准</Badge>}
                {hw.status === 'rejected' && <Badge variant="danger">未通过</Badge>}
                {(!hw.status || hw.status === 'pending') && <Badge variant="info">AI 已审核</Badge>}
              </div>
              
              {/* Sidebar Pagination (Student Level) */}
              {queue.length > 1 && (
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-1">
                  <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-20 transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="text-[10px] font-black text-slate-600">
                    学生 {currentIndex + 1} / {queue.length}
                  </span>
                  <button 
                    onClick={handleNext}
                    disabled={currentIndex === queue.length - 1}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-20 transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
              {hw.questions.map((q) => (
                <div key={q.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{q.title}</span>
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded",
                      q.score === q.maxScore ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                      {q.score}/{q.maxScore}
                    </span>
                  </div>
                  {isEditing ? (
                    <textarea
                      className="w-full p-2 text-xs border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white font-medium leading-relaxed"
                      value={q.feedback}
                      onChange={(e) => handleUpdateFeedback(q.id, e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-xs text-slate-600 font-medium leading-relaxed italic">“{q.feedback}”</p>
                  )}
                  {q.correctAnswer && (
                    <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-700 font-medium flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 font-black text-emerald-800">
                        <CheckCircle2 size={14} /> 正确答案与解析
                      </div>
                      <p className="leading-relaxed">{q.correctAnswer}</p>
                    </div>
                  )}
                  {/* AI Tip only for incorrect questions */}
                  {q.score < q.maxScore && q.aiTip && (
                    <div className="mt-3 p-3 bg-primary/5 rounded-xl border border-primary/10 text-[11px] text-primary font-bold flex gap-2">
                      <Brain size={14} className="shrink-0" />
                      <span>AI 建议："{q.aiTip}"</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-4 mb-10">
            <Button 
              className="w-full py-4 text-base" 
              icon={Send}
              onClick={handleSend}
              disabled={isEditing}
            >
              发送给学生
            </Button>
            
            {isEditing ? (
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="primary" 
                  className="py-3" 
                  icon={Save}
                  onClick={() => setIsEditing(false)}
                >
                  保存修改
                </Button>
                <Button 
                  variant="outline" 
                  className="py-3" 
                  icon={X}
                  onClick={() => setIsEditing(false)}
                >
                  取消
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="py-3" 
                    icon={Edit}
                    onClick={() => setIsEditing(true)}
                  >
                    编辑反馈
                  </Button>
                  <Button 
                    variant={hw.status === 'approved' ? 'primary' : 'outline'}
                    className={cn("py-3", hw.status === 'approved' && "bg-green-600 hover:bg-green-700 border-green-600")}
                    icon={CheckCircle2}
                    onClick={() => handleStatusChange('approved')}
                  >
                    {hw.status === 'approved' ? '已批准' : '批准通过'}
                  </Button>
                </div>
                <Button 
                  variant={hw.status === 'rejected' ? 'primary' : 'outline'}
                  className={cn("w-full py-3", hw.status === 'rejected' && "bg-red-600 hover:bg-red-700 border-red-600")}
                  icon={XCircle}
                  onClick={() => handleStatusChange('rejected')}
                >
                  {hw.status === 'rejected' ? '已拒绝' : '不批准通过'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Learning Suggestions Modal */}
      {showLearningSuggestions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900">AI 学习建议</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">个性化提升方案</p>
                </div>
              </div>
              <button 
                onClick={() => setShowLearningSuggestions(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Lightbulb className="text-amber-500" size={18} /> 学习诊断
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {hw.aiSuggestion}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <PlayCircle className="text-primary" size={18} /> 推荐学习资源
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {hw.learningResources.map((res, idx) => (
                    <a 
                      key={idx}
                      href={res.link}
                      className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 text-xs font-bold hover:border-primary hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary/10">
                        {res.type === 'video' ? <PlayCircle size={18} /> : <Edit3 size={18} />}
                      </div>
                      <span className="group-hover:text-primary flex-1">{res.title}</span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-primary" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setShowLearningSuggestions(false)} className="px-8">我知道了</Button>
            </div>
          </div>
        </div>
      )}
      {/* Mastery Analysis Modal */}
      {showMastery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900">掌握程度分析</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">基于 AI 的知识点评估</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMastery(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-around bg-primary/5 rounded-3xl p-6 border border-primary/10">
                <div className="text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">总分</span>
                  <span className="text-4xl font-black text-primary">{hw.score}</span>
                </div>
                <div className="w-[1px] h-12 bg-primary/20" />
                <div className="text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">等级</span>
                  <span className="text-4xl font-black text-slate-900">A</span>
                </div>
              </div>

              <div className="space-y-6">
                {hw.mastery.map((m, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 font-bold">{m.label}</span>
                      <span className="font-black text-primary">{m.value}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-1000", m.value === 100 ? "bg-green-500" : "bg-primary")} 
                        style={{ width: `${m.value}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                <Lightbulb className="text-amber-500 shrink-0" size={20} />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  该学生在“微分”部分存在薄弱环节，建议加强基础导数公式的记忆与练习。
                </p>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setShowMastery(false)} className="px-8">关闭</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
