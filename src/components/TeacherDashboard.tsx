import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Legend } from 'recharts';
import { TrendingUp, Award, BookOpen, Brain, ChevronRight, Search, Filter, Download, Rocket, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Card, Badge, Button, cn } from './UI';

export function TeacherDashboard() {
  const [chartMode, setChartMode] = useState<'performance' | 'submission' | 'grades'>('performance');

  const teacherStats = [
    { label: '本周授课', value: '12 课时', trend: '正常', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '作业批改率', value: '98.5%', trend: '+2.1%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '学生互动率', value: '85%', trend: '+5.0%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: '教学进度', value: '75%', trend: '领先', icon: Rocket, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const homeworkData = [
    { name: '勾股定理(一)', average: 82, top: 98, submitted: 42, gradeA: 15, gradeB: 18, gradeC: 7, total: 45 },
    { name: '勾股定理(二)', average: 85, top: 100, submitted: 44, gradeA: 18, gradeB: 16, gradeC: 8, total: 45 },
    { name: '勾股定理(三)', average: 92, top: 100, submitted: 45, gradeA: 25, gradeB: 12, gradeC: 8, total: 45 },
    { name: '实数单元测验', average: 78, top: 96, submitted: 40, gradeA: 10, gradeB: 15, gradeC: 10, total: 45 },
    { name: '二次根式练习', average: 84, top: 98, submitted: 43, gradeA: 14, gradeB: 20, gradeC: 6, total: 45 },
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
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl border-4 border-primary/10 overflow-hidden shadow-lg">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
              alt="Teacher avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">张大千 老师的个人工作台</h1>
            <p className="text-slate-500 font-medium">数学学科 • 八年级 (2) 班 • 2024 春季学期</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Clock}>教学日志</Button>
          <Button icon={Download}>导出本月教学报表</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teacherStats.map((stat, i) => (
          <Card key={i} className="p-6 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <Badge variant={stat.trend.includes('+') || stat.trend === '领先' || stat.trend === '正常' ? 'success' : 'danger'} className="text-[10px]">
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
                数学教学质量分析
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                近期作业成绩与提交情况综合趋势
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

        {/* Teaching Insights */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Brain size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900">AI 教学建议</h3>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-xs font-black text-blue-800 flex items-center gap-2 mb-2">
                <TrendingUp size={14} /> 教学成效
              </p>
              <p className="text-[10px] text-blue-700 font-medium leading-relaxed">
                本月数学平均分提升了 1.5 分，学生对几何证明题的掌握程度有显著提高。
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-xs font-black text-emerald-800 flex items-center gap-2 mb-2">
                <Award size={14} /> 优秀案例
              </p>
              <p className="text-[10px] text-emerald-700 font-medium leading-relaxed">
                您在“勾股定理”教学中使用的互动课件效果极佳，建议在其他班级推广。
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <p className="text-xs font-black text-amber-800 flex items-center gap-2 mb-2">
                <BookOpen size={14} /> 关注重点
              </p>
              <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                下周将进入“二次根式”章节，建议提前准备基础运算的强化练习。
              </p>
            </div>
          </div>
          <Button variant="primary" className="w-full mt-6">查看详细教学分析</Button>
        </Card>

        {/* Student Performance in Subject */}
        <Card className="lg:col-span-3 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">数学学科学生表现</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="搜索学生..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-48"
                />
              </div>
              <Button variant="outline" icon={Filter}>筛选</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-4">学生姓名</th>
                  <th className="pb-4">数学平均分</th>
                  <th className="pb-4">进步幅度</th>
                  <th className="pb-4">作业完成率</th>
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
