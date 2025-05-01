// pages/index.tsx
import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>PrepNation - Crack Any Exam with Confidence</title>
      </Head>
      <main className="bg-white min-h-screen text-gray-800">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Crack Government Exams with Confidence
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto">
            Practice with curated quizzes and interview prep tools tailored for
            UPSC, SSC, Banking, and more.
          </p>
          <div className="mt-8">
            <Link
              href="/quiz"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100"
            >
              Start Practicing
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6 bg-gray-100">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold">Curated Question Banks</h3>
              <p className="mt-2 text-sm">
                Get the best questions from past exams and experts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Mock Interviews</h3>
              <p className="mt-2 text-sm">
                Simulate interviews to build confidence and fluency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Track Your Progress</h3>
              <p className="mt-2 text-sm">
                Analytics and reports to measure and improve performance.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 text-center">
          <h2 className="text-3xl font-bold">
            Join thousands preparing for success
          </h2>
          <p className="mt-2 text-gray-600">
            Sign up today and take your first step toward a government job.
          </p>
          <div className="mt-6">
            <Link
              href="/quiz"
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
