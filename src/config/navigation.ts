import { BookOpen, Cpu, HardDrive, Terminal, Download, BarChart2, GitCompare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'codes' -> t('nav.codes')
	path: string // URL 路径，如 '/codes'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'models', path: '/models', icon: Cpu, isContentType: true },
	{ key: 'requirements', path: '/requirements', icon: HardDrive, isContentType: true },
	{ key: 'ollama', path: '/ollama', icon: Terminal, isContentType: true },
	{ key: 'install', path: '/install', icon: Download, isContentType: true },
	{ key: 'benchmark', path: '/benchmark', icon: BarChart2, isContentType: true },
	{ key: 'comparison', path: '/comparison', icon: GitCompare, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['guide', 'models', 'requirements', 'ollama', 'install', 'benchmark', 'comparison']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
