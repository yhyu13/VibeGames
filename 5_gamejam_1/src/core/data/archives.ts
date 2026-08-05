// core/data/archives.ts — 挑战者档案（TDD §5.4 冻结形状，02 §2）
// TODO agent-content: L_ARCH_01..10 预设 + L_ARCH_GEN 模板 ×3。

import type { ArchiveEntry } from '../types';

export const ARCHIVE_PRESETS: ArchiveEntry[] = [];
export const ARCHIVE_GEN_TEMPLATES: { name: string; lines: string[] }[] = [];
