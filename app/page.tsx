import Chat from "@/components/Chat/Chat";
import TaskPanel from "@/components/Tasks/TaskPanel";

export default function Home() {
  return (
    <main className="h-screen w-full p-6 md:p-10">
      <div className="w-full flex flex-col sm:flex-row gap-6 h-full">
        <TaskPanel />
        <Chat />
      </div>
    </main>
  );
}
