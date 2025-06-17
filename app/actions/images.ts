'use server';

import { createClient } from '@/utils/supabase/server';
import { insertImage, uploadImageToStorage } from '@/utils/supabase/services/images';
import { AIProviderFactory } from '@/utils/ai-providers';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { encodedRedirect } from '@/utils/utils';

// Define the result type for the action state
export type GenerateImageResult = {
  success: boolean;
  message: string;
  imageId?: string;
};

export async function generateImage(
  prevState: GenerateImageResult | null,
  formData: FormData
): Promise<GenerateImageResult> {
  const prompt = formData.get('prompt')?.toString();

  if (!prompt) {
    return {
      success: false,
      message: 'Prompt is required',
    };
  }

  // Check if user is authenticated
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect('error', '/auth/sign-in', 'You must be logged in to generate images');
  }

  try {
    // Get the AI provider (currently defaults to Gemini)
    const aiProvider = AIProviderFactory.getDefaultProvider();

    // Generate image using the selected provider
    const response = await aiProvider.generateImage(prompt, {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '1:1',
    });

    if (!response.success || !response.generatedImages || response.generatedImages.length === 0) {
      return {
        success: false,
        message: response.error || 'No images generated. Please try again.',
      };
    }

    const generatedImage = response.generatedImages[0];
    if (!generatedImage?.imageBytes) {
      return {
        success: false,
        message: 'Failed to generate image. Please try again.',
      };
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(generatedImage.imageBytes, 'base64');
    
    // Create unique filename
    const imageId = uuidv4();
    const fileName = `${user.id}/${imageId}.jpeg`;

    // Upload to Supabase storage
    const uploadResult = await uploadImageToStorage(fileName, imageBuffer, 'image/jpeg');

    // Insert image record into database
    await insertImage({
      id: imageId,
      prompt: prompt,
      url: uploadResult.path,
      user: user.id,
      is_public: false,
      title: null,
    });

    return {
      success: true,
      message: 'Image generated successfully!',
      imageId: imageId,
    };

  } catch (error) {
    console.error('Error generating image:', error);
    return {
      success: false,
      message: 'Failed to generate image. Please try again.',
    };
  }
}

export type PublicImageResult = {
  success: boolean;
  message: string;
};

export async function publicImage(
  prevState: PublicImageResult | null,
  formData: FormData
): Promise<PublicImageResult> {
  const imageId = formData.get('id')?.toString();

  if (!imageId) {
    return {
      success: false,
      message: 'Image ID is required',
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: 'You must be logged in',
    };
  }

  try {
    // Update image to be public
    const { error } = await supabase
      .from('images')
      .update({ is_public: true })
      .eq('id', imageId)
      .eq('user', user.id); // Ensure user owns the image

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Image made public successfully',
    };

  } catch (error) {
    console.error('Error making image public:', error);
    return {
      success: false,
      message: 'Failed to make image public',
    };
  }
} 