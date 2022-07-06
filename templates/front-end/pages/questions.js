import React from "react";
import Questions from "../components/Questions/Questions";
import AppLayout from "../components/AppLayout";

const dummy_questions = [
  {
    qusetId: "question 1",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 3,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
  },
  {
    qusetId: "question 2",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 92,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
  },
  {
    qusetId: "question 3",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 122,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
  },
  {
    qusetId: "question 4",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 1225,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
  },
  {
    qusetId: "question 5",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 0,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
  },
];

const questions = () => {
  return (
    <AppLayout>
      <Questions questions={dummy_questions} />
    </AppLayout>
  );
};

export default questions;
