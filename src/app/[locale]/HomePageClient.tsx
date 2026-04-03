'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Image,
  Layers,
  MessageCircle,
  Settings,
  Sparkles,
  Terminal,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'
import type { ModuleLinkMap } from '@/lib/buildModuleLinkMap'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
)

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
}: {
  linkData: { url: string; title: string } | null | undefined
  children: React.ReactNode
  className?: string
  locale: string
}) {
  if (linkData) {
    const href = locale === 'en' ? linkData.url : `/${locale}${linkData.url}`
    return (
      <Link
        href={href}
        className={`${className || ''} hover:text-[hsl(var(--nav-theme-light))] hover:underline decoration-[hsl(var(--nav-theme-light))/0.4] underline-offset-4 transition-colors`}
        title={linkData.title}
      >
        {children}
      </Link>
    )
  }
  return <>{children}</>
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  moduleLinkMap: ModuleLinkMap
  locale: string
}

export default function HomePageClient({ latestArticles, moduleLinkMap, locale }: HomePageClientProps) {
  const t = useMessages() as any
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gemma4.wiki'

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: "Gemma 4 Wiki",
        description: "Gemma 4 Wiki covers model sizes, benchmarks, prompting, deployment, fine-tuning, and multimodal workflows for developers using Google's open models.",
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Gemma 4 - Open Multimodal Model Family by Google DeepMind",
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: "Gemma 4 Wiki",
        alternateName: "Gemma 4",
        url: siteUrl,
        description: "Gemma 4 Wiki resource hub for model sizes, benchmarks, prompting, local deployment, function calling, and fine-tuning guides",
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Gemma 4 Wiki - Open Multimodal Model Family",
        },
        sameAs: [
          'https://deepmind.google/models/gemma/gemma-4/',
          'https://discord.com/invite/google-dev-community',
          'https://github.com/google-deepmind/gemma',
          'https://huggingface.co/collections/google/gemma-4',
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: "Gemma 4",
        applicationCategory: 'AIApplication',
        operatingSystem: 'Cross-platform',
        description: 'Open multimodal model family by Google DeepMind supporting text, image, and audio inputs with up to 256K context',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://deepmind.google/models/gemma/gemma-4/',
        },
      },
    ],
  }

  // FAQ accordion state (for platform FAQ module)
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null)

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('quick-start')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://deepmind.google/models/gemma/gemma-4/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId="jZVBoFOJK-Q"
              title="What's new in Gemma 4"
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{' '}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID
              const sectionIds = [
                'quick-start', 'ollama-setup', 'api-guide', 'hugging-face',
                'model-sizes', 'specs-context', 'benchmarks', 'fine-tuning',
                'prompt-guide', 'thinking-mode', 'function-calling', 'multimodal-guide'
              ]
              const sectionId = sectionIds[index]

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group p-6 rounded-xl border border-border
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Gemma 4 Tutorial */}
      <section id="quick-start" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4Tutorial.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4Tutorial.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4Tutorial.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal space-y-4 mb-10">
            {t.modules.gemma4Tutorial.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.gemma4Tutorial.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Gemma 4 Ollama Setup */}
      <section id="ollama-setup" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Terminal className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4OllamaSetup.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4OllamaSetup.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4OllamaSetup.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-4 mb-10">
            {t.modules.gemma4OllamaSetup.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.gemma4OllamaSetup.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* Module 3: Gemma 4 API Guide */}
      <section id="api-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Code2 className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4ApiGuide.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4ApiGuide.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4ApiGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-4 mb-10">
            {t.modules.gemma4ApiGuide.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.gemma4ApiGuide.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 4: Gemma 4 Hugging Face Download */}
      <section id="hugging-face" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Download className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4HuggingFaceDownload.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4HuggingFaceDownload.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4HuggingFaceDownload.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.gemma4HuggingFaceDownload.cards.map((card: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full border ${card.tag === 'Instruction-tuned' ? 'bg-[hsl(var(--nav-theme)/0.15)] border-[hsl(var(--nav-theme)/0.4)] text-[hsl(var(--nav-theme-light))]' : 'bg-white/5 border-border text-muted-foreground'}`}>
                    {card.tag}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2 font-mono text-[hsl(var(--nav-theme-light))]">
                  {card.name}
                </h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="scroll-reveal mt-8 flex flex-wrap gap-3 justify-center">
            <a
              href="https://huggingface.co/collections/google/gemma-4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
            >
              <Download className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              Browse Official Gemma 4 Collection
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://huggingface.co/blog/gemma4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-sm hover:bg-white/5 transition-colors"
            >
              Hugging Face Blog Post
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>
      {/* Module 5: Gemma 4 Model Sizes */}
      <section id="model-sizes" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Cpu className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4ModelSizes.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4ModelSizes.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4ModelSizes.subtitle}
            </p>
          </div>

          <p className="scroll-reveal text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t.modules.gemma4ModelSizes.intro}
          </p>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.modules.gemma4ModelSizes.models.map((model: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.05)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.15)] flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{model.model}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-2 py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">Architecture</span>
                    <span className="font-semibold text-right">{model.architecture}</span>
                  </div>
                  <div className="flex justify-between gap-2 py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">Parameters</span>
                    <span className="font-semibold text-right">{model.parameters}</span>
                  </div>
                  <div className="flex justify-between gap-2 py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">Context</span>
                    <span className="font-semibold text-right">{model.contextWindow}</span>
                  </div>
                  <div className="flex justify-between gap-2 py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground font-medium shrink-0">Memory (BF16/Q4)</span>
                    <span className="font-semibold text-right text-xs">{model.inferenceMemory}</span>
                  </div>
                  <div className="flex justify-between gap-2 py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">Platform</span>
                    <span className="font-semibold text-right">{model.platform}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-muted-foreground text-xs leading-relaxed">{model.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Gemma 4 Specs and Context Window */}
      <section id="specs-context" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Layers className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4SpecsContext.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4SpecsContext.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4SpecsContext.subtitle}
            </p>
          </div>

          <p className="scroll-reveal text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t.modules.gemma4SpecsContext.intro}
          </p>

          <div className="scroll-reveal space-y-3">
            {t.modules.gemma4SpecsContext.specs.map((spec: any, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.4)] transition-colors"
              >
                <div className="md:col-span-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--nav-theme-light))]" />
                    <span className="font-semibold text-sm">{spec.feature}</span>
                  </div>
                  <p className="text-[hsl(var(--nav-theme-light))] text-sm font-medium pl-4">{spec.value}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-muted-foreground text-sm leading-relaxed">{spec.whyItMatters}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Gemma 4 Benchmarks */}
      <section id="benchmarks" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <TrendingUp className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4Benchmarks.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4Benchmarks.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4Benchmarks.subtitle}
            </p>
          </div>

          <p className="scroll-reveal text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t.modules.gemma4Benchmarks.intro}
          </p>

          {/* Benchmark Table - Desktop */}
          <div className="scroll-reveal hidden md:block overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[hsl(var(--nav-theme)/0.1)] border-b border-border">
                  {t.modules.gemma4Benchmarks.tableHeaders.map((header: string, i: number) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold text-[hsl(var(--nav-theme-light))]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.modules.gemma4Benchmarks.benchmarks.map((row: any, index: number) => (
                  <tr key={index} className={`border-b border-border/50 hover:bg-white/5 transition-colors ${index % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                    <td className="px-4 py-3 font-semibold">{row.benchmark}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.taskFocus}</td>
                    <td className="px-4 py-3 font-bold text-[hsl(var(--nav-theme-light))]">{row.gemma431b}</td>
                    <td className="px-4 py-3 font-semibold">{row.gemma426bA4b}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.gemma4E4b}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.gemma4E2b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Benchmark Cards - Mobile */}
          <div className="scroll-reveal md:hidden space-y-4">
            {t.modules.gemma4Benchmarks.benchmarks.map((row: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-1">{row.benchmark}</h3>
                <p className="text-muted-foreground text-xs mb-3">{row.taskFocus}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-[hsl(var(--nav-theme)/0.1)] rounded-lg text-center">
                    <div className="font-bold text-[hsl(var(--nav-theme-light))]">{row.gemma431b}</div>
                    <div className="text-xs text-muted-foreground">31B</div>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg text-center">
                    <div className="font-semibold">{row.gemma426bA4b}</div>
                    <div className="text-xs text-muted-foreground">26B A4B</div>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg text-center">
                    <div className="text-muted-foreground">{row.gemma4E4b}</div>
                    <div className="text-xs text-muted-foreground">E4B</div>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg text-center">
                    <div className="text-muted-foreground">{row.gemma4E2b}</div>
                    <div className="text-xs text-muted-foreground">E2B</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{row.whatItMeans}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Gemma 4 Fine-Tuning */}
      <section id="fine-tuning" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Settings className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4FineTuning.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4FineTuning.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4FineTuning.subtitle}
            </p>
          </div>

          <p className="scroll-reveal text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t.modules.gemma4FineTuning.intro}
          </p>

          <div className="scroll-reveal space-y-4 mb-10">
            {t.modules.gemma4FineTuning.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.gemma4FineTuning.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 9: Gemma 4 Prompt Guide */}
      <section id="prompt-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <FileText className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4PromptGuide.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4PromptGuide.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4PromptGuide.subtitle}
            </p>
          </div>

          <p className="scroll-reveal text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t.modules.gemma4PromptGuide.intro}
          </p>

          <div className="scroll-reveal space-y-4">
            {t.modules.gemma4PromptGuide.items.map((item: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[hsl(var(--nav-theme)/0.15)] flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.summary}</p>
                    </div>
                  </div>
                  <ul className="space-y-1 mb-4 pl-12">
                    {item.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-background/60 border border-border rounded-lg p-4 font-mono text-xs text-muted-foreground whitespace-pre-wrap break-all">
                    {item.template}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 10: Gemma 4 Thinking Mode */}
      <section id="thinking-mode" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Brain className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4ThinkingMode.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4ThinkingMode.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4ThinkingMode.subtitle}
            </p>
          </div>

          <p className="scroll-reveal text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t.modules.gemma4ThinkingMode.intro}
          </p>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.gemma4ThinkingMode.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-card border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 11: Gemma 4 Function Calling */}
      <section id="function-calling" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Wrench className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4FunctionCalling.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4FunctionCalling.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4FunctionCalling.subtitle}
            </p>
          </div>

          <p className="scroll-reveal text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t.modules.gemma4FunctionCalling.intro}
          </p>

          <div className="scroll-reveal space-y-4">
            {t.modules.gemma4FunctionCalling.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-card border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{step.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 12: Gemma 4 Multimodal Guide */}
      <section id="multimodal-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Image className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
              <span>{t.modules.gemma4MultimodalGuide.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.gemma4MultimodalGuide.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.gemma4MultimodalGuide.subtitle}
            </p>
          </div>

          <p className="scroll-reveal text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
            {t.modules.gemma4MultimodalGuide.intro}
          </p>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.modules.gemma4MultimodalGuide.items.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-card border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme-light))]">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/google-dev-community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/GoogleDeepMind"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://huggingface.co/collections/google/gemma-4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.huggingFace}
                  </a>
                </li>
                <li>
                  <a
                    href="https://ai.google.dev/gemma/docs/core"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.officialDocs}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
