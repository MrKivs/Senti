"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";

export default function ChamaPage() {
  const chama = {
    name: "Mama Mboga",
    goal: "KES 12,000 for loan fund",
    members: [
      "Jane Wanjiru",
      "Mary Atieno",
      "Susan Akinyi",
      "Esther Muthoni",
      "Grace Njeri",
      "Lucy Wambui",
    ],
    joined: true,
    progress: 65,
    totalAmount: 7800,
    targetAmount: 12000,
    recentActivities: [
      {
        type: "contribution",
        member: "Jane Wanjiru",
        amount: 1500,
        date: "2023-06-15",
      },
      {
        type: "contribution",
        member: "Mary Atieno",
        amount: 2000,
        date: "2023-06-14",
      },
      {
        type: "loan",
        member: "Susan Akinyi",
        amount: 5000,
        date: "2023-06-10",
      },
    ],
  };

  const [contributionAmount, setContributionAmount] = useState("");
  const [showMembers, setShowMembers] = useState(true);
  const [showActivities, setShowActivities] = useState(true);

  const handleContribution = () => {
    if (!contributionAmount) return;
    alert(`Contribution of KES ${contributionAmount} submitted!`);
    setContributionAmount("");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-br from-sky-50 to-indigo-100 p-4 md:ml-64 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6 pt-4">
          {/* Header */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-2 rounded-xl bg-white border border-emerald-200 shadow">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
            </div>
            <h1 className="text-3xl font-bold text-emerald-700">
              {chama.name}
            </h1>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Total Members" value={chama.members.length} />
            <StatCard
              label="Amount Raised"
              value={`KES ${chama.totalAmount.toLocaleString()}`}
            />
            <StatCard
              label="Target"
              value={`KES ${chama.targetAmount.toLocaleString()}`}
            />
          </div>

          {/* Progress */}
          <motion.div
            className="bg-white rounded-xl p-5 shadow border border-emerald-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">Goal</h2>
            <p className="text-sm text-gray-600 mt-1">{chama.goal}</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{chama.progress}%</span>
              </div>
              <div className="h-3 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  style={{ width: `${chama.progress}%` }}
                ></div>
              </div>
              <p className="text-right text-xs text-gray-400 mt-1">
                KES {chama.totalAmount.toLocaleString()} of KES{" "}
                {chama.targetAmount.toLocaleString()}
              </p>
            </div>
          </motion.div>

          {/* Contribution Form */}
          <ContributionForm
            amount={contributionAmount}
            setAmount={setContributionAmount}
            handleSubmit={handleContribution}
          />

          {/* Members + Activities */}
          <div className="flex flex-col lg:flex-row gap-6">
            <MembersSection
              members={chama.members}
              show={showMembers}
              toggle={() => setShowMembers(!showMembers)}
            />
            <div className="lg:w-2/5 space-y-6">
              <ActivityFeed
                activities={chama.recentActivities}
                show={showActivities}
                toggle={() => setShowActivities(!showActivities)}
              />
              <Actions joined={chama.joined} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ---------- Components ----------

function StatCard({ label, value }) {
  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow border border-emerald-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-sm text-emerald-600">{label}</p>
      <p className="text-xl font-bold text-emerald-700">{value}</p>
    </motion.div>
  );
}

function ContributionForm({ amount, setAmount, handleSubmit }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-5 shadow border border-emerald-100 space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-emerald-700">
        Make Contribution
      </h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="flex-1 bg-white border border-emerald-200 text-emerald-700 placeholder-emerald-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
        <button
          onClick={handleSubmit}
          disabled={!amount}
          className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-5 py-2 rounded-xl font-semibold shadow disabled:opacity-40"
        >
          Contribute
        </button>
      </div>
    </motion.div>
  );
}

function MembersSection({ members, show, toggle }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-5 shadow border border-emerald-100 flex-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-emerald-700">Members</h3>
        <button
          onClick={toggle}
          className="text-sm text-emerald-500 hover:text-emerald-600"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {show && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {members.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 border border-emerald-100 rounded-lg"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
                {name[0]}
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">Active member</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ActivityFeed({ activities, show, toggle }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-5 shadow border border-emerald-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-emerald-700">
          Recent Activities
        </h3>
        <button
          onClick={toggle}
          className="text-sm text-emerald-500 hover:text-emerald-600"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {show &&
        activities.map((a, i) => (
          <div
            key={i}
            className="p-3 border border-emerald-100 rounded-lg flex justify-between items-center mb-2"
          >
            <div>
              <p className="font-medium text-gray-800">{a.member}</p>
              <p className="text-xs text-gray-500 capitalize">{a.type}</p>
              <p className="text-xs text-gray-400">{a.date}</p>
            </div>
            <p
              className={`text-sm font-bold ${
                a.type === "contribution" ? "text-emerald-600" : "text-blue-500"
              }`}
            >
              {a.type === "contribution" ? "+" : "-"}KES{" "}
              {a.amount.toLocaleString()}
            </p>
          </div>
        ))}
    </motion.div>
  );
}

function Actions({ joined }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-5 shadow border border-emerald-100 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {joined ? (
        <>
          <button className="w-full bg-white border border-emerald-200 text-emerald-700 py-2 rounded-lg font-medium hover:bg-emerald-50">
            View Transactions
          </button>
          <button className="w-full bg-white border border-blue-200 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50">
            Request Loan
          </button>
          <button className="w-full bg-white border border-red-200 text-red-500 py-2 rounded-lg font-medium hover:bg-red-50">
            Leave Chama
          </button>
        </>
      ) : (
        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-medium hover:brightness-110">
          Join Chama
        </button>
      )}
    </motion.div>
  );
}
