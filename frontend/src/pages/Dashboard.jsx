import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  // ================= STATES =================

  const [testcases, setTestcases] = useState([]);

  const [bugs, setBugs] = useState([]);

  const [aiHistory, setAiHistory] = useState([]);

  const [testcaseForm, setTestcaseForm] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
  });

  const [aiPrompt, setAiPrompt] = useState("");

  const [aiResponse, setAiResponse] = useState("");

  const [loadingAI, setLoadingAI] = useState(false);

  // ================= LOAD DATA =================

  useEffect(() => {

    fetchTestCases();

    fetchBugs();

    fetchAIHistory();

  }, []);

  // ================= FETCH TESTCASES =================

  const fetchTestCases = async () => {

    const res = await axios.get(
      "https://testforgeai-backend.onrender.com/testcases",
    );

    setTestcases(res.data);
  };

  // ================= FETCH BUGS =================

  const fetchBugs = async () => {

    const res = await axios.get(
      "http://127.0.0.1:8000/bugs"
    );

    setBugs(res.data);
  };

  // ================= FETCH AI HISTORY =================

  const fetchAIHistory = async () => {

    const res = await axios.get(
      "http://127.0.0.1:8000/ai-history"
    );

    setAiHistory(res.data.reverse());
  };

  // ================= CREATE TESTCASE =================

  const createTestCase = async () => {

    await axios.post(
      "http://127.0.0.1:8000/testcases",
      testcaseForm
    );

    fetchTestCases();

    setTestcaseForm({
      title: "",
      description: "",
      priority: "",
      status: "",
    });
  };

  // ================= AI GENERATOR =================

  const generateAITestCases = async () => {

    try {

      setLoadingAI(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/generate-testcases",
        {
          prompt: aiPrompt
        }
      );

      setAiResponse(res.data.response);

      fetchAIHistory();

    } catch (error) {

      alert("AI generation failed");

    } finally {

      setLoadingAI(false);
    }
  };

  // ================= LOGOUT =================

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  // ================= UI =================

  return (

    <div className="
      min-h-screen
      bg-slate-950
      text-white
      flex
    ">

      {/* ================= SIDEBAR ================= */}

      <div className="
        w-64
        bg-slate-900
        border-r
        border-slate-800
        p-6
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-10
        ">
          🚀 TestForge AI
        </h1>

        <button
          onClick={logout}
          className="
            w-full
            bg-red-600
            hover:bg-red-500
            p-3
            rounded-xl
            font-bold
            mb-10
          "
        >
          Logout
        </button>

        <div className="space-y-4">

          <div className="
            bg-slate-800
            p-4
            rounded-xl
          ">

            <h2 className="
              text-lg
              font-semibold
            ">
              Total Test Cases
            </h2>

            <p className="
              text-3xl
              mt-2
            ">
              {testcases.length}
            </p>

          </div>

          <div className="
            bg-slate-800
            p-4
            rounded-xl
          ">

            <h2 className="
              text-lg
              font-semibold
            ">
              Open Bugs
            </h2>

            <p className="
              text-3xl
              mt-2
            ">
              {bugs.length}
            </p>

          </div>

          <div className="
            bg-slate-800
            p-4
            rounded-xl
          ">

            <h2 className="
              text-lg
              font-semibold
            ">
              AI Generations
            </h2>

            <p className="
              text-3xl
              mt-2
            ">
              {aiHistory.length}
            </p>

          </div>

        </div>

      </div>

      {/* ================= MAIN ================= */}

      <div className="
        flex-1
        p-10
        overflow-y-auto
      ">

        <h1 className="
          text-5xl
          font-bold
          mb-10
        ">
          QA Automation Dashboard
        </h1>

        {/* ================= TESTCASE FORM ================= */}

        <div className="
          bg-slate-900
          p-6
          rounded-2xl
          mb-10
        ">

          <h2 className="
            text-2xl
            mb-5
            font-bold
          ">
            Add Test Case
          </h2>

          <div className="
            grid
            grid-cols-2
            gap-4
          ">

            <input
              placeholder="Title"
              className="
                p-3
                rounded
                bg-slate-800
              "
              value={testcaseForm.title}
              onChange={(e) =>
                setTestcaseForm({
                  ...testcaseForm,
                  title: e.target.value
                })
              }
            />

            <input
              placeholder="Description"
              className="
                p-3
                rounded
                bg-slate-800
              "
              value={testcaseForm.description}
              onChange={(e) =>
                setTestcaseForm({
                  ...testcaseForm,
                  description: e.target.value
                })
              }
            />

            <input
              placeholder="Priority"
              className="
                p-3
                rounded
                bg-slate-800
              "
              value={testcaseForm.priority}
              onChange={(e) =>
                setTestcaseForm({
                  ...testcaseForm,
                  priority: e.target.value
                })
              }
            />

            <input
              placeholder="Status"
              className="
                p-3
                rounded
                bg-slate-800
              "
              value={testcaseForm.status}
              onChange={(e) =>
                setTestcaseForm({
                  ...testcaseForm,
                  status: e.target.value
                })
              }
            />

          </div>

          <button
            onClick={createTestCase}
            className="
              mt-5
              bg-blue-600
              hover:bg-blue-500
              px-6
              py-3
              rounded-xl
              font-bold
            "
          >
            Create Test Case
          </button>

        </div>

        {/* ================= AI GENERATOR ================= */}

        <div className="
          bg-slate-900
          p-6
          rounded-2xl
          mb-10
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-5
          ">
            🤖 AI Test Case Generator
          </h2>

          <div className="
            flex
            gap-4
            mb-5
          ">

            <input
              type="text"
              placeholder="Example: Login Page"
              value={aiPrompt}
              onChange={(e) =>
                setAiPrompt(e.target.value)
              }
              className="
                flex-1
                p-4
                rounded-xl
                bg-slate-800
                outline-none
              "
            />

            <button
              onClick={generateAITestCases}
              className="
                bg-purple-600
                hover:bg-purple-500
                px-6
                rounded-xl
                font-bold
              "
            >
              {
                loadingAI
                  ? "Generating..."
                  : "Generate"
              }
            </button>

          </div>

          <div className="
            bg-slate-950
            p-5
            rounded-xl
            border
            border-slate-800
            max-h-[500px]
            overflow-y-auto
            whitespace-pre-wrap
          ">

            {
              aiResponse
                ? aiResponse
                : "AI-generated test cases will appear here..."
            }

          </div>

        </div>

        {/* ================= AI HISTORY ================= */}

        <div className="
          bg-slate-900
          p-6
          rounded-2xl
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-6
          ">
            🕘 AI Generation History
          </h2>

          <div className="space-y-6">

            {
              aiHistory.map((item) => (

                <div
                  key={item._id}
                  className="
                    bg-slate-950
                    p-5
                    rounded-xl
                    border
                    border-slate-800
                  "
                >

                  <h3 className="
                    text-xl
                    font-bold
                    mb-3
                    text-purple-400
                  ">
                    {item.prompt}
                  </h3>

                  <div className="
                    whitespace-pre-wrap
                    text-sm
                    text-slate-300
                  ">
                    {item.response}
                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;