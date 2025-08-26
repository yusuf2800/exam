"use client";
import React, { useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";



const Page = () => {

  const router = useRouter();
  const [role, setRole] = useState<string>("Select role");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [nameValid, setNameValid] = useState<boolean>(true);
  const [roleValid, setRoleValid] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = email.trim().length > 0 && email.includes("@");
    const isNameValid = name.trim().length > 0;
    const roleSelectorValid = role !== "Select role";
    setEmailValid(isEmailValid);
    setNameValid(isNameValid);
    setRoleValid(roleSelectorValid);

    if (isEmailValid && isNameValid) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      router.push(
        role === "GCSE Foundation" ? "/gcse-foundation" : "/gcse-higher",
      );
    }
  };

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center text-white">
      <div className="w-[480px] rounded-4xl border-1 border-[#2e485a] bg-[#0f1a24] px-[55px] py-[65px] shadow-2xl mx-5">
        <h1 className="mb-6 text-center text-4xl font-bold">Entrance Exam</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-base font-semibold">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 mb-1 h-[42px] w-full rounded-lg border-2 border-[#2e485a] bg-[#172636] px-[10px] py-[12px] font-semibold text-[#8dacc1] outline-none ${
                nameValid ? "" : "border-red-500"
              }`}
              placeholder="Enter your name"
            />
            {!nameValid && (
              <p className="mb-2 text-sm text-red-500">Name is required</p>
            )}
          </div>

          <label className="mt-5 text-base font-semibold">Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 mb-1 h-[42px] w-full rounded-lg border-2 border-[#2e485a] bg-[#172636] px-[10px] py-[12px] font-semibold text-[#87a6bb] outline-none ${
              emailValid ? "" : "border-red-500"
            }`}
            placeholder="Enter your email"
          />
          {!emailValid && (
            <p className="mb-2 text-sm text-red-500">Email is required</p>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`mt-7 mb-2 flex h-[42px] w-[180px] items-center justify-between rounded-lg border-2 border-[#2e485a] bg-[#172636] px-[10px] py-[12px] text-[#87a6bb] outline-none ${
                  roleValid ? "" : "border-red-500"
                }`}
              >
                {role}
                <ChevronDown size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-1 min-w-[180px] rounded-lg border border-[#2e485a] bg-[#172636] text-[#87a6bb] shadow-xl">
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex cursor-pointer items-center rounded-md px-3 py-2 hover:bg-[#1f2f42]">
                    GCSEs
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="rounded-lg border border-[#2e485a] bg-[#172636] text-[#87a6bb] shadow-xl">
                      <DropdownMenuItem
                        className="cursor-pointer px-3 py-2 hover:bg-[#111a22]"
                        onClick={() => setRole("GCSE Foundation")}
                      >
                        Foundation
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer px-3 py-2 hover:bg-[#1f2f42] hover:text-white"
                        onClick={() => setRole("GCSE Higher")}
                      >
                        Higher
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {!roleValid && (
            <p className="mb-2 text-sm text-red-500">Role is required</p>
          )}
          <button
            className="mt-9 flex h-[37px] w-full items-center justify-center rounded-full bg-[#2094e4] text-lg font-semibold outline-none"
            type="submit"
          >
            <span className="mr-[1px]">Begin</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
