import ChatAI from "../../components/ChatAI";
import { CpuChipIcon } from "@heroicons/react/24/outline";

export default function AIAssistantPage() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-cyan-50 p-3 md:p-5">
      <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
        <header className="mb-2 md:mb-3 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-1">
            <CpuChipIcon className="h-6 w-6 text-emerald-700" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-emerald-800">
            AI Assistant
          </h1>
          <p className="text-emerald-600 text-xs md:text-sm">
            Ask about saving strategies & disbursement rules
          </p>
        </header>

        <div className="flex-grow bg-white rounded-xl shadow-md border border-emerald-100 overflow-hidden">
          <ChatAI />
        </div>

        <footer className="text-center text-xs text-emerald-700/70 py-1">
          <p>Powered by DeepSeek-R1</p>
        </footer>
      </div>
    </div>
  );
}
