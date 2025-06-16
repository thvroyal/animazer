# AI Image Generation Provider System

This module provides an extensible architecture for integrating multiple AI image generation providers.

## Current Providers

- **Gemini** (Google GenAI) - Fully implemented and set as default
- **OpenAI** (DALL-E) - Stub implementation (ready for development)

## Usage

### Basic Usage

```typescript
import { AIProviderFactory } from '@/utils/providers';

// Use the default provider (currently Gemini)
const provider = AIProviderFactory.getDefaultProvider();
const result = await provider.generateImage('A beautiful sunset over mountains');

// Use a specific provider
const geminiProvider = AIProviderFactory.getProvider('gemini');
const result = await geminiProvider.generateImage('A cat wearing a hat');
```

### With Configuration

```typescript
const result = await provider.generateImage('A futuristic city', {
  numberOfImages: 2,
  outputMimeType: 'image/png',
  aspectRatio: '16:9'
});
```

## Adding New Providers

To add a new AI image generation provider:

1. **Create the provider class** implementing `AIImageProvider`:

```typescript
// utils/providers/newprovider.ts
import { AIImageProvider, ImageGenerationConfig, ImageGenerationResponse } from './types';

export class NewProvider implements AIImageProvider {
  getName(): string {
    return 'newprovider';
  }

  async generateImage(prompt: string, config?: ImageGenerationConfig): Promise<ImageGenerationResponse> {
    // Implement your provider logic here
  }
}
```

2. **Register the provider** in `factory.ts`:

```typescript
// Add to the providers Map
['newprovider', () => new NewProvider()],
```

3. **Update the types** if needed:

```typescript
// Add to SupportedProvider type in types.ts
export type SupportedProvider = 'gemini' | 'openai' | 'newprovider' | 'stability';
```

4. **Export from index.ts**:

```typescript
export * from './newprovider';
```

## Environment Variables

Each provider may require its own environment variables:

- `GEMINI_API_KEY` - Required for Google GenAI
- `OPENAI_API_KEY` - Required for OpenAI (when implemented)

## Error Handling

All providers return a standardized response format:

```typescript
interface ImageGenerationResponse {
  success: boolean;
  generatedImages?: GeneratedImageData[];
  error?: string;
}
```

This ensures consistent error handling across all providers.

## Configuration Options

The `ImageGenerationConfig` interface supports common options:

- `numberOfImages`: Number of images to generate
- `outputMimeType`: Output format ('image/jpeg', 'image/png', etc.)
- `aspectRatio`: Image aspect ratio ('1:1', '16:9', etc.)
- Additional provider-specific options via index signature

## Architecture Benefits

1. **Extensibility**: Easy to add new providers without changing existing code
2. **Consistency**: Standardized interface across all providers
3. **Flexibility**: Provider-specific configurations supported
4. **Maintainability**: Clear separation of concerns
5. **Testing**: Each provider can be tested independently 