import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Download, Send, TrendingUp, Award, Target, BookOpen, Brain, ChevronRight, Edit3, CheckCircle2, Clock, Zap, MessageSquare, Star, Activity, BarChart3 } from 'lucide-react';
import { Card, Badge, Button, cn } from './UI';
import { MOCK_STUDENTS } from '../constants';

export function StudentProfile({ studentId = '1' }: { studentId?: string }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'behavior'>('overview');
  const [selectedSubject, setSelectedSubject] = useState('全部');
  const [trendType, setTrendType] = useState<'average' | 'subjects'>('average');
  const [masterySubject, setMasterySubject] = useState<'数学' | '英语' | '语文'>('数学');
  const student = MOCK_STUDENTS.find(s => s.id === studentId) || MOCK_STUDENTS[0];

  const radarData = [
    { subject: '逻辑思维', value: 95, fullMark: 100 },
    { subject: '语言表达', value: 82, fullMark: 100 },
    { subject: '空间想象', value: 75, fullMark: 100 },
    { subject: '记忆力', value: 88, fullMark: 100 },
    { subject: '计算能力', value: 92, fullMark: 100 },
    { subject: '创新意识', value: 85, fullMark: 100 },
  ];

  const growthData = [
    { month: '1月', score: 65, average: 70 },
    { month: '2月', score: 78, average: 72 },
    { month: '3月', score: 72, average: 71 },
    { month: '4月', score: 85, average: 75 },
    { month: '5月', score: 82, average: 74 },
    { month: '6月', score: 95, average: 76 },
  ];

  const subjectGrowthData = [
    { month: '1月', 数学: 70, 英语: 60, 语文: 65 },
    { month: '2月', 数学: 82, 英语: 75, 语文: 70 },
    { month: '3月', 数学: 75, 英语: 70, 语文: 72 },
    { month: '4月', 数学: 88, 英语: 82, 语文: 80 },
    { month: '5月', 数学: 85, 英语: 80, 语文: 78 },
    { month: '6月', 数学: 98, 英语: 92, 语文: 85 },
  ];

  const subjectMasteryData = {
    '数学': [
      { topic: '几何与证明', mastery: 92, trend: '+4%', status: 'excellent' },
      { topic: '代数运算', mastery: 88, trend: '+2%', status: 'excellent' },
      { topic: '函数应用', mastery: 75, trend: '-1%', status: 'good' },
      { topic: '概率统计', mastery: 82, trend: '+5%', status: 'good' },
      { topic: '空间想象', mastery: 65, trend: '+1%', status: 'warning' },
    ],
    '英语': [
      { topic: '词汇积累', mastery: 85, trend: '+3%', status: 'excellent' },
      { topic: '语法应用', mastery: 78, trend: '+1%', status: 'good' },
      { topic: '阅读理解', mastery: 90, trend: '+5%', status: 'excellent' },
      { topic: '听力水平', mastery: 82, trend: '+2%', status: 'good' },
      { topic: '口语表达', mastery: 70, trend: '-2%', status: 'warning' },
    ],
    '语文': [
      { topic: '基础知识', mastery: 95, trend: '+2%', status: 'excellent' },
      { topic: '古诗词背诵', mastery: 88, trend: '+4%', status: 'excellent' },
      { topic: '现代文阅读', mastery: 82, trend: '+1%', status: 'good' },
      { topic: '文言文理解', mastery: 75, trend: '-3%', status: 'good' },
      { topic: '作文表达', mastery: 80, trend: '+2%', status: 'good' },
    ]
  };

  const behaviorData = [
    { day: '周一', 数学: 0.8, 英语: 0.4, 语文: 0.3, total: 1.5 },
    { day: '周二', 数学: 1.0, 英语: 0.7, 语文: 0.5, total: 2.2 },
    { day: '周三', 数学: 0.5, 英语: 0.4, 语文: 0.3, total: 1.2 },
    { day: '周四', 数学: 1.2, 英语: 0.8, 语文: 0.5, total: 2.5 },
    { day: '周五', 数学: 0.9, 英语: 0.5, 语文: 0.4, total: 1.8 },
    { day: '周六', 数学: 1.5, 英语: 1.0, 语文: 0.7, total: 3.2 },
    { day: '周日', 数学: 1.2, 英语: 0.8, 语文: 0.5, total: 2.5 },
  ];

  const recentAssignments = [
    { 
      title: '勾股定理练习(三)', 
      subject: '数学', 
      score: 92, 
      grade: 'A',
      date: '2024-05-12', 
      status: 'pass', 
      type: '作业',
      aiAnalysis: '逻辑严密，计算准确。建议尝试更复杂的综合应用题。'
    },
    { 
      title: '勾股定理练习(二)', 
      subject: '数学', 
      score: 85, 
      grade: 'B+',
      date: '2024-05-10', 
      status: 'pass', 
      type: '作业',
      aiAnalysis: '基础概念掌握扎实，但在几何证明的步骤描述上略显简略。'
    },
    { 
      title: '勾股定理练习(一)', 
      subject: '数学', 
      score: 82, 
      grade: 'B',
      date: '2024-05-08', 
      status: 'pass', 
      type: '作业',
      aiAnalysis: '公式运用熟练，部分计算细节出现小失误，需注意审题。'
    },
    { 
      title: 'My Favorite City', 
      subject: '英语', 
      score: 88, 
      grade: 'A-',
      date: '2024-05-05', 
      status: 'pass', 
      type: '作文',
      aiAnalysis: '词汇丰富，句式多样。时态一致性方面有待加强。'
    },
  ];

  const subjects = ['全部', ...new Set(recentAssignments.map(a => a.subject))];
  const filteredAssignments = selectedSubject === '全部' 
    ? recentAssignments 
    : recentAssignments.filter(a => a.subject === selectedSubject);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
      {/* Profile Header Card */}
      <Card className="p-8 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2.5rem] border-4 border-primary/10 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-2xl border-4 border-white shadow-lg">
              <Star size={18} fill="currentColor" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <h2 className="text-4xl font-black text-slate-900">{student.name}</h2>
              <div className="flex justify-center md:justify-start gap-2">
                <Badge variant="success" className="rounded-lg">数学课代表</Badge>
                <Badge variant="default" className="rounded-lg">奥数潜力股</Badge>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-500 font-bold text-sm">
              <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <BookOpen size={16} className="text-primary" /> {student.class}
              </span>
              <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <Award size={16} className="text-primary" /> 数学 GPA 4.0 (班级第 1)
              </span>
              <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <Target size={16} className="text-primary" /> 学号: {student.studentId}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[160px]">
            <Button icon={Download} className="w-full shadow-primary/20">导出分析报告</Button>
            <Button variant="outline" icon={MessageSquare} className="w-full">联系家长</Button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
          {[
            { label: '出勤率', value: '98.5%', icon: Clock, color: 'text-emerald-600' },
            { label: '作业完成度', value: '100%', icon: CheckCircle2, color: 'text-blue-600' },
            { label: '课堂活跃度', value: '高', icon: Zap, color: 'text-amber-600' },
            { label: '综合排名', value: '12/450', icon: BarChart3, color: 'text-purple-600' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className={cn("p-2 rounded-xl bg-white shadow-sm border border-slate-100", stat.color)}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-lg font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'overview', label: '综合概览', icon: Activity },
          { id: 'subjects', label: '学科详情', icon: BookOpen },
          { id: 'behavior', label: '学习行为', icon: Brain },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all",
              activeTab === tab.id 
                ? "bg-white text-primary shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeTab === 'overview' && (
          <>
            <Card className="lg:col-span-2 p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">学业成长趋势</h3>
                  <p className="text-sm text-slate-500 font-medium">对比班级平均水平与各学科成长曲线</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setTrendType('average')}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                        trendType === 'average' ? "bg-white text-primary shadow-sm" : "text-slate-500"
                      )}
                    >
                      平均分趋势
                    </button>
                    <button
                      onClick={() => setTrendType('subjects')}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                        trendType === 'subjects' ? "bg-white text-primary shadow-sm" : "text-slate-500"
                      )}
                    >
                      各科目趋势
                    </button>
                  </div>
                  <div className="hidden sm:flex gap-4">
                    {trendType === 'average' ? (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="text-xs font-bold text-slate-500">个人</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-slate-300" />
                          <span className="text-xs font-bold text-slate-500">平均</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-xs font-bold text-slate-500">数学</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                          <span className="text-xs font-bold text-slate-500">英语</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500" />
                          <span className="text-xs font-bold text-slate-500">语文</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {trendType === 'average' ? (
                    <AreaChart data={growthData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1978e5" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1978e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                        dy={10}
                      />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#1978e5" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="average" 
                        stroke="#cbd5e1" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </AreaChart>
                  ) : (
                    <LineChart data={subjectGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                        dy={10}
                      />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}
                      />
                      <Line type="monotone" dataKey="数学" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="英语" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="语文" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Mastery Radar */}
            <Card className="p-8">
              <div className="mb-8">
                <h3 className="text-xl font-black text-slate-900">核心能力模型</h3>
                <p className="text-sm text-slate-500 font-medium">六大维度综合素质评估</p>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                    <Radar
                      name={student.name}
                      dataKey="value"
                      stroke="#1978e5"
                      fill="#1978e5"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-xs font-black text-emerald-800 flex items-center gap-2 mb-1">
                    <TrendingUp size={14} /> 优势项：逻辑思维
                  </p>
                  <p className="text-[10px] text-emerald-700 font-medium leading-relaxed">
                    在数学和物理建模中表现出极强的逻辑严密性，能够快速拆解复杂问题。
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <p className="text-xs font-black text-amber-800 flex items-center gap-2 mb-1">
                    <Target size={14} /> 待提升：空间想象
                  </p>
                  <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                    在立体几何部分仍有提升空间，建议通过 3D 建模工具加强直观感受。
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'subjects' && (
          <>
            <Card className="lg:col-span-2 p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h3 className="text-xl font-black text-slate-900">学科掌握详情</h3>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  {(['数学', '英语', '语文'] as const).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setMasterySubject(sub)}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-xs font-black transition-all",
                        masterySubject === sub ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                {subjectMasteryData[masterySubject].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm",
                          item.status === 'excellent' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                        )}>
                          {item.topic[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{item.topic}</p>
                          <p className={cn("text-[10px] font-bold", item.trend.startsWith('+') ? "text-green-500" : "text-red-500")}>
                            较上月 {item.trend}
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-black text-slate-900">{item.mastery}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          item.status === 'excellent' ? "bg-emerald-500" : "bg-blue-500"
                        )} 
                        style={{ width: `${item.mastery}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-black text-slate-900 mb-6">推荐学习路径</h3>
              <div className="space-y-4">
                {[
                  { title: '立体几何进阶训练', level: '中级', time: '45min', icon: BookOpen },
                  { title: '物理力学综合实验', level: '高级', time: '60min', icon: Zap },
                  { title: '英语原声听力练习', level: '中级', time: '30min', icon: Activity },
                ].map((task, i) => (
                  <div key={i} className="group p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <task.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-slate-900">{task.title}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="text-[10px] font-bold text-slate-400">{task.level}</span>
                          <span className="text-[10px] font-bold text-slate-400">{task.time}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4" variant="outline">查看更多资源</Button>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'behavior' && (
          <>
            <Card className="lg:col-span-2 p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">学习时长分布 (本周)</h3>
                  <p className="text-sm text-slate-500 font-medium">各学科每日学习投入时长对比</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold text-slate-500">数学</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-500">英语</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-xs font-bold text-slate-500">语文</span>
                  </div>
                </div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={behaviorData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar name="数学" dataKey="数学" stackId="a" fill="#3b82f6" barSize={40} />
                    <Bar name="英语" dataKey="英语" stackId="a" fill="#10b981" barSize={40} />
                    <Bar name="语文" dataKey="语文" stackId="a" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">平均时长</p>
                  <p className="text-xl font-black text-slate-900">3.3h</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">专注度</p>
                  <p className="text-xl font-black text-slate-900">88%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">最佳状态</p>
                  <p className="text-xl font-black text-slate-900">20:00</p>
                </div>
              </div>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-black text-slate-900 mb-6">学习习惯画像</h3>
              <div className="space-y-6">
                {[
                  { label: '早起型选手', desc: '习惯在清晨进行高强度记忆任务', icon: Star, color: 'text-amber-500' },
                  { label: '深度专注', desc: '单次学习时长平均超过 90 分钟', icon: Zap, color: 'text-blue-500' },
                  { label: '积极互动', desc: '在讨论区提问频率高于 90% 同学', icon: MessageSquare, color: 'text-emerald-500' },
                ].map((trait, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={cn("w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0", trait.color)}>
                      <trait.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{trait.label}</p>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{trait.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* Recent Assignments (Always visible at bottom) */}
        <Card className="lg:col-span-2 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">近期作业表现</h3>
              <p className="text-xs font-bold text-slate-400 mt-1">跟踪各学科作业提交与 AI 评估状态</p>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-center">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-black transition-all",
                    selectedSubject === subject 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {selectedSubject !== '全部' && (
            <div className="mb-8 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{selectedSubject} 学科概览</p>
                  <p className="text-[10px] font-bold text-slate-500">共提交 {filteredAssignments.length} 份作业 · 平均得分 {Math.round(filteredAssignments.reduce((acc, curr) => acc + curr.score, 0) / filteredAssignments.length)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="success" className="h-6">表现优异</Badge>
                <Badge variant="info" className="h-6">持续进步</Badge>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-4">作业名称 / 类型</th>
                  <th className="pb-4">学科</th>
                  <th className="pb-4">等级 / 得分</th>
                  <th className="pb-4">AI 分析建议</th>
                  <th className="pb-4">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAssignments.map((item, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{item.title}</p>
                          <div className="flex gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                            <span className="text-[10px] font-bold text-primary/60 bg-primary/5 px-1.5 rounded-md">{item.type}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <Badge variant="info" className="font-bold">{item.subject}</Badge>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-primary">{item.grade}</span>
                        <span className="text-xs font-bold text-slate-400">({item.score})</span>
                      </div>
                    </td>
                    <td className="py-5 max-w-xs">
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                        {item.aiAnalysis}
                      </p>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-black text-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        已达标
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Feedback & AI Plan */}
        <div className="space-y-6">
          <Card className="p-8">
            <h4 className="text-sm font-black flex items-center gap-2 mb-6 text-slate-900">
              <Edit3 size={18} className="text-primary" /> 教师寄语
            </h4>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0 overflow-hidden">
                <img src="https://picsum.photos/seed/teacher/100/100" alt="Teacher" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-black text-slate-900">王海平 老师</span>
                  <span className="text-[10px] text-slate-400 font-bold">2天前</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic font-medium bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  "小明在逻辑推理方面表现出巨大的进步。继续努力提高实验报告的格式规范，期待你在下周竞赛中的表现。"
                </p>
              </div>
            </div>
          </Card>

          <div className="bg-primary/5 rounded-[2.5rem] border border-primary/20 p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h4 className="text-lg font-black flex items-center gap-2 mb-6 text-primary relative">
              <Brain size={24} /> AI 智能提升计划
            </h4>
            <div className="flex-1 space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 mb-1">数学突破：立体几何</p>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  通过专项练习将空间想象类题目的准确率从 65% 提升至 85% 以上。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-sm border border-primary/10">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 mb-1">推荐资源</p>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  《初中数学空间几何 3D 互动课》
                </p>
              </div>
            </div>
            <Button className="w-full mt-2 py-3 text-base shadow-xl shadow-primary/20" variant="primary">开启今日挑战</Button>
          </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-12 text-slate-400 text-xs font-bold border-t border-slate-100">
        <p>© 2024 AI 智能教育批改平台. 助力每一位学生的成长。</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-primary transition-colors">技术支持</a>
          <a href="#" className="hover:text-primary transition-colors">隐私协议</a>
          <a href="#" className="hover:text-primary transition-colors">使用条款</a>
        </div>
      </footer>
    </div>
  );
}

const FileText = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
