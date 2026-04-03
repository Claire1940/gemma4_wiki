import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gemma4.wiki'
  const path = '/about'

  return {
    title: 'About Gemma 4 Wiki - Your Ultimate AI Model Resource',
    description: 'Learn about Gemma 4 Wiki, a community-driven resource hub providing comprehensive guides, benchmarks, deployment tutorials, and developer resources for Google\'s Gemma 4 open models.',
    keywords: [
      'about Gemma 4 Wiki',
      'Gemma 4 community',
      'AI model wiki',
      'developer resource hub',
      'Gemma 4 team',
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Gemma 4 Wiki',
      title: 'About Gemma 4 Wiki',
      description: 'Learn about our mission to provide the best Gemma 4 model resources and developer guides.',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Gemma 4 Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Gemma 4 Wiki',
      description: 'Learn about our mission to provide the best Gemma 4 model developer resources.',
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Gemma 4 Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for Gemma 4 developers
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Gemma 4 Wiki</h2>
            <p>
              Gemma 4 Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping developers
              get the most out of Google's Gemma 4 open model family. We are a community-driven platform that provides comprehensive guides,
              benchmark comparisons, deployment tutorials, prompting techniques, and developer insights.
            </p>
            <p>
              Whether you're a new developer just starting with local AI deployment or a seasoned ML engineer optimizing fine-tuned models,
              Gemma 4 Wiki is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower Gemma 4 developers with accurate, up-to-date information
              and practical guides</strong> that help them build better AI applications. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest model releases, API changes, and benchmark results</li>
              <li><strong>Build useful guides:</strong> Develop deployment tutorials, prompting templates, and fine-tuning walkthroughs that help developers make informed decisions</li>
              <li><strong>Foster community:</strong> Create a welcoming space where developers can learn, share workflows, and grow together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for developers of all skill levels</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Gemma 4 Wiki as the <strong>go-to destination</strong> for every Gemma 4 developer seeking
              to build effective AI applications. We want to be the resource that developers trust and rely on, whether they need
              deployment guides, want to compare benchmarks, or are looking for advanced fine-tuning strategies.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-2">Model Guides</h3>
              <p className="text-slate-300">
                Comprehensive model size comparisons, architecture overviews, and selection guides.
                Find the right Gemma 4 model for your use case.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Benchmarks</h3>
              <p className="text-slate-300">
                Detailed benchmark comparisons across AIME, MMMU, LiveCodeBench, GPQA, and more.
                Make data-driven model selection decisions.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">💬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Prompting Tutorials</h3>
              <p className="text-slate-300">
                Complete guides on Gemma 4 prompt formatting, system roles, thinking mode, and chat templates.
                Get the best output from your prompts.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Deployment Guides</h3>
              <p className="text-slate-300">
                Step-by-step guides for Ollama, LM Studio, Vertex AI, and edge deployment.
                Get your Gemma 4 model running in production.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="text-xl font-semibold text-white mb-2">Fine-tuning & Agents</h3>
              <p className="text-slate-300">
                QLoRA fine-tuning tutorials, function calling guides, and structured output patterns.
                Build powerful AI agents with Gemma 4.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages including English, Russian, Portuguese,
                German, Spanish, Japanese, Korean, and French.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Gemma 4 Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from developers of all skill levels. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Developer feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> New deployment patterns, prompting tricks, and optimization tips shared by developers</li>
              <li><strong>Model updates:</strong> We monitor official Gemma releases and adjust our content accordingly</li>
              <li><strong>Ecosystem shifts:</strong> We track the Hugging Face, Ollama, and Kaggle ecosystems and update guides based on real-world usage</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you've found a better prompting pattern, optimized a deployment workflow,
              or have suggestions for new guides, we'd love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Gemma 4 Wiki is maintained by a dedicated team of passionate developers and AI enthusiasts who love
              exploring what open models can do. We're practitioners first, constantly testing deployment patterns, exploring model capabilities,
              and staying updated with the latest releases.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Model analysis:</strong> Deep understanding of Gemma 4 architecture, capabilities, and benchmarks</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and tutorials for developers</li>
              <li><strong>Community management:</strong> Listening to developer feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Community resource for Gemma 4 developers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>Gemma 4 Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with Google LLC, Google DeepMind, or any official Google entities.
            </p>
            <p>
              All game content, trademarks, characters, and assets are the property of their respective owners.
              We use game-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              Gemma 4 Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@gemma4.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@gemma4.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@gemma4.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@gemma4.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@gemma4.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@gemma4.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@gemma4.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@gemma4.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest Gemma 4 guides, model releases, and developer tips.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
