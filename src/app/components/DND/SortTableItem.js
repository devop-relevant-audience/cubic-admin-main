import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ Component, ...props }) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Component
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      isDragging={isDragging}
      listeners={listeners}
      {...attributes}
      {...props}
    />
  );
};

export default SortableItem;
