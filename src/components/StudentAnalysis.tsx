import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { TrendingUp, Users, Award, BookOpen, Brain, AlertCircle, ChevronRight, Search, Filter, Download, Rocket, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import { Card, Badge, Button, cn } from './UI';

export function StudentAnalysis() {
  const [chartMode, setChartMode] = useState<'performance' | 'submission' | 'grades'>('performance');

  const classStats = [
    { label: '数学平均分', value: '85.4', trend: '+1.5%', icon: Award, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '数学及格率', value: '98.2%', trend: '+0.5%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '作业提交率', value: '100%', trend: '+2.0%', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: '数学进步率', value: '+12%', trend: '+3%', icon: Rocket, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const homeworkData = [
    { name: '勾股定理(一)', average: 82, top: 98, submitted: 42, gradeA: 15, gradeB: 18, gradeC: 7, total: 45 },
    { name: '勾股定理(二)', average: 85, top: 100, submitted: 44, gradeA: 18, gradeB: 16, gradeC: 8, total: 45 },
    { name: '勾股定理(三)', average: 92, top: 100, submitted: 45, gradeA: 25, gradeB: 12, gradeC: 8, total: 45 },
    { name: '实数单元测验', average: 78, top: 96, submitted: 40, gradeA: 10, gradeB: 15, gradeC: 10, total: 45 },
    { name: '二次根式练习', average: 84, top: 98, submitted: 43, gradeA: 14, gradeB: 20, gradeC: 6, total: 45 },
  ];

  const scoreDistribution = [
    { range: '90-100', count: 15, color: '#10b981' },
    { range: '80-89', count: 12, color: '#3b82f6' },
    { range: '70-79', count: 10, color: '#6366f1' },
    { range: '60-69', count: 3, color: '#f59e0b' },
    { range: '<60', count: 1, color: '#ef4444' },
  ];

  const classAbilityData = [
    { subject: '数学', value: 85 },
    { subject: '英语', value: 78 },
    { subject: '语文', value: 82 },
    { subject: '物理', value: 70 },
    { subject: '化学', value: 75 },
    { subject: '艺术', value: 90 },
  ];

  const studentsList = [
    { name: '张小明', score: 95, progress: '+5%', status: 'excellent', attendance: '100%' },
    { name: '李子明', score: 92, progress: '+4%', status: 'excellent', attendance: '100%' },
    { name: '王海玲', score: 88, progress: '+2%', status: 'good', attendance: '98%' },
    { name: '唐悦', score: 88, progress: '+3%', status: 'good', attendance: '100%' },
    { name: '周凯', score: 58, progress: '-2%', status: 'danger', attendance: '85%' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">数学班级学情分析</h1>
          <p className="text-slate-500 font-medium">八年级 (2) 班 • 数学学科 • 张大千老师</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Filter}>筛选作业</Button>
          <Button icon={Download}>导出学科报告</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classStats.map((stat, i) => (
          <Card key={i} className="p-6 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <Badge variant={stat.trend.startsWith('+') ? 'success' : 'danger'} className="text-[10px]">
                {stat.trend}
              </Badge>
            </div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Homework Performance & Submission Analysis */}
        <Card className="lg:col-span-2 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                {chartMode === 'performance' && '作业成绩趋势'}
                {chartMode === 'submission' && '作业提交情况'}
                {chartMode === 'grades' && '等级分布变化'}
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                {chartMode === 'performance' && '平均分与最高分趋势对比'}
                {chartMode === 'submission' && '每次作业的上交人数变化'}
                {chartMode === 'grades' && 'A/B/C 等级人数比例'}
              </p>
            </div>
            
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button 
                onClick={() => setChartMode('performance')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  chartMode === 'performance' ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-700"
                )}
                title="成绩趋势"
              >
                <BarChart3 size={18} />
              </button>
              <button 
                onClick={() => setChartMode('submission')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  chartMode === 'submission' ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-700"
                )}
                title="提交情况"
              >
                <LineChartIcon size={18} />
              </button>
              <button 
                onClick={() => setChartMode('grades')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  chartMode === 'grades' ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-700"
                )}
                title="等级分布"
              >
                <PieChartIcon size={18} />
              </button>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === 'performance' ? (
                <BarChart data={homeworkData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
                    dy={10}
                  />
                  <YAxis hide domain={[0, 110]} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 600 }} />
                  <Bar name="平均分" dataKey="average" fill="#1978e5" radius={[6, 6, 0, 0]} barSize={24} />
                  <Bar name="最高分" dataKey="top" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              ) : chartMode === 'submission' ? (
                <AreaChart data={homeworkData}>
                  <defs>
                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
                    dy={10}
                  />
                  <YAxis hide domain={[0, 50]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    name="上交人数"
                    type="monotone" 
                    dataKey="submitted" 
                    stroke="#6366f1" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorSub)" 
                  />
                </AreaChart>
              ) : (
                <BarChart data={homeworkData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 600 }} />
                  <Bar name="A 等级" dataKey="gradeA" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} barSize={32} />
                  <Bar name="B 等级" dataKey="gradeB" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={32} />
                  <Bar name="C 等级" dataKey="gradeC" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Class Subject Ability Radar */}
        <Card className="p-8">
          <h3 className="text-xl font-black text-slate-900 mb-8">班级学科能力雷达图</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={classAbilityData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="班级平均"
                  dataKey="value"
                  stroke="#1978e5"
                  fill="#1978e5"
                  fillOpacity={0.5}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {classAbilityData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-xs font-bold text-slate-600">{item.subject}</span>
                <span className="text-xs font-black text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Math Insights */}
        <Card className="lg:col-span-3 p-8 bg-primary/5 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="relative flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xl shadow-primary/20">
              <Brain size={32} />
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">AI 数学学科洞察</h3>
                <p className="text-slate-600 font-medium">基于最近数学作业批改数据的深度分析</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white">
                  <Badge variant="success" className="mb-3">优势分析</Badge>
                  <h4 className="font-black text-slate-900 mb-2">几何逻辑稳步提升</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    全班在“勾股定理”章节的正确率达到 92%，证明题的逻辑链条完整度显著提高。
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white">
                  <Badge variant="warning" className="mb-3">薄弱环节</Badge>
                  <h4 className="font-black text-slate-900 mb-2">计算细节失分较多</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    约 25% 的学生在“二次根式”化简中存在符号错误，主要集中在负数开方的处理上。
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white">
                  <Badge variant="danger" className="mb-3">预警提醒</Badge>
                  <h4 className="font-black text-slate-900 mb-2">个别学生进度滞后</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    周凯同学最近三次数学作业平均分仅 58 分，且错题集中在基础概念应用，需重点关注。
                  </p>
                </div>
              </div>
              <Button variant="primary" className="px-8">生成数学强化练习方案</Button>
            </div>
          </div>
        </Card>

        {/* Students Ranking/List */}
        <Card className="lg:col-span-3 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">学生表现详情</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="搜索学生姓名..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-4">学生姓名</th>
                  <th className="pb-4">平均成绩</th>
                  <th className="pb-4">进步幅度</th>
                  <th className="pb-4">出勤率</th>
                  <th className="pb-4">状态评估</th>
                  <th className="pb-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {studentsList.map((student, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-primary">
                          {student.name[0]}
                        </div>
                        <span className="text-sm font-black text-slate-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-slate-900">{student.score}</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${student.score}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <span className={cn(
                        "text-xs font-bold",
                        student.progress.startsWith('+') ? "text-emerald-600" : "text-rose-600"
                      )}>
                        {student.progress}
                      </span>
                    </td>
                    <td className="py-5 text-sm font-bold text-slate-600">{student.attendance}</td>
                    <td className="py-5">
                      <Badge variant={
                        student.status === 'excellent' ? 'success' : 
                        student.status === 'good' ? 'info' : 
                        student.status === 'warning' ? 'warning' : 'danger'
                      }>
                        {student.status === 'excellent' ? '表现优异' : 
                         student.status === 'good' ? '稳步提升' : 
                         student.status === 'warning' ? '波动预警' : '急需关注'}
                      </Badge>
                    </td>
                    <td className="py-5 text-right">
                      <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-primary">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
