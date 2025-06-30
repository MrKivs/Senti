import ChatAI from "@/app/components/ChatAI";

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-emerald-700">
        🤖 AI Assistant
      </h1>
      <ChatAI />
    </div>
  );
}
