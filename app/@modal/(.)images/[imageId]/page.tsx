import DetailsPage from '@/app/images/[imageId]/page';
import { ModalWrapper } from '../../modal-wrapper';

export default function ImageDetailsModal({
  params,
}: {
  params: { imageId: string };
}) {
  return (
    <ModalWrapper>
      <DetailsPage params={params} />
    </ModalWrapper>
  );
}
