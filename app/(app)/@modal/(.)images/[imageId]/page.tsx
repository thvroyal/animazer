import DetailsPage from '@/app/(app)/images/[imageId]/page';

export default async function ImageDetailsModal(
  props: {
    params: Promise<{ imageId: string }>;
  }
) {
  const params = await props.params;
  return <DetailsPage params={params} isModal />;
}
