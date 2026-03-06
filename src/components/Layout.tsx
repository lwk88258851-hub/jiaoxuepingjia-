import React, { useState } from 'react';
import { LayoutDashboard, FileText, Users, BarChart3, Bell, Search, Sparkles, ChevronLeft, ChevronRight, Menu, User } from 'lucide-react';
import { cn } from './UI';

export function Sidebar({ activeTab, onTabChange, isCollapsed, setIsCollapsed }: { 
  activeTab: string; 
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}) {
  const menuItems = [
    { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
    { id: 'teacher', label: '教师个人', icon: User },
    { id: 'homework', label: '作业批改', icon: FileText },
    { id: 'students', label: '学生分析', icon: BarChart3 },
    { id: 'analysis', label: '班级管理', icon: Users },
  ];

  return (
    <aside className={cn(
      "border-r border-slate-200/60 bg-white flex flex-col sticky top-0 h-screen transition-all duration-300 ease-in-out z-20",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className={cn("p-6 flex items-center gap-3 relative", isCollapsed ? "justify-center" : "")}>
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
          <FileText size={24} />
        </div>
        {!isCollapsed && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-base font-bold leading-tight">智学批改</h1>
            <p className="text-[10px] text-primary/70 font-bold uppercase tracking-wider">EduTech Pro</p>
          </div>
        )}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-hidden">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
              activeTab === item.id 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "text-slate-600 hover:bg-primary/5 hover:text-primary",
              isCollapsed ? "justify-center px-0" : ""
            )}
          >
            <item.icon size={20} className="shrink-0" />
            {!isCollapsed && <span className="text-sm font-semibold whitespace-nowrap animate-in fade-in duration-300">{item.label}</span>}
            
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center text-primary">
              <Sparkles size={20} />
            </div>
          </div>
        ) : (
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 animate-in fade-in duration-300">
            <p className="text-xs font-bold text-primary mb-2">存储空间</p>
            <div className="w-full bg-primary/20 h-1.5 rounded-full mb-2 overflow-hidden">
              <div className="bg-primary h-full w-[65%] rounded-full" />
            </div>
            <p className="text-[10px] text-slate-500 font-medium">已使用 12.4GB / 20GB</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export function Header() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="max-w-md w-full relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary transition-all" 
          placeholder="搜索学生、作业、课程..." 
          type="text"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none mb-1">张大千 老师</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">高级教研员</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 group-hover:border-primary transition-all overflow-hidden shadow-sm">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
              alt="Teacher avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
