"use client";
import React, { useEffect, useState } from "react";
import "../globals.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatePresence, motion } from "motion/react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import { GrFormNextLink } from "react-icons/gr";

export const metadata = {
  title: "Tuition Program - GCSE Higher",
};

const Page = () => {
  const questions = [
    [
      { question: 1, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 2, answer: ["A", "B", "C", "D"], correct: ["C"] },
      { question: 3, answer: ["A", "B", "C", "D"], correct: ["C"] },
      { question: 4, answer: ["A", "B", "C", "D"], correct: ["C"] },
      { question: 5, answer: ["A", "B", "C", "D"], correct: ["A"] },
    ],
    [
      { question: 6, answer: ["A", "B", "C", "D"], correct: ["B"] },
      { question: 7, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 8, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 9, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 10, answer: ["A", "B", "C", "D"], correct: ["A"] },
    ],
    [
      { question: 11, answer: ["A", "B", "C", "D"], correct: ["C"] },
      { question: 12, answer: ["A", "B", "C", "D"], correct: ["C"] },
      { question: 13, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 14, answer: ["A", "B", "C", "D"], correct: ["D"] },
      { question: 15, answer: ["A", "B", "C", "D"], correct: ["C"] },
    ],
    [
      { question: 16, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 17, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 18, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 19, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 20, answer: ["A", "B", "C", "D"], correct: ["A"] },
    ],
    [
      { question: 21, answer: ["A", "B", "C", "D"], correct: ["B"] },
      { question: 22, answer: ["A", "B", "C", "D"], correct: ["A"] },
      { question: 23, answer: ["A", "B", "C", "D"], correct: ["B"] },
      { question: 24, answer: ["A", "B", "C", "D"], correct: ["C"] },
      { question: 25, answer: ["A", "B", "C", "D"], correct: ["A"] },
    ],
  ];

  const [currentTab, setCurrentTab] = useState("1");
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const nextTab = String(Number(currentTab) + 1);

  const [answers, setAnswers] = useState<{
    [setIndex: number]: { [qIndex: number]: { [ans: string]: boolean } };
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [student, setStudent] = useState({ name: "", email: "", role: "" });
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);
  const [exit, setExit] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    if (exit) {
      router.push("/");
    }
  }, [exit, router]);

  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("email") || "";
    const role = localStorage.getItem("role") || "";
    setStudent({ name, email, role });
  }, []);

  const handleSubmitQuiz = () => {
    let totalScore = 0;

    questions.forEach((questionSet, setIndex) => {
      questionSet.forEach(({ correct }, qIndex) => {
        const userAnswers = answers[setIndex]?.[qIndex] || {};
        const correctSet = new Set(correct);
        const selected = Object.entries(userAnswers)
          .filter(([, checked]) => checked)
          .map(([ans]) => ans);

        const isCorrect =
          selected.length === correctSet.size &&
          selected.every((ans) => correctSet.has(ans));

        if (isCorrect) totalScore += 1;
      });
    });

    setScore(totalScore);
    setSubmitted(true);

    emailjs.send(
      "service_np66jpm",
      "template_54qabmp",
      {
        name: student.name,
        email: student.email,
        role: student.role,
        score,
      },
      "k8gZ7u7LK4FNoW5iy",
    );
  };

  const handleNextQuestionSet = () => {
    if (currentQuestionSet < questions.length - 1) {
      setCurrentQuestionSet((prev) => prev + 1);
      setCurrentTab("1");
    }
  };

  const handlePrevQuestionSet = () => {
    if (currentQuestionSet > 0) {
      setCurrentQuestionSet((prev) => prev - 1);
      setCurrentTab("1");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0d1419] p-6">
      <div className="w-full max-w-[800px]">
        <div className="mb-4 flex items-center justify-between">
          <button
            className="hover:bg-blue flex h-[28px] w-[60px] cursor-pointer items-center justify-center rounded-sm bg-[#0f1a24] px-2 text-white disabled:opacity-50"
            onClick={handlePrevQuestionSet}
            disabled={currentQuestionSet === 0}
          >
            <GrFormNextLink size={25} className="rotate-180" />
          </button>

          <button
            className="hover:bg-blue flex h-[28px] w-[60px] cursor-pointer items-center justify-center rounded-sm bg-[#0f1a24] px-2 text-white disabled:opacity-50"
            onClick={handleNextQuestionSet}
            disabled={currentQuestionSet === questions.length - 1}
          >
            <GrFormNextLink size={25} />
          </button>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <div className="flex w-full">
            <TabsList className="mb-20 flex w-full flex-wrap justify-center gap-2 bg-[#0f1a24]">
              {questions[currentQuestionSet].map((item, index) => {
                return (
                  <TabsTrigger
                    key={index}
                    value={String(index + 1)}
                    className={`cursor-pointer px-4 text-sm font-medium text-white`}
                  >
                    {item.question}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {questions[currentQuestionSet].map(
            ({ question, answer }, questionIndex) => {
              const questionId = String(questionIndex + 1);
              const isLastQuestionInSet =
                Number(currentTab) === questions[currentQuestionSet].length;
              const isLastSet = currentQuestionSet === questions.length - 1;

              return (
                <TabsContent
                  key={questionId}
                  value={questionId}
                  className="mb-20 flex flex-col items-center space-y-6 rounded-lg bg-[#0f1a24] py-6 text-center text-white shadow-xl"
                >
                  <div className="text-lg font-semibold">
                    Question {question}
                  </div>

                  <div className="flex flex-col gap-4">
                    {answer.map((ans, ansIndex) => {
                      const id = `set${currentQuestionSet}-q${questionIndex}-a${ansIndex}`;
                      return (
                        <div className="flex items-center gap-2" key={id}>
                          <Checkbox
                            id={id}
                            checked={
                              answers[currentQuestionSet]?.[questionIndex]?.[
                                ans
                              ] || false
                            }
                            disabled={submitted}
                            onCheckedChange={(checked) => {
                              if (submitted) return;
                              setAnswers((prev) => ({
                                ...prev,
                                [currentQuestionSet]: {
                                  ...(prev[currentQuestionSet] || {}),
                                  [questionIndex]: {
                                    ...(prev[currentQuestionSet]?.[
                                      questionIndex
                                    ] || {}),
                                    [ans]: checked === true,
                                  },
                                },
                              }));
                            }}
                          />
                          <label
                            htmlFor={id}
                            className="cursor-pointer text-sm select-none"
                          >
                            {ans}
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-x-5">
                    <button
                      className="cursor-pointer rounded-full bg-[#2094e4] px-6 py-1.5 text-sm font-semibold text-gray-900 hover:bg-[#187dc0]"
                      onClick={() => setShowModal(true)}
                    >
                      View Image
                    </button>

                    <AnimatePresence>
                      {showModal && (
                        <motion.div
                          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            className="flex h-[80%] w-[80%] flex-col items-center justify-center rounded-lg bg-[#0f1a24] shadow-xl"
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "100%" }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
                            <img
                              src={`gcse-higher-image/${currentQuestionSet * 5 + questionIndex + 1}.png`}
                              className="h-auto w-[600px] rounded-sm"
                            />
                            <button
                              className="mt-5 w-[120px] cursor-pointer rounded-full bg-[#2094e4] py-1.5 text-sm font-semibold text-gray-900 hover:bg-[#187dc0]"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isLastQuestionInSet ? (
                      <button
                        className="w-[120px] cursor-pointer rounded-full bg-[#2094e4] py-1.5 text-sm font-semibold text-gray-900 hover:bg-[#187dc0]"
                        onClick={() => {
                          setCurrentTab(nextTab);
                        }}
                      >
                        Next
                      </button>
                    ) : isLastSet ? (
                      <button
                        className="w-[120px] cursor-pointer rounded-full bg-[#2094e4] py-1.5 text-sm font-semibold text-gray-900 hover:bg-[#187dc0]"
                        onClick={() => {
                          handleSubmitQuiz();
                          setShowScoreModal(true);
                        }}
                        disabled={submitted}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        className="w-[120px] cursor-pointer rounded-full bg-[#2094e4] py-1.5 text-sm font-semibold text-gray-900 hover:bg-[#187dc0]"
                        onClick={handleNextQuestionSet}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </TabsContent>
              );
            },
          )}
        </Tabs>

        {submitted && (
          <AnimatePresence>
            {showScoreModal && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="flex h-[80%] w-[80%] flex-col items-center justify-center rounded-lg bg-[#0f1a24] shadow-xl"
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <h1 className="text-2xl font-bold text-white">
                    Your score is: {score}
                  </h1>
                  <p className="mx-10 mt-5 text-center text-lg text-white">
                    Your score has been recorded and delivered to the admin.
                    This will help us create and plan the best lessons and
                    resources for you.
                  </p>
                  <button
                    className="mt-7 w-[120px] cursor-pointer rounded-full bg-[#2094e4] py-1.5 text-sm font-semibold text-gray-900 hover:bg-[#187dc0]"
                    onClick={() => setExit(true)}
                  >
                    Exit
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Page;
