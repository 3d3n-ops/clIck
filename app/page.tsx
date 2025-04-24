import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import { FAQSection } from "@/components/faq-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { TypingText } from "@/components/typing-text"
import { SectionObserver } from "@/components/section-observer"
import { ParallaxCards } from "@/components/parallax-cards"
import { MousePointer } from "@/components/mouse-pointer"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

export default async function Home() {
  const { userId } = await auth()
  
  if (userId) {
    redirect("/chat")
  }

  // Feature cards data
  const featureCards = [
    {
      title: "Prompt",
      content: (
        <>
          <div className="aspect-video bg-gray-800 mb-4 flex items-center justify-center rounded-md overflow-hidden">
            <span className="text-gray-500">Video Demo</span>
          </div>
          <p className="text-gray-300">Enter a prompt of what you want to build into our chat interface</p>
        </>
      ),
    },
    {
      title: "clIck",
      content: (
        <>
          <div className="aspect-video bg-gray-800 mb-4 flex items-center justify-center rounded-md overflow-hidden">
            <span className="text-gray-500">Video Demo</span>
          </div>
          <p className="text-gray-300">
            clIck does the rest of the work by generating the code for your mobile app with our custom built LLM,
            trained on volumes of relevant documentation. You also have the option of using search with Perplexity
          </p>
        </>
      ),
    },
    {
      title: "Ship",
      content: (
        <>
          <div className="aspect-video bg-gray-800 mb-4 flex items-center justify-center rounded-md overflow-hidden">
            <span className="text-gray-500">Video Demo</span>
          </div>
          <p className="text-gray-300">
            With a few clicks, clIck offers an easy way to deploy your mobile app. Real-time preview of your code and
            exportable code to your IDE for further development
          </p>
        </>
      ),
    },
  ]

  // FAQ data
  const faqItems = [
    {
      question: "Who is behind this?",
      answer:
        "clIck is an AI-powered copilot for mobile app development built by some cracked college students with too much caffeine and ambition.",
    },
    {
      question: "Will there be a desktop app like Cursor?",
      answer: "We are currently working on developing this; stay tuned!",
    },
    {
      question: "Why should I use clIck?",
      answer: (
        <div>
          <p>
            Silly question but sure: the modern landscape of AI code editors do not have tailored support for mobile app
            development.
          </p>
          <p className="mt-2">
            clIck manages this with our custom built LLM trained on documentation on cross platform frameworks, tested
            against LLM benchmarks and has proven to be the best to use for cross platform development.
          </p>
          <p className="mt-2">
            As a plus, to bolster code generation, clIck employs Perplexity search for added support in code generation
            and debugging.
          </p>
          <p className="mt-2 font-medium">So answer me this: why aren&apos;t you using click again?!?!</p>
        </div>
      ),
    },
    {
      question: "Will there be support for native development?",
      answer: (
        <div>
          <p>
            We are working on providing native support for enterprise and local software companies that build mobile
            apps in native languages and platforms like Kotlin/Java and Swift/Objective-C.
          </p>
          <p className="mt-2">
            The challenge is building an IDE as a desktop app for these separate languages that based on the existing
            IDEs like X-Code which has limited support and protected access to their software from Apple.
          </p>
          <p className="mt-2">
            These are some of the issues we are facing but we are hard at work on it. If you&apos;d like to support us as we
            build or you are interested in problems like these, contact us!
          </p>
        </div>
      ),
    },
    {
      question: "Are you raising?",
      answer: "Currently bootstrapping, but we are open to funding. For angels and VCs, contact us!",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800/50 sticky top-0 z-50 backdrop-blur-md bg-black/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <MousePointer className="h-6 w-6 text-white animate-float" />
            </div>
            <span className="ml-2 text-sm text-gray-400">clIck</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#use-cases" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Use Cases
            </Link>
            <Link href="#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <SignInButton />
            <SignUpButton />
            <ThemeToggle />
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-6 animate-fade-in">
              <div className="relative w-24 h-24">
                <MousePointer className="absolute inset-0 m-auto h-12 w-12 text-white animate-float" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in animate-delay-100">
              <TypingText text="Cuursor for Mobile" />
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-300 animate-fade-in animate-delay-200">
              Prompt. Click. Ship. Lowering the bar of entry for cross-platform mobile app development
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in animate-delay-300">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 transition-all transform hover:scale-105 group"
              >
                <span>Get Started</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-gray-800 transition-all transform hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <SectionObserver id="demo" className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-700 ease-out opacity-0 translate-y-8 group-data-[visible=true]:opacity-100 group-data-[visible=true]:translate-y-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center transform transition-all duration-700 ease-out scale-90 group-data-[visible=true]:scale-100">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-400 transform transition-all duration-700 ease-out translate-y-4 opacity-0 group-data-[visible=true]:translate-y-0 group-data-[visible=true]:opacity-100">Demo Video Coming Soon</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </SectionObserver>

        {/* Features Section */}
        <SectionObserver id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient">Features</h2>
            <ParallaxCards items={featureCards} />
          </div>
        </SectionObserver>

        {/* Use Cases Section */}
        <SectionObserver id="use-cases" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6">
              Our goal is to empower everyone to build products with one <span className="underline">click</span>
            </h2>
            <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-gray-300">
              The future of mobile-app development should be inclusive to beginners and senior-level builders
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="hover-card bg-black border-gray-800 animate-shimmer">
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-900 mb-4 flex items-center justify-center rounded-md overflow-hidden">
                    <span className="text-gray-500">Image Placeholder</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">For the seasoned developers</h3>
                  <p className="text-gray-300">
                    clIck offers a smoother and faster way for development, allowing you to focus on the overall system
                    design rather than just engineering, turning you to a 10X PM-developer hybrid.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-card bg-black border-gray-800 animate-shimmer">
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-900 mb-4 flex items-center justify-center rounded-md overflow-hidden">
                    <span className="text-gray-500">Image Placeholder</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">For the struggling student</h3>
                  <p className="text-gray-300">
                    With clIck, students can learn to build mobile apps, develop templates for hackathons, and are
                    encouraged to build products that scale to companies.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-card bg-black border-gray-800 animate-shimmer">
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-900 mb-4 flex items-center justify-center rounded-md overflow-hidden">
                    <span className="text-gray-500">Image Placeholder</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">For the non-technical founder</h3>
                  <p className="text-gray-300">
                    Don&apos;t know how to code? No problem! clIck helps you build your MVP without writing a single line of code.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-card bg-black border-gray-800 animate-shimmer">
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-900 mb-4 flex items-center justify-center rounded-md overflow-hidden">
                    <span className="text-gray-500">Image Placeholder</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">For the indie hacker</h3>
                  <p className="text-gray-300">
                    Building your side project? clIck helps you ship faster and iterate on user feedback without getting caught up in technical debt.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionObserver>

        {/* Pricing Section */}
        <SectionObserver id="pricing" className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Pricing Plans</h2>
            <p className="text-xl text-center max-w-3xl mx-auto mb-16 text-gray-300">
              Choose the plan that works best for your needs
            </p>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <Card className="hover-card bg-black border-gray-800 h-full">
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl mb-2">Free Tier</CardTitle>
                  <CardDescription className="text-gray-400 text-base">Get started with clIck</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="text-6xl font-bold mb-6">$0</div>
                  <div className="text-sm text-gray-400 mb-8">Forever free</div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Limited chat completions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Token usage limits</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Basic support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Community access</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Basic templates</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-white text-black hover:bg-gray-200 transition-all transform hover:scale-105 py-7 text-lg font-medium">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-card bg-black border-white animate-pulse-slow h-full scale-105 shadow-xl shadow-white/5">
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                </div>
                <CardHeader className="bg-white text-black p-8">
                  <CardTitle className="text-2xl mb-2">Premium/Student</CardTitle>
                  <CardDescription className="text-gray-700 text-base">For individuals and students</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  <div className="text-6xl font-bold mb-4">
                    $20<span className="text-lg font-normal">/month</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-8">50% discount for students</div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Unlimited chat completions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Higher token limits</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Advanced features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Early access to updates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Premium templates</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-white text-black gradient-hover transition-all transform hover:scale-105 py-7 text-lg font-medium">
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-card bg-black border-gray-800 h-full">
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
                  <CardDescription className="text-gray-400 text-base">For teams and organizations</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="text-6xl font-bold mb-6">Custom</div>
                  <div className="text-sm text-gray-400 mb-8">Tailored to your needs</div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Increased technical support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Custom adaptation for your needs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Custom integrations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">SLA guarantees</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Team collaboration tools</span>
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-gray-800 transition-all transform hover:scale-105 py-7 text-lg font-medium"
                  >
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionObserver>

        {/* FAQ Section */}
        <SectionObserver id="faq" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient">Frequently Asked Questions</h2>
            <FAQSection items={faqItems} />
          </div>
        </SectionObserver>

        {/* CTA Section */}
        <SectionObserver className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">One click away from shipping</h2>
            <p className="text-xl mb-8 text-gray-300">Try clIck today</p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-all transform hover:scale-105 group"
            >
              <span>Get Started Now</span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Button>
          </div>
        </SectionObserver>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="h-5 w-5 text-white animate-float" />
                <span className="text-xl font-bold">clIck</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">Cursor for Mobile</p>
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} clIck. All rights reserved.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#use-cases" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Data & Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Legal Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
