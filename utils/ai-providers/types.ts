// Types for AI image generation providers
export interface ImageGenerationConfig {
  numberOfImages?: number;
  outputMimeType?: string;
  aspectRatio?: string;
  [key: string]: any; // Allow provider-specific options
}

export interface GeneratedImageData {
  imageBytes: string; // base64 encoded image data
  mimeType: string;
}

export interface ImageGenerationResponse {
  success: boolean;
  generatedImages?: GeneratedImageData[];
  error?: string;
}

export interface AIImageProvider {
  generateImage(prompt: string, config?: ImageGenerationConfig): Promise<ImageGenerationResponse>;
  getName(): string;
}

export type SupportedProvider = 'gemini' | 'openai' | 'stability' | 'midjourney' | 'mock'; 