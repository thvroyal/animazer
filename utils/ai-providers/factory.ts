import { AIImageProvider, SupportedProvider } from './types';
import { GeminiProvider } from './gemini';
import { MockProvider } from './mock';

// Factory class to manage AI providers
export class AIProviderFactory {
  private static providers = new Map<SupportedProvider, () => AIImageProvider>([
    ['gemini', () => new GeminiProvider()],
    ['mock', () => new MockProvider()],
    // Future providers can be added here:
    // ['openai', () => new OpenAIProvider()],
    // ['stability', () => new StabilityAIProvider()],
    // ['midjourney', () => new MidjourneyProvider()],
  ]);

  static getProvider(providerName: SupportedProvider): AIImageProvider {
    const providerFactory = this.providers.get(providerName);
    
    if (!providerFactory) {
      throw new Error(`Provider "${providerName}" is not supported. Available providers: ${Array.from(this.providers.keys()).join(', ')}`);
    }

    return providerFactory();
  }

  static getDefaultProvider(): AIImageProvider {
    // Support environment-based provider selection
    const defaultProvider = (process.env.AI_PROVIDER as SupportedProvider) || 'gemini';
    return this.getProvider(defaultProvider);
  }

  static getSupportedProviders(): SupportedProvider[] {
    return Array.from(this.providers.keys());
  }

  static addProvider(name: SupportedProvider, factory: () => AIImageProvider): void {
    this.providers.set(name, factory);
  }
} 