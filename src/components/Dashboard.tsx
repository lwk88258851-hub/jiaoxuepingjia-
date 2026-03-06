import React, { useRef, useState } from 'react';
import { CloudUpload, QrCode, Clock, Eye, TrendingUp, TrendingDown, History, Award, AlertTriangle, Rocket, Loader2, Sparkles, Brain, FolderUp, Users } from 'lucide-react';
import { Card, Badge, Button, cn } from './UI';
import { analyzeHomeworkImage } from '../services/geminiService';
import { Homework } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export function Dashboard({ onHomeworkAnalyzed }: { onHomeworkAnalyzed?: (hws: Homework[]) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const results: Homework[] = [];
    const fileList = Array.from(files) as File[];

    // Extract folder name if available
    let folderName = '';
    if (fileList.length > 0 && (fileList[0] as any).webkitRelativePath) {
      folderName = (fileList[0] as any).webkitRelativePath.split('/')[0];
    }

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        // Skip non-image files if any
        if (!file.type.startsWith('image/')) continue;

        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        
        const result = await analyzeHomeworkImage(base64, file.type);
        results.push({
          id: `hw-${Date.now()}-${i}`,
          studentId: '1',
          studentName: '张小明',
          status: 'graded',
          imageUrl: base64,
          folderName: folderName || undefined,
          ...result
        } as Homework);
        
        // Update progress
        setAnalysisProgress(((i + 1) / fileList.length) * 100);
      }

      // Small delay to show 100% progress
      setTimeout(() => {
        onHomeworkAnalyzed?.(results);
        setIsAnalyzing(false);
      }, 500);

    } catch (error) {
      console.error("Analysis failed:", error);
      alert("AI 识别失败，请重试");
      setIsAnalyzing(false);
    }
  };

  const stats = [
    { label: '今日批改作业数', value: '128', trend: '+5%', trendUp: true, icon: History, iconColor: 'text-primary', bgColor: 'bg-primary/10' },
    { label: '待批改作业', value: '15', trend: '-2%', trendUp: false, icon: Clock, iconColor: 'text-orange-600', bgColor: 'bg-orange-100' },
    { label: '作业平均等级', value: 'A-', trend: '+1.5%', trendUp: true, icon: Award, iconColor: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: '上交作业率', value: '98%', subValue: '49/50 人', trend: '+3%', trendUp: true, icon: Users, iconColor: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  const recentList = [
    { name: '初中数学 - 勾股定理练习(三)', class: '八年级 (2) 班', student: '李子明', time: '10分钟前', score: 92, status: 'graded' },
    { name: '英语写作 - My Favorite City', class: '八年级 (1) 班', student: '王海玲', time: '22分钟前', score: '--', status: 'grading' },
    { name: '物理 - 电流与电阻单元测验', class: '九年级 (3) 班', student: '周凯', time: '1小时前', score: 58, status: 'graded' },
    { name: '语文 - 《论语》阅读笔记', class: '八年级 (2) 班', student: '唐悦', time: '3小时前', score: 88, status: 'graded' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full relative">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-xl", stat.bgColor, stat.iconColor)}>
                <stat.icon size={20} />
              </div>
              <span className={cn("text-xs font-bold flex items-center gap-1", stat.trendUp ? "text-green-500" : "text-red-500")}>
                {stat.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-semibold">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-black">{stat.value}</h3>
              {stat.subValue && <span className="text-slate-400 text-xs font-bold">{stat.subValue}</span>}
            </div>
          </Card>
        ))}
      </div>

      {/* AI Core Upload Area */}
      <div className="relative bg-white rounded-[2rem] border-2 border-dashed border-primary/20 p-12 text-center flex flex-col items-center group hover:border-primary/50 transition-all bg-gradient-to-b from-white to-primary/5 overflow-hidden min-h-[400px] justify-center">
        <AnimatePresence>
          {isAnalyzing ? (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 backdrop-blur-sm"
            >
              <div className="text-center space-y-6 max-w-md px-6">
                <div className="relative">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto"
                  >
                    <Brain size={48} className="text-primary" />
                  </motion.div>
                  <motion.div 
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -top-2 -right-2 text-primary"
                  >
                    <Sparkles size={24} />
                  </motion.div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">AI 正在解析作业中</h3>
                  <p className="text-slate-500 font-bold animate-pulse">马上就好，请稍候...</p>
                </div>

                <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mx-auto">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${analysisProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                <CloudUpload size={40} />
              </div>
              <h2 className="text-2xl font-black mb-2">AI 智能作业批改</h2>
              <p className="text-slate-500 max-w-lg mb-8 font-medium">
                支持拍照、扫描件或直接拖拽文件上传。AI 将自动识别题目类型、手写文字并提供详细的批改反馈与建议。
              </p>
              <div className="flex gap-4">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  multiple
                  onChange={handleFileUpload}
                />
                <input 
                  type="file" 
                  ref={folderInputRef} 
                  className="hidden" 
                  {...{ webkitdirectory: "", directory: "" } as any}
                  multiple
                  onChange={handleFileUpload}
                />
                <Button 
                  className="px-12 py-4 text-base shadow-xl shadow-primary/20" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                >
                  <CloudUpload size={20} />
                  上传作业图片
                </Button>
                <Button 
                  variant="outline"
                  className="px-8 py-4 text-base" 
                  onClick={() => folderInputRef.current?.click()}
                  disabled={isAnalyzing}
                >
                  <FolderUp size={20} />
                  上传文件夹
                </Button>
              </div>
              <p className="mt-6 text-xs text-slate-400 font-bold uppercase tracking-widest">支持格式：JPG, PNG, PDF (最大 50MB)</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2">
            <History className="text-primary" size={24} />
            最近批改列表
          </h2>
          <button className="text-primary text-sm font-bold hover:underline">查看全部</button>
        </div>
        
        <Card className="overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-4">作业名称</th>
                <th className="px-6 py-4">提交学生</th>
                <th className="px-6 py-4">上传时间</th>
                <th className="px-6 py-4">分数</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentList.map((item, idx) => (
                <tr key={idx} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{item.class}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {item.student.substring(0, 1)}
                      </div>
                      <span className="text-sm font-semibold">{item.student}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{item.time}</td>
                  <td className="px-6 py-4">
                    <span className={cn("text-sm font-black", item.score === '--' ? "text-slate-300" : parseInt(item.score.toString()) < 60 ? "text-red-600" : "text-green-600")}>
                      {item.score}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={item.status === 'graded' ? 'success' : 'info'}>
                      {item.status === 'graded' ? '已批改' : '批改中'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-primary/70 transition-colors p-2 hover:bg-primary/10 rounded-lg">
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
