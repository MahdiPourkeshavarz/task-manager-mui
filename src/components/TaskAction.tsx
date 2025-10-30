import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import type { Task } from "../types";

interface TaskActionProps {
  tasks: Task[];
}

const TaskAction: React.FC<TaskActionProps> = ({ tasks }) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completionPercentage =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: "12px",
        mb: 3,
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
            Task Statistics
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Total Tasks:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {tasks.length}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Completed:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {completedCount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Pending:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {pendingCount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Completion:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {completionPercentage}%
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default TaskAction;
