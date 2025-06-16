import { AIImageProvider, SupportedProvider } from './types';
import { GeminiProvider } from './gemini';

// Factory class to manage AI providers
export class AIProviderFactory {
  private static providers: Map<SupportedProvider, () => AIImageProvider> = new Map([
    ['gemini', () => new GeminiProvider()],
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
    return this.getProvider('gemini');
  }

  static getSupportedProviders(): SupportedProvider[] {
    return Array.from(this.providers.keys());
  }

  static addProvider(name: SupportedProvider, factory: () => AIImageProvider): void {
    this.providers.set(name, factory);
  }
} 