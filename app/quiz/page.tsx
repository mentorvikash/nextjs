"use client";

import { useState, ChangeEvent, useEffect } from "react";

interface RadioOption {
  index: string;
  value: string;
}

interface Answer {
  index: string;
  value: string;
}

interface selectedAnswers {
  [key: string]: Answer;
}

export default function Home() {
  const [selectedAnswers, setSelectedAnswers] = useState<selectedAnswers>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const quizQuestion = [
    {
      question: "खिलजी वंश का संस्थापक कौन था?",
      options: [
        "(a) अलाउद्दीन खिलजी",
        "(b) जलालुद्दीन खिलजी",
        "(c) मुबारक खिलजी",
        "(d) खुसरो खान",
      ],
      answer: "(b) जलालुद्दीन खिलजी",
    },
    {
      question: "खिलजी वंश की स्थापना किस वर्ष हुई थी?",
      options: [
        "(a) 1206 ईस्वी",
        "(b) 1290 ईस्वी",
        "(c) 1320 ईस्वी",
        "(d) 1325 ईस्वी",
      ],
      answer: "(b) 1290 ईस्वी",
    },
    {
      question:
        "जलालुद्दीन फिरोज खिलजी दिल्ली का सुल्तान बनने से पहले कहां का सूबेदार था?",
      options: ["(a) लाहौर", "(b) मुल्तान", "(c) समाना", "(d) बदायूं"],
      answer: "(c) समाना",
    },
    {
      question: "अलाउद्दीन खिलजी दिल्ली का सुल्तान कब बना?",
      options: [
        "(a) 1290 ईस्वी",
        "(b) 1292 ईस्वी",
        "(c) 1296 ईस्वी",
        "(d) 1300 ईस्वी",
      ],
      answer: "(c) 1296 ईस्वी",
    },
    {
      question: "अलाउद्दीन खिलजी का मूल नाम क्या था?",
      options: [
        "(a) अली गुरशास्प",
        "(b) मलिक फिरोज",
        "(c) जूना खान",
        "(d) गाजी मलिक",
      ],
      answer: "(a) अली गुरशास्प",
    },
    {
      question: "किस खिलजी सुल्तान ने 'सिकंदर-ए-सानी' की उपाधि धारण की थी?",
      options: [
        "(a) जलालुद्दीन खिलजी",
        "(b) अलाउद्दीन खिलजी",
        "(c) कुतुबुद्दीन मुबारक शाह",
        "(d) इनमें से कोई नहीं",
      ],
      answer: "(b) अलाउद्दीन खिलजी",
    },
    {
      question:
        "अलाउद्दीन खिलजी के प्रसिद्ध सेनापति कौन थे जिन्होंने दक्षिण भारत में विजय प्राप्त की?",
      options: [
        "(a) उलुग खान और नुसरत खान",
        "(b) मलिक काफूर",
        "(c) जफर खान",
        "(d) ये सभी",
      ],
      answer: "(b) मलिक काफूर",
    },
    {
      question: "अलाउद्दीन खिलजी ने किस वर्ष चित्तौड़ पर आक्रमण किया था?",
      options: [
        "(a) 1301 ईस्वी",
        "(b) 1303 ईस्वी",
        "(c) 1308 ईस्वी",
        "(d) 1311 ईस्वी",
      ],
      answer: "(b) 1303 ईस्वी",
    },
    {
      question:
        "अलाउद्दीन खिलजी ने चित्तौड़ पर विजय प्राप्त करने के बाद उसका नाम क्या रखा था?",
      options: [
        "(a) इस्लामाबाद",
        "(b) जलालाबाद",
        "(c) खिजराबाद",
        "(d) मुबारकाबाद",
      ],
      answer: "(c) खिजराबाद",
    },
    {
      question: "किस खिलजी सुल्तान ने बाजार नियंत्रण की नीति लागू की थी?",
      options: [
        "(a) जलालुद्दीन खिलजी",
        "(b) अलाउद्दीन खिलजी",
        "(c) शहाबुद्दीन उमर",
        "(d) कुतुबुद्दीन मुबारक शाह",
      ],
      answer: "(b) अलाउद्दीन खिलजी",
    },
    {
      question:
        "अलाउद्दीन खिलजी ने सैनिकों को वेतन का भुगतान किस रूप में किया?",
      options: [
        "(a) भूमि अनुदान",
        "(b) अनाज",
        "(c) नकद",
        "(d) इनमें से कोई नहीं",
      ],
      answer: "(c) नकद",
    },
    {
      question: "'दाग' और 'हुलिया' प्रथा किस सुल्तान द्वारा शुरू की गई थी?",
      options: [
        "(a) बलबन",
        "(b) अलाउद्दीन खिलजी",
        "(c) फिरोज शाह तुगलक",
        "(d) शेरशाह सूरी",
      ],
      answer: "(b) अलाउद्दीन खिलजी",
    },
    {
      question:
        "अलाउद्दीन खिलजी के शासनकाल में निर्मित 'अलाई दरवाजा' किसका प्रवेश द्वार है?",
      options: [
        "(a) कुतुब मीनार",
        "(b) जामा मस्जिद",
        "(c) लाल किला",
        "(d) सीरी का किला",
      ],
      answer: "(a) कुतुब मीनार",
    },
    {
      question: "किस खिलजी सुल्तान ने स्वयं को खलीफा घोषित किया था?",
      options: [
        "(a) अलाउद्दीन खिलजी",
        "(b) मुबारक खिलजी",
        "(c) खुसरो खान",
        "(d) इनमें से कोई नहीं",
      ],
      answer: "(b) मुबारक खिलजी",
    },
    {
      question: "खिलजी वंश का अंतिम शासक कौन था?",
      options: [
        "(a) अलाउद्दीन खिलजी",
        "(b) मुबारक खिलजी",
        "(c) खुसरो खान",
        "(d) शहाबुद्दीन उमर",
      ],
      answer: "(c) खुसरो खान",
    },
    {
      question: "खिलजी वंश का शासनकाल कब से कब तक रहा?",
      options: [
        "(a) 1206-1290 ईस्वी",
        "(b) 1290-1320 ईस्वी",
        "(c) 1320-1414 ईस्वी",
        "(d) 1414-1451 ईस्वी",
      ],
      answer: "(b) 1290-1320 ईस्वी",
    },
    {
      question:
        "अलाउद्दीन खिलजी ने किस मंगोल आक्रमण को सफलतापूर्वक विफल किया था?",
      options: [
        "(a) 1299 ईस्वी",
        "(b) 1303 ईस्वी",
        "(c) 1306 ईस्वी",
        "(d) ये सभी",
      ],
      answer: "(d) ये सभी",
    },
    {
      question: "प्रसिद्ध कवि अमीर खुसरो किसके दरबार से संबंधित थे?",
      options: [
        "(a) कुतुबुद्दीन ऐबक",
        "(b) इल्तुतमिश",
        "(c) अलाउद्दीन खिलजी",
        "(d) फिरोज शाह तुगलक",
      ],
      answer: "(c) अलाउद्दीन खिलजी",
    },
    {
      question: "अलाउद्दीन खिलजी ने अपनी राजधानी कहां बनाई थी?",
      options: ["(a) दिल्ली", "(b) लाहौर", "(c) किलोखरी", "(d) सीरी"],
      answer: "(d) सीरी",
    },
    {
      question: "खिलजी वंश के पतन का मुख्य कारण क्या था?",
      options: [
        "(a) कमजोर उत्तराधिकारी",
        "(b) मंगोल आक्रमण",
        "(c) आर्थिक संकट",
        "(d) धार्मिक असहिष्णुता",
      ],
      answer: "(a) कमजोर उत्तराधिकारी",
    },
  ];
  const [finalResult, setFinalResult] = useState<string[]>([]);

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(event.value);
    setIsSubmit(true);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>, index: any) {
    console.log({ event });
    const value = event.target.value;
    const currentQuestion = `Q${index}`;
    selectedAnswers;

    if (!selectedAnswers[currentQuestion]) {
      selectedAnswers[currentQuestion] = {
        index,
        value,
      };
      setSelectedAnswers(selectedAnswers);
    } else {
      selectedAnswers[currentQuestion].value = value;
      setSelectedAnswers(selectedAnswers);
    }
    console.log(selectedAnswers);
  }

  useEffect(() => {
    if (isSubmit === true) {
      evalueation();
    }
  }, [isSubmit]);

  const evalueation = () => {
    const final: string[] = [];
    quizQuestion.forEach((que, index) => {
      const QueNo = `Q${index}`;
      if (!selectedAnswers[QueNo]) {
        final.push("UA");
      } else if (selectedAnswers[QueNo].value === que.answer) {
        final.push("R");
      } else {
        final.push("W");
      }
    });
    console.log({ final });
    setFinalResult(final);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div>
          {quizQuestion.map((que, index) => (
            <div className="mb-3" key={index}>
              <p
                className={`text-xl ${
                  finalResult.length && finalResult[index] === "W"
                    ? "text-red-800"
                    : finalResult[index] === "R"
                    ? "text-sky-600"
                    : "text-white"
                } `}
              >
                {" "}
                {`${index + 1} ${que.question}`}
              </p>
              <ol>
                {que.options.map((option, i) => (
                  // <li key={i}>{option}</li>
                  <div key={i}>
                    <input
                      type="radio"
                      id={option}
                      name={`radioGroup${index}`}
                      value={option}
                      disabled={isSubmit}
                      // checked={selectedValue === option.value}
                      onChange={(event: any) => handleChange(event, index)}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </ol>
              {isSubmit && (
                <p className="text-green-900 font-bold">{que.answer}</p>
              )}
            </div>
          ))}
          <div className="flex justify-center pb-4">
            <button
              type="button"
              className=" align-middle text-xl p-2 font-bold border-2 border-gray-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {`<-- back`}
        </a>
      </footer>
    </div>
  );
}
