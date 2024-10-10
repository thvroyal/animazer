import DetailsPage from '@/app/images/[imageId]/page';

export default function ImageDetailsModal({
  params,
}: {
  params: { imageId: string };
}) {
  return <DetailsPage params={params} isModal />;
}
