import DetailsPage from '@/app/(app)/images/[imageId]/page';

export default function ImageDetailsModal({
  params,
}: {
  params: { imageId: string };
}) {
  return <DetailsPage params={params} isModal />;
}
