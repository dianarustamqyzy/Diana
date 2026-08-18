import { CSSProperties, PointerEvent, RefObject, useCallback, useRef, useState } from 'react';

interface PetPosition {
  left: number;
  top: number;
}

interface DragStart {
  pointerId: number;
  offsetX: number;
  offsetY: number;
}

export function useDraggablePet(
  roomRef: RefObject<HTMLDivElement>,
  petRef: RefObject<HTMLDivElement>,
  disabled: boolean,
) {
  const [position, setPosition] = useState<PetPosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<DragStart | null>(null);

  const resetPosition = useCallback(() => setPosition(null), []);

  function startDragging(event: PointerEvent<HTMLDivElement>) {
    if (disabled || !roomRef.current || !petRef.current) return;

    const roomBounds = roomRef.current.getBoundingClientRect();
    dragStartRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - roomBounds.left - petRef.current.offsetLeft,
      offsetY: event.clientY - roomBounds.top - petRef.current.offsetTop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    setIsDragging(true);
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const dragStart = dragStartRef.current;
    const room = roomRef.current;
    const pet = petRef.current;
    if (!dragStart || dragStart.pointerId !== event.pointerId || !room || !pet) return;

    const roomBounds = room.getBoundingClientRect();
    const maxLeft = Math.max(0, roomBounds.width - pet.offsetWidth);
    const maxTop = Math.max(0, roomBounds.height - pet.offsetHeight);
    const left = Math.min(maxLeft, Math.max(0, event.clientX - roomBounds.left - dragStart.offsetX));
    const top = Math.min(maxTop, Math.max(0, event.clientY - roomBounds.top - dragStart.offsetY));

    setPosition({
      left: (left / roomBounds.width) * 100,
      top: (top / roomBounds.height) * 100,
    });
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    if (dragStartRef.current?.pointerId !== event.pointerId) return;
    dragStartRef.current = null;
    setIsDragging(false);
  }

  const positionStyle: CSSProperties | undefined = position
    ? { left: `${position.left}%`, top: `${position.top}%` }
    : undefined;

  return {
    isDragging,
    position,
    hasPosition: Boolean(position),
    positionStyle,
    resetPosition,
    dragHandlers: {
      onPointerDown: startDragging,
      onPointerMove: drag,
      onPointerUp: stopDragging,
      onPointerCancel: stopDragging,
    },
  };
}
