"use client";

import { useMemo, useState } from "react";
import { AirbnbButton } from "@/components/airbnb-button";
import {
  burnoutProtocols,
  burnoutQuestions,
  type BurnoutProfile,
} from "@/data/burnout-quiz";

export function BurnoutQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<BurnoutProfile, number>>({
    reset: 0,
    reconnect: 0,
    recharge: 0,
  });

  const question = burnoutQuestions[step];
  const finished = step >= burnoutQuestions.length;

  const result = useMemo(() => {
    if (!finished) return null;
    const entries = Object.entries(scores) as [BurnoutProfile, number][];
    entries.sort((a, b) => b[1] - a[1]);
    return burnoutProtocols[entries[0][0]];
  }, [finished, scores]);

  function choose(profile: BurnoutProfile) {
    const nextScores = { ...scores, [profile]: scores[profile] + 1 };
    setScores(nextScores);
    setStep((current) => current + 1);
  }

  if (finished && result) {
    return (
      <div className="rounded-[1.75rem] border border-line bg-white/60 p-8 md:p-12">
        <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{result.title}</h2>
        <ul className="mt-8 space-y-3">
          {result.itinerary.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <AirbnbButton campaign="burnout-reset" content="quiz-result" label={result.cta} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-line bg-white/60 p-8 md:p-12">
      <p className="text-sm text-muted">
        Question {step + 1} of {burnoutQuestions.length}
      </p>
      <h2 className="font-serif mt-3 text-3xl tracking-tight md:text-4xl">{question.prompt}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => choose(option.profile)}
            className="rounded-[1.25rem] border border-line bg-parchment px-5 py-6 text-left text-sm leading-7 text-muted transition-colors hover:border-copper hover:text-ink"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
