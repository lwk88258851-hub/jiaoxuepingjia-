import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'default', className }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'; className?: string }) {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-600",
    info: "bg-blue-50 text-blue-600",
  };
  
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center justify-center", variants[variant], className)}>
      {children}
    </span>
  );
}

export function Button({ 
  children, 
  variant = 'primary', 
  className,
  onClick,
  disabled,
  icon: Icon
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ElementType;
}) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all active:scale-95",
        variants[variant],
        className
      )}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
