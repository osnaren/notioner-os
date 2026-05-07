'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <div className="absolute inset-0 -z-10">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="h-full w-full"
            particleColor="#3b82f6"
          />
        </div>

        <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Notioner OS
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Supercharge your Notion workspace with powerful tools and automations
              to boost your productivity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <Button size="lg" onClick={() => router.push('/dashboard')}>
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/docs')}
            >
              Documentation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful Features for Your Notion Workspace
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Unlock the full potential of Notion with our suite of powerful
              features designed to enhance your productivity.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Database Management',
                  description:
                    'Easily manage and organize your Notion databases with advanced filtering, sorting, and bulk actions.',
                  icon: '📊',
                },
                {
                  name: 'Templates',
                  description:
                    'Access a library of professionally designed templates to kickstart your projects and workflows.',
                  icon: '📋',
                },
                {
                  name: 'Automations',
                  description:
                    'Automate repetitive tasks and workflows to save time and reduce manual work.',
                  icon: '⚡',
                },
                {
                  name: 'Integrations',
                  description:
                    'Connect Notion with your favorite tools and services for a seamless workflow.',
                  icon: '🔌',
                },
                {
                  name: 'Analytics',
                  description:
                    'Gain insights into your Notion usage and productivity with detailed analytics.',
                  icon: '📈',
                },
                {
                  name: 'Collaboration',
                  description:
                    'Enhance team collaboration with advanced sharing and permission controls.',
                  icon: '👥',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to supercharge your Notion workspace?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Join thousands of users who have already enhanced their productivity
              with Notioner OS.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="px-8 text-lg"
                onClick={() => router.push('/signup')}
              >
                Get Started for Free
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
