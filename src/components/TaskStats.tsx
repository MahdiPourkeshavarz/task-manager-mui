import React from "react";
import { Box, Paper, Typography, LinearProgress, Stack } from "@mui/material";
import type { Task } from "../types";

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const highPriorityCount = tasks.filter((t) => t.priority === "high").length;
  const completionPercentage =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: "12px",
        mb: 3,
        width: "100%",
      }}
    >
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              width: "100%",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Overall Progress
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {completionPercentage}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={completionPercentage}
            sx={{
              height: 6,
              borderRadius: "3px",
              backgroundColor: "#f0f0f0",
              "& .MuiLinearProgress-bar": {
                borderRadius: "3px",
              },
              width: "100%",
            }}
          />
        </Box>
        {highPriorityCount > 0 && (
          <Box
            sx={{
              p: 1.5,
              backgroundColor: "#fff5f5",
              borderRadius: "8px",
              border: "1px solid #ffe0e0",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#d32f2f" }}
            >
              ⚠️ {highPriorityCount} high priority task
              {highPriorityCount > 1 ? "s" : ""}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default TaskStats;
