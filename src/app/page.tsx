'use client'

import { useRubricStore } from '@/store/rubricStore'
import SimulatorPane from '@/components/simulator/SimulatorPane'
import CoachPane from '@/components/coach/CoachPane'
import clsx from 'clsx'

import ManagementPane from '@/components/management/ManagementPane'

export default function Home() {
  const { mode, setMode } = useRubricStore()

  return (
    <main className="flex flex-col h-screen w-full overflow-hidden bg-gray-100 font-sans">
      {/* Top Navigation Bar */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Rubric Studio</h1>
          <nav className="flex bg-slate-100 p-1 rounded-lg">
            {(['learning', 'evaluation', 'management', 'deployment'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={clsx(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                  mode === m
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)} Mode
              </button>
            ))}
          </nav>
        </div>
        <div className="text-xs text-slate-400">
          v0.2.1 (Multi-Rubric Support)
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {mode === 'learning' && (
          <>
            {/* Learning Mode: Coach (Left) + Simulator/Editor (Right) */}
            <div className="w-[40%] h-full border-r border-gray-200 shadow-xl z-10 bg-white">
              <CoachPane />
            </div>
            <div className="w-[60%] h-full bg-slate-50">
              <SimulatorPane />
            </div>
          </>
        )}

        {mode === 'evaluation' && (
          <div className="w-full h-full p-6 bg-slate-50 flex justify-center">
            <div className="w-full max-w-5xl h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Reusing SimulatorPane for now as it handles evaluation */}
              <SimulatorPane />
            </div>
          </div>
        )}

        {mode === 'management' && (
          <ManagementPane />
        )}

        {mode === 'deployment' && (
          <div className="w-full h-full flex items-center justify-center p-10">
            <div className="text-center max-w-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Deployment Mode</h2>
              <p className="text-slate-600 mb-8">
                Package your Rubric and System Prompt for production.
                Coming soon: Export JSON, Prompt Compiler, and Version History.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Export Package (Coming Soon)
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
