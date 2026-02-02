import type { Annotation, AnnotationPatch } from '../../../types/intern/annotation';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import BaseStyleControls from './BaseStyleControls';
import CustomTextControls from './CustomTextControls';
import PolylineStyleControls from './PolylineStyleControls';

interface StyleControlsProps {
  annotation: Annotation;
  onChange: (patch: AnnotationPatch) => void;
}

const StyleControls = ({ annotation, onChange }: StyleControlsProps) => {
  const isText = annotation.kind === 'text';
  const isPolyline = annotation.kind === 'polyline';

  return (
    <ScrollArea.Root className="h-full">
      <ScrollArea.Viewport className="h-full overflow-x-hidden">
        <div className="flex flex-col gap-5 p-5">
          <BaseStyleControls annotation={annotation} onChange={onChange} />

          {isPolyline && <PolylineStyleControls annotation={annotation} onChange={onChange} />}

          {isText && <CustomTextControls textAnnotation={annotation} onChange={onChange} />}
        </div>
      </ScrollArea.Viewport>

      {/* Scrollbar */}
      <ScrollArea.Scrollbar orientation="vertical" className="flex w-2 bg-neutral-900">
        <ScrollArea.Thumb className="flex-1 bg-neutral-600 rounded-full min-h-[24px]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default StyleControls;
