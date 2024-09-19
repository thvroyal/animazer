import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '$9',
      description: 'Essential features for individuals',
      features: [
        '1 user',
        '5GB storage',
        'Basic support',
        'Access to core features',
      ],
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'Advanced features for professionals',
      features: [
        '5 users',
        '50GB storage',
        'Priority support',
        'Access to all features',
        'Advanced analytics',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large teams',
      features: [
        'Unlimited users',
        'Unlimited storage',
        '24/7 dedicated support',
        'Custom integrations',
        'Advanced security features',
        'Personalized onboarding',
      ],
    },
  ];

  return (
    <div className="px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">
          Pricing
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
        Choose an affordable plan that's packed with the best features for
        engaging your audience, creating customer loyalty, and driving sales.
      </p>
      <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 md:grid-cols-3 lg:gap-12">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-6 flex items-baseline gap-x-2">
                <span className="text-5xl font-bold tracking-tight">
                  {plan.price}
                </span>
                {plan.name !== 'Enterprise' && (
                  <span className="text-sm font-semibold leading-6">
                    /month
                  </span>
                )}
              </div>
              <ul role="list" className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check className="h-6 w-6 flex-none text-primary" />
                    <span className="text-sm leading-6">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.name === 'Pro' ? 'default' : 'outline'}
              >
                {plan.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
