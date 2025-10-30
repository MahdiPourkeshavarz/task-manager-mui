import React, { useState, useMemo } from "react";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  type AnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import TaskItem from "./TaskItem";
import type { Task } from "../types";

const disableAnimation: AnimateLayoutChanges = () => false;

const ITEMS_PER_PAGE = 7;

const SortableTaskItem: React.FC<{
  task: Task;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ task, onToggleCompletion, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    animateLayoutChanges: disableAnimation,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
    marginBottom: 12,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TaskItem
        task={task}
        onToggleCompletion={onToggleCompletion}
        onDelete={onDelete}
        isDragging={isDragging}
        dragListeners={listeners}
      />
    </div>
  );
};

const TaskList: React.FC<{
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (tasks: Task[]) => void;
}> = ({ tasks, loading, error, onToggleCompletion, onDelete, onReorder }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTasks = useMemo(
    () => tasks.slice(startIndex, endIndex),
    [tasks, startIndex, endIndex]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndexInPage = paginatedTasks.findIndex((t) => t.id === active.id);
    const newIndexInPage = paginatedTasks.findIndex((t) => t.id === over.id);

    if (oldIndexInPage === -1 || newIndexInPage === -1) return;

    const oldIndex = startIndex + oldIndexInPage;
    const newIndex = startIndex + newIndexInPage;

    if (oldIndex !== -1 && newIndex !== -1) {
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      onReorder(newTasks);
    }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    if (tasks.length > 0) {
      setCurrentPage(1);
    }
  }, [tasks.length]);

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  if (tasks.length === 0)
    return (
      <Box sx={{ textAlign: "center", py: 6, px: 2 }}>
        <Typography variant="h6" color="textSecondary">
          No tasks yet
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Create a new task to get started
        </Typography>
      </Box>
    );

  return (
    <Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={paginatedTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <Stack
            spacing={0}
            sx={{
              pb: 4,
              pt: 2,
              minHeight: 400,
            }}
          >
            {paginatedTasks.map((task) => (
              <SortableTaskItem
                key={task.id}
                task={task}
                onToggleCompletion={onToggleCompletion}
                onDelete={onDelete}
              />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>

      {tasks.length > ITEMS_PER_PAGE && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            pb: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="medium"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default TaskList;
