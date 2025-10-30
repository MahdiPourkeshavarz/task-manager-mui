/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Checkbox,
  Chip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import type { Task } from "../types";
import type { DraggableSyntheticListeners } from "@dnd-kit/core"; // For better type safety

interface TaskItemProps {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
  dragListeners?: DraggableSyntheticListeners; // Using a more specific type
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleCompletion,
  onDelete,
  isDragging,
  dragListeners,
}) => {
  const priorityColor: Record<string, "default" | "error" | "warning"> = {
    low: "default",
    medium: "warning",
    high: "error",
  };

  // This ensures that clicking the checkbox only toggles completion
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCompletion(task.id);
  };

  // This ensures that clicking the delete icon only triggers deletion
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <Card
      sx={{
        mb: 1.5,
        opacity: isDragging ? 0.5 : 1,
        transition: "opacity 0.2s ease, box-shadow 0.2s ease",
        boxShadow: isDragging ? 6 : 1, // Add a lift effect when dragging
      }}
    >
      <CardContent
        sx={{
          p: { xs: 1.5, sm: 2 },
          "&:last-child": { pb: { xs: 1.5, sm: 2 } },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* --- DEDICATED DRAG HANDLE --- */}
          {/* This is the most important part. The listeners are ONLY on this element. */}
          <Box
            {...dragListeners}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "grab",
              touchAction: "none", // Critical for touch devices
              color: "action.active",
              p: 1, // Add some padding to make it easier to grab
            }}
            aria-label="Drag handle to reorder task"
          >
            <DragIndicatorIcon />
          </Box>

          {/* --- CHECKBOX --- */}
          <Checkbox
            checked={task.completed}
            onClick={handleCheckboxClick}
            aria-label="Toggle task completion"
            sx={{ p: 1 }} // Standardize padding
          />

          {/* --- CONTENT --- */}
          <Box sx={{ flex: 1, minWidth: 0, py: 0.5 }}>
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontWeight: 500,
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "text.disabled" : "text.primary",
                wordBreak: "break-word",
              }}
            >
              {task.title}
            </Typography>

            {task.description && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  wordBreak: "break-word",
                  mt: 0.5,
                }}
              >
                {task.description}
              </Typography>
            )}

            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: "wrap", gap: 0.5, mt: 1.5 }}
            >
              <Chip
                label={task.priority}
                size="small"
                color={priorityColor[task.priority]}
                variant="outlined"
              />
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", alignSelf: "center" }}
              >
                {new Date(task.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>
          </Box>

          {/* --- DELETE BUTTON --- */}
          <IconButton
            aria-label="Delete task"
            onClick={handleDeleteClick}
            sx={{ color: "action.active" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
