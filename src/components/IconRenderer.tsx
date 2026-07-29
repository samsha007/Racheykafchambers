import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5' }) => {
  // Map specific names if Lucide icon names differ slightly
  const iconMap: Record<string, keyof typeof LucideIcons> = {
    Briefcase: 'Briefcase',
    Gavel: 'Gavel',
    Zap: 'Zap',
    Landmark: 'Landmark',
    Scale: 'Scale',
    BuildingColumns: 'Landmark',
    Building: 'Building',
    Users: 'Users',
    Shield: 'Shield',
    FileText: 'FileText',
    FileCheck: 'FileCheck',
    Receipt: 'Receipt',
    Globe: 'Globe',
    Anchor: 'Anchor',
    Cpu: 'Cpu',
    Pickaxe: 'Hammer',
    Leaf: 'Leaf',
    Key: 'Key',
    ShieldAlert: 'ShieldAlert',
    Compass: 'Compass',
    GraduationCap: 'GraduationCap',
    HeartPulse: 'HeartPulse',
    PenTool: 'PenTool',
    Award: 'Award',
    BookOpen: 'BookOpen',
    Flame: 'Flame',
    Radio: 'Radio',
    Factory: 'Factory',
    Sprout: 'Sprout',
    Handshake: 'Handshake',
    Utensils: 'Utensils',
    Church: 'Church',
    Rocket: 'Rocket',
    TrendingUp: 'TrendingUp',
    Layers: 'Layers',
    ShieldCheck: 'ShieldCheck',
    Lightbulb: 'Lightbulb',
    Combine: 'Combine',
  };

  const targetIconName = iconMap[name] || name;
  const Component = (LucideIcons as Record<string, React.ElementType>)[targetIconName] || LucideIcons.HelpCircle;

  return <Component className={className} />;
};
