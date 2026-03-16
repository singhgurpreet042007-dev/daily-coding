import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../config/api";
import AppLayout from "../components/AppLayout";

const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Array", acceptance: "49%" },
  { id: 2, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", acceptance: "41%" },
  { id: 3, title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List", acceptance: "66%" },
  { id: 4, title: "Binary Search", difficulty: "Easy", topic: "Search", acceptance: "55%" },
  { id: 5, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Greedy", acceptance: "53%" },
  { id: 6, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window", acceptance: "35%" },
  { id: 7, title: "Add Two Numbers", difficulty: "Medium", topic: "Linked List", acceptance: "39%" },
  { id: 8, title: "3Sum", difficulty: "Medium", topic: "Two Pointers", acceptance: "32%" },
  { id: 9, title: "Group Anagrams", difficulty: "Medium", topic: "Hash Map", acceptance: "68%" },
  { id: 10, title: "Coin Change", difficulty: "Medium", topic: "DP", acceptance: "45%" },
  { id: 11, title: "Number of Islands", difficulty: "Medium", topic: "Graph", acceptance: "59%" },
  { id: 12, title: "Word Ladder", difficulty: "Hard", topic: "BFS", acceptance: "36%" },
  { id: 13, title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search", acceptance: "40%" },
  { id: 14, title: "Merge k Sorted Lists", difficulty: "Hard", topic: "Heap", acceptance: "51%" },
  { id: 15, title: "N-Queens", difficulty: "Hard", topic: "Backtracking", acceptance: "69%" },
];

function diffColor(diff: string) {
  if (diff === "Easy") return "#22c55e";
  if (diff === "Medium") return "#facc15";
  return "#ef4444";
}

export default function Problems() {
  return (
    <AppLayout
      title="Problems"
      subtitle="15 curated LeetCode-style problems with topic tags and difficulty split."
    >
      <div
        style={{
          display: "grid",
          gap: 14,
        }}
      >
        {problems.map((p, index) => (
          <div
            key={p.title}
            style={{
              display: "grid",
              gridTemplateColumns: "70px 1.8fr 0.9fr 0.9fr 0.8fr",
              alignItems: "center",
              gap: 12,
              background: "rgba(8,18,40,0.78)",
              border: "1px solid rgba(96,165,250,0.14)",
              borderRadius: 18,
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                color: "#fff",
                background: "linear-gradient(135deg,#2563eb,#facc15)",
              }}
            >
              {index + 1}
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{p.title}</div>
              <div style={{ color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
                Topic: {p.topic}
              </div>
            </div>

            <div
              style={{
                color: diffColor(p.difficulty),
                fontWeight: 800,
                background: `${diffColor(p.difficulty)}18`,
                border: `1px solid ${diffColor(p.difficulty)}44`,
                padding: "8px 12px",
                borderRadius: 999,
                textAlign: "center",
              }}
            >
              {p.difficulty}
            </div>

            <div style={{ color: "rgba(255,255,255,0.78)" }}>
              Acceptance: <b>{p.acceptance}</b>
            </div>

            {/* Solve Button */}
            <Link to={`/problem/${p.id}`}>
              <button
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(250, 204, 21, 0.41)",
                  background: "rgba(250,204,21,0.08)",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Solve →
              </button>
            </Link>

          </div>
        ))}
      </div>
    </AppLayout>
  );
}