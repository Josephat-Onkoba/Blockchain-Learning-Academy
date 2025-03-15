import Link from "next/link";
import Image from "next/image";
import { FiBook, FiMessageSquare, FiDollarSign, FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 pt-12 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Learn and Earn on</span>
                  <span className="block text-blue-400">EduChain Platform</span>
                </h1>
                <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Access premium courses, engage with a global community, and earn tokens by contributing valuable insights—all powered by blockchain technology.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/courses"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10 shadow-lg"
                    >
                      Browse Courses
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-lg"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
            <Image 
              src="/images/blockchain-education.jpg" 
              alt="Blockchain education concept"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              How EduChain Platform Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Learn, engage, and earn in our tokenized educational ecosystem
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-md">
                <div className="w-16 h-16 rounded-md flex items-center justify-center bg-blue-600 text-white mb-4">
                  <FiBook className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Access Courses With MyTokens</h3>
                <p className="mt-3 text-base text-gray-300">
                  Purchase MyTokens with $EDU tokens and use them to access courses and chapters from accredited instructors.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-md">
                <div className="w-16 h-16 rounded-md flex items-center justify-center bg-blue-600 text-white mb-4">
                  <FiMessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Engage In Forum Discussions</h3>
                <p className="mt-3 text-base text-gray-300">
                  Participate in course forums to deepen your understanding and connect with fellow learners.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-md">
                <div className="w-16 h-16 rounded-md flex items-center justify-center bg-blue-600 text-white mb-4">
                  <FiDollarSign className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Earn Through Contributions</h3>
                <p className="mt-3 text-base text-gray-300">
                  Earn MyTokens when other learners engage with your forum posts, which you can use for more courses or convert to $EDU.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start learning?</span>
            <span className="block text-blue-400">Join our platform today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 shadow-lg"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 shadow-lg"
              >
                Browse courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}