import React from "react";
import { Container, Box, Typography, Divider } from "@mui/material";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterButton from "./FilterButton";
import TaskStats from "./TaskStats";
import TaskAction from "./TaskAction";
import { useTasks } from "../hooks/useTasks";

const TaskManager: React.FC = () => {
  const {
    tasks,
    allTasks,
    filter,
    loading,
    error,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    setFilter,
    reorderTasks,
  } = useTasks();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{ px: { xs: 2, md: 6 }, maxWidth: "1600px" }}
      >
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.5rem" },
              fontWeight: 700,
              mb: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Tasks
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Organize your work and stay productive
          </Typography>
        </Box>

        <TaskStats tasks={allTasks} />
        <TaskAction tasks={allTasks} />

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        <TaskForm onAddTask={addTask} />

        <FilterButton currentFilter={filter} onFilterChange={setFilter} />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggleCompletion={toggleTaskCompletion}
          onDelete={deleteTask}
          onReorder={reorderTasks}
        />
      </Container>
    </Box>
  );
};

export default TaskManager;
